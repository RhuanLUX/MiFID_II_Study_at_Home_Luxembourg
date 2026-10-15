"""Retain a named primary-source PDF and extracted research text with provenance."""
import sys,pathlib,urllib.request,hashlib,json
from pypdf import PdfReader
name,url=sys.argv[1:3]
assert name.replace('-','').isalnum()
root=pathlib.Path(__file__).resolve().parents[1]/'evidence'
data=urllib.request.urlopen(url,timeout=45).read();assert data.startswith(b'%PDF')
p=root/(name+'.pdf');p.write_bytes(data);pages=PdfReader(p).pages
(root/(name+'.pdf.txt')).write_text('\n\n'.join(f'PAGE {i+1}\n'+p.extract_text() for i,p in enumerate(pages)),encoding='utf8')
record=dict(file=name+'.pdf',url=url,pages=len(pages),sha256=hashlib.sha256(data).hexdigest(),checked='2026-10-15')
(root/(name+'-provenance.json')).write_text(json.dumps(record,indent=2),encoding='utf8')
print(json.dumps(record))
