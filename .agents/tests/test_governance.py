"""Synthetic, offline governance-policy tests; not proof of external control effectiveness."""
import copy
import json
import sys
import unittest
from pathlib import Path
ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0,str(ROOT/'scripts'))
from validate_governance import validate as validate_doc
from evaluate_governance import evaluate as evaluate_governance
from evaluate_gates import evaluate as evaluate_release

NAMES = ['risk-register','raci-matrix','capability-assessment','control-monitoring']


def fixtures():
    return {k: json.loads((ROOT/'examples'/f'{k}.example.json').read_text()) for k in NAMES}


def verified(eid):
    return {'id':eid,'uri':'https://internal.example.invalid/evidence/'+eid,
            'summary':'Synthetic test attestation only; not an external audit record',
            'captured_at':'2026-11-21T00:00:00Z','verified':True,
            'verified_by':'Unit Test Independent Reviewer',
            'verified_at':'2026-11-22T00:00:00Z'}


def all_green_bundle():
    """A fictitious positive fixture used only to unit-test gate logic."""
    d=fixtures()
    risk=d['risk-register'];risk['risk_appetite']['approved_reference']='https://internal.example.invalid/approval/risk'
    r=risk['risks'][0]
    r['status']='mitigated';r['closure_verified_by']='Unit Test Independent Reviewer'
    r['evidence_ids']=['EV-RISK-REALISTIC-TEST'];risk['evidence_catalog']=[verified(r['evidence_ids'][0])]
    raci=d['raci-matrix'];raci['approved_by']='Unit Test Governance Owner';raci['approval_reference']='https://internal.example.invalid/approval/raci'
    raci['evidence_catalog']=[]
    for i,act in enumerate(raci['activities']):
        eid=f'EV-RACI-TEST-{i}'
        act['evidence_ids']=[eid];raci['evidence_catalog'].append(verified(eid))
    cap=d['capability-assessment'];cap['scope_approved_by']='Unit Test Governance Owner'
    cap['scope_approval_reference']='https://internal.example.invalid/approval/capability-scope'
    a=cap['assessments'][0];a['assessed_by']='Unit Test Independent Reviewer';a['readiness_status']='evidenced'
    a['evidence_ids']=['EV-CAP-TEST'];cap['evidence_catalog']=[verified('EV-CAP-TEST')]
    c=a['process_checks'][0];c['status']='evidenced';c['evidence_ids']=['EV-CAP-TEST']
    mon=d['control-monitoring'];mon['scope_approved_by']='Unit Test Governance Owner'
    mon['scope_approval_reference']='https://internal.example.invalid/approval/monitor-scope'
    x=mon['controls'][0];x['status']='effective';x['evidence_ids']=['EV-MON-TEST'];mon['evidence_catalog']=[verified('EV-MON-TEST')]
    return d


