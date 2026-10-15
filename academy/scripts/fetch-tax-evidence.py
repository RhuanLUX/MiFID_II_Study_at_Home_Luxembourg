"""Research snapshot of ACD's 2026 coordinated text; not an application dependency."""
import urllib.request,pathlib,hashlib,json
from pypdf import PdfReader
root=pathlib.Path(__file__).resolve().parents[1]/'evidence'
url='https://impotsdirects.public.lu/dam-assets/fr/legislation/LIR/texte-coordonn-en-vigueur-au-1er-janvier-2026-ver-08052026.pdf'
data=urllib.request.urlopen(url,timeout=45).read()
assert data.startswith(b'%PDF')
p=root/'acd-lir-2026.pdf';p.write_bytes(data)
pages=PdfReader(p).pages
(root/'acd-lir-2026.pdf.txt').write_text('\n\n'.join(f'PAGE {i+1}\n'+page.extract_text() for i,page in enumerate(pages)),encoding='utf8')
(root/'tax-download.json').write_text(json.dumps(dict(url=url,pages=len(pages),sha256=hashlib.sha256(data).hexdigest(),checked='2026-10-15',status='ACD coordinated informational text effective 1 January 2026; official Journal texts prevail'),indent=2),encoding='utf8')
print('Saved ACD coordinated 2026 text:',len(pages),'pages; SHA256',hashlib.sha256(data).hexdigest())
