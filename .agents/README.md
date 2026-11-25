# SUNDAWA AI ENGINEERING SKILLS PACK

**Version 1.1.0 — Governance & Compliance Edition** • Reviewed 23 November 2026 • **13 agent skills, COBIT 7 target / COBIT 2019 compatibility**

Repository-ready AI-assisted engineering review system: 12 existing engineering/QA/ISO skills plus `cobit-governance-auditor`, with risk register, approved RACI, internal process evidence-readiness review, continuous control monitoring, release gates and machine-readable contracts.

> **Scope notice:** Agent skills instruct reviews; **no analysis has been performed on Sundawa's live projects, code, ISMS, control operations or actual approval records.** The demonstration JSON is synthetic and intentionally blocked. ISO and COBIT licensing, scope, evidence quality, authorized audit and real human sign-off are separate obligations. This pack does **not** certify ISO or implement ISACA's official COBIT 7 assessment model.

## Getting started

Install Python 3.10+ and dependencies:

```bash
python -m pip install -r requirements.txt
python scripts/validate_pack.py
python -m unittest discover -s tests -v
```

Validate supplied **non-production examples**:

```bash
python scripts/validate_governance.py --kind risk-register --file examples/risk-register.example.json
python scripts/validate_governance.py --kind raci-matrix --file examples/raci-matrix.example.json
python scripts/validate_governance.py --kind capability-assessment --file examples/capability-assessment.example.json
python scripts/validate_governance.py --kind control-monitoring --file examples/control-monitoring.example.json
```

Run governance readiness evaluation:

```bash
python scripts/evaluate_governance.py \
  --risk examples/risk-register.example.json \
  --raci examples/raci-matrix.example.json \
  --assessment examples/capability-assessment.example.json \
  --monitoring examples/control-monitoring.example.json \
  --out reports/governance-demo.json
```

**Expected:** `BLOCK` and CLI exit code `1`. Reports are missing verified evidence and human approval. CLI `2` is used for `REVIEW`, which is **not** automatic authorization. Never interpret a successful JSON schema check as compliance.

Connect governance gates to existing technical release evidence:

```bash
python scripts/evaluate_gates.py --profile enterprise \
  --reports examples/audit-report.example.json \
  --risk examples/risk-register.example.json \
  --raci examples/raci-matrix.example.json \
  --assessment examples/capability-assessment.example.json \
  --monitoring examples/control-monitoring.example.json \
  --out reports/enterprise-demo.json
```

This also yields `BLOCK` (missing technical checks + governance evidence). For `prototype`, `web` and `api`, governance artifacts are optional; for **enterprise** and **regulated**, all four governance data inputs are mandatory to clear governance gates. The CLI never emits an approved `PASS`; all evidenced gates still require independent `REVIEW` and a separate authorized human approval process.

## Skills

| Domain | Skills |
|---|---|
| Product experience | `visual-antislop`, `ui-ux-auditor` |
| Business and systems | `requirements-validator`, `architecture-reviewer` |
| Engineering | `clean-code-auditor`, `database-auditor` |
| Testing | `bug-hunter`, `test-case-generator` |
| Security | `security-auditor`, `cicd-security-auditor` |
| Assurance | `iso27001-gap-auditor`, `audit-evidence-validator` |
| IT governance | **`cobit-governance-auditor`** |

Each skill has an independent `SKILL.md` and supporting `references/checklist.md`. `AGENTS.md` acts as a router. Agents must be configured separately to discover these skills; having a folder does not run tests by itself.

## Repository structure

