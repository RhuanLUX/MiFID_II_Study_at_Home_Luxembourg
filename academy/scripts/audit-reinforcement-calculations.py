from pathlib import Path
import json, hashlib
from decimal import Decimal as D, getcontext, ROUND_CEILING, ROUND_HALF_UP
getcontext().prec=45
root=Path(__file__).resolve().parents[1]
def dec(x):
    if isinstance(x,list): return [dec(v) for v in x]
    return D(str(x))
def rounded(x): return x.quantize(D('.01'),rounding=ROUND_HALF_UP)
def ceiling(x): return x.quantize(D('.01'),rounding=ROUND_CEILING)
def irr(a,b,v):
    # Solve terminal-value equation with Decimal Newton iterations.
    x=D(1)
    for _ in range(100): x-=(a*x*x+b*x-v)/(2*a*x+b)
    return x-1
def stats(a,b):
    n=D(len(a));ma=sum(a)/n;mb=sum(b)/n
    cross=sum((x-ma)*(y-mb) for x,y in zip(a,b));va=sum((x-ma)**2 for x in a);vb=sum((y-mb)**2 for y in b)
    return [cross/(n-1),cross/(va*vb).sqrt()]
def margin(p,a,b,c,m,i,t):
    cash=i;posted=D(0);previous=p
    for price in [a,b,c]:
        cash+=(price-previous)*m
        if cash<t: posted+=i-cash;cash=i
        previous=price
    return [posted,cash-i-posted]
def vol(a):
    n=D(len(a));mean=sum(a)/n
    return (sum((v-mean)**2 for v in a)/(n-1)).sqrt()
