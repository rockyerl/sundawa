import json, sys, unittest
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
sys.path.insert(0,str(ROOT/'scripts'))
from validate_pack import validate as validate_pack
from validate_artifact import validate as validate_artifact
from evaluate_gates import evaluate

class PackTests(unittest.TestCase):
    def test_pack(self):self.assertEqual(validate_pack(),[])
    def test_all_examples(self):
        for name in ('audit-report','test-cases','iso-control-assessment'):
            data=json.loads((ROOT/'examples'/f'{name}.example.json').read_text())
            self.assertEqual(validate_artifact(name,data),[],name)
    def test_fail_closed_on_missing_gates(self):
        data=json.loads((ROOT/'examples/audit-report.example.json').read_text())
        r=evaluate('web',[data]);self.assertEqual(r['overall'],'BLOCK')
        self.assertTrue(any(g['status']=='not-tested' for g in r['gates']))
    def test_confirmed_requires_evidence(self):
        data=json.loads((ROOT/'examples/audit-report.example.json').read_text())
        data['findings'][0]['status']='confirmed';data['findings'][0]['confidence']='high';data['findings'][0]['evidence_ids']=[]
        self.assertTrue(any('requires evidence' in x for x in validate_artifact('audit-report',data)))
    def test_cannot_fabricate_iso_assessment(self):
        data=json.loads((ROOT/'examples/iso-control-assessment.example.json').read_text())
        data['control_assessments'][0]['implementation']='implemented'
        self.assertTrue(any('verified source and evidence' in x for x in validate_artifact('iso-control-assessment',data)))
    def test_generated_tests_not_executed(self):
        data=json.loads((ROOT/'examples/test-cases.example.json').read_text())
        data['cases'][0]['execution_status']='pass'
        self.assertTrue(any('needs evidence' in x for x in validate_artifact('test-cases',data)))

if __name__=='__main__':unittest.main()
