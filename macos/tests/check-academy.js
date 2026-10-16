(()=>{
'use strict';
const assert=(condition,message)=>{if(!condition)throw Error(message);};
const D=JSON.parse(document.querySelector('#content-data').textContent);
assert(D.lessons.length===95,'95 lessons');
assert(Object.values(D.reinforcement).flat().length===475,'475 exercises');
assert(!localStorage.getItem('eip-luxembourg-textbook-progress'),'CI must start in a fresh account');
let exercises=0,translations=0;
const open=id=>document.querySelector('[data-lesson="'+id+'"]').click();
for(const s of D.curriculum.sessions){
 const lesson=D.lessons.find(l=>l.id===s.id);open(s.id);
 assert(document.querySelector('#lesson-title').textContent===lesson.title.en,s.id+' English');
 assert(!document.querySelector('#complete').disabled,'Optional completion');
 for(const q of D.reinforcement[s.id]){
  let card=()=>document.querySelector('[data-exercise="'+q.id+'"]');
  const choose=wrong=>{
   if(q.type==='matching')card().querySelectorAll('select').forEach((select,i)=>{select.value=String(wrong&&i===0?(q.answer[i]+1)%q.answer.length:q.answer[i]);select.dispatchEvent(new Event('change'));});
   else{const i=wrong?(q.answer+1)%4:q.answer,input=card().querySelectorAll('input[type=radio]')[i];input.checked=true;input.dispatchEvent(new Event('change'));}
  };
  choose(true);card().querySelector('[data-action=check]').click();
  assert(card().querySelector('.reinforcement-feedback strong').textContent==='Incorrect',q.id+' wrong feedback');
  assert(card().textContent.includes(q.explanation.en),q.id+' explanation');
  document.querySelector('#translate').click();
  assert(card().textContent.includes(q.prompt.pt)&&card().textContent.includes(q.explanation.pt),q.id+' PT');
  card().querySelector('[data-action=retry]').click();choose(false);
  document.querySelector('#translate').click();
  assert(!card().querySelector('[data-action=check]').disabled,q.id+' retained selection');
  card().querySelector('[data-action=check]').click();
  assert(card().querySelector('.reinforcement-feedback strong').textContent==='Correct',q.id+' correct');
  exercises++;
 }
 document.querySelector('#translate').click();
 for(const b of lesson.blocks){const element=document.getElementById(b.id);assert(element.querySelector('div.translation').textContent===b.text.pt.split(/\n+/).filter(Boolean).join(''),b.id+' complete translation');}
 translations++;document.querySelector('#translate').click();
}
assert(performance.getEntriesByType('resource').every(r=>!/^https?:/.test(r.name)),'Remote core resource');
open('EIP-3.1-A');document.querySelector('#notes').value='Original Mac note';document.querySelector('#notes').dispatchEvent(new Event('input'));document.querySelector('#complete').click();
open('EIP-3.1-02');document.querySelector('#notes').value='Mac persistence note — português ✓';document.querySelector('#notes').dispatchEvent(new Event('input'));
assert(document.querySelector('#storage-message').hidden,'Persistent storage unavailable');
return {lessons:95,translations,exercises_wrong_retry_correct:exercises,remote_core_resources:0,notes_seeded:true,completion_seeded:true};
})()
