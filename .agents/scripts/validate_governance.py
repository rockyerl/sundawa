#!/usr/bin/env python3
"""Offline JSON Schema + semantic validation for Sundawa governance records.
No control is executed and no certification/capability rating is implied.
"""
import argparse
import json
import sys
from datetime import date, datetime
from pathlib import Path
from jsonschema import Draft202012Validator, FormatChecker

ROOT = Path(__file__).resolve().parents[1]
KINDS = ('risk-register', 'raci-matrix', 'capability-assessment', 'control-monitoring', 'governance-gate-results')


def load(path):
    return json.loads(Path(path).read_text(encoding='utf-8'))


def refs_available(doc):
    return {e['id'] for e in doc.get('evidence_catalog', []) if e['verified']
            and e.get('verified_by') and e.get('verified_at')
            and not e['uri'].startswith(('synthetic:', 'example:', 'demo:'))}


def validate(kind, data):
    if kind not in KINDS:
        return [f'Unknown kind {kind}']
    schema = load(ROOT / 'schemas' / (kind + '.schema.json'))
    errors = [f'{".".join(map(str, e.absolute_path)) or "root"}: {e.message}'
              for e in Draft202012Validator(schema, format_checker=FormatChecker()).iter_errors(data)]
    if errors:
        return errors
    if kind == 'governance-gate-results':
        ids = [g['id'] for g in data['gates']]
        if len(ids) != len(set(ids)): errors.append('Duplicate governance gate IDs')
        if data['overall'] == 'REVIEW' and any(g['status'] != 'pass' for g in data['gates']):
            errors.append('REVIEW cannot contain a non-pass governance gate')
        if any(g['status'] == 'pass' and not g['evidence_ids'] for g in data['gates']):
            errors.append('Governance pass requires evidence')
        return errors

    ev = data['evidence_catalog']
    ids = [e['id'] for e in ev]
    if len(ids) != len(set(ids)): errors.append('Duplicate evidence IDs')
    as_of = date.fromisoformat(data['as_of'])
    for e in ev:
        if e['verified'] and (not e.get('verified_by') or not e.get('verified_at')):
            errors.append(f"{e['id']}: verified evidence requires verified_by and verified_at")
        if datetime.fromisoformat(e['captured_at'].replace('Z', '+00:00')).date() > as_of:
            errors.append(f"{e['id']}: captured in the future relative to as_of")
        if e.get('verified_at') and datetime.fromisoformat(e['verified_at'].replace('Z', '+00:00')).date() > as_of:
            errors.append(f"{e['id']}: verified after as_of")
    all_ev = set(ids)
    verified = refs_available(data)
    mapping = load(ROOT / 'governance/cobit/cobit2019-crosswalk.json')
    objective_ids = {x['cobit2019_id'] for x in mapping['objectives']}

    def check_evs(label, eids):
        for eid in eids:
            if eid not in all_ev:
                errors.append(f'{label}: unknown evidence reference {eid}')

    def check_cobit(label, oids):
        for oid in oids:
            if oid not in objective_ids:
                errors.append(f'{label}: objective {oid} not in provisional COBIT2019 crosswalk')

    if kind == 'risk-register':
        seen = set()
        for r in data['risks']:
            rid = r['id']
            if rid in seen: errors.append('Duplicate risk ID '+rid)
            seen.add(rid)
            check_evs(rid, r['evidence_ids'])
            check_cobit(rid, r['cobit2019_ids'])
            if r['status'] in ('mitigated', 'closed'):
                if not r.get('closure_verified_by') or not set(r['evidence_ids']).intersection(verified):
                    errors.append(f'{rid}: mitigated/closed requires an independent verification owner and verified evidence')
            if r['status'] == 'accepted':
                a = r.get('acceptance')
                if not a:
                    errors.append(f'{rid}: accepted risk requires an approval record')
                else:
                    if a['role'] != data['risk_appetite']['accepted_by_role']:
                        errors.append(f'{rid}: accepted by a role outside declared approval authority')
                    if datetime.fromisoformat(a['approved_at'].replace('Z','+00:00')) >= datetime.fromisoformat(a['expires_at'].replace('Z','+00:00')):
                        errors.append(f'{rid}: risk acceptance expiry must follow approval date')
                    if datetime.fromisoformat(a['approved_at'].replace('Z','+00:00')).date() > as_of:
                        errors.append(f'{rid}: risk acceptance approved after assessment as_of')
                    if not set(r['evidence_ids']).intersection(verified):
                        errors.append(f'{rid}: accepted risk requires independently verified authorization evidence')
            if ('residual_likelihood' in r) != ('residual_impact' in r):
                errors.append(f'{rid}: residual likelihood/impact must be provided as a pair')
    elif kind == 'raci-matrix':
        roles = [r['id'] for r in data['roles']]
        if len(roles) != len(set(roles)): errors.append('Duplicate RACI role ID')
        role_ids = set(roles)
        acts = set()
        for a in data['activities']:
            aid = a['activity_id']
            if aid in acts:errors.append('Duplicate RACI activity ID '+aid)
            acts.add(aid)
            participants = [a['accountable'], a['independent_reviewer']] + a['responsible']+a['consulted']+a['informed']
            for p in participants:
                if p not in role_ids:errors.append(f'{aid}: unknown RACI role {p}')
            if len(a['responsible']) != len(set(a['responsible'])):errors.append(f'{aid}: duplicate responsible role')
            if a['accountable'] == a['independent_reviewer'] or a['independent_reviewer'] in a['responsible']:
                errors.append(f'{aid}: independent reviewer conflicts with approver or executor')
            check_evs(aid, a['evidence_ids'])
    elif kind == 'capability-assessment':
        seen = set()
        for a in data['assessments']:
            aid = a['cobit2019_id']
            if aid in seen: errors.append('Duplicate assessment objective '+aid)
            seen.add(aid)
            check_cobit(aid, [aid])
            matching = next((x for x in mapping['objectives'] if x['cobit2019_id'] == aid),None)
            if matching and matching['cobit7_theme'] != a['cobit7_theme']:
                errors.append(f'{aid}: cobit7_theme not aligned to provisional mapping')
            check_evs(aid, a['evidence_ids'])
            checks = set()
            for c in a['process_checks']:
                if c['check_id'] in checks: errors.append(f'{aid}: duplicate check {c["check_id"]}')
                checks.add(c['check_id'])
                check_evs(f'{aid}.{c["check_id"]}', c['evidence_ids'])
                if c['status'] == 'evidenced' and not set(c['evidence_ids']).intersection(verified):
                    errors.append(f'{aid}.{c["check_id"]}: evidenced check requires independently verified evidence')
            if a['readiness_status'] == 'evidenced':
                if not a.get('assessed_by') or not set(a['evidence_ids']).intersection(verified):
                    errors.append(f'{aid}: evidenced readiness requires assessor and verified evidence')
                if any(c['status'] not in ('evidenced', 'not-applicable') for c in a['process_checks']):
                    errors.append(f'{aid}: evidenced readiness contradicts open or unassessed process check')
    elif kind == 'control-monitoring':
        seen = set()
        for c in data['controls']:
            cid = c['control_id']
            if cid in seen:errors.append('Duplicate control ID '+cid)
            seen.add(cid)
            check_evs(cid, c['evidence_ids'])
            check_cobit(cid, c['cobit2019_ids'])
            if date.fromisoformat(c['last_checked']) > as_of:
                errors.append(f'{cid}: last_checked is later than as_of')
            if date.fromisoformat(c['next_due']) < date.fromisoformat(c['last_checked']):
                errors.append(f'{cid}: next_due precedes last_checked')
            if c['status'] == 'effective' and not set(c['evidence_ids']).intersection(verified):
                errors.append(f'{cid}: effective requires verified evidence')
            if c['status'] == 'ineffective' and not c.get('corrective_action_id'):
                errors.append(f'{cid}: ineffective requires corrective_action_id')
            if not c['applicable'] and c['status'] != 'not-applicable':
                errors.append(f'{cid}: not applicable control has inconsistent status')
            if c['applicable'] and c['status'] == 'not-applicable':
                errors.append(f'{cid}: applicable control cannot be not-applicable')
    return errors


def main():
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument('--kind', required=True, choices=KINDS)
    ap.add_argument('--file', required=True, type=Path)
    args = ap.parse_args()
    try:
        data = load(args.file)
        issues = validate(args.kind, data)
    except (OSError, ValueError, json.JSONDecodeError) as exc:
        print('ERROR:', exc)
        sys.exit(2)
    for issue in issues: print('ERROR:', issue)
    if issues: sys.exit(1)
    print(f'PASS: {args.kind} structural and semantic checks; DOES NOT attest governance effectiveness')


if __name__ == '__main__':
    main()
