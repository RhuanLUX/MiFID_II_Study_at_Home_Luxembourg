const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');const root=path.resolve(__dirname,'..');
const sum=a=>a.reduce((s,x)=>s+x,0);const cashflows=([f,c,y,n])=>Array.from({length:n},(_,i)=>({t:i+1,pv:(c+(i===n-1?f:0))/(1+y)**(i+1)}));
const macaulay=a=>{const cf=cashflows(a);return sum(cf.map(x=>x.t*x.pv))/sum(cf.map(x=>x.pv));};
const methods={
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
price_return:([old,now])=>(now-old)/old,redemption_net:([q,p,fee])=>q*p-q*p*fee,
contribution_series:([c,r,n,due])=>sum(Array.from({length:n},(_,i)=>c*(1+r)**(i+(due?1:0)))),
periodic_effective:([annual,m])=>(1+annual)**(1/m)-1,dated_pv:([flows,r])=>sum(flows.map(([c,t])=>c/(1+r)**t)),
haircut_inverse:([cash,h])=>cash/(1-h),margin_collateral:([cash,mv,h])=>(cash-mv*(1-h))/(1-h),
annual_simple:([p,f,d,b])=>(f-p)/p*b/d,discount_quote_price:([f,r,d,b])=>f-f*r*d/b,
simple_discount:([f,r,t])=>f/(1+r*t),overnight_interest:([p,rs,ds,b])=>p*(rs.reduce((v,r,i)=>v*(1+r*ds[i]/b),1)-1),
ytm_bisection:([p,f,c,n])=>{let low=-.5,high=1;for(let i=0;i<100;i++){const y=(low+high)/2,cf=cashflows([f,c,y,n]);if(sum(cf.map(x=>x.pv))>p)low=y;else high=y;}return(low+high)/2;},
terminal_rate:([p,f,n])=>(f/p)**(1/n)-1,macaulay,modified:a=>macaulay(a)/(1+a[2]),
convexity:a=>{const cf=cashflows(a);return sum(cf.map(x=>x.t*(x.t+1)*x.pv))/(sum(cf.map(x=>x.pv))*(1+a[2])**2);},
product:a=>a.reduce((v,x)=>v*x,1),coupon_terminal:([f,c,r,n])=>f+sum(Array.from({length:n},(_,i)=>c*(1+r)**i))};
let rows=[];for(const l of require('../content/lessons.cjs'))for(const c of l.calculations||[]){assert.ok(methods[c.method],c.method);const actual=methods[c.method](c.inputs),a=Array.isArray(actual)?actual:[actual],e=Array.isArray(c.expected)?c.expected:[c.expected];assert.equal(a.length,e.length);a.forEach((v,i)=>assert.ok(Math.abs(v-e[i])<=Math.max(1e-8,Math.abs(e[i])*1e-9),`${l.id}/${c.id}: ${v} != ${e[i]}`));rows.push({lesson:l.id,id:c.id,method:c.method,actual,expected:c.expected,status:'PASS'});}
fs.writeFileSync(path.join(root,'evidence/calculation-results.json'),JSON.stringify({date:'2026-10-15',checks:rows.length,rows},null,2));console.log(rows.length+' numerical example checks passed.');
