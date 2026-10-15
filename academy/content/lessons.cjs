const fs=require('node:fs'),path=require('node:path');
module.exports=['tvm','bonds','suitability'].map(n=>require('./'+n+'.cjs')).concat(fs.readdirSync(path.join(__dirname,'units')).filter(n=>n.endsWith('.cjs')).sort().map(n=>require('./units/'+n)));
