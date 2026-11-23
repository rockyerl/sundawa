# Adoption roadmap — Sundawa Engineering Standard v1.1

## Phase 1 — Policy and scope (Weeks 1–2)

Assign executive sponsor, governance lead and delegated approvers; select relevant COBIT 7 themes via official ISACA material. Determine applicable ISO/OWASP standards, contract controls, risk appetite, operational risk profile and business priorities. Validate provisional COBIT 2019 IDs with the historical client baseline. **Exit:** approved charter/scope, risk methodology, initial crosswalk.

## Phase 2 — Roles and evidence (Weeks 3–4)

Complete signed RACI, risk register and evidence repository ACLs. Set objective-specific process checks and control monitoring frequency with accountable owners. Record scope approvals and exception procedure. **Exit:** no unassigned critical decision, signed risk/monitoring owners.

## Phase 3 — Integrate into engineering workflow (Weeks 5–6)

Route skill outputs to documented requirements/ADRs/test suites/security reviews. CI runs JSON/schema lint on PR, emits non-authoritative candidate gates, and blocks on missing high-risk evidence. Keep actual restricted data in enterprise systems. **Exit:** sample PR/QA/release demonstrates traceability and no fabricated successful audit.

## Phase 4 — Independent review and calibration (Weeks 7–8)

Run controls against a real authorized project, compare AI findings to human review, measure false positives/negatives, test expired risk exceptions and overdue monitoring, revise gates and audit log. Confirm license/access for COBIT 7 detailed assessments and get approval for specific deployment procedures. **Exit:** approved governance SOPs, evidence retention plan, periodic review schedule.

## Ongoing cadence

Per PR/release: engineering gates and change approvals; monthly: operational control evidence; quarterly: mapping/standards review and risk exception expiry; after material incident/change: immediate re-assessment. Dates/cadences remain configurable based on project criticality. Do not treat this example calendar as a universally applicable regulatory requirement.
