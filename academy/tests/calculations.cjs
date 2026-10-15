const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');const root=path.resolve(__dirname,'..');
const sum=a=>a.reduce((s,x)=>s+x,0);const methods={
simple_interest:([p,r,t])=>p*r*t,net_revenue:([r,...c])=>r-sum(c),expected_net:([p,r,c])=>p*r-c,
equilibrium:([a,b,c,d])=>{const price=(a-c)/(b+d);return[price,a-b*price];},operating_profit:([p,q,v,f])=>(p-v)*q-f,
weighted:([q,p])=>sum(q.map((n,i)=>n*p[i])),real_return:([r,i])=>((1+r)-(1+i))/(1+i),
growth_chain:([p,...rs])=>rs.reduce((v,r)=>v+v*r,p),domestic_spend:([x,s,m])=>x*s-x*s*m,
difference:([a,b])=>a-b,interest_change:([p,a,b])=>p*b-p*a,discount:([fv,r,n])=>{let v=fv;for(let i=0;i<n;i++)v/=1+r;return v;},
sum,ratio:([a,b])=>a/b,growth_ratio:([d,r,g])=>d+(d*(r-g))/(1+g),
bond_price:([f,c,y,n])=>c*(1-(1+y)**-n)/y+f*(1+y)**-n,
fx_net:([foreign,quote,cost])=>foreign/quote-cost,spread_cost:([bid,ask,q])=>ask*q-bid*q,
home_return:([r,start,end])=>((1+r)*start-end)/end,issue_net:([n,p,c])=>n*p-c,
weighted_less:([q,p,c])=>sum(q.map((n,i)=>n*p[i]))-c,net_sale:([q,p,c])=>q*p-c,
price_return:([old,now])=>(now-old)/old,redemption_net:([q,p,fee])=>q*p-q*p*fee};
let rows=[];for(const l of require('../content/lessons.cjs'))for(const c of l.calculations||[]){assert.ok(methods[c.method],c.method);const actual=methods[c.method](c.inputs),a=Array.isArray(actual)?actual:[actual],e=Array.isArray(c.expected)?c.expected:[c.expected];assert.equal(a.length,e.length);a.forEach((v,i)=>assert.ok(Math.abs(v-e[i])<=Math.max(1e-8,Math.abs(e[i])*1e-9),`${l.id}/${c.id}: ${v} != ${e[i]}`));rows.push({lesson:l.id,id:c.id,method:c.method,actual,expected:c.expected,status:'PASS'});}
fs.writeFileSync(path.join(root,'evidence/calculation-results.json'),JSON.stringify({date:'2026-10-15',checks:rows.length,rows},null,2));console.log(rows.length+' numerical example checks passed.');
