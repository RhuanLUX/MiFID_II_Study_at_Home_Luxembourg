const fs=require('node:fs'),path=require('node:path');
const pair=([en,pt])=>({en,pt});
const groups={};
for(const file of fs.readdirSync(__dirname).filter(f=>f.endsWith('.json')).sort()){
 const lessonId=path.basename(file,'.json'),raw=JSON.parse(fs.readFileSync(path.join(__dirname,file),'utf8'));
 groups[lessonId]=raw.map((q,i)=>({id:lessonId+'-R'+(i+1),lesson_id:lessonId,number:i+1,difficulty:['easy','easy','intermediate','intermediate','challenging'][i],type:q.type,prompt:pair(q.prompt),explanation:pair(q.explanation),blocks:q.blocks,...(q.type==='matching'?{concepts:q.concepts.map(pair),definitions:q.definitions.map(pair),answer:q.answer}:{options:q.options.map(pair),answer:q.answer}),...(q.calculation?{calculation:q.calculation}:{})}));
}
module.exports=groups;
