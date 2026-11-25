# Risk methodology (SUNDAWA internal — not ISO/COBIT prescribed scoring)

## Scoring

Assign **likelihood 1–5** and **impact 1–5** through documented project interviews/evidence. `inherent_score = likelihood × impact` (range 1–25). `risk_appetite.high_threshold` defaults to 15, but must be formally approved in the project. High untreated risks block enterprise/regulated governance gate.

Example bands for internal triage only: 1–4 low, 5–9 moderate, 10–14 elevated, 15–25 high. Adjust by business context; regulatory/contractual red lines can override numerical scores.

## Treatment and acceptance

- Every risk has a named owner, planned treatment and due date.
- `mitigated` or `closed` requires verification evidence, reviewer and validated control effectiveness; one scanner finding is insufficient.
- `accepted` requires dated human authority, approval reference, reason, approved role, unexpired expiry and verified evidence of authorization. An expired approval returns `fail`.
- For high risk, `open` or `in-treatment` blocks the governance gate regardless of due date.
- Recalculate residual likelihood/impact only when supported by implementation verification. An owner must accept residual risk; no agent can do so.
- A documented control failure can remain a risk even below score threshold.

## Sampling and escalation

Review at kickoff, before enterprise/regulated release, quarterly and on material changes/incidents. Record exceptions, owners and remediation tickets. Evidence filenames/links stay in restricted vault when confidential.
