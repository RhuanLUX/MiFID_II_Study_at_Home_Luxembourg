(function(){
'use strict';
// Optional practice is transient and separate from reading progress/backups.
const responses=new Map();
const node=(tag,cls,text)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(text!==undefined)n.textContent=text;return n;};
function pair(text,parent,showPT,tag='p'){parent.append(node(tag,'',text.en));if(showPT){const p=node(tag,'translation',text.pt);p.lang='pt-BR';parent.append(p);}}
const same=(a,b)=>Array.isArray(b)?Array.isArray(a)&&a.length===b.length&&a.every((v,i)=>v===b[i]):a===b;
function render(exercises,showPT){
 const section=node('section','panel reinforcement');section.id='knowledge-reinforcement';
 pair({en:'Knowledge Reinforcement',pt:'Reforço do conhecimento'},section,showPT,'h2');
 pair({en:'Optional practice. Answer each exercise separately; you can complete the lesson without answering.',pt:'Prática opcional. Responda a cada exercício separadamente; você pode concluir a aula sem responder.'},section,showPT);
 for(const q of exercises){
  const state=responses.get(q.id)||{selected:q.type==='matching'?q.concepts.map(()=>null):null,checked:false};responses.set(q.id,state);
  const card=node('article','reinforcement-exercise');card.dataset.exercise=q.id;
  const difficulty={easy:['Easy','Fácil'],intermediate:['Intermediate','Intermediário'],challenging:['Challenging','Desafiador']}[q.difficulty];
  pair({en:'Exercise '+q.number+' · '+difficulty[0],pt:'Exercício '+q.number+' · '+difficulty[1]},card,showPT,'h3');
  pair(q.prompt,card,showPT);const fields=node('fieldset','reinforcement-options');const legend=node('legend','sr-only',q.type==='matching'?'Select each association':'Select one answer');fields.append(legend);
  const ready=()=>q.type==='matching'?state.selected.every(v=>v!==null):state.selected!==null;
  const check=node('button','button primary',showPT?'Check Answer · Verificar resposta':'Check Answer');check.type='button';check.dataset.action='check';check.disabled=!ready()||state.checked;
  if(q.type==='matching'){
   // Keep full definitions readable on narrow screens, where native selects clip text.
   const definitions=node('div','reinforcement-definitions');pair({en:'Definitions',pt:'Definições'},definitions,showPT,'strong');q.definitions.forEach((d,j)=>pair({en:String.fromCharCode(65+j)+'. '+d.en,pt:String.fromCharCode(65+j)+'. '+d.pt},definitions,showPT));fields.append(definitions);
   q.concepts.forEach((concept,i)=>{const row=node('div','reinforcement-match');const label=node('label');label.htmlFor=q.id+'-match-'+i;pair(concept,label,showPT,'span');const select=node('select');select.id=label.htmlFor;select.disabled=state.checked;const placeholder=node('option','',showPT?'Select… · Selecione…':'Select…');placeholder.value='';select.append(placeholder);q.definitions.forEach((d,j)=>{const o=node('option','',String.fromCharCode(65+j)+'. '+d.en+(showPT?' / '+d.pt:''));o.value=String(j);select.append(o);});select.value=state.selected[i]===null?'':String(state.selected[i]);select.onchange=()=>{state.selected[i]=select.value===''?null:Number(select.value);check.disabled=!ready();};if(state.checked)row.classList.add(state.selected[i]===q.answer[i]?'answer-correct':'answer-incorrect');row.append(label,select);fields.append(row);});
  }else q.options.forEach((option,i)=>{const label=node('label','reinforcement-option');const radio=node('input');radio.type='radio';radio.name=q.id;radio.value=String(i);radio.checked=state.selected===i;radio.disabled=state.checked;radio.onchange=()=>{state.selected=i;check.disabled=false;};const text=node('span');pair({en:String.fromCharCode(65+i)+'. '+option.en,pt:String.fromCharCode(65+i)+'. '+option.pt},text,showPT,'span');label.append(radio,text);if(state.checked){if(i===q.answer)label.classList.add('answer-correct');else if(i===state.selected)label.classList.add('answer-incorrect');}fields.append(label);});
  card.append(fields);const actions=node('div','actions');actions.append(check);card.append(actions);
  if(state.checked){const correct=same(state.selected,q.answer),feedback=node('div','reinforcement-feedback');feedback.setAttribute('role','status');feedback.tabIndex=-1;pair({en:correct?'Correct':'Incorrect',pt:correct?'Correto':'Incorreto'},feedback,showPT,'strong');
   if(q.type==='matching')q.concepts.forEach((c,i)=>pair({en:c.en+' → '+q.definitions[q.answer[i]].en,pt:c.pt+' → '+q.definitions[q.answer[i]].pt},feedback,showPT));
   else pair({en:'Correct answer: '+String.fromCharCode(65+q.answer)+'. '+q.options[q.answer].en,pt:'Resposta correta: '+String.fromCharCode(65+q.answer)+'. '+q.options[q.answer].pt},feedback,showPT);
   pair(q.explanation,feedback,showPT);card.append(feedback);const retry=node('button','button',showPT?'Try Again · Tentar novamente':'Try Again');retry.type='button';retry.dataset.action='retry';retry.onclick=()=>{responses.delete(q.id);replace(card,q.id);};actions.append(retry);
  }
  function replace(old,id){const fresh=render([q],showPT).querySelector('article');old.replaceWith(fresh);(fresh.querySelector('.reinforcement-feedback')||fresh.querySelector('input,select'))?.focus({preventScroll:true});}
  check.onclick=()=>{if(!ready())return;state.checked=true;replace(card,q.id);};section.append(card);
 }
 return section;
}
window.TextbookReinforcement={render};
})();
