# Decision-rights / RACI governance

Each decision has **exactly one Accountable** role, at least one Responsible role, zero or more Consulted/Informed roles, and (for sensitive approvals) an Independent Reviewer distinct from Accountable/Responsible.

Required critical activities: `GOV-STRATEGY`, `RISK-ACCEPTANCE`, `SECURITY-EXCEPTION`, `ARCH-APPROVAL`, `RELEASE-APPROVAL`, `CONTROL-ATTEST`, `AUDIT-REVIEW`, `INCIDENT-ESCALATION`. Policy lives in `config/governance-policy.json`; organization should add roles/activities for its needs. Matrix examples are role placeholders, **not actual approvals**.

The matrix requires a management approval reference; `UNASSIGNED`, `synthetic://` and missing verifiable evidence prevent pass. For risk acceptance and release approval, the reviewer role must be independent. The CEO/board may delegate decision-making in writing; capture actual named appointees in the project's signed record, not just role labels.
