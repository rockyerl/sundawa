# Integrasi dengan workflow delivery Sundawa

## Stage-to-skill mapping

| Stage | Primary | Secondary | Exit artifact |
|---|---|---|---|
| Discovery/BA/SA | requirements-validator | architecture-reviewer | RTM + approved baseline |
| Design/prototype | visual-antislop | ui-ux-auditor | UX/Accessibility findings |
| Technical design | architecture-reviewer | database-auditor, security-auditor | ADR + risks + NFR validation plan |
| Implementation/PR | clean-code-auditor | security-auditor | Code review evidence |
| QA/release test | test-case-generator | bug-hunter | Test cases + results + regression |
| Deployment/release | cicd-security-auditor | audit-evidence-validator | Gate decision + sign-off |
| ISMS readiness | iso27001-gap-auditor | audit-evidence-validator | Gap assessment + control evidence |

## Recommended gate selection

Select project profile at kickoff: `prototype`, `web`, `api`, `enterprise`, `regulated`. Add mandatory gates for data-classification/regulatory/contract risks; do not override accepted policy without risk-owner approval.

## Operational pattern

1. Start each work item with `requirement_id`, `owner`, `risk`, `deadline`, and `acceptance_criteria`.
2. Agent writes report JSON in `reports/` backed by source evidence in your organization vault.
3. A separate reviewer and automated schema validator run before PR merge.
4. Execute `evaluate_gates.py` with **multiple** reports containing all required gate IDs. A report-only scan never passes release readiness automatically.
5. A human with delegated authority makes the final release decision in your change management system; this evaluator intentionally never sets approver.

## Recommended evidence naming

`project/build-or-commit/skill/run-id/evidence-id`, with restricted permissions for client assets. For DB/QA/security findings reference sanitized test data and reproducible commands rather than raw credentials.