class GovernanceTests(unittest.TestCase):
    def test_example_schema_semantics(self):
        for name,d in fixtures().items():
            self.assertEqual(validate_doc(name,d),[],name)

    def test_demo_is_blocked_not_misreported_as_pass(self):
        out=evaluate_governance(fixtures())
        self.assertEqual(out['overall'],'BLOCK')
        self.assertEqual([x['id'] for x in out['gates']], ['GOV-RISK','GOV-RACI','GOV-CAPABILITY','GOV-MONITOR'])
        self.assertEqual(out['gates'][0]['status'],'fail')
        self.assertEqual(validate_doc('governance-gate-results',out),[])

    def test_unverified_effective_control_rejected(self):
        d=fixtures()['control-monitoring']
        d['controls'][0]['status']='effective'
        d['controls'][0]['evidence_ids']=['EV-MON-DEMO']
        self.assertTrue(any('verified evidence' in e for e in validate_doc('control-monitoring',d)))

    def test_unapproved_risk_acceptance_rejected(self):
        d=fixtures()['risk-register']
        d['risks'][0]['status']='accepted'
        self.assertTrue(any('approval' in e for e in validate_doc('risk-register',d)))

    def test_duplicate_risk_rejected(self):
        d=fixtures()['risk-register']
        d['risks'].append(copy.deepcopy(d['risks'][0]))
        self.assertTrue(any('Duplicate risk' in e for e in validate_doc('risk-register',d)))

    def test_undefined_role_rejected(self):
        d=fixtures()['raci-matrix']
        d['activities'][0]['accountable']='not-a-role'
        self.assertTrue(any('unknown RACI role' in e for e in validate_doc('raci-matrix',d)))

    def test_positive_internal_readiness_is_review_not_approval(self):
        d=all_green_bundle()
        for name,doc in d.items():self.assertEqual(validate_doc(name,doc),[],name)
        out=evaluate_governance(d)
        self.assertEqual(out['overall'],'REVIEW')
        self.assertEqual([g['status'] for g in out['gates']],['pass']*4)
        self.assertIsNone(out['approver'])
        self.assertEqual(validate_doc('governance-gate-results',out),[])

    def test_expired_risk_exception_blocks(self):
        d=all_green_bundle(); r=d['risk-register']['risks'][0]
        r['status']='accepted'; r['acceptance']={
            'approved_by':'Synthetic Reviewer','role':'Governance Owner','approved_at':'2026-10-01T00:00:00Z',
            'expires_at':'2026-11-01T00:00:00Z','reason':'Synthetic risk exception just for expiry unit test',
            'reference':'https://internal.example.invalid/approvals/RISK-DEMO-01'}
        r['evidence_ids']=['EV-RISK-REALISTIC-TEST']
        self.assertEqual(validate_doc('risk-register',d['risk-register']),[])
        out=evaluate_governance(d)
        self.assertEqual(out['gates'][0]['status'],'fail')
        self.assertIn('expired',out['gates'][0]['reason'])

    def test_overdue_control_blocks(self):
        d=all_green_bundle(); c=d['control-monitoring']['controls'][0]
        c['next_due']='2026-11-22'
        out=evaluate_governance(d)
        self.assertEqual(out['gates'][3]['status'],'fail')

    def test_mixed_project_not_combined(self):
        d=fixtures();d['raci-matrix']['project']='OTHER-PROJECT'
        with self.assertRaisesRegex(ValueError,'same project'):
            evaluate_governance(d)

    def test_enterprise_technical_release_requires_governance(self):
        audit=json.loads((ROOT/'examples/audit-report.example.json').read_text())
        out=evaluate_release('enterprise',[audit])
        self.assertEqual(out['overall'],'BLOCK')
        self.assertTrue(any(g['id']=='GOV-RISK' and g['status']=='not-tested' for g in out['gates']))

    def test_cannot_forge_governance_gate_from_technical_report(self):
        audit=json.loads((ROOT/'examples/audit-report.example.json').read_text())
        # Existing technical report may supply GOV claims but cannot replace the required registers.
        audit['gate_results'].append({'gate_id':'GOV-RISK','status':'pass','rationale':'Synthetic claim without governance records','evidence_ids':[audit['evidence'][0]['id']]})
        out=evaluate_release('enterprise',[audit])
        self.assertEqual(next(g for g in out['gates'] if g['id']=='GOV-RISK')['status'],'not-tested')

    def test_enterprise_combines_governance_with_technical_gates(self):
        d=all_green_bundle()
        audit=json.loads((ROOT/'examples/audit-report.example.json').read_text())
        out=evaluate_release('enterprise',[audit],d)
        self.assertEqual(out['overall'],'BLOCK')
        self.assertTrue(all(next(g for g in out['gates'] if g['id']==key)['status']=='pass'
                            for key in ('GOV-RISK','GOV-RACI','GOV-CAPABILITY','GOV-MONITOR')))
        self.assertTrue(any(g['status']=='not-tested' for g in out['gates'] if not g['id'].startswith('GOV-')))

    def test_governance_project_must_match_technical(self):
        d=all_green_bundle()
        audit=json.loads((ROOT/'examples/audit-report.example.json').read_text())
        d['risk-register']['project']='MISMATCH-PROJECT'
        d['raci-matrix']['project']='MISMATCH-PROJECT'
        d['capability-assessment']['project']='MISMATCH-PROJECT'
        d['control-monitoring']['project']='MISMATCH-PROJECT'
        with self.assertRaisesRegex(ValueError,'does not match'):
            evaluate_release('enterprise',[audit],d)


if __name__ == '__main__':unittest.main()
