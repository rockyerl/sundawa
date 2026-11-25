import fs from "fs";
import path from "path";
import {
  evaluateGovernanceBundle,
  GovernanceBundle,
  GovernanceGateItem,
  loadJson,
} from "./validate-governance";

const ROOT = path.resolve(__dirname, "../.agents");

export interface GateResult {
  id: string;
  status: "pass" | "fail" | "not-tested" | "waived" | "not-applicable";
  evidence_ids: string[];
  reason: string;
}

export interface GateResultEntry {
  gate_id: string;
  status: "pass" | "fail" | "not-tested" | "waived" | "not-applicable";
  rationale?: string;
  evidence_ids?: string[];
}

export interface AuditReportDoc {
  schema_version: string;
  run_id: string;
  skill: string;
  scope?: {
    project?: string;
    target?: string;
    commit?: string;
    environment?: string;
  };
  findings?: Array<{
    id: string;
    severity: string;
    status: string;
    acceptance?: {
      expires_at?: string;
    };
  }>;
  limitations?: string[];
  gate_results?: GateResultEntry[];
}

export interface GateDecision {
  schema_version: "1.0.0";
  profile: string;
  project: string;
  reviewed_at: string;
  overall: "PASS" | "REVIEW" | "BLOCK";
  gates: GateResult[];
  blocking_findings: string[];
  limitations: string[];
  approver: string | null;
}

export function evaluateGates(
  profile: string,
  reportPaths: string[],
  governanceBundle?: GovernanceBundle
): GateDecision {
  const policyFile = path.join(ROOT, "config/quality-gates.json");
  const policy = JSON.parse(fs.readFileSync(policyFile, "utf-8"));

  if (!policy.profiles[profile]) {
    throw new Error(
      `Unknown profile: ${profile}. Available: ${Object.keys(policy.profiles).join(", ")}`
    );
  }

  if (reportPaths.length === 0) {
    throw new Error("At least one report is required");
  }

  const docs: AuditReportDoc[] = reportPaths.map((p) => {
    const content = fs.readFileSync(p, "utf-8");
    return JSON.parse(content) as AuditReportDoc;
  });

  const projects = new Set(docs.map((d) => d.scope?.project));
  if (projects.size > 1) {
    throw new Error("Cannot combine audit reports from different projects");
  }

  const govResult = governanceBundle ? evaluateGovernanceBundle(governanceBundle) : null;
  if (govResult && !projects.has(govResult.project)) {
    throw new Error("Governance assessment project does not match technical audit reports");
  }

  const profileConfig = policy.profiles[profile];
  const requiredGates: string[] = profileConfig.required_gates;
  const blockingSeverities = new Set<string>(profileConfig.blocking_severities);

  const hits: Record<string, GateResultEntry[]> = {};
  for (const g of requiredGates) {
    hits[g] = [];
  }

  const blockers: string[] = [];
  let limitations: string[] = [];

  for (const doc of docs) {
    if (Array.isArray(doc.limitations)) {
      limitations = limitations.concat(doc.limitations);
    }

    if (Array.isArray(doc.findings)) {
      for (const f of doc.findings) {
        if (
          blockingSeverities.has(f.severity) &&
          (f.status === "confirmed" || f.status === "suspected")
        ) {
          blockers.push(f.id);
        }
        if (f.status === "risk-accepted") {
          const exp = f.acceptance?.expires_at;
          if (!exp || new Date(exp) <= new Date()) {
            blockers.push(`${f.id} (acceptance expired)`);
          }
        }
      }
    }

    if (Array.isArray(doc.gate_results)) {
      for (const g of doc.gate_results) {
        if (hits[g.gate_id] && !g.gate_id.startsWith("GOV-")) {
          hits[g.gate_id].push(g);
        }
      }
    }
  }

  if (govResult) {
    limitations = limitations.concat(govResult.limitations || []);
  }

  const byGov: Record<string, GovernanceGateItem> = {};
  if (govResult?.gates) {
    for (const g of govResult.gates) {
      byGov[g.id] = g;
    }
  }

  const gates: GateResult[] = [];
  for (const key of requiredGates) {
    const entries = hits[key];
    let status: GateResult["status"] = "not-tested";
    let reason = "";
    let evid: string[] = [];

    if (key.startsWith("GOV-") && byGov[key]) {
      const g = byGov[key];
      status = g.status;
      reason = g.reason;
      evid = g.evidence_ids || [];
    } else if (key.startsWith("GOV-")) {
      status = "not-tested";
      reason = "Four required governance records not supplied";
      evid = [];
    } else if (!entries || entries.length === 0) {
      status = "not-tested";
      reason = "No audit report provides this mandatory gate.";
      evid = [];
    } else if (entries.some((g) => g.status === "fail")) {
      status = "fail";
      reason = "At least one report failed this gate.";
      const set = new Set<string>();
      entries.forEach((g) => (g.evidence_ids || []).forEach((e: string) => set.add(e)));
      evid = Array.from(set).sort();
    } else if (entries.some((g) => g.status !== "pass")) {
      status = "not-tested";
      reason =
        "One or more assessments unverified, waived or not applicable: human assessment required.";
      const set = new Set<string>();
      entries.forEach((g) => (g.evidence_ids || []).forEach((e: string) => set.add(e)));
      evid = Array.from(set).sort();
    } else {
      status = "pass";
      reason =
        "All supplied reports claiming this gate report pass with evidence IDs; verify provenance independently.";
      const set = new Set<string>();
      entries.forEach((g) => (g.evidence_ids || []).forEach((e: string) => set.add(e)));
      evid = Array.from(set).sort();
    }

    gates.push({ id: key, status, evidence_ids: evid, reason });
  }

  const hardBlock =
    blockers.length > 0 || gates.some((g) => g.status === "not-tested" || g.status === "fail");
  const overall = hardBlock ? "BLOCK" : "REVIEW";

  if (!hardBlock) {
    limitations.push(
      "All provided technical gates passed; awaiting independent evidence review and human release sign-off."
    );
  }

  const projectCode = docs[0]?.scope?.project || "unknown";

  return {
    schema_version: "1.0.0",
    profile,
    project: projectCode,
    reviewed_at: new Date().toISOString(),
    overall,
    gates,
    blocking_findings: Array.from(new Set(blockers)).sort(),
    limitations,
    approver: null,
  };
}

