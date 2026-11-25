#!/usr/bin/env python3
"""Offline linting for Sundawa Agent Skills repository. Requires PyYAML, jsonschema."""
from pathlib import Path
import json, re, sys
import yaml
from jsonschema import Draft202012Validator
ROOT=Path(__file__).resolve().parents[1]
REQ_HEADERS=['## 1. Trigger','## 2. Prasyarat','## 3. Standar','## 4. Workflow','## 5. Detailed','## 6. Quality','## 7. Output','## 8. Validation','## 9. Safety','## 10. Handoff','## 11. Local']
PATHRE=re.compile(r'\]\(([^)]+)\)')
NAMERE=re.compile(r'^[a-z0-9]+(?:-[a-z0-9]+)*$')

def validate():
    errors=[]
    reg=json.loads((ROOT/'standards/registry.json').read_text())['standards']
    index=json.loads((ROOT/'skills/index.json').read_text())['skills']
    actual=list((ROOT/'skills').glob('*/SKILL.md'))
    declared={s['name'] for s in index}
    if len(declared)!=13:errors.append('v1.1 must register 13 skills')
    if len(actual)!=len(declared): errors.append(f'Expected {len(declared)} SKILL.md, found {len(actual)}')
    if len(declared)!=len(index): errors.append('Duplicate names in skills/index.json')
    for path in actual:
        name=path.parent.name
        data=path.read_text(encoding='utf-8')
        if not data.startswith('---\n') or '\n---\n' not in data[4:]:
            errors.append(f'{path}: bad frontmatter'); continue
        front, body=data[4:].split('\n---\n',1)
        try: meta=yaml.safe_load(front)
        except yaml.YAMLError as exc: errors.append(f'{path}: YAML {exc}'); continue
        if not isinstance(meta,dict) or set(meta)!={'name','description'}:errors.append(f'{path}: frontmatter must only include name and description')
        if not isinstance(meta,dict) or meta.get('name')!=name or not NAMERE.fullmatch(name) or len(name)>64:errors.append(f'{path}: name invalid')
        desc=meta.get('description','') if isinstance(meta,dict) else ''
        if not isinstance(desc,str) or not 20<=len(desc)<=1024: errors.append(f'{path}: description length invalid')
        if name not in declared:errors.append(f'{path}: missing index')
        for h in REQ_HEADERS:
            if h not in body: errors.append(f'{path}: missing {h}')
        for link in PATHRE.findall(body):
            if link.startswith(('http:','https:','#','mailto:')):continue
            target=(path.parent/link).resolve()
            if not target.is_file():errors.append(f'{path}: missing linked file {link}')
        if not (path.parent/'references/checklist.md').is_file():errors.append(f'{path}: missing checklist')
        entry=next((s for s in index if s['name']==name),None)
        if entry:
            for key in entry['standards']:
                if key not in reg:errors.append(f'{path}: unknown standard {key}')
                if f'**{key}**' not in body:errors.append(f'{path}: missing standard section {key}')
    for entry in index:
        if not (ROOT/entry['path']).is_file():errors.append(f'index missing path: {entry["path"]}')
    for f in (ROOT/'schemas').glob('*.schema.json'):
        try:Draft202012Validator.check_schema(json.loads(f.read_text()))
        except Exception as exc:errors.append(f'{f}: invalid JSON schema: {exc}')
    for p in (ROOT/'config/quality-gates.json',ROOT/'standards/registry.json'):
        try:json.loads(p.read_text())
        except Exception as exc:errors.append(f'{p}: malformed JSON: {exc}')
    try:
        mapping=json.loads((ROOT/'governance/cobit/cobit2019-crosswalk.json').read_text())
        objectives=mapping['objectives']
        ids=[x['cobit2019_id'] for x in objectives]
        if len(ids)!=len(set(ids)): errors.append('Duplicate COBIT 2019 crosswalk objective')
        for x in objectives:
            if x['cobit7_equivalence'] != 'not-verified' or x['cobit7_objective_id'] is not None:
                errors.append('COBIT 7 equivalence must remain unverified unless formally reviewed')
            for name in x['skills']:
                if name not in declared:errors.append('Unknown mapped skill: '+name)
        gp=json.loads((ROOT/'config/governance-policy.json').read_text())
        policy=json.loads((ROOT/'config/quality-gates.json').read_text())
        for profile in gp['governance_required_profiles']:
            if not set(gp['required_governance_gates']).issubset(policy['profiles'][profile]['required_gates']):
                errors.append('Missing governance gates in '+profile)
    except (ValueError,KeyError,OSError) as exc:errors.append('Governance registry invalid: '+str(exc))
    return errors
if __name__=='__main__':
    issues=validate()
    for issue in issues: print('ERROR:',issue)
    if issues:sys.exit(1)
    print(f'PASS: {len(json.loads((ROOT/"skills/index.json").read_text())["skills"])} skills, references, governance mapping, schemas and registry linted.')
