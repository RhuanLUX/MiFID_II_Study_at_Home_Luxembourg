"""Optional research-only downloads; never used by the offline application."""
import hashlib,json,urllib.request,pathlib
root=pathlib.Path(__file__).resolve().parents[1]/'evidence'
urls={
'efpa-syllabus.pdf':'https://www.efpa.lu/_files/ugd/f712b2_ccdb8d34e71c4a04a2faa62faa709afa.pdf',
'efpa-exam.pdf':'https://www.efpa.lu/_files/ugd/f712b2_20da821c4d0f46ea97939e96d99122cc.pdf',
'esma-suitability.pdf':'https://www.esma.europa.eu/sites/default/files/2023-04/ESMA35-43-3172_Guidelines_on_certain_aspects_of_the_MiFID_II_suitability_requirements.pdf'}
log=[]
for name,url in urls.items():
    try:
        data=urllib.request.urlopen(url,timeout=35).read()
        assert data.startswith(b'%PDF')
        (root/name).write_bytes(data)
        from pypdf import PdfReader
        pages=PdfReader(root/name).pages
        (root/(name+'.txt')).write_text('\n\n'.join(f'PAGE {i+1}\n'+p.extract_text() for i,p in enumerate(pages)),encoding='utf8')
        log.append(dict(file=name,url=url,verified_at='2026-10-15',pages=len(pages),sha256=hashlib.sha256(data).hexdigest()))
    except Exception as e:log.append(dict(file=name,url=url,error=str(e)))
(root/'downloads.json').write_text(json.dumps(log,indent=2),encoding='utf8')
print(json.dumps(log,indent=2))
