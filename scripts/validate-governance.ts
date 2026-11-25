import fs from "fs";
import path from "path";

const ROOT = path.resolve(__dirname, "../.agents");

export type GovernanceKind =
  | "risk-register"
  | "raci-matrix"
  | "capability-assessment"
  | "control-monitoring"
  | "governance-gate-results";

export interface EvidenceItem {
  id: string;
  uri: string;
  captured_at?: string;
  verified: boolean;
  verified_by?: string;
  verified_at?: string;
}

export interface GovernanceGateItem {
  id: string;
  status: "pass" | "fail" | "not-tested";
  reason: string;
  evidence_ids: string[];
}

export interface GovernanceGateResultsDoc {
  schema_version: string;
  project: string;
  evaluated_at: string;
  overall: "REVIEW" | "BLOCK";
  blockers: string[];
  limitations: string[];
  gates: GovernanceGateItem[];
  approver: string | null;
}

export interface RiskAcceptance {
  role: string;
  approved_at: string;
  expires_at: string;
}

export interface RiskItem {
  id: string;
  category: string;
  severity: string;
  likelihood: string;
  impact: string;
  status: string;
  owner: string;
  mitigation_status: string;
  mitigation?: string;
  closure_verified_by?: string;
  evidence_ids?: string[];
  cobit2019_ids?: string[];
  acceptance?: RiskAcceptance;
  residual_likelihood?: string;
  residual_impact?: string;
}

export interface RiskRegisterDoc {
  schema_version: string;
  project: string;
  as_of: string;
  risk_appetite?: {
    accepted_by_role: string;
  };
  evidence_catalog?: EvidenceItem[];
  risks?: RiskItem[];
}

export interface RaciRole {
  id: string;
  title: string;
  kind?: string;
}

export interface RaciActivity {
  activity_id: string;
  title?: string;
  accountable: string;
  independent_reviewer?: string;
  responsible?: string[];
  consulted?: string[];
  informed?: string[];
  evidence_ids?: string[];
}

export interface RaciMatrixDoc {
  schema_version: string;
  project: string;
  as_of: string;
  approved_by?: string;
  approval_reference?: string;
  roles?: RaciRole[];
  activities?: RaciActivity[];
  evidence_catalog?: EvidenceItem[];
}

export interface ProcessCheck {
  check_id: string;
  status: string;
  evidence_ids?: string[];
}

export interface CapabilityAssessmentItem {
  cobit2019_id: string;
  cobit7_theme?: string;
  selected?: boolean;
  readiness_status: string;
  assessed_by?: string;
  evidence_ids?: string[];
  process_checks?: ProcessCheck[];
}

export interface CapabilityAssessmentDoc {
  schema_version: string;
  project: string;
  as_of: string;
  scope_approved_by?: string;
  scope_approval_reference?: string;
  assessments?: CapabilityAssessmentItem[];
  evidence_catalog?: EvidenceItem[];
}

export interface MonitoredControl {
  control_id: string;
  status: string;
  applicable?: boolean;
  critical?: boolean;
  last_checked: string;
  next_due: string;
  evidence_ids?: string[];
  cobit2019_ids?: string[];
}

export interface ControlMonitoringDoc {
  schema_version: string;
  project: string;
  as_of: string;
  scope_approved_by?: string;
  scope_approval_reference?: string;
  controls?: MonitoredControl[];
  evidence_catalog?: EvidenceItem[];
}

export interface GovernanceBundle {
  "risk-register": RiskRegisterDoc;
  "raci-matrix": RaciMatrixDoc;
  "capability-assessment": CapabilityAssessmentDoc;
  "control-monitoring": ControlMonitoringDoc;
}

interface GovernancePolicy {
  required_raci_activities?: string[];
  independent_reviewer_activities?: string[];
  minimum_selected_objectives?: number;
  minimum_applicable_controls?: number;
}

interface CrosswalkObjective {
  cobit2019_id: string;
  cobit7_theme?: string;
  cobit7_equivalence?: string;
  cobit7_objective_id?: string | null;
  skills?: string[];
}

