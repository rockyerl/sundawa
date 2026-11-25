#!/usr/bin/env python3
"""Validate artifact against JSON Schema and Sundawa semantic evidence rules."""
import argparse, json, sys
from pathlib import Path
from jsonschema import Draft202012Validator, FormatChecker
ROOT=Path(__file__).resolve().parents[1]
FILES={'audit-report':'audit-report.schema.json','test-cases':'test-cases.schema.json','iso-control-assessment':'iso-control-assessment.schema.json','gate-decision':'gate-decision.schema.json'}

def validate(kind, data):
    schema=json.loads((ROOT/'schemas'/FILES[kind]).read_text())
    errors=[f'{".".join(map(str,e.absolute_path)) or "root"}: {e.message}' for e in Draft202012Validator(schema, format_checker=FormatChecker()).iter_errors(data)]
    if errors: return errors
    if kind=='audit-report':
        registry=json.loads((ROOT/'standards/registry.json').read_text())['standards']
        gates=json.loads((ROOT/'config/quality-gates.json').read_text())['gates']
        evidences=data['evidence']; ev={e['id']:e for e in evidences}
        if len(ev)!=len(evidences):errors.append('Duplicate evidence IDs')
        for code in data['standards_used']:
            if code not in registry:errors.append('Unknown standard: '+code)
        finding_ids=set()
        for f in data['findings']:
            if f['id'] in finding_ids:errors.append(f'Duplicate finding ID {f["id"]}')
            finding_ids.add(f['id'])
            for ref in f['standard_refs']:
                if ref not in registry:errors.append(f'{f["id"]}: unknown standard {ref}')
                if ref not in data['standards_used']:errors.append(f'{f["id"]}: standard {ref} absent from standards_used')
            for eid in f['evidence_ids']:
                if eid not in ev:errors.append(f'{f["id"]}: missing evidence {eid}')
            if f['status'] in ('confirmed','resolved') and not f['evidence_ids']:
                errors.append(f'{f["id"]}: confirmed/resolved requires evidence')
            if f['status']=='resolved' and not any(ev.get(i,{}).get('kind')=='test-run' for i in f['evidence_ids']):
                errors.append(f'{f["id"]}: resolved requires retest evidence of kind test-run')
            if f['status']=='risk-accepted':
                approval=f.get('acceptance')
                if not approval or not all(approval.get(k) for k in ('approved_by','reason','expires_at')):errors.append(f'{f["id"]}: risk acceptance requires approval owner, reason and expiration')
            if f['status']=='confirmed' and f['confidence']=='low':errors.append(f'{f["id"]}: confirmed cannot have low confidence; mark suspected')
            if f['status']=='confirmed' and data['skill']=='bug-hunter' and not f.get('reproduction_steps'):
                errors.append(f'{f["id"]}: confirmed bug requires steps to reproduce')
        if data['method'] in ('manual-test','automated-test','mixed') and not data['scope']['authorized']:
            errors.append('Active testing requires scope.authorized=true')
        if data['method'] in ('manual-test','automated-test','mixed') and not any(e['kind'] in ('test-run','scan') for e in evidences):
            errors.append('Test execution method requires a test-run or scan evidence artifact')
        seen_gate_ids=set()
        for g in data['gate_results']:
            if g['gate_id'] in seen_gate_ids:errors.append('Duplicate gate ID '+g['gate_id'])
            seen_gate_ids.add(g['gate_id'])
            if g['gate_id'] not in gates:errors.append('Unknown gate '+g['gate_id'])
            for eid in g['evidence_ids']:
                if eid not in ev:errors.append(f'gate {g["gate_id"]}: missing evidence {eid}')
            if g['status']=='pass' and not g['evidence_ids']:
                errors.append(f'gate {g["gate_id"]}: pass requires evidence')
        if data['release_recommendation']=='pass':
            if not data['gate_results']:errors.append('Cannot recommend pass with no evaluated quality gates')
            if not data['evidence']:errors.append('Cannot recommend pass without evidence')
            if any(f['status'] in ('confirmed','suspected') and f['severity'] in ('critical','high') for f in data['findings']):
                errors.append('Cannot recommend pass with unresolved critical/high findings')
            if any(g['status']!='pass' for g in data['gate_results']):
                errors.append('Cannot recommend pass with non-pass gates')
    if kind=='test-cases':
        sources=set(data['source_requirements']); ids=set()
        for case in data['cases']:
            if case['id'] in ids: errors.append(f'Duplicate test case ID {case["id"]}')
            ids.add(case['id'])
            missing=set(case['requirement_ids'])-sources
            if missing:errors.append(f'{case["id"]}: unrecognized requirement IDs {sorted(missing)}')
            if case['execution_status']!='not-run' and not case.get('evidence_ids'):
                errors.append(f'{case["id"]}: executed status needs evidence_ids')
    if kind=='iso-control-assessment':
        ids=set()
        for c in data['control_assessments']:
            if c['control_id'] in ids:errors.append(f'Duplicate ISO control {c["control_id"]}')
            ids.add(c['control_id'])
            if c['implementation']=='implemented' and (not c['source_verified'] or not c['evidence_ids']):
                errors.append(f'{c["control_id"]}: implemented requires verified source and evidence')
            if c['implementation']=='not-applicable' and c['applicable']:
                errors.append(f'{c["control_id"]}: applicability contradicts status')
        if data['overall_status']=='ready-for-independent-audit':
            if any((not c['source_verified']) or c['implementation'] in ('not-assessed','not-implemented','partially-implemented') for c in data['control_assessments']):
                errors.append('Cannot claim readiness when control source unverified or gaps remain')
    if kind=='gate-decision':
        policy=json.loads((ROOT/'config/quality-gates.json').read_text())
        required=set(policy['profiles'][data['profile']]['required_gates'])
        present={g['id']:g for g in data['gates']}
        if data['overall']=='PASS':
            if not data['approver']:errors.append('PASS requires a human approver')
            if data['blocking_findings']:errors.append('PASS cannot list blocking findings')
            for key in required:
                if key not in present or present[key]['status']!='pass' or not present[key]['evidence_ids']:
                    errors.append(f'PASS missing fully evidenced required gate: {key}')
    return errors

def main():
    ap=argparse.ArgumentParser();ap.add_argument('--schema',required=True,choices=list(FILES));ap.add_argument('--file',type=Path,required=True); a=ap.parse_args()
    try:data=json.loads(a.file.read_text(encoding='utf-8'))
    except Exception as exc:print(f'INVALID FILE: {exc}');sys.exit(2)
    issues=validate(a.schema,data)
    for msg in issues:print('ERROR:',msg)
    if issues:sys.exit(1)
    print(f'PASS: {a.schema} JSON Schema + semantic checks: {a.file}')
if __name__=='__main__': main()
