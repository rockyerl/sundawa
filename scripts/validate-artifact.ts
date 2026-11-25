import fs from "fs";
import path from "path";

const ROOT = path.resolve(__dirname, "../.agents");

export type ArtifactKind =
  "audit-report" | "test-cases" | "iso-control-assessment" | "gate-decision";

const SCHEMA_FILES: Record<ArtifactKind, string> = {
  "audit-report": "audit-report.schema.json",
  "test-cases": "test-cases.schema.json",
  "iso-control-assessment": "iso-control-assessment.schema.json",
  "gate-decision": "gate-decision.schema.json",
};

interface EvidenceItem {
  id: string;
  kind: string;
  uri: string;
  summary: string;
  captured_at: string;
  access?: string;
}

interface FindingItem {
  id: string;
  title: string;
  severity: string;
  confidence: string;
  status: string;
  description: string;
  location: string;
  standard_refs?: string[];
  evidence_ids?: string[];
  recommendation: string;
  reproduction_steps?: string[];
  acceptance?: {
    approved_by?: string;
    reason?: string;
    expires_at?: string;
  };
}

interface GateResultItem {
  gate_id: string;
  status: string;
  rationale: string;
  evidence_ids?: string[];
}

interface AuditReportData {
  schema_version?: string;
  run_id?: string;
  skill?: string;
  generated_at?: string;
  scope?: {
    project?: string;
    target?: string;
    commit?: string;
    environment?: string;
    authorized?: boolean;
    exclusions?: string[];
  };
  method?: string;
  standards_used?: string[];
  evidence?: EvidenceItem[];
  findings?: FindingItem[];
  limitations?: string[];
  gate_results?: GateResultItem[];
  release_recommendation?: string;
  reviewed_by?: string;
}

interface GateDecisionData {
  schema_version?: string;
  profile?: string;
  project?: string;
  reviewed_at?: string;
  overall?: string;
  gates?: Array<{
    id: string;
    status: string;
    evidence_ids?: string[];
    reason?: string;
  }>;
  blocking_findings?: string[];
  limitations?: string[];
  approver?: string | null;
}

interface TestCasesData {
  schema_version?: string;
  source_requirements?: string[];
  cases?: Array<{
    id: string;
    requirement_ids?: string[];
    execution_status?: string;
    evidence_ids?: string[];
  }>;
}

interface IsoControlAssessmentData {
  schema_version?: string;
  overall_status?: string;
  control_assessments?: Array<{
    control_id: string;
    implementation: string;
    applicable?: boolean;
    source_verified?: boolean;
    evidence_ids?: string[];
  }>;
}