if (require.main === module) {
  const args = process.argv.slice(2);
  let profile = "web";
  const reportPaths: string[] = [];
  let riskPath = "";
  let raciPath = "";
  let assessmentPath = "";
  let monitoringPath = "";
  let outPath = "";

  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--profile" && i + 1 < args.length) {
      profile = args[++i];
    } else if (args[i] === "--out" && i + 1 < args.length) {
      outPath = args[++i];
    } else if (args[i] === "--risk" && i + 1 < args.length) {
      riskPath = args[++i];
    } else if (args[i] === "--raci" && i + 1 < args.length) {
      raciPath = args[++i];
    } else if (args[i] === "--assessment" && i + 1 < args.length) {
      assessmentPath = args[++i];
    } else if (args[i] === "--monitoring" && i + 1 < args.length) {
      monitoringPath = args[++i];
    } else if (args[i] === "--reports") {
      while (i + 1 < args.length && !args[i + 1].startsWith("--")) {
        reportPaths.push(args[++i]);
      }
    }
  }

  if (reportPaths.length === 0) {
    console.error(
      "Usage: tsx scripts/evaluate-gates.ts --profile <profile> --reports <file1.json>... [--risk <file>] [--raci <file>] [--assessment <file>] [--monitoring <file>] [--out <output.json>]"
    );
    process.exit(1);
  }

  try {
    let govBundle: GovernanceBundle | undefined = undefined;
    if (riskPath && raciPath && assessmentPath && monitoringPath) {
      govBundle = {
        "risk-register": loadJson(riskPath),
        "raci-matrix": loadJson(raciPath),
        "capability-assessment": loadJson(assessmentPath),
        "control-monitoring": loadJson(monitoringPath),
      };
    }

    const decision = evaluateGates(profile, reportPaths, govBundle);
    const jsonStr = JSON.stringify(decision, null, 2);
    if (outPath) {
      fs.mkdirSync(path.dirname(path.resolve(outPath)), { recursive: true });
      fs.writeFileSync(outPath, jsonStr, "utf-8");
      console.log(
        `${decision.overall}: Wrote ${outPath} | ${decision.blocking_findings.length} blocking findings | human approval required`
      );
    } else {
      console.log(jsonStr);
    }
    process.exit(decision.overall === "BLOCK" ? 1 : decision.overall === "REVIEW" ? 2 : 0);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("ERROR:", msg);
    process.exit(2);
  }
}
