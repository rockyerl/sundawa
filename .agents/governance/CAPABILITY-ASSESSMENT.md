# Process readiness and capability assessment policy

**Two different concepts must not be conflated:**

1. **Sundawa internal evidence readiness** (automated here): checks whether relevant processes have reviewers, explicit checks, referenced verified evidence and closure of gaps. The output is qualitative (`evidenced`, `gap`, `not-assessed`, `not-applicable`), never official COBIT level.
2. **ISACA COBIT performance/capability assessment**: requires an authorized official COBIT edition, assessment model, suitable assessors, defined unit/scope, evidence and validation. COBIT 2019’s process capability scale must **not** be relabeled as COBIT 7. The COBIT 7 package launched November 2026 with a new assessment module and three assessment tiers; those tiers are NOT implemented or simulated by this pack.

## Procedure

Define scope + selected objectives with COBIT 7 guidance; if only 2019 IDs exist use the compatibility crosswalk with `not-verified` objective equivalence. Obtain process description, control/test activity, observed instance, performer, time and evidence. Interview owners; corroborate with independent artifacts. Mark `evidenced` only for executed checks with verified evidence, `gap` for observed deficiency, `not-assessed` for missing assessment, and `not-applicable` only when justified. Human reviewer resolves inconsistent results. Issue improvement plans with owner/due date and recheck. No numerical score is emitted.

## Output

Use `schemas/capability-assessment.schema.json`, `scripts/validate_governance.py`, and inspect `examples/capability-assessment.example.json` as non-production fixture. Periodic summary may show *Sundawa evidence coverage*, not maturity/capability rating.
