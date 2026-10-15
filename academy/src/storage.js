(function(root){
'use strict';
const APP='eip-luxembourg-textbook',KEY='eip-luxembourg-textbook-progress',VERSION=1;
const fresh=()=>({app:APP,version:VERSION,completed:{},notes:{},lastLesson:null,updatedAt:null});
const plain=x=>x!==null&&typeof x==='object'&&!Array.isArray(x);
function validate(x){
 if(!plain(x)||x.app!==APP||x.version!==VERSION)throw Error('Unrecognised backup or unsupported version. Your existing progress has not been replaced.');
 for(const key of ['completed','notes']){
  if(!plain(x[key]))throw Error('Invalid '+key+' data.');
  for(const [id,value]of Object.entries(x[key])){
   if(!/^EIP-[A-Za-z0-9.\-]+$/.test(id)||typeof value!=='string'||value.length>1000000)throw Error('Invalid lesson entry.');
   if(key==='completed'&&!Number.isFinite(Date.parse(value)))throw Error('Invalid completion date.');
  }
 }
 if(x.lastLesson!==null&&(typeof x.lastLesson!=='string'||!/^EIP-[A-Za-z0-9.\-]+$/.test(x.lastLesson)))throw Error('Invalid last lesson.');
 // Copy only the documented fields; unknown lesson IDs survive future curriculum updates.
 return {app:APP,version:VERSION,completed:{...x.completed},notes:{...x.notes},lastLesson:x.lastLesson,updatedAt:typeof x.updatedAt==='string'?x.updatedAt:null};
}
function load(storage){try{const raw=storage.getItem(KEY);if(!raw)return {state:fresh(),readOnly:false};try{return {state:validate(JSON.parse(raw)),readOnly:false};}catch(e){return {state:fresh(),readOnly:true,recovery:raw,error:e.message+' Export the recovery copy before replacing stored data.'};}}catch(e){return {state:fresh(),readOnly:false,error:'Browser storage is unavailable. Changes stay in this tab; export a backup before closing.'};}}
function save(storage,state){try{storage.setItem(KEY,JSON.stringify(validate(state)));return null;}catch(e){return 'Progress could not be saved locally. Export a backup before closing this tab.';}}
function nextLesson(lessons,state){return lessons.find(l=>!state.completed[l.id])?.id||state.lastLesson||lessons[0]?.id;}
const api={APP,KEY,VERSION,fresh,validate,load,save,nextLesson};
if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.TextbookStorage=api;
})(typeof window==='undefined'?globalThis:window);