# Independent Decimal implementation; no JavaScript method imports/evaluation.
F={
'expected_job':lambda r,p,a,b,h,w:[r*p-a-b,r*p-a-b-h*w],
'equilibrium':lambda a,b,c,d:[(a-c)/(b+d),a-b*(a-c)/(b+d)],
'profit_change':lambda p,q,P,Q,v,f:[(P-v)*Q-f,((P-v)*Q-f)/((p-v)*q-f)-1],
'real_return':lambda r,i:(1+r)/(1+i)-1,
'inflated_goal':lambda p,a,b:[p*(1+a)*(1+b),p*((1+a)*(1+b)-1)],
'deficit_decomposition':lambda r,e,R,E,p:[E+p-R,E+p-R-e+r,E-R-e+r,p],
'combined_profit':lambda p,r,c,i:p+r-c-i,
'interest_change':lambda p,a,b:[p*a,p*b,p*(b-a)],
'net_lending':lambda y,c,i,a:[y-c,y-c-i,a-y+c+i],
'sector_balance':lambda s,i,t,g,I:[s-i+t-g,s-I+t-g],
'debt_ratio':lambda d,g,Dd,G:[d/g,Dd/G],
'refinancing_interest':lambda d,m,r,R:d*r+m*(R-r),
'debt_issuance':lambda d,m,f,c:[m+f+c,d+f+c],
'growth':lambda p,r,n:p*(1+r)**n,
'fx_margin':lambda a,r,c:a/r-c,
'shock_profit':lambda p,e,r,a,c:p-e*r+a-c,
'weighted_loss':lambda p,t,r,h:p*h*r/t,
'spread_cost':lambda n,b,a:[n*(a-b),1-b/a],
'foreign_return':lambda p,x,r,X:[p*x*(1+r)/X,x*(1+r)/X-1],
'allocation':lambda a,d,r:a*r/d,
'issue_cashflows':lambda n,p,c,r:[n*p-c,n*r,n],
'route_proceeds':lambda a,p,b,P,c,n,d,C:[a*p+b*P-c,n*d-C],
'weighted_execution':lambda a,p,b,P,c,z,f:[(a*p+b*P+c*z)/(a+b+c),(a*p+b*P+c*z+f)/(a+b+c)],
'redemption_gap':lambda n,p,c,g:[n*p*(1-c),g-n*p*(1-c)],
'equivalent_monthly':lambda r:(1+r)**(D(1)/12)-1,
'annuity_future':lambda c,r,n:sum(c*(1+r)**i for i in range(int(n))),
' two_present_values':lambda a,t,b,T,r:a/(1+r)**t+b/(1+r)**T,
'effective_nominal':lambda r,m:(1+r/m)**m-1,
'goal_funding':lambda f,r,n,p:[ceiling(f/(1+r)**n),rounded(f-p*(1+r)**n)],
'capped_note':lambda p,a,r,c:p*(1+min(c,a*max(r,D(0)))),
'barrier_pair':lambda p,c,b,a,A:[p*(1 if a>=b else a)+c,p*(1 if A>=b else A)+c],
'exit_cash_pair':lambda p,a,b:[p-a,p-b],
'difference':lambda a,b:a-b,
'investment_profit':lambda n,p,c,P,C,d:[n*P-C-n*p-c,n*P-C-n*p-c+d],
'tax_credit_cash':lambda g,w,t,c:[t-c,w+t-c,g-w-t+c],
'income_share':lambda d,f:d/(d+f),
'net_income_yield':lambda c,t,p:[c*(1-t),c*(1-t)/p],
'dividend_assessment':lambda d,e,c,a,r,w:[d*(1-e)-c-a,(d*(1-e)-c-a)*r,w-(d*(1-e)-c-a)*r],
'coverage_excess':lambda a,b,c:max(D(0),a+b-c),
'simple_interest':lambda p,r,d,b:p*r*d/b,
'collateral_ceiling':lambda p,h:ceiling(p/(1-h)),
'collateral_margin':lambda e,v,h:[e-v*(1-h),ceiling((e-v*(1-h))/(1-h))],
'bill_yield':lambda f,p,d,b:[f/p-1,(f/p-1)*b/d],
'discount_bill_cost':lambda f,r,d,b,c:[f*(1-r*d/b)+c,f/(f*(1-r*d/b)+c)-1],
'benchmark_floor':lambda p,r,m,d,b:[p*(max(r,D(0))+m)*d/b,p*(max(r,D(0))-r)*d/b],
'dirty_cash':lambda n,p,c,d,b,f:n*(p+c*d/b)+f,
'coupon_holding':lambda p,c,d,b:[c*(1-d/b),c*(1-d/b)/(p+c*d/b)],
'one_payment_net':lambda p,c,f:f/(p+c)-1,
'coupon_terminal':lambda f,c,y,r:[c*(1+r)+f+c,((c*(1+r)+f+c)/(c/(1+y)+(f+c)/(1+y)**2)).sqrt()-1],
'duration_change':lambda p,d,y:-p*d*y,
'convexity_pair':lambda d,c,y:[-d*y+c*y*y/2,d*y+c*y*y/2],
'priority_recovery':lambda a,s,u,c:min(D(1),max(D(0),a-s)/u)*c,
'expected_receipt':lambda p,f,s,r:[s*f+(1-s)*r,f-(s*f+(1-s)*r),(s*f+(1-s)*r)/p-1],
'sale_shortfall':lambda n,p,c,g:[n*p-c,g-n*p+c],
'goal_sale':lambda g,s,c,n:[s+c*n,g-s-c*n],
'bond_after_tax':lambda p,f,c,t:[f+c*(1-t)-p,(f+c*(1-t))/p-1],
'conditional_net':lambda g,c,a,b,x:[g-c-a,g-c-b,g-c-a-x,g-c-b-x],
'zero_duration':lambda f,n,y,Y:[n/(1+y),-n*(Y-y)/(1+y),f/(1+y)**n,f/(1+Y)**n],
'class_votes':lambda a,b,x,y,h:[h/(a+b),h*y/(a*x+b*y)],
'equity_issue':lambda n,p,N,P,h:[(n*p+N*P)/(n+N),h*(n*p+N*P)/(n+N),h/(n+N)],
'gordon_pair':lambda d,r,R,g:[d/(r-g),d/(R-g)],
'adjusted_multiple':lambda e,x,n,N,m:(e-x)*m/(n+N),
'investment_return':lambda n,p,c,P,C,d:(n*P-C+d)/(n*p+c)-1,
' two_return_recovery':lambda p,a,b:[p*(1+a)*(1+b),((1+a)*(1+b)).sqrt()-1,1/((1+a)*(1+b))-1],
'weighted_return':lambda w,r,W,R:w*r+W*R,
'reserve_goal':lambda c,e,r,g:[c+e*(1+r),g-c-e*(1+r)],
'dividend_actual_expense':lambda d,e,c,r:[(d-c)*(1-e),(d-c)*(1-e)*r],
'equity_tax_timeline':lambda p,s,d,e,t:[s-p+d-d*(1-e)*t,s-p+d-d*(1-e)*t-(s-p)*t],
'linear_future':lambda p,P,m,n:(P-p)*m*n,
'forward_fx_cost':lambda f,s,k:[f/s,k-f/s],
'basis_hedge':lambda q,k,s,f:[q*s+q*(k-f),s-f],
'margin_path':margin,
'physical_call':lambda n,k,p,s:[n*k,n*(max(s-k,D(0))-p)],
'covered_call_pair':lambda n,p,k,c,a,b:[n*(min(a,k)-p+c),n*(min(b,k)-p+c)],
'short_put_bounds':lambda n,k,p:[n*(k-p),n*p],
'partial_put':lambda n,p,m,k,c,s:[n*s+m*max(k-s,D(0)),n*p+m*c-n*s-m*max(k-s,D(0))],
'hedge_quantity':lambda p,b,n:p*b/n,
'overhedge':lambda f,a,k,s:[f/k-(f-a)/s,a/k,a/k-f/k+(f-a)/s],
'tax_branch_difference':lambda p,g,a,b:[p+g*(1-a),p+g*(1-b),g*(a-b)],
'annual_option_profit':lambda s,c,p,C,o,t:[s-c-p-C,s-c-p-C+o,(s-c-p-C+o)*(1-t)],
'fx_divide':lambda a,r:a/r,
'fx_roundtrip_fees':lambda p,b,a,f,F:[(p*b-f)/a-F,p-(p*b-f)/a+F],
'synthetic_sell':lambda a,b,c:a*b/c,
'fx_route_compare':lambda p,d,f,u,F,j,J:[p*d-f,(p*u-F)*j-J,(p*u-F)*j-J-p*d+f],
'foreign_net':lambda p,q,r,c,Q,C:[(p*q*(1+r)-c)/Q-C,((p*q*(1+r)-c)/Q-C)/p-1],
'partial_fx':lambda a,h,k,s,S,c:[a*h/k+a*(1-h)/s-c,a*h/k+a*(1-h)/S-c],
'principal_hedge_loss':lambda a,v,k,s,S:[a/k-(a-v)/s,a/k-(a-v)/S],
'fund_net_holder':lambda a,g,e,n,h,c,p:[(a+g-e)/n,h*(a+g-e)/n-c,(h*(a+g-e)/n-c)/p-1],
'fund_redemption_return':lambda n,p,f,c,i:[n*p*(1-f)-c,(n*p*(1-f)-c)/i-1],
'distributed_swing':lambda n,p,d,s,c:n*(p-d)*(1-s)-c+n*d,
'tracking_gap':lambda p,f,i:[f-i,p*(1+f),p*(i-f)],
'concentration_aggregate':lambda *a:sum(w for w in a if w>5),
'fee_factor':lambda r,f:(1+r)*(1-f),
'entry_added_return':lambda p,f,r:[p/(1+f),p*(1+r)/(1+f),(1+r)/(1+f)-1],
'gate_timeline':lambda n,h,p,P,g:[n*h*p,g-n*h*p,n*h*p+n*(1-h)*P],
'fund_distribution_compare':lambda p,a,b,d:[p*(1+a),p*(1+b)+d,p*(a-b)-d],
'fund_overlap':lambda p,x,w,y,W,r:[x*w+y*W,(x*w+y*W)/(p+y),(x*w+y*W)*r,(x*w+y*W)*r/(p+y)],
'subscription_tax':lambda a,b,c,d,r,n,h:[(a+b+c+d)*r/4,(a+b+c+d)*r*h/(4*n)],
'weighted_amount':lambda p,w:p*w,
'intensity_weights':lambda a,b,w,W:[w*a+(1-w)*b,W*a+(1-W)*b,((w-W)*(a-b))/(w*a+(1-w)*b)],
'absolute_intensity':lambda e,r,E,R:[E/e-1,e/r,E/R,(E/R)/(e/r)-1],
'turnover_programme':lambda n,a,b,c,p:[n*(a-b)*c,n*(a-b)*c-p],
'transition_profit':lambda e,c,p,i:[e*c,e*c*(1-p),i-e*c*(1-p)],
'physical_cash_need':lambda r,c,d,b,i,a:r+c*d/b-i+a,
'uncommitted':lambda a,b,c,d:a-b-c-d,
'loss_boundary':lambda p,g:1-g/p,
'retirement_flows':lambda s,i,e,n:[s*n,(e-i)*n,-s*n-(e-i)*n],
'inheritance_loss':lambda a,b,p,r:[p*r,p*r/(a+b)],
'client_remaining':lambda p,r,c,s,n:p*(1+r)-c+s*n,
'return_series':lambda p,*rs:[p*product(1+r for r in rs),product(1+r for r in rs)-1,sum(rs)/len(rs)],
'withdrawal_sequence':lambda p,w,a,b:[(p*(1+a)-w)*(1+b),(p*(1+b)-w)*(1+a)],
'sample_volatility':lambda *a:vol(a),
'annual_volatility':lambda s,n,p:[s*n.sqrt(),p*s*n.sqrt()],
'paired_stats':stats,
'rebalance_two':lambda a,b,r,R,w:[a*(1+r)+b*(1+R),(a*(1+r)+b*(1+R))/(a+b)-1,a*(1+r)-(a*(1+r)+b*(1+R))*w],
'leveraged_return':lambda e,d,c,r:[(e+d)*r-d*c,((e+d)*r-d*c)/e],
'portfolio_volatility':lambda w,W,s,S,r:(w*w*s*s+W*W*S*S+2*w*W*r*s*S).sqrt(),
'minimum_variance':lambda a,b,r:(b*b-r*a*b)/(a*a+b*b-2*r*a*b),
'utility_comparison':lambda m,s,M,S,l,L:[m-l*s*s/2,M-l*S*S/2,m-L*s*s/2,M-L*S*S/2],
'allocation_headroom':lambda p,w,e,l,c:[p*w-e,l-c],
'switch_break_even':lambda p,r,c:[p*r-c,c/(p*r)],
'riskfree_mix':lambda w,r,f,s:[w*r+(1-w)*f,abs(w)*s],
'client_pool_equity':lambda p,c,r,w:[p-c-r,(p-c-r)*w,(p-c-r)*w/p],
'required_goal_growth':lambda p,g,n,r:[(g/p)**(1/n)-1,p*(1+r)**n,g-p*(1+r)**n],
'net_active':lambda p,g,c,b:[(g-c)/p,(g-c)/p-b,g-c-p*b],
'cumulative_active':lambda a,b,c,d:[(1+a)*(1+b)-(1+c)*(1+d),(1+a)*(1+b)/((1+c)*(1+d))-1],
'sharpe_pair':lambda a,s,b,S,f:[(a-f)/s,(b-f)/S],
'two_contribution_irr':irr,
'guarantee_bonus':lambda p,r,b,o:[p*(1+r),p*(1+r)+b,p*(1+r)-o],
'unit_policy_value':lambda p,e,u,U,c,r:[p*(1-e)/u,p*(1-e)/u*U*(1-c)-r,1-(p*(1-e)/u*U*(1-c)-r)/p],
'benefit_floor_split':lambda v,f,w:[max(v,f),max(v,f)*w,max(v,f)*(1-w)]
}
F={k.strip():v for k,v in F.items()}
def product(xs):
    v=D(1)
    for x in xs:v*=x
    return v
