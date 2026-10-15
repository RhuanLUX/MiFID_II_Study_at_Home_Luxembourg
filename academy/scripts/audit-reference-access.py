"""Read-only source-access audit; blocks are recorded, never bypassed."""
import json,pathlib,urllib.request,urllib.error,concurrent.futures,datetime
ROOT=pathlib.Path(__file__).resolve().parents[1]
sources=json.loads((ROOT/'evidence/audit-source-inputs.json').read_text(encoding='utf8'))
def check(s):
    result=dict(id=s['id'],url=s['url'])
    if not s['url']: return dict(result,status='LOCAL_DERIVATION')
    try:
        request=urllib.request.Request(s['url'],headers={'User-Agent':'EIP-Educational-Source-Audit/1.0'})
        with urllib.request.urlopen(request,timeout=15) as response:
            prefix=response.read(32768)
            result.update(http=response.status,final_url=response.url,content_type=response.headers.get('Content-Type',''))
            lower=prefix.lower()
            challenge=any(x in lower for x in [b'verify that you',b'not a robot',b'captcha',b'access denied',b'checking your browser'])
            result['status']='ACCESS_CHALLENGE' if challenge else 'REACHABLE'
    except urllib.error.HTTPError as error:
        result.update(http=error.code,status='ACCESS_BLOCKED' if error.code in (401,403,429) else 'HTTP_ERROR',error=str(error))
    except Exception as error: result.update(status='NETWORK_UNCERTAIN',error=str(error))
    return result
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool: rows=list(pool.map(check,sources))
counts={status:sum(r['status']==status for r in rows) for status in sorted(set(r['status'] for r in rows))}
report=dict(date='2026-10-15',purpose='Read-only reachability check of every source URL; no access-control workaround',counts=counts,rows=rows,limits=['Reachability does not establish claim accuracy or current legal validity.','HTTP 403/429, anti-bot challenges and timeouts are access limitations, not proof that the cited source is invalid.','Semantic official-source verification is separately recorded in CONTENT_AUDIT.md.'])
(ROOT/'evidence/reference-access-audit.json').write_text(json.dumps(report,indent=2),encoding='utf8')
print(json.dumps(counts))
for r in rows:
    if r['status'] in ('HTTP_ERROR','NETWORK_UNCERTAIN'): print(json.dumps(r))