```text
sundawa-ai-engineering-skills-pack/
├── AGENTS.md                         # agent routing
├── skills/
│   ├── index.json                    # 13 registered skills
│   └── <each-skill>/
│       ├── SKILL.md
│       └── references/checklist.md
├── governance/
│   ├── GOVERNANCE-OPERATING-MODEL.md
│   ├── CAPABILITY-ASSESSMENT.md
│   ├── RISK-METHODOLOGY.md
│   ├── RACI.md
│   ├── CONTINUOUS-COMPLIANCE.md
│   ├── IMPLEMENTATION-ROADMAP.md
│   ├── cobit/cobit2019-crosswalk.json
│   └── ...existing engineering operating guides
├── config/
│   ├── governance-policy.json
│   └── quality-gates.json
├── schemas/
│   ├── audit-report.schema.json
│   ├── test-cases.schema.json
│   ├── iso-control-assessment.schema.json
│   ├── gate-decision.schema.json
│   ├── risk-register.schema.json
│   ├── raci-matrix.schema.json
│   ├── capability-assessment.schema.json
│   ├── control-monitoring.schema.json
│   └── governance-gate-results.schema.json
├── examples/                          # synthetic, never real audit evidence
├── scripts/
│   ├── validate_pack.py
│   ├── validate_artifact.py
│   ├── validate_governance.py
│   ├── evaluate_governance.py
│   └── evaluate_gates.py
├── tests/
├── standards/registry.json
└── .github/workflows/validate-skills.yml
```

## COBIT rollout principles

- **Target:** ISACA COBIT 7, officially released 19 November 2026. It has updated objectives, organization-role guidance, expanded AI scenarios, new design factors and an enhanced assessment model. See [ISACA official release](https://www.isaca.org/about-us/newsroom/press-releases/2026/isaca-launches-updated-cobit-7-with-enhanced-assessment-model-and-modern-digital-platform).
- **Compatibility:** 17 selectively relevant **COBIT 2019** governance/management objectives are mapped to the 13 skills. All COBIT 7 objective equivalences are explicitly `not-verified`. Consult [crosswalk](governance/cobit/cobit2019-crosswalk.json).
- **Assessments:** the included `capability-assessment` is **Sundawa internal evidence-readiness**, not ISACA's official COBIT 7 performance/capability scoring. Formal assessments require the correct ISACA materials and human practitioners.
- **Controls:** use licensed ISO editions and current OWASP/NIST references as applicable, not as an inferred compliance badge. ISMS and certification require their actual scope, statements of applicability and independent audit as appropriate.
- **Commercial licensing:** read [ISACA's COBIT licensing and access](https://www.isaca.org/resources/cobit) before selling COBIT-branded consulting/assessment services or embedding protected ISACA content in commercial deliverables.

## Governance quality gates

`GOV-RISK`, `GOV-RACI`, `GOV-CAPABILITY`, `GOV-MONITOR` are **Sundawa internal gates**. They evaluate documented risks, accountabilities, process-check coverage and time-bound control tests; not official COBIT objectives or certification assessments. Any missing mandatory governance record -> gate `not-tested`, overall release `BLOCK`; failed and overdue critical checks also block. Even four passing gates only produce `REVIEW` and need human authorization.

## How to adapt for a real project

1. Select risk profile and applicable requirements with an authorized executive sponsor.
2. Approve governance scope, decision rights, risk appetite and evidence retention/classification.
3. Copy example JSON into private project repository, **replace every synthetic datum** and make evidence references point to access-controlled records with independent checks.
4. Review goal/objective selection against actual COBIT 7 licensed publications; verify 2019 compatibility mapping before claiming equivalence.
5. Run specialized skills on actual work products; use source commit/build/environment IDs.
6. Validate JSON and evaluate gates, investigate discrepancies, capture corrective actions.
7. Obtain independent review, documented exception approvals and final authorized release decision outside these scripts.

## Security and licensing

Do not store PII, customer secrets, exploit details or raw restricted audit evidence in this example repository. Validate URLs/hashes and access in the enterprise evidence vault. The source code and brief framework metadata here are original internal work; no licensed ISO normative text or proprietary COBIT activities are reproduced. See [LICENSE-NOTICE.md](LICENSE-NOTICE.md).