def close(a,b):
    if isinstance(b,list):
        assert len(a)==len(b)
        for x,y in zip(a,b):close(x,y)
    else: assert abs(a-b)<D('0.0000001'),(str(a),str(b))
rows=[]
for path in sorted((root/'content/reinforcement').glob('*.json')):
    for i,q in enumerate(json.loads(path.read_text(encoding='utf-8'))):
        if 'calculation' not in q:continue
        c=q['calculation'];actual=F[c['method']](*dec(c['inputs']));close(actual,dec(c['expected']))
        rows.append({'exercise':path.stem+'-R'+str(i+1),'method':c['method'],'result':str(actual),'status':'PASS'})
# Later lessons: independently derive displayed correct results directly from reading/exercise premises.
# Each expected string below is the displayed result, not an imported JavaScript expectation.
extra=[
('EIP-6.1-03-R3',D(100000)/6000,'16.67'),
('EIP-6.1-03-R4',D(100000)*D('1.02')-D('11132.65'),'90867.35'),
('EIP-6.1-03-R5',D(6000)/D('1.02')**20,'4037.83'),
('EIP-6.2-01-R4',(D(3200)-2400-300)*12,'6000.00'),
('EIP-6.2-01-R5',(D(30000)-6000)*2-40000,'8000.00'),
('EIP-6.2-02-R4',(D(100000)*D('.8')-10000)*D('1.2')-10000,'74000.00'),
('EIP-6.2-02-R5',D(12000)*(30-20),'120000.00'),
('EIP-6.2-03-R4',D(18000)-13000-D(7000)*D('.7'),'100.00'),
('EIP-6.2-03-R5',D(20000)*(D('1.04')**20-D('1.03')**20),'7700.24'),
('EIP-6.2-04-R4',D(4500)*D('.3'),'1350.00'),
('EIP-6.2-04-R5',D(20000)*D('.3'),'6000.00'),
('EIP-7.1-01-R4',D(100)*50+10+5,'5015.00'),
('EIP-7.1-01-R5',D(50000)/100000*100,'50.00'),
('EIP-7.1-02-R4',D(25000)*D('.98')*D('1.04')-25000,'480.00'),
('EIP-7.1-02-R5',D(28000)-D(30000)*D('.8'),'4000.00'),
('EIP-7.1-03-R4',D(600)/50000*100,'1.20'),
('EIP-7.1-03-R5',D(60000)*(D('.012')-D('.007'))+300,'600.00'),
('EIP-7.1-04-R3',D(1000)+500,'1500.00'),
('EIP-7.1-04-R4',D(30)/D('1.2'),'25.00'),
('EIP-7.1-04-R5',D(19800)*(1+D('.06')-D('.008')-D('.005'))-40,'20690.60'),
('EIP-7.1-05-R4',D(50000)*D('.15'),'7500.00'),
('EIP-7.1-05-R5',D(38000)-34000,'4000.00'),
('EIP-7.1-06-R3',D(100000000)*(D('.2')-D('.1')),'10000000.00'),
('EIP-7.1-06-R4',D(5)/4,'1.25'),
('EIP-7.1-06-R5',D(25)-15,'10.00'),
('EIP-7.2-01-R4',(D(400)*D('24.98')+30)-(D(400)*25+18),'4.00'),
('EIP-7.2-01-R5',D(12500)-8000,'4500.00'),
('EIP-7.2-02-R4',D(50000)*8,'400000.00'),
('EIP-7.2-03-R4',D(210000)/240000*100,'87.50'),
('EIP-7.3-01-R3',D(7500)/150000*100,'5.00'),
('EIP-7.3-01-R4',D(80000000)*D('.08')*D('.006'),'38400.00'),
('EIP-7.3-02-R4',D(100000)*(D('.012')-D('.006')),'600.00'),
('EIP-M8-01-R3',(D(42)+28)/100*100,'70.00'),
('EIP-M8-01-R4',D(10000)*(D('.0375')-D('.035'))*2,'50.00'),
('EIP-M8-01-R5',D(20000)*(1-7*D('.01')),'18600.00'),
('EIP-M8-02-R3',D(35)/100*100,'35.00'),
('EIP-M8-02-R4',D(22)-20,'2.00'),
('EIP-M8-02-R5',(D(4)+D('1.5')-D('1.5'))/10*100,'40.00'),
('EIP-M8-03-R4',D('.6')*100+D('.4')*20,'68.00'),
('EIP-M8-03-R5',(D('.5')*80+D('.3')*20)/D('.8'),'57.50'),
('EIP-M8-04-R5',(D('.8')*60+D('.2')*200-100)/100*100,'-12.00')]
for id,value,expected in extra:
    assert rounded(value)==D(expected),(id,str(value),expected)
    rows.append({'exercise':id,'method':'direct-premise Decimal derivation','result':str(value),'status':'PASS'})
report={'date':'2026-10-16','build_sha256':json.loads((root/'dist/manifest.json').read_text())['sha256'],'exercise_file_sha256':{p.name:hashlib.sha256(p.read_bytes()).hexdigest() for p in sorted((root/'content/reinforcement').glob('*.json'))},'method':'Independent Python Decimal45-digit arithmetic; explicit formulas, no JavaScript execution','metadata_examples':len(rows)-len(extra),'additional_direct_premise_checks':len(extra),'total_checks':len(rows),'status':'PASS','rows':rows,'limitations':['Numerical verification is distinct from legal interpretation and independent specialist approval.','This script checks stated models; plausible wrong alternatives and answer meaning receive authoring/content review, not proof from arithmetic alone.']}
(root/'evidence/reinforcement-decimal-results.json').write_text(json.dumps(report,indent=2),encoding='utf-8')
print(json.dumps({k:v for k,v in report.items() if k not in ('rows','exercise_file_sha256')}))
