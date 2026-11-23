# Sundawa Engineering Standard — Governance Operating Model v1.1

## Statement of purpose

COBIT 7 is the **directional governance framework** as of its ISACA release on 2026-11-19. COBIT 2019 is a *compatibility index* for customers who scope existing objectives. ISO/OWASP remain technical/security/management-system references; quality gates are **Sundawa internal policy**, not COBIT formal assessment.

## Governance responsibilities

- **Governing body / executive sponsor**: directs value/risk appetite, approves priority objectives, risk exceptions and compliance reporting; may delegate authority in writing.
- **Governance lead**: maintains design decisions, scope, mapping status, RACI and oversight cadence.
- **Management owners**: CTO, Delivery, QA, Security, BA/PO and operations execute controls and remediation.
- **Independent reviewer**: reviews evidence and conflicts of interest, cannot self-approve controlled change/release.
- **Audit function**: independently validates assurance scope and evidence; AI does not impersonate an independent auditor.

## Governance lifecycle

1. Establish business needs, stakeholder expectations, risk appetite, obligations and decision rights.
2. Record design-factor inputs: organization context, health, AI/cloud practices, data strategy, threat environment, sourcing and technologies. **Do not infer ISACA quantitative design recommendations**.
3. Select *relevant* governance objectives with a documented rationale (COBIT 7 official material needed for detailed criteria). Record 2019 IDs only for historical compatibility.
4. Approve policies, responsibilities, workflows and supporting controls; assign owner and evidence source.
5. Execute engineering skills for BA/UX/architecture/QA/security/DevOps and produce scoped test evidence.
6. Review risk register, control effectiveness, internal readiness and deviations; maintain issue/retest links.
7. Evaluate mandatory technical and governance gates (enterprise/regulated require all four governance inputs).
8. Escalate deficiencies to leadership and independent reviewers. No automatic certification or production release decision.

## Required records, provenance, retention

- Project/scope ID, owners, assessment window, target commit/build, business objective IDs.
- Risk register with inherent 1–5 likelihood and impact (Sundawa-defined) and documented treatment.
- Signed RACI with one Accountable for each critical decision and independent reviewer.
- Process readiness assessment, detailed check method, limitations and evidence references.
- Continuous control monitoring with check cadence, evidence and remediation ticket.
- Evidence vault metadata URI/owner/date/hash if feasible. Store sensitive evidence in access-controlled systems, not in this repo.

## Independent review and segregation

Critical or high risk acceptance must be authorized by approved risk authority, timestamped and have expiry. Release review is not the same as change author; no AI agent signs off its own work. Exception approval does not imply ISO or COBIT conformance.

## Program performance (internal indicators, not COBIT official ratings)

Track: percent in-scope objectives with verified evidence; percent applicable controls checked on time; overdue remediation; untreated high risk count; exceptions approaching expiry; gate failure reasons; reviewer cycle time. Always show numerator/denominator and assessment date.

## Work products and gate wiring

`risk-register`, `raci-matrix`, `capability-assessment`, `control-monitoring` pass dedicated JSON Schema and semantic checks. `scripts/evaluate_governance.py` emits four evidence-backed gate candidates. `scripts/evaluate_gates.py` combines candidate gates with technical audit reports; its maximum is `REVIEW`, pending human sign-off. The demo examples intentionally yield `BLOCK`.

## Limitations / source rules

ISACA says COBIT 7 revised objectives, role-based structures, new design factors and an updated assessment module with tools available under differing access tiers. The crosswalk in this repository is **not** licensed or validated against detailed COBIT 7 objectives; never claim exact equivalence or output a proprietary scoring method. Purchase/license official detailed guidance where necessary. Avoid copying protected normative ISO and ISACA content.

Primary sources: https://www.isaca.org/about-us/newsroom/press-releases/2026/isaca-launches-updated-cobit-7-with-enhanced-assessment-model-and-modern-digital-platform and https://www.isaca.org/resources/cobit
