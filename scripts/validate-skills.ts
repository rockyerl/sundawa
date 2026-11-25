import fs from "fs";
import path from "path";
import { validateArtifact, ArtifactKind } from "./validate-artifact";
import { validateGovernance, GovernanceKind, loadJson } from "./validate-governance";

const ROOT = path.resolve(__dirname, "../.agents");
const REQ_HEADERS = [
  "## 1. Trigger",
  "## 2. Prasyarat",
  "## 3. Standar",
  "## 4. Workflow",
  "## 5. Detailed",
  "## 6. Quality",
  "## 7. Output",
  "## 8. Validation",
  "## 9. Safety",
  "## 10. Handoff",
  "## 11. Local",
];
const PATH_RE = /\]\(([^)]+)\)/g;
const NAME_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function validateSkillsPack(): string[] {
  const errors: string[] = [];

  const registryFile = path.join(ROOT, "standards/registry.json");
  const indexFile = path.join(ROOT, "skills/index.json");

  if (!fs.existsSync(registryFile)) {
    return [`Missing registry file: ${registryFile}`];
  }
  if (!fs.existsSync(indexFile)) {
    return [`Missing index file: ${indexFile}`];
  }

  const regData = JSON.parse(fs.readFileSync(registryFile, "utf-8"));
  const regStandards = (regData.standards || {}) as Record<string, unknown>;

  const indexData = JSON.parse(fs.readFileSync(indexFile, "utf-8"));
  const indexSkills = (indexData.skills || []) as Array<{
    name: string;
    path: string;
    standards?: string[];
  }>;

  const skillsDir = path.join(ROOT, "skills");
  const entries = fs.readdirSync(skillsDir, { withFileTypes: true });
  const actualSkillDirs = entries
    .filter((d) => d.isDirectory())
    .map((d) => path.join(skillsDir, d.name, "SKILL.md"))
    .filter((p) => fs.existsSync(p));

  const declared = new Set(indexSkills.map((s) => s.name));
  if (declared.size !== 13) {
    errors.push(`v1.1 must register 13 skills, found ${declared.size}`);
  }
  if (actualSkillDirs.length !== declared.size) {
    errors.push(`Expected ${declared.size} SKILL.md, found ${actualSkillDirs.length}`);
  }
  if (declared.size !== indexSkills.length) {
    errors.push("Duplicate names in skills/index.json");
  }

  for (const skillPath of actualSkillDirs) {
    const skillDir = path.dirname(skillPath);
    const name = path.basename(skillDir);
    const content = fs.readFileSync(skillPath, "utf-8");

    if (!content.startsWith("---\n") || !content.includes("\n---\n")) {
      errors.push(`${skillPath}: bad frontmatter`);
      continue;
    }

    const parts = content.slice(4).split("\n---\n");
    const front = parts[0];
    const body = parts.slice(1).join("\n---\n");

    const nameMatch = front.match(/^name:\s*(.+)$/m);
    const descMatch = front.match(/^description:\s*(?:>-\s*)?\n?([\s\S]+)$/m);

    const parsedName = nameMatch ? nameMatch[1].trim() : "";
    let parsedDesc = descMatch ? descMatch[1].trim() : "";
    parsedDesc = parsedDesc.replace(/\s+/g, " ");

    if (!parsedName || parsedName !== name || !NAME_RE.test(name) || name.length > 64) {
      errors.push(`${skillPath}: name invalid or does not match directory`);
    }

    if (!parsedDesc || parsedDesc.length < 20 || parsedDesc.length > 1024) {
      errors.push(`${skillPath}: description length invalid (${parsedDesc.length})`);
    }

    if (!declared.has(name)) {
      errors.push(`${skillPath}: missing from skills/index.json`);
    }

    for (const h of REQ_HEADERS) {
      if (!body.includes(h)) {
        errors.push(`${skillPath}: missing header '${h}'`);
      }
    }

    let match: RegExpExecArray | null;
    const pathRegex = new RegExp(PATH_RE);
    while ((match = pathRegex.exec(body)) !== null) {
      const link = match[1];
      if (
        link.startsWith("http:") ||
        link.startsWith("https:") ||
        link.startsWith("#") ||
        link.startsWith("mailto:")
      ) {
        continue;
      }
      const target = path.resolve(skillDir, link);
      if (!fs.existsSync(target)) {
        errors.push(`${skillPath}: missing linked file '${link}' -> '${target}'`);
      }
    }

    const checklistPath = path.join(skillDir, "references/checklist.md");
    if (!fs.existsSync(checklistPath)) {
      errors.push(`${skillPath}: missing checklist.md at ${checklistPath}`);
    }

    const indexEntry = indexSkills.find((s) => s.name === name);
    if (indexEntry && Array.isArray(indexEntry.standards)) {
      for (const stdKey of indexEntry.standards) {
        if (!regStandards[stdKey]) {
          errors.push(`${skillPath}: unknown standard '${stdKey}'`);
        }
        if (!body.includes(`**${stdKey}**`)) {
          errors.push(`${skillPath}: missing standard section for '**${stdKey}**'`);
        }
      }
    }
  }

  for (const entry of indexSkills) {
    const entryPath = path.join(ROOT, entry.path);
    if (!fs.existsSync(entryPath)) {
      errors.push(`index.json missing path: ${entry.path}`);
    }
  }

  const schemasDir = path.join(ROOT, "schemas");
  if (fs.existsSync(schemasDir)) {
    const schemaFiles = fs.readdirSync(schemasDir).filter((f) => f.endsWith(".schema.json"));
    for (const sf of schemaFiles) {
      try {
        JSON.parse(fs.readFileSync(path.join(schemasDir, sf), "utf-8"));
      } catch (err: unknown) {
        errors.push(`Invalid JSON schema in ${sf}: ${err}`);
      }
    }
  }

  const gatesFile = path.join(ROOT, "config/quality-gates.json");
  if (fs.existsSync(gatesFile)) {
    try {
      JSON.parse(fs.readFileSync(gatesFile, "utf-8"));
    } catch (err: unknown) {
      errors.push(`Malformed quality-gates.json: ${err}`);
    }
  }

  // Governance registry & crosswalk validation
  try {
    const crosswalkPath = path.join(ROOT, "governance/cobit/cobit2019-crosswalk.json");
    if (fs.existsSync(crosswalkPath)) {
      const mapping = loadJson<{
        objectives?: Array<{
          cobit2019_id: string;
          cobit7_equivalence: string;
          cobit7_objective_id: string | null;
          skills?: string[];
        }>;
      }>(crosswalkPath);
      const objectives = mapping.objectives || [];
      const ids = objectives.map((x) => x.cobit2019_id);
      if (ids.length !== new Set(ids).size) {
        errors.push("Duplicate COBIT 2019 crosswalk objective");
      }
      for (const x of objectives) {
        if (x.cobit7_equivalence !== "not-verified" || x.cobit7_objective_id !== null) {
          errors.push("COBIT 7 equivalence must remain unverified unless formally reviewed");
        }
        for (const sname of x.skills || []) {
          if (!declared.has(sname)) {
            errors.push(`Unknown mapped skill: ${sname}`);
          }
        }
      }
    }

    const gpFile = path.join(ROOT, "config/governance-policy.json");
    if (fs.existsSync(gpFile) && fs.existsSync(gatesFile)) {
      const gp = loadJson<{
        governance_required_profiles?: string[];
        required_governance_gates?: string[];
      }>(gpFile);
      const qg = loadJson<{
        profiles?: Record<string, { required_gates?: string[] }>;
      }>(gatesFile);
      for (const profile of gp.governance_required_profiles || []) {
        const requiredGates = new Set(qg.profiles?.[profile]?.required_gates || []);
        for (const reqGovGate of gp.required_governance_gates || []) {
          if (!requiredGates.has(reqGovGate)) {
            errors.push(`Missing governance gate '${reqGovGate}' in profile '${profile}'`);
          }
        }
      }
    }
  } catch (exc: unknown) {
    const msg = exc instanceof Error ? exc.message : String(exc);
    errors.push(`Governance registry invalid: ${msg}`);
  }

  // Validate technical examples
  const exampleTests: Array<[ArtifactKind, string]> = [
    ["audit-report", ".agents/examples/audit-report.example.json"],
    ["test-cases", ".agents/examples/test-cases.example.json"],
    ["iso-control-assessment", ".agents/examples/iso-control-assessment.example.json"],
  ];
  for (const [kind, relPath] of exampleTests) {
    const fullPath = path.resolve(__dirname, "..", relPath);
    if (fs.existsSync(fullPath)) {
      try {
        const json: unknown = JSON.parse(fs.readFileSync(fullPath, "utf-8"));
        const artIssues = validateArtifact(kind, json);
        artIssues.forEach((i) => errors.push(`${relPath}: ${i}`));
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : String(e);
        errors.push(`${relPath}: parse error: ${msg}`);
      }
    }
  }

  // Validate governance examples
  const govExampleTests: Array<[GovernanceKind, string]> = [
    ["risk-register", ".agents/examples/risk-register.example.json"],
    ["raci-matrix", ".agents/examples/raci-matrix.example.json"],
    ["capability-assessment", ".agents/examples/capability-assessment.example.json"],
    ["control-monitoring", ".agents/examples/control-monitoring.example.json"],
    ["governance-gate-results", ".agents/examples/governance-gate-results.example.json"],
  ];
  for (const [kind, relPath] of govExampleTests) {
    const fullPath = path.resolve(__dirname, "..", relPath);
    if (fs.existsSync(fullPath)) {
      try {
        const json = loadJson<Record<string, unknown>>(fullPath);
        const govIssues = validateGovernance(kind, json);
        govIssues.forEach((i) => errors.push(`${relPath}: ${i}`));
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : String(e);
        errors.push(`${relPath}: parse error: ${msg}`);
      }
    }
  }

  // Validate active reports if present
  const reportsDir = path.resolve(__dirname, "../reports");
  if (fs.existsSync(reportsDir)) {
    const reportFiles = fs.readdirSync(reportsDir).filter((f) => f.endsWith(".json"));
    for (const rf of reportFiles) {
      const fullPath = path.join(reportsDir, rf);
      try {
        const json: unknown = JSON.parse(fs.readFileSync(fullPath, "utf-8"));
        if (
          rf.includes("risk-register") ||
          rf.includes("raci-matrix") ||
          rf.includes("capability-assessment") ||
          rf.includes("control-monitoring") ||
          rf.includes("governance-gate-results")
        ) {
          const gKind = rf.replace(".json", "") as GovernanceKind;
          const gIssues = validateGovernance(gKind, json as Record<string, unknown>);
          gIssues.forEach((i) => errors.push(`reports/${rf}: ${i}`));
        } else {
          const kind: ArtifactKind = rf.includes("gate-decision")
            ? "gate-decision"
            : rf.includes("test-cases")
              ? "test-cases"
              : "audit-report";
          const artIssues = validateArtifact(kind, json);
          artIssues.forEach((i) => errors.push(`reports/${rf}: ${i}`));
        }
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : String(e);
        errors.push(`reports/${rf}: parse error: ${msg}`);
      }
    }
  }

  return errors;
}

if (require.main === module) {
  const issues = validateSkillsPack();
  if (issues.length > 0) {
    console.error("❌ Skills Pack Validation Failed:");
    for (const err of issues) {
      console.error("  -", err);
    }
    process.exit(1);
  }
  console.log(
    "✅ PASS: 13 skills, references, index, governance crosswalk, schemas, examples, and active reports validated successfully."
  );
}
