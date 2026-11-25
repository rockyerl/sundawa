# Continuous control monitoring playbook

COBIT governs why/who/what; ISO/OWASP specify relevant mechanisms; monitoring tracks actual operations. This pack **does not schedule jobs or poll production systems**. Connect approved enterprise monitoring through organization-controlled CI, SIEM, ticketing and evidence vault.

1. Define each applicable control's purpose, risk, objective linkage, named owner, criticality and cadence.
2. Provide test/check method and data-source permissions (e.g. signed pipeline report, access review, restore drill, SAST report).
3. Capture check date and next due; `effective` only with verified evidence for that specific check.
4. `ineffective` -> corrective action ID + deadline. `not-tested` is an explicit missing-control-evaluation state.
5. `next_due` earlier than assessment `as_of` is overdue; `last_checked` cannot be in the future.
6. Rerun for every material deployment/change, incident and periodic control check. Escalate overdue/ineffective critical controls to risk owner.
7. Export coverage reports with numerator/denominator plus limitations, never assert 100% compliance simply because no findings exist.

Schema: `schemas/control-monitoring.schema.json`; optional file `examples/control-monitoring.example.json` is synthetic.