interface CrosswalkDoc {
  objectives?: CrosswalkObjective[];
}

export function loadJson<T = unknown>(filePath: string): T {
  return JSON.parse(fs.readFileSync(filePath, "utf-8")) as T;
}

export function refsAvailable(doc: { evidence_catalog?: EvidenceItem[] }): Set<string> {
  const catalog = doc.evidence_catalog || [];
  const valid = new Set<string>();
  for (const e of catalog) {
    if (
      e.verified &&
      e.verified_by &&
      e.verified_at &&
      e.uri &&
      !e.uri.startsWith("synthetic:") &&
      !e.uri.startsWith("example:") &&
      !e.uri.startsWith("demo:")
    ) {
      valid.add(e.id);
    }
  }
  return valid;
}

export function validateGovernance(kind: GovernanceKind, data: Record<string, unknown>): string[] {
  const errors: string[] = [];
  const schemaFile = path.join(ROOT, "schemas", `${kind}.schema.json`);
  if (!fs.existsSync(schemaFile)) {
    return [`Missing schema file: ${schemaFile}`];
  }

  if (data.schema_version !== "1.1.0") {
    errors.push(`Invalid schema_version: expected '1.1.0', got '${String(data.schema_version)}'`);
  }

  if (kind === "governance-gate-results") {
    const doc = data as unknown as GovernanceGateResultsDoc;
    const ids = (doc.gates || []).map((g) => g.id);
    if (ids.length !== new Set(ids).size) {
      errors.push("Duplicate governance gate IDs");
    }
    if (doc.overall === "REVIEW" && (doc.gates || []).some((g) => g.status !== "pass")) {
      errors.push("REVIEW cannot contain a non-pass governance gate");
    }
    if (
      (doc.gates || []).some(
        (g) => g.status === "pass" && (!g.evidence_ids || g.evidence_ids.length === 0)
      )
    ) {
      errors.push("Governance pass requires evidence");
    }
    return errors;
  }

  const evCatalog = (data.evidence_catalog as EvidenceItem[]) || [];
  const evIds = evCatalog.map((e) => e.id);
  if (evIds.length !== new Set(evIds).size) {
    errors.push("Duplicate evidence IDs");
  }

  const asOfStr = String(data.as_of).slice(0, 10);

  for (const e of evCatalog) {
    if (e.verified && (!e.verified_by || !e.verified_at)) {
      errors.push(`${e.id}: verified evidence requires verified_by and verified_at`);
    }
    if (e.captured_at && e.captured_at.slice(0, 10) > asOfStr) {
      errors.push(`${e.id}: captured in the future relative to as_of`);
    }
    if (e.verified_at && e.verified_at.slice(0, 10) > asOfStr) {
      errors.push(`${e.id}: verified after as_of`);
    }
  }

  const allEv = new Set<string>(evIds);
  const verified = refsAvailable(data as { evidence_catalog?: EvidenceItem[] });

  const crosswalkPath = path.join(ROOT, "governance/cobit/cobit2019-crosswalk.json");
  const crosswalk = loadJson<CrosswalkDoc>(crosswalkPath);
  const objectiveIds = new Set<string>((crosswalk.objectives || []).map((x) => x.cobit2019_id));

  function checkEvs(label: string, eids?: string[]) {
    for (const eid of eids || []) {
      if (!allEv.has(eid)) {
        errors.push(`${label}: unknown evidence reference ${eid}`);
      }
    }
  }

  function checkCobit(label: string, oids?: string[]) {
    for (const oid of oids || []) {
      if (!objectiveIds.has(oid)) {
        errors.push(`${label}: objective ${oid} not in provisional COBIT2019 crosswalk`);
      }
    }
  }

  if (kind === "risk-register") {
    const doc = data as unknown as RiskRegisterDoc;
    const seen = new Set<string>();
    for (const r of doc.risks || []) {
      const rid = r.id;
      if (seen.has(rid)) {
        errors.push(`Duplicate risk ID: ${rid}`);
      }
      seen.add(rid);
      checkEvs(rid, r.evidence_ids);
      checkCobit(rid, r.cobit2019_ids);

      if (r.status === "mitigated" || r.status === "closed") {
        if (!r.closure_verified_by || !r.evidence_ids?.some((eid: string) => verified.has(eid))) {
          errors.push(
            `${rid}: mitigated/closed requires an independent verification owner and verified evidence`
          );
        }
      }

      if (r.status === "accepted") {
        const a = r.acceptance;
        if (!a) {
          errors.push(`${rid}: accepted risk requires an approval record`);
        } else {
          if (a.role !== doc.risk_appetite?.accepted_by_role) {
            errors.push(`${rid}: accepted by a role outside declared approval authority`);
          }
          if (new Date(a.approved_at) >= new Date(a.expires_at)) {
            errors.push(`${rid}: risk acceptance expiry must follow approval date`);
          }
          if (a.approved_at.slice(0, 10) > asOfStr) {
            errors.push(`${rid}: risk acceptance approved after assessment as_of`);
          }
          if (!r.evidence_ids?.some((eid: string) => verified.has(eid))) {
            errors.push(
              `${rid}: accepted risk requires independently verified authorization evidence`
            );
          }
        }
      }

      if ("residual_likelihood" in r !== "residual_impact" in r) {
        errors.push(`${rid}: residual likelihood/impact must be provided as a pair`);
      }
    }
  } else if (kind === "raci-matrix") {
    const doc = data as unknown as RaciMatrixDoc;
    const roles = (doc.roles || []).map((r) => r.id);
    if (roles.length !== new Set(roles).size) {
      errors.push("Duplicate RACI role ID");
    }
    const roleIds = new Set<string>(roles);
    const acts = new Set<string>();

    for (const a of doc.activities || []) {
      const aid = a.activity_id;
      if (acts.has(aid)) {
        errors.push(`Duplicate RACI activity ID: ${aid}`);
      }
      acts.add(aid);

      const participants = [
        a.accountable,
        a.independent_reviewer,
        ...(a.responsible || []),
        ...(a.consulted || []),
        ...(a.informed || []),
      ];
      for (const p of participants) {
        if (p && !roleIds.has(p)) {
          errors.push(`${aid}: unknown RACI role ${p}`);
        }
      }

      if ((a.responsible || []).length !== new Set(a.responsible || []).size) {
        errors.push(`${aid}: duplicate responsible role`);
      }
      if (
        a.accountable === a.independent_reviewer ||
        (a.independent_reviewer && (a.responsible || []).includes(a.independent_reviewer))
      ) {
        errors.push(`${aid}: independent reviewer conflicts with approver or executor`);
      }
      checkEvs(aid, a.evidence_ids);
    }
  } else if (kind === "capability-assessment") {
    const doc = data as unknown as CapabilityAssessmentDoc;
    const seen = new Set<string>();
    for (const a of doc.assessments || []) {
      const aid = a.cobit2019_id;
      if (seen.has(aid)) {
        errors.push(`Duplicate assessment objective: ${aid}`);
      }
      seen.add(aid);
      checkCobit(aid, [aid]);

      const matching = (crosswalk.objectives || []).find((x) => x.cobit2019_id === aid);
      if (matching && matching.cobit7_theme !== a.cobit7_theme) {
        errors.push(`${aid}: cobit7_theme not aligned to provisional mapping`);
      }
      checkEvs(aid, a.evidence_ids);

      const checks = new Set<string>();
      for (const c of a.process_checks || []) {
        if (checks.has(c.check_id)) {
          errors.push(`${aid}: duplicate check ${c.check_id}`);
        }
        checks.add(c.check_id);
        checkEvs(`${aid}.${c.check_id}`, c.evidence_ids);
        if (c.status === "evidenced" && !c.evidence_ids?.some((eid: string) => verified.has(eid))) {
          errors.push(
            `${aid}.${c.check_id}: evidenced check requires independently verified evidence`
          );
        }
      }

      if (a.readiness_status === "evidenced") {
        if (!a.assessed_by || !a.evidence_ids?.some((eid: string) => verified.has(eid))) {
          errors.push(`${aid}: evidenced readiness requires assessor and verified evidence`);
        }
        if (
          (a.process_checks || []).some(
            (c: ProcessCheck) => c.status !== "evidenced" && c.status !== "not-applicable"
          )
        ) {
          errors.push(`${aid}: evidenced readiness contradicts open or unassessed process check`);
        }
      }
    }
  } else if (kind === "control-monitoring") {
    const doc = data as unknown as ControlMonitoringDoc;
    const seen = new Set<string>();
    for (const c of doc.controls || []) {
      const cid = c.control_id;
      if (seen.has(cid)) {
        errors.push(`Duplicate control ID: ${cid}`);
      }
      seen.add(cid);
      checkEvs(cid, c.evidence_ids);
      checkCobit(cid, c.cobit2019_ids);

      if (c.last_checked.slice(0, 10) > asOfStr) {
        errors.push(`${cid}: last_checked is later than as_of`);
      }
      if (new Date(c.next_due) <= new Date(c.last_checked)) {
        errors.push(`${cid}: next_due must be strictly after last_checked`);
      }

      if (c.status === "effective") {
        if (!c.evidence_ids?.some((eid: string) => verified.has(eid))) {
          errors.push(`${cid}: effective control requires verified evidence`);
        }
      }
    }
  }

  return errors;
}

