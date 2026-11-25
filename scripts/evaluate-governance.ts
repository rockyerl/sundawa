import fs from "fs";
import path from "path";
import {
  evaluateGovernanceBundle,
  validateGovernance,
  loadJson,
  GovernanceBundle,
  RiskRegisterDoc,
  RaciMatrixDoc,
  CapabilityAssessmentDoc,
  ControlMonitoringDoc,
} from "./validate-governance";

if (require.main === module) {
  const args = process.argv.slice(2);
  let riskPath = "";
  let raciPath = "";
  let assessmentPath = "";
  let monitoringPath = "";
  let outPath = "";

  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--risk" && i + 1 < args.length) {
      riskPath = args[++i];
    } else if (args[i] === "--raci" && i + 1 < args.length) {
      raciPath = args[++i];
    } else if (args[i] === "--assessment" && i + 1 < args.length) {
      assessmentPath = args[++i];
    } else if (args[i] === "--monitoring" && i + 1 < args.length) {
      monitoringPath = args[++i];
    } else if (args[i] === "--out" && i + 1 < args.length) {
      outPath = args[++i];
    }
  }

  if (!riskPath || !raciPath || !assessmentPath || !monitoringPath) {
    const defaultRisk = path.resolve("reports/risk-register.json");
    const defaultRaci = path.resolve("reports/raci-matrix.json");
    const defaultAssessment = path.resolve("reports/capability-assessment.json");
    const defaultMonitoring = path.resolve("reports/control-monitoring.json");

    if (
      fs.existsSync(defaultRisk) &&
      fs.existsSync(defaultRaci) &&
      fs.existsSync(defaultAssessment) &&
      fs.existsSync(defaultMonitoring)
    ) {
      riskPath = defaultRisk;
      raciPath = defaultRaci;
      assessmentPath = defaultAssessment;
      monitoringPath = defaultMonitoring;
      if (!outPath) {
        outPath = path.resolve("reports/governance-gate-results.json");
      }
    } else {
      console.error(
        "Usage: tsx scripts/evaluate-governance.ts --risk <file> --raci <file> --assessment <file> --monitoring <file> [--out <output>]"
      );
      process.exit(1);
    }
  }

  try {
    const bundle: GovernanceBundle = {
      "risk-register": loadJson<RiskRegisterDoc>(riskPath),
      "raci-matrix": loadJson<RaciMatrixDoc>(raciPath),
      "capability-assessment": loadJson<CapabilityAssessmentDoc>(assessmentPath),
      "control-monitoring": loadJson<ControlMonitoringDoc>(monitoringPath),
    };

    const report = evaluateGovernanceBundle(bundle);
    const issues = validateGovernance(
      "governance-gate-results",
      report as unknown as Record<string, unknown>
    );
    if (issues.length > 0) {
      throw new Error("Invalid generated result: " + issues.join("; "));
    }

    const jsonStr = JSON.stringify(report, null, 2);
    if (outPath) {
      fs.mkdirSync(path.dirname(path.resolve(outPath)), { recursive: true });
      fs.writeFileSync(outPath, jsonStr, "utf-8");
      console.log(
        `${report.overall}: Wrote ${outPath} | ${report.blockers.length} blocking items | human review needed`
      );
    } else {
      console.log(jsonStr);
    }

    process.exit(report.overall === "BLOCK" ? 1 : 2);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("ERROR:", msg);
    process.exit(2);
  }
}