export function validateArtifact(kind: ArtifactKind, rawData: unknown): string[] {
  const errors: string[] = [];
  const schemaFile = path.join(ROOT, "schemas", SCHEMA_FILES[kind]);

  if (!fs.existsSync(schemaFile)) {
    return [`Schema file missing: ${schemaFile}`];
  }

  const baseData = rawData as { schema_version?: string };
  if (baseData.schema_version !== "1.0.0") {
    errors.push(`Invalid schema_version: expected '1.0.0', got '${baseData.schema_version}'`);
  }

  if (kind === "audit-report") {
    const data = rawData as AuditReportData;
    const regFile = path.join(ROOT, "standards/registry.json");
    const gatesFile = path.join(ROOT, "config/quality-gates.json");
    const registry = (JSON.parse(fs.readFileSync(regFile, "utf-8")).standards || {}) as Record<
      string,
      unknown
    >;
    const gates = (JSON.parse(fs.readFileSync(gatesFile, "utf-8")).gates || {}) as Record<
      string,
      unknown
    >;

    const evidences = data.evidence || [];
    const evMap: Record<string, EvidenceItem> = {};
    for (const e of evidences) {
      if (evMap[e.id]) {
        errors.push(`Duplicate evidence ID: ${e.id}`);
      }
      evMap[e.id] = e;
    }

    const standardsUsed = data.standards_used || [];
    for (const code of standardsUsed) {
      if (!registry[code]) {
        errors.push(`Unknown standard in standards_used: ${code}`);
      }
    }

    const findingIds = new Set<string>();
    const findings = data.findings || [];
    for (const f of findings) {
      if (findingIds.has(f.id)) {
        errors.push(`Duplicate finding ID: ${f.id}`);
      }
      findingIds.add(f.id);

      for (const ref of f.standard_refs || []) {
        if (!registry[ref]) {
          errors.push(`${f.id}: unknown standard ${ref}`);
        }
        if (!standardsUsed.includes(ref)) {
          errors.push(`${f.id}: standard ${ref} absent from standards_used`);
        }
      }

      for (const eid of f.evidence_ids || []) {
        if (!evMap[eid]) {
          errors.push(`${f.id}: missing evidence ID ${eid}`);
        }
      }

      if (
        (f.status === "confirmed" || f.status === "resolved") &&
        (!f.evidence_ids || f.evidence_ids.length === 0)
      ) {
        errors.push(`${f.id}: status '${f.status}' requires evidence_ids`);
      }

      if (
        f.status === "resolved" &&
        !f.evidence_ids?.some((eid: string) => evMap[eid]?.kind === "test-run")
      ) {
        errors.push(`${f.id}: resolved requires retest evidence of kind 'test-run'`);
      }

      if (f.status === "risk-accepted") {
        const acc = f.acceptance;
        if (!acc || !acc.approved_by || !acc.reason || !acc.expires_at) {
          errors.push(`${f.id}: risk-accepted requires approved_by, reason, and expires_at`);
        }
      }

      if (f.status === "confirmed" && f.confidence === "low") {
        errors.push(`${f.id}: confirmed finding cannot have low confidence; mark suspected`);
      }

      if (f.status === "confirmed" && data.skill === "bug-hunter" && !f.reproduction_steps) {
        errors.push(`${f.id}: confirmed bug requires steps to reproduce`);
      }
    }

    if (data.method && ["manual-test", "automated-test", "mixed"].includes(data.method)) {
      if (!data.scope?.authorized) {
        errors.push("Active testing requires scope.authorized=true");
      }
      if (!evidences.some((e) => e.kind === "test-run" || e.kind === "scan")) {
        errors.push("Test execution method requires a test-run or scan evidence artifact");
      }
    }

    const seenGateIds = new Set<string>();
    const gateResults = data.gate_results || [];
    for (const g of gateResults) {
      if (seenGateIds.has(g.gate_id)) {
        errors.push(`Duplicate gate ID: ${g.gate_id}`);
      }
      seenGateIds.add(g.gate_id);

      if (!gates[g.gate_id]) {
        errors.push(`Unknown gate ID: ${g.gate_id}`);
      }

      for (const eid of g.evidence_ids || []) {
        if (!evMap[eid]) {
          errors.push(`Gate ${g.gate_id}: missing evidence ID ${eid}`);
        }
      }

      if (g.status === "pass" && (!g.evidence_ids || g.evidence_ids.length === 0)) {
        errors.push(`Gate ${g.gate_id}: pass status requires at least one evidence_id`);
      }
    }

    if (data.release_recommendation === "pass") {
      if (gateResults.length === 0) {
        errors.push("Cannot recommend pass with no evaluated quality gates");
      }
      if (evidences.length === 0) {
        errors.push("Cannot recommend pass without evidence");
      }
      if (
        findings.some(
          (f) =>
            (f.status === "confirmed" || f.status === "suspected") &&
            (f.severity === "critical" || f.severity === "high")
        )
      ) {
        errors.push("Cannot recommend pass with unresolved critical/high findings");
      }
      if (gateResults.some((g) => g.status !== "pass")) {
        errors.push("Cannot recommend pass with non-pass gates");
      }
    }
  }

  if (kind === "gate-decision") {
    const data = rawData as GateDecisionData;
    const policyFile = path.join(ROOT, "config/quality-gates.json");
    const policy = JSON.parse(fs.readFileSync(policyFile, "utf-8"));
    const profile = data.profile ? policy.profiles[data.profile] : null;

    if (!profile) {
      errors.push(`Unknown profile: ${data.profile}`);
    } else {
      const required = new Set<string>(profile.required_gates);
      const presentMap = new Map<string, { status: string; evidence_ids?: string[] }>(
        (data.gates || []).map((g) => [g.id, g])
      );

      if (data.overall === "PASS") {
        if (!data.approver) {
          errors.push("PASS requires a human approver");
        }
        if (data.blocking_findings && data.blocking_findings.length > 0) {
          errors.push("PASS cannot list blocking findings");
        }
        for (const req of required) {
          const g = presentMap.get(req);
          if (!g || g.status !== "pass" || !g.evidence_ids || g.evidence_ids.length === 0) {
            errors.push(`PASS missing fully evidenced required gate: ${req}`);
          }
        }
      }
    }
  }

  if (kind === "test-cases") {
    const data = rawData as TestCasesData;
    const sources = new Set(data.source_requirements || []);
    const caseIds = new Set<string>();
    for (const c of data.cases || []) {
      if (caseIds.has(c.id)) {
        errors.push(`Duplicate test case ID: ${c.id}`);
      }
      caseIds.add(c.id);

      for (const reqId of c.requirement_ids || []) {
        if (!sources.has(reqId)) {
          errors.push(`${c.id}: unrecognized requirement ID '${reqId}'`);
        }
      }

      if (c.execution_status !== "not-run" && (!c.evidence_ids || c.evidence_ids.length === 0)) {
        errors.push(`${c.id}: executed status '${c.execution_status}' needs evidence_ids`);
      }
    }
  }

  if (kind === "iso-control-assessment") {
    const data = rawData as IsoControlAssessmentData;
    const controlIds = new Set<string>();
    for (const c of data.control_assessments || []) {
      if (controlIds.has(c.control_id)) {
        errors.push(`Duplicate ISO control: ${c.control_id}`);
      }
      controlIds.add(c.control_id);

      if (
        c.implementation === "implemented" &&
        (!c.source_verified || !c.evidence_ids || c.evidence_ids.length === 0)
      ) {
        errors.push(`${c.control_id}: implemented requires verified source and evidence`);
      }
      if (c.implementation === "not-applicable" && c.applicable) {
        errors.push(`${c.control_id}: applicability contradicts status`);
      }
    }

    if (data.overall_status === "ready-for-independent-audit") {
      if (
        data.control_assessments?.some(
          (c) =>
            !c.source_verified ||
            ["not-assessed", "not-implemented", "partially-implemented"].includes(c.implementation)
        )
      ) {
        errors.push("Cannot claim readiness when control source unverified or gaps remain");
      }
    }
  }

  return errors;
}

if (require.main === module) {
  const args = process.argv.slice(2);
  let schemaKind: ArtifactKind = "audit-report";
  let targetFile = "";

  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--schema" && i + 1 < args.length) {
      schemaKind = args[++i] as ArtifactKind;
    } else if (args[i] === "--file" && i + 1 < args.length) {
      targetFile = args[++i];
    }
  }

  if (!targetFile || !SCHEMA_FILES[schemaKind]) {
    console.error(
      "Usage: tsx scripts/validate-artifact.ts --schema <audit-report|test-cases|iso-control-assessment|gate-decision> --file <path>"
    );
    process.exit(1);
  }

  try {
    const content = fs.readFileSync(targetFile, "utf-8");
    const json: unknown = JSON.parse(content);
    const issues = validateArtifact(schemaKind, json);
    if (issues.length > 0) {
      console.error(`❌ Validation errors for ${targetFile}:`);
      for (const err of issues) {
        console.error("  -", err);
      }
      process.exit(1);
    }
    console.log(`✅ PASS: ${schemaKind} JSON and semantic rules validated for ${targetFile}`);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("ERROR:", msg);
    process.exit(2);
  }
}
