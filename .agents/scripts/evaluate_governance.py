#!/usr/bin/env python3
"""Generate internal evidence-readiness gates (not an ISACA COBIT assessment)."""
import argparse
import json
import sys
from datetime import date, datetime
from pathlib import Path
from validate_governance import validate, refs_available, load, ROOT

TYPES = ['risk-register', 'raci-matrix', 'capability-assessment', 'control-monitoring']
IDS = ['GOV-RISK', 'GOV-RACI', 'GOV-CAPABILITY', 'GOV-MONITOR']


def evaluate(bundle):
    if set(bundle) != set(TYPES):
        raise ValueError('Exactly four governance documents are required')
    for name, doc in bundle.items():
        issues = validate(name, doc)
        if issues: raise ValueError(f'Invalid {name}: ' + '; '.join(issues))
    projects = {x['project'] for x in bundle.values()}
    asofs = {x['as_of'] for x in bundle.values()}
    if len(projects)!=1 or len(asofs)!=1:
        raise ValueError('Governance documents must have same project and assessment as_of')
    as_of = date.fromisoformat(next(iter(asofs)))
    policy=load(ROOT/'config/governance-policy.json')
    mapping=load(ROOT/'governance/cobit/cobit2019-crosswalk.json')
    known={x['cobit2019_id'] for x in mapping['objectives']}
    results=[]; blockers=[]; limitations=[
        'Sundawa internal evidence-readiness gates; not official ISACA COBIT 7 assessment or certification.',
        'Governance mapping COBIT 2019 to COBIT 7 is provisional; detailed equivalence not verified.'
    ]
    def finish(key, failures, unknowns, evid):
        if failures: status='fail'; reason='; '.join(failures)
        elif unknowns: status='not-tested'; reason='; '.join(unknowns)
        elif not evid: status='not-tested'; reason='No verified evidence supports this gate'
        else: status='pass'; reason='All applicable Sundawa internal checks evidenced; independent human sign-off still required'
        if status=='fail':blockers.extend([key+': '+v for v in failures])
        results.append({'id':key,'status':status,'evidence_ids':sorted(evid),'reason':reason})

    risk=bundle['risk-register']; verified=refs_available(risk)
    failures=[];unknowns=[]; evidence=set()
    appetite=risk['risk_appetite']
    if not appetite['approved_reference'] or appetite['approved_reference'].startswith('synthetic:'):
        unknowns.append('Risk appetite approval absent or synthetic')
    for r in risk['risks']:
        score=r['likelihood']*r['impact']; rid=r['id']
        if not r['risk_owner'] or r['risk_owner']=='UNASSIGNED':unknowns.append(f'{rid} no assigned owner')
        if score>=appetite['high_threshold'] and r['status'] not in ('mitigated','accepted','closed'):
            failures.append(f'{rid} high untreated risk (inherent {score})')
        if r['status']=='accepted':
            a=r['acceptance']
            if datetime.fromisoformat(a['expires_at'].replace('Z','+00:00')).date() <= as_of:
                failures.append(f'{rid} risk acceptance expired')
            if a['reference'].startswith('synthetic:'):
                unknowns.append(f'{rid} acceptance authorization unverified')
        if date.fromisoformat(r['due_date']) < as_of and r['status'] in ('open','in-treatment'):
            failures.append(f'{rid} untreated risk overdue')
        evidence |= set(r['evidence_ids']) & verified
    if not risk['risks']:unknowns.append('No risk register entries')
    finish('GOV-RISK',failures,unknowns,evidence)

    raci=bundle['raci-matrix']; verified=refs_available(raci)
    failures=[];unknowns=[];evidence=set()
    acts={a['activity_id']:a for a in raci['activities']}
    for key in policy['required_raci_activities']:
        if key not in acts:
            failures.append('Critical decision not assigned: '+key)
            continue
        a=acts[key]; evidence|=set(a['evidence_ids']) & verified
        if a['accountable']=='UNASSIGNED':unknowns.append('Accountable owner unassigned: '+key)
        if not set(a['evidence_ids']) & verified: unknowns.append('RACI authorization evidence unverified: '+key)
        if key in policy['independent_reviewer_activities'] and a['independent_reviewer'] in [a['accountable']]+a['responsible']:
            failures.append('Segregation of duties conflict: '+key)
    if (raci['approved_by'].strip().upper() in ('UNASSIGNED','TBD','UNKNOWN') or
        raci['approval_reference'].startswith('synthetic:')):
        unknowns.append('RACI has no verifiable human approval')
    finish('GOV-RACI',failures,unknowns,evidence)

    cap=bundle['capability-assessment']; verified=refs_available(cap)
    failures=[];unknowns=[];evidence=set();selected=[a for a in cap['assessments'] if a['selected']]
    if cap['scope_approved_by'].strip().upper() in ('UNASSIGNED','TBD','UNKNOWN') or cap['scope_approval_reference'].startswith('synthetic:'):
        unknowns.append('Selected objective scope lacks verifiable human approval')
    if len(selected) < policy['minimum_selected_objectives']:
        failures.append('No selected governance objective with rationale')
    for a in selected:
        aid=a['cobit2019_id']
        if aid not in known:failures.append(aid+' not mapped')
        if a['readiness_status']=='gap':failures.append(aid+' reported readiness gap')
        if a['readiness_status'] in ('not-assessed','not-applicable'):
            unknowns.append(aid+' not assessed or inapplicable despite being selected')
        evidence|=set(a['evidence_ids']) & verified
        if not a.get('assessed_by') or not set(a['evidence_ids']) & verified:
            unknowns.append(aid+' missing verified assessment and reviewer')
        for c in a['process_checks']:
            if c['status']=='gap':failures.append(aid+'/'+c['check_id']+' check failed')
            if c['status']=='not-assessed':unknowns.append(aid+'/'+c['check_id']+' check not assessed')
            evidence|=set(c['evidence_ids']) & verified
    finish('GOV-CAPABILITY',failures,unknowns,evidence)

    mon=bundle['control-monitoring']; verified=refs_available(mon)
    failures=[];unknowns=[];evidence=set(); applicable=[c for c in mon['controls'] if c['applicable']]
    if mon['scope_approved_by'].strip().upper() in ('UNASSIGNED','TBD','UNKNOWN') or mon['scope_approval_reference'].startswith('synthetic:'):
        unknowns.append('Monitored control scope lacks verifiable human approval')
    if len(applicable)<policy['minimum_applicable_controls']:
        failures.append('No applicable monitored controls')
    if not any(c['critical'] for c in applicable):unknowns.append('No critical controls selected/defined')
    for c in applicable:
        cid=c['control_id']
        if c['status']=='ineffective':failures.append(cid+' control ineffective')
        if date.fromisoformat(c['next_due']) < as_of:failures.append(cid+' monitoring overdue')
        if c['status']=='not-tested':unknowns.append(cid+' control not tested')
        ev=set(c['evidence_ids']) & verified
        if c['status']=='effective' and not ev:unknowns.append(cid+' missing verified effectiveness proof')
        evidence|=ev
    finish('GOV-MONITOR',failures,unknowns,evidence)
    overall='BLOCK' if any(x['status']!='pass' for x in results) else 'REVIEW'
    return {'schema_version':'1.1.0','project':next(iter(projects)),'as_of':next(iter(asofs)),
            'overall':overall,'gates':results,'blocking_items':sorted(set(blockers)),
            'limitations':limitations,'approver':None}


def main():
    ap=argparse.ArgumentParser(description=__doc__)
    for flag in ('risk','raci','assessment','monitoring'):ap.add_argument('--'+flag,required=True,type=Path)
    ap.add_argument('--out',required=True,type=Path)
    a=ap.parse_args()
    names=dict(risk='risk-register',raci='raci-matrix',assessment='capability-assessment',monitoring='control-monitoring')
    try:
        bundle={target:load(getattr(a,src)) for src,target in names.items()}
        report=evaluate(bundle)
        issues=validate('governance-gate-results',report)
        if issues:raise ValueError('Invalid generated result: '+'; '.join(issues))
    except (ValueError,KeyError,OSError) as exc:
        print('ERROR:',exc);sys.exit(2)
    a.out.parent.mkdir(parents=True,exist_ok=True)
    a.out.write_text(json.dumps(report,indent=2,ensure_ascii=False)+'\n',encoding='utf-8')
    print(report['overall']+': '+str(a.out)+' (human review needed; not ISACA assessment)')
    sys.exit(1 if report['overall']=='BLOCK' else 2)

if __name__=='__main__': main()
