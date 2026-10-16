const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');const root=path.resolve(__dirname,'..');
const sum=a=>a.reduce((s,x)=>s+x,0);const cashflows=([f,c,y,n])=>Array.from({length:n},(_,i)=>({t:i+1,pv:(c+(i===n-1?f:0))/(1+y)**(i+1)}));
const mean=a=>sum(a)/a.length;
const variance=([a,sample])=>sum(a.map(x=>(x-mean(a))**2))/(a.length-(sample?1:0));
const covariance=([a,b,sample])=>sum(a.map((x,i)=>(x-mean(a))*(b[i]-mean(b))))/(a.length-(sample?1:0));
const macaulay=a=>{const cf=cashflows(a);return sum(cf.map(x=>x.t*x.pv))/sum(cf.map(x=>x.pv));};
const methods={
drawdown:([p,rs,withdrawals])=>rs.reduce((v,r,i)=>v*(1+r)-withdrawals[i],p),
annuity_payment:([pv,r,n])=>r===0?pv/n:pv*r/(1-(1+r)**-n),
min_variance_weight:([a,b,rho])=>(b*b-rho*a*b)/(a*a+b*b-2*rho*a*b),
utility:([mu,s,lambda])=>mu-lambda*s*s/2,excess_ratio:([r,rf,risk])=>(r-rf)/risk,
capm:([rf,beta,market])=>rf+beta*(market-rf),
irr_two_contributions:([first,second,terminal])=>(-second+Math.sqrt(second*second+4*first*terminal))/(2*first)-1,
mean,variance,volatility:a=>Math.sqrt(variance(a)),vol_scale:([s,n])=>s*Math.sqrt(n),covariance,
correlation:([a,b])=>covariance([a,b,1])/Math.sqrt(variance([a,1])*variance([b,1])),
portfolio_sigma:([w,a,b,rho])=>{assert.ok(Math.abs(rho)<=1&&a>=0&&b>=0,'Invalid covariance input');const v=w*w*a*a+(1-w)**2*b*b+2*w*(1-w)*rho*a*b;assert.ok(v>=-1e-12,'Negative model variance');return Math.sqrt(Math.max(0,v));},
capped_note:([p,participation,cap,returns])=>returns.map(r=>p*(1+Math.min(cap,Math.max(0,r)*participation))),
barrier_note:([p,c,barrier,ratios])=>ratios.map(r=>c+(r>=barrier?p:p*r)),
option_table:([type,k,p,spots])=>spots.map(s=>(type==='call'?Math.max(s-k,0):Math.max(k-s,0))-p),
protective_put:([initial,k,p,spots])=>spots.map(s=>s+Math.max(k-s,0)-initial-p),
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
fs.writeFileSync(path.join(root,'evidence/calculation-results.json'),JSON.stringify({date:require('../content/release.cjs').date,build_sha256:require('../dist/manifest.json').sha256,lessons:require('../content/lessons.cjs').length,checks:rows.length,rows},null,2));console.log(rows.length+' numerical example checks passed.');