export function evaluateGovernanceBundle(bundle: GovernanceBundle): GovernanceGateResultsDoc {
  const policy = loadJson<GovernancePolicy>(path.join(ROOT, "config/governance-policy.json"));
  const crosswalk = loadJson<CrosswalkDoc>(
    path.join(ROOT, "governance/cobit/cobit2019-crosswalk.json")
  );
  const known = new Set<string>((crosswalk.objectives || []).map((x) => x.cobit2019_id));

  const projects = new Set(
    (Object.values(bundle) as Array<{ project: string }>).map((x) => x.project)
  );
  const asOfs = new Set((Object.values(bundle) as Array<{ as_of: string }>).map((x) => x.as_of));

  if (projects.size !== 1 || asOfs.size !== 1) {
    throw new Error("Governance documents must have same project and assessment as_of");
  }

  const asOf = new Date(Array.from(asOfs)[0]);
  const results: GovernanceGateItem[] = [];
  const blockers: string[] = [];
  const limitations = [
    "Sundawa internal evidence-readiness gates; not official ISACA COBIT 7 assessment or certification.",
    "Governance mapping COBIT 2019 to COBIT 7 is provisional; detailed equivalence not verified.",
  ];

  function finish(key: string, failures: string[], unknowns: string[], evid: Set<string>) {
    let status: "pass" | "fail" | "not-tested" = "not-tested";
    let reason = "";
    if (failures.length > 0) {
      status = "fail";
      reason = failures.join("; ");
    } else if (unknowns.length > 0) {
      status = "not-tested";
      reason = unknowns.join("; ");
    } else if (evid.size === 0) {
      status = "not-tested";
      reason = "No verified evidence supports this gate";
    } else {
      status = "pass";
      reason =
        "All applicable Sundawa internal checks evidenced; independent human sign-off still required";
    }
    results.push({
      id: key,
      status,
      reason,
      evidence_ids: Array.from(evid).sort(),
    });
    if (status !== "pass") {
      blockers.push(`${key}: ${reason}`);
    }
  }

  // 1. GOV-RISK
  const risk = bundle["risk-register"];
  const verifiedRisk = refsAvailable(risk);
  const riskFailures: string[] = [];
  const riskUnknowns: string[] = [];
  const riskEvid = new Set<string>();

  for (const r of risk.risks || []) {
    const rid = r.id;
    for (const eid of r.evidence_ids || []) {
      if (verifiedRisk.has(eid)) {
        riskEvid.add(eid);
      }
    }
    if (r.owner === "UNASSIGNED") {
      riskUnknowns.push(`Unassigned risk owner: ${rid}`);
    }
    if (["high", "critical"].includes(r.severity) && r.status === "open") {
      riskFailures.push(`High/Critical risk left open: ${rid}`);
    }
    if (
      ["high", "critical"].includes(r.severity) &&
      r.status === "mitigated" &&
      r.mitigation_status !== "verified"
    ) {
      riskFailures.push(`Mitigation not verified: ${rid}`);
    }
    if (r.status === "mitigated" && !r.evidence_ids?.some((eid: string) => verifiedRisk.has(eid))) {
      riskUnknowns.push(`Mitigation evidence unverified: ${rid}`);
    }
    if (r.status === "accepted") {
      const a = r.acceptance;
      if (!a || a.role !== risk.risk_appetite?.accepted_by_role) {
        riskFailures.push(`Risk acceptance role violation: ${rid}`);
      }
      if (a && new Date(a.expires_at) < asOf) {
        riskFailures.push(`Risk acceptance expired: ${rid}`);
      }
      if (!r.evidence_ids?.some((eid: string) => verifiedRisk.has(eid))) {
        riskUnknowns.push(`Acceptance evidence unverified: ${rid}`);
      }
    }
  }
  finish("GOV-RISK", riskFailures, riskUnknowns, riskEvid);

  // 2. GOV-RACI
  const raci = bundle["raci-matrix"];
  const verifiedRaci = refsAvailable(raci);
  const raciFailures: string[] = [];
  const raciUnknowns: string[] = [];
  const raciEvid = new Set<string>();
  const actsMap = new Map<string, RaciActivity>(
    (raci.activities || []).map((a: RaciActivity) => [a.activity_id, a])
  );

  for (const key of policy.required_raci_activities || []) {
    const a = actsMap.get(key);
    if (!a) {
      raciFailures.push(`Critical decision not assigned: ${key}`);
      continue;
    }
    for (const eid of a.evidence_ids || []) {
      if (verifiedRaci.has(eid)) {
        raciEvid.add(eid);
      }
    }
    if (a.accountable === "UNASSIGNED") {
      raciUnknowns.push(`Accountable owner unassigned: ${key}`);
    }
    if (!a.evidence_ids?.some((eid: string) => verifiedRaci.has(eid))) {
      raciUnknowns.push(`RACI authorization evidence unverified: ${key}`);
    }
    if (
      policy.independent_reviewer_activities?.includes(key) &&
      (a.independent_reviewer === a.accountable ||
        (a.independent_reviewer && (a.responsible || []).includes(a.independent_reviewer)))
    ) {
      raciFailures.push(`Segregation of duties conflict: ${key}`);
    }
  }

  if (
    !raci.approved_by ||
    ["UNASSIGNED", "TBD", "UNKNOWN"].includes(raci.approved_by.trim().toUpperCase()) ||
    raci.approval_reference?.startsWith("synthetic:")
  ) {
    raciUnknowns.push("RACI has no verifiable human approval");
  }
  finish("GOV-RACI", raciFailures, raciUnknowns, raciEvid);

  // 3. GOV-CAPABILITY
  const cap = bundle["capability-assessment"];
  const verifiedCap = refsAvailable(cap);
  const capFailures: string[] = [];
  const capUnknowns: string[] = [];
  const capEvid = new Set<string>();
  const selected = (cap.assessments || []).filter((a: CapabilityAssessmentItem) => a.selected);

  if (
    !cap.scope_approved_by ||
    ["UNASSIGNED", "TBD", "UNKNOWN"].includes(cap.scope_approved_by.trim().toUpperCase()) ||
    cap.scope_approval_reference?.startsWith("synthetic:")
  ) {
    capUnknowns.push("Selected objective scope lacks verifiable human approval");
  }
  if (selected.length < (policy.minimum_selected_objectives || 1)) {
    capFailures.push("No selected governance objective with rationale");
  }

  for (const a of selected) {
    const aid = a.cobit2019_id;
    if (!known.has(aid)) {
      capFailures.push(`${aid} not mapped`);
    }
    if (a.readiness_status === "gap") {
      capFailures.push(`${aid} reported readiness gap`);
    }
    if (["not-assessed", "not-applicable"].includes(a.readiness_status)) {
      capUnknowns.push(`${aid} not assessed or inapplicable despite being selected`);
    }
    for (const eid of a.evidence_ids || []) {
      if (verifiedCap.has(eid)) {
        capEvid.add(eid);
      }
    }
    if (!a.assessed_by || !a.evidence_ids?.some((eid: string) => verifiedCap.has(eid))) {
      capUnknowns.push(`${aid} missing verified assessment and reviewer`);
    }
    for (const c of a.process_checks || []) {
      if (c.status === "gap") {
        capFailures.push(`${aid}/${c.check_id} check failed`);
      }
      if (c.status === "not-assessed") {
        capUnknowns.push(`${aid}/${c.check_id} check not assessed`);
      }
      for (const eid of c.evidence_ids || []) {
        if (verifiedCap.has(eid)) {
          capEvid.add(eid);
        }
      }
    }
  }
  finish("GOV-CAPABILITY", capFailures, capUnknowns, capEvid);

  // 4. GOV-MONITOR
  const mon = bundle["control-monitoring"];
  const verifiedMon = refsAvailable(mon);
  const monFailures: string[] = [];
  const monUnknowns: string[] = [];
  const monEvid = new Set<string>();
  const applicable = (mon.controls || []).filter((c: MonitoredControl) => c.applicable);

  if (
    !mon.scope_approved_by ||
    ["UNASSIGNED", "TBD", "UNKNOWN"].includes(mon.scope_approved_by.trim().toUpperCase()) ||
    mon.scope_approval_reference?.startsWith("synthetic:")
  ) {
    monUnknowns.push("Monitored control scope lacks verifiable human approval");
  }
  if (applicable.length < (policy.minimum_applicable_controls || 1)) {
    monFailures.push("No applicable monitored controls");
  }
  if (!applicable.some((c: MonitoredControl) => c.critical)) {
    monUnknowns.push("No critical controls selected/defined");
  }

  for (const c of applicable) {
    const cid = c.control_id;
    if (c.status === "ineffective") {
      monFailures.push(`${cid} control ineffective`);
    }
    if (new Date(c.next_due) < asOf) {
      monFailures.push(`${cid} monitoring overdue`);
    }
    if (c.status === "not-tested") {
      monUnknowns.push(`${cid} control not tested`);
    }
    const ev = (c.evidence_ids || []).filter((eid: string) => verifiedMon.has(eid));
    if (c.status === "effective" && ev.length === 0) {
      monUnknowns.push(`${cid} missing verified effectiveness proof`);
    }
    ev.forEach((eid: string) => monEvid.add(eid));
  }
  finish("GOV-MONITOR", monFailures, monUnknowns, monEvid);

  const overall = results.some((x) => x.status !== "pass") ? "BLOCK" : "REVIEW";

  return {
    schema_version: "1.1.0",
    project: Array.from(projects)[0],
    evaluated_at: new Date().toISOString(),
    overall,
    gates: results,
    blockers: Array.from(new Set(blockers)).sort(),
    limitations,
    approver: null,
  };
}

if (require.main === module) {
  const args = process.argv.slice(2);
  let kind: GovernanceKind = "risk-register";
  let targetFile = "";

  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--kind" && i + 1 < args.length) {
      kind = args[++i] as GovernanceKind;
    } else if (args[i] === "--file" && i + 1 < args.length) {
      targetFile = args[++i];
    }
  }

  if (!targetFile) {
    console.error("Usage: tsx scripts/validate-governance.ts --kind <kind> --file <path>");
    process.exit(1);
  }

  try {
    const data = loadJson<Record<string, unknown>>(targetFile);
    const issues = validateGovernance(kind, data);
    if (issues.length > 0) {
      console.error(`❌ Validation errors for ${targetFile}:`);
      for (const err of issues) {
        console.error("  -", err);
      }
      process.exit(1);
    }
    console.log(`✅ PASS: ${kind} governance record validated for ${targetFile}`);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("ERROR:", msg);
    process.exit(2);
  }
}
