const {chromium}=require('playwright'),fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),{pathToFileURL}=require('node:url');
const root=path.resolve(__dirname,'..'),groups=require('../content/reinforcement/index.cjs'),manifest=require('../dist/manifest.json');
(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true}),context=await browser.newContext({offline:true,viewport:{width:1200,height:900}}),page=await context.newPage();let errors=[],requests=[],checked=0;
 page.on('pageerror',e=>errors.push(e.message));page.on('request',r=>{if(/^https?:/.test(r.url()))requests.push(r.url());});await page.goto(pathToFileURL(path.join(root,'dist/EIP_Luxembourg_Academy.html')).href);
 const open=async id=>{if(await page.locator('#menu').isVisible()&&await page.locator('#sidebar').getAttribute('data-collapsed')==='true')await page.locator('#menu').click();await page.locator('[data-lesson="'+id+'"]').click();};
 for(const [id,qs] of Object.entries(groups)){
  await open(id);assert.equal(await page.locator('.reinforcement-exercise').count(),5);
  assert.equal(await page.evaluate(()=>document.querySelector('.notes-panel').nextElementSibling.id),'knowledge-reinforcement');
  assert.equal(await page.evaluate(()=>!!document.querySelector('#knowledge-reinforcement').nextElementSibling.querySelector('#complete')),true);
  // Completion remains independent of all five unanswered exercises.
  if(await page.locator('#complete').getAttribute('aria-pressed')==='false')await page.locator('#complete').click();assert.equal(await page.locator('#complete').getAttribute('aria-pressed'),'true');
  for(const q of qs){let card=page.locator('[data-exercise="'+q.id+'"]');assert.equal(await card.locator('input:not([type=radio]),textarea,input[type=file]').count(),0);assert.equal(await card.locator('[data-action=check]').isDisabled(),true);
   if(q.type==='matching'){for(let i=0;i<q.answer.length;i++)await card.locator('select').nth(i).selectOption(String(i===0?(q.answer[i]+1)%q.answer.length:q.answer[i]));}
   else await card.locator('input[type=radio]').nth((q.answer+1)%4).check();
   await card.locator('[data-action=check]').click();assert.equal(await card.locator('.reinforcement-feedback strong').first().textContent(),'Incorrect');assert.ok((await card.locator('.reinforcement-feedback').textContent()).includes(q.explanation.en));
   if(q.type!=='matching')assert.ok((await card.locator('.answer-correct').textContent()).includes(q.options[q.answer].en));
   await page.locator('#translate').click();assert.ok((await card.locator('.reinforcement-feedback').textContent()).includes(q.explanation.pt));assert.ok((await card.textContent()).includes(q.prompt.pt));
   await card.locator('[data-action=retry]').click();assert.equal(await card.locator('.reinforcement-feedback').count(),0);assert.equal(await card.locator('[data-action=check]').isDisabled(),true);
   if(q.type==='matching'){for(let i=0;i<q.answer.length;i++)await card.locator('select').nth(i).selectOption(String(q.answer[i]));}
   else await card.locator('input[type=radio]').nth(q.answer).check();
   // The existing eye control must retain an unsubmitted selection.
   await page.locator('#translate').click();assert.equal(await card.locator('[data-action=check]').isDisabled(),false);
   await card.locator('[data-action=check]').click();assert.equal(await card.locator('.reinforcement-feedback strong').first().textContent(),'Correct');assert.equal(await card.locator('.answer-incorrect').count(),0);checked++;
  }
 }
 await open('EIP-3.1-A');await page.locator('#knowledge-reinforcement').scrollIntoViewIfNeeded();await page.screenshot({path:path.join(root,'evidence/reinforcement-desktop.png')});
 for(const width of [390,1200]){await page.setViewportSize({width,height:900});for(const id of Object.keys(groups)){await open(id);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,id+' '+width);}}
 await page.setViewportSize({width:390,height:844});await open('EIP-3.1-A');await page.locator('#knowledge-reinforcement').scrollIntoViewIfNeeded();await page.screenshot({path:path.join(root,'evidence/reinforcement-mobile.png')});
 assert.deepEqual(errors,[]);assert.deepEqual(requests,[]);const report={date:require('../content/release.cjs').date,build_sha256:manifest.sha256,lessons:Object.keys(groups).length,exercises_checked_wrong_retry_correct:checked,offline:true,browser:'msedge',version:browser.version(),remote_requests:requests.length,page_errors:errors.length,translation_state_retained:true,completion_optional:true,placement_after_notes_before_navigation:true,responsive_checks:Object.keys(groups).length*2};fs.writeFileSync(path.join(root,'evidence/reinforcement-browser-results.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report));await browser.close();
})().catch(e=>{console.error(e);process.exit(1);});
