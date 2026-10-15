// Development preview only; the delivered HTML opens directly without a server.
const http=require('node:http'),fs=require('node:fs'),path=require('node:path');const file=path.resolve(__dirname,'../dist/EIP_Luxembourg_Academy.html');
http.createServer((req,res)=>{if(req.url==='/'||req.url==='/EIP_Luxembourg_Academy.html'){res.writeHead(200,{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store'});res.end(fs.readFileSync(file));}else{res.writeHead(404);res.end('Not found');}}).listen(8765,'127.0.0.1',()=>console.log('Local: http://127.0.0.1:8765'));
