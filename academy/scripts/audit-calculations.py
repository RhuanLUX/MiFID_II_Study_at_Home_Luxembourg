"""Second-pass recalculation, independent of the JavaScript test implementation.
Uses 60-digit Decimal arithmetic, explicit dated cash flows, numerical bond
derivatives and Newton solving. Inputs are exported from lesson data; expected
values are not used to produce the independent result.
"""
import json, math, pathlib, decimal
from decimal import Decimal as D
decimal.getcontext().prec=60
ROOT=pathlib.Path(__file__).resolve().parents[1]
def dec(x):
    if isinstance(x,list): return [dec(v) for v in x]
    if isinstance(x,bool) or isinstance(x,str): return x
    return D(str(x))
def total(a): return sum(a,D(0))
def prod(a):
    v=D(1)
    for x in a: v*=x
    return v
def cov(a,b,sample):
    n=D(len(a))
    return (total([x*y for x,y in zip(a,b)])-total(a)*total(b)/n)/(n-int(sample))
def price(f,c,y,n): return total([(c+(f if t==int(n) else 0))/(1+y)**t for t in range(1,int(n)+1)])
def derivatives(a):
    f,c,y,n=a; h=D('1e-10'); p=price(f,c,y,n)
    first=(price(f,c,y+h,n)-price(f,c,y-h,n))/(2*h)
    second=(price(f,c,y+h,n)-2*p+price(f,c,y-h,n))/(h*h)
    return p,first,second
def portvar(w,a,b,rho):
    weights=[w,1-w]; matrix=[[a*a,rho*a*b],[rho*a*b,b*b]]
    return total([weights[i]*matrix[i][j]*weights[j] for i in range(2) for j in range(2)])
def compute(name,a):
    if name=='simple_interest': return prod(a)
    if name=='net_revenue': return a[0]-total(a[1:])
    if name=='expected_net': return a[0]*a[1]-a[2]
    if name=='equilibrium':
        demand,slope,supply,up=a; p=(demand-supply)/(slope+up)
        q=supply+up*p
        assert demand-slope*p==q
        return [p,q]
    if name=='operating_profit': p,q,v,f=a; return q*p-q*v-f
    if name=='weighted': return total([x*y for x,y in zip(*a)])
    if name=='real_return': r,i=a; return (1+r)/(1+i)-1
    if name=='growth_chain': return a[0]*prod([1+x for x in a[1:]])
    if name=='domestic_spend': transfer,spend,imports=a; return transfer*spend*(1-imports)
    if name=='difference': return a[0]-a[1]
    if name=='interest_change': return a[0]*(a[2]-a[1])
    if name=='discount': f,r,n=a; return f/(1+r)**n
    if name=='sum': return total(a)
    if name=='ratio': return a[0]/a[1]
    if name=='growth_ratio': base,rate,growth=a; return base*(1+rate)/(1+growth)
    if name=='bond_price': return price(*a)
    if name=='fx_net': foreign,quote,fee=a; return foreign/quote-fee
    if name=='spread_cost': bid,ask,quantity=a; return quantity*(ask-bid)
    if name=='home_return': r,start,end=a; return (1+r)*(start/end)-1
    if name=='issue_net': nominal,p,fee=a; return nominal*p-fee
    if name=='weighted_less': q,p,fee=a; return total([x*y for x,y in zip(q,p)])-fee
    if name=='net_sale': quantity,p,fee=a; return quantity*p-fee
    if name=='price_return': old,new=a; return new/old-1
    if name=='redemption_net': units,nav,fee=a; return units*nav*(1-fee)
    if name=='contribution_series':
        c,r,n,due=a; balance=D(0)
        for _ in range(int(n)):
            if due: balance+=c
            balance*=1+r
            if not due: balance+=c
        return balance
    if name=='periodic_effective': annual,m=a; return ((1+annual).ln()/m).exp()-1
    if name=='dated_pv': flows,r=a; return total([cash/(1+r)**date for cash,date in flows])
    if name=='product': return prod(a)
    if name=='haircut_inverse': cash,haircut=a; return cash/(1-haircut)
    if name=='margin_collateral': cash,market,h=a; return cash/(1-h)-market
    if name=='annual_simple': p,f,days,basis=a; return (f/p-1)/(days/basis)
    if name=='discount_quote_price': f,r,days,basis=a; return f*(1-r*(days/basis))
    if name=='simple_discount': f,r,t=a; return f/(1+r*t)
    if name=='overnight_interest':
        p,rates,days,basis=a; balance=p
        for r,d in zip(rates,days): balance+=balance*r*d/basis
        return balance-p
    if name=='ytm_bisection':
        observed,f,c,n=a; y=D('.03');h=D('1e-10')
        for _ in range(50):
            residual=price(f,c,y,n)-observed
            if abs(residual)<D('1e-40'): break
            deriv=(price(f,c,y+h,n)-price(f,c,y-h,n))/(2*h)
            y-=residual/deriv
        assert abs(price(f,c,y,n)-observed)<D('1e-30')
        return y
    if name=='terminal_rate': initial,final,n=a; return ((final/initial).ln()/n).exp()-1
    if name in ('macaulay','modified','convexity'):
        p,first,second=derivatives(a)
        return {'macaulay':-(1+a[2])*first/p,'modified':-first/p,'convexity':second/p}[name]
    if name=='coupon_terminal':
        f,c,r,n=a; cash=D(0)
        for _ in range(int(n)): cash=cash*(1+r)+c
        return f+cash
    if name=='option_table':
        kind,k,p,spots=a
        return [max((s-k if kind=='call' else k-s),D(0))-p for s in spots]
    if name=='protective_put': initial,k,p,spots=a; return [max(s,k)-(initial+p) for s in spots]
    if name=='capped_note': principal,participation,cap,returns=a; return [principal+principal*min(cap,max(r,D(0))*participation) for r in returns]
    if name=='barrier_note': principal,coupon,barrier,ratios=a; return [(principal if r>=barrier else principal*r)+coupon for r in ratios]
    if name=='mean': return total(a)/len(a)
    if name in ('variance','volatility'): data,sample=a; v=cov(data,data,sample); return v if name=='variance' else v.sqrt()
    if name=='vol_scale': sigma,n=a; return (sigma*sigma*n).sqrt()
    if name=='covariance': x,y,sample=a; return cov(x,y,sample)
    if name=='correlation': x,y=a; return cov(x,y,False)/(cov(x,x,False)*cov(y,y,False)).sqrt()
    if name=='portfolio_sigma': return max(portvar(*a),D(0)).sqrt()
    if name=='min_variance_weight':
        sa,sb,rho=a; h=D('1e-8')
        # Solve the derivative of the quadratic from three independent values.
        f0=portvar(D(0),sa,sb,rho);fp=portvar(h,sa,sb,rho);fm=portvar(-h,sa,sb,rho)
        first=(fp-fm)/(2*h);second=(fp-2*f0+fm)/(h*h)
        return -first/second
    if name=='utility': mu,sigma,penalty=a; return mu-penalty*(sigma*sigma)/2
    if name=='excess_ratio': observed,reference,scale=a; return (observed-reference)/scale
    if name=='capm': reference,beta,market=a; return reference*(1-beta)+beta*market
    if name=='irr_two_contributions':
        first,second,terminal=a; x=D(1)
        for _ in range(40): x-=(first*x*x+second*x-terminal)/(2*first*x+second)
        assert abs(first*x*x+second*x-terminal)<D('1e-40')
        return x-1
    if name=='annuity_payment': pv,r,n=a; return pv/total([(1+r)**(-t) for t in range(1,int(n)+1)])
    if name=='drawdown':
        balance,returns,withdrawals=a
        for r,w in zip(returns,withdrawals): balance+=balance*r; balance-=w
        return balance
    raise ValueError(name)

inputs=json.loads((ROOT/'evidence/audit-calculation-inputs.json').read_text(encoding='utf8'))
rows=[]
for case in inputs:
    actual=compute(case['method'],dec(case['inputs'])); expected=dec(case['expected'])
    aa=actual if isinstance(actual,list) else [actual];ee=expected if isinstance(expected,list) else [expected]
    assert len(aa)==len(ee)
    errors=[abs(x-y) for x,y in zip(aa,ee)]
    passed=all(error<=max(D('1e-8'),abs(y)*D('1e-9')) for error,y in zip(errors,ee))
    rows.append(dict(lesson=case['lesson'],id=case['id'],method=case['method'],independent=[str(x) for x in aa],max_abs_error=str(max(errors)),status='PASS' if passed else 'FAIL'))
manual=[
 ('GM16-compound',compute('growth_chain',dec([12000,.04,.04,.04])),D('13498.368'),D('1e-9')),
 ('GM16-required-capital',compute('discount',dec([15000,.03,3])),D('13727.12489'),D('.00001')),
 ('GM16-annual-equivalent',compute('terminal_rate',dec([1,1.12,3])),D('.038499'),D('.000001')),
 ('GM16-offer-B',compute('growth_chain',dec([10000,.039,.039])),D('10795.21'),D('1e-8')),
 ('GM16-real-return',compute('real_return',dec([.05,.03])),D('.019417'),D('.000001')),
 ('GM25-price',price(*dec([1000,40,.05,2])),D('981.405896'),D('.000001')),
 ('GM25-current-yield',D(40)/price(*dec([1000,40,.05,2])),D('.04075786'),D('.00000001')),
 ('GM25-duration',compute('modified',dec([1000,0,.05,2])),D('1.904762'),D('.000001')),
 ('GM25-repricing',price(*dec([1000,0,.055,2])),D('898.452416'),D('.000001')),
 ('GM25-A-return',compute('price_return',dec([10200,10400])),D('.01960784'),D('.00000001')),
 ('GM25-B-return',compute('price_return',dec([9900,10150])),D('.02525253'),D('.00000001')),
 ('GM58-house-capacity',D(60000)*(1-D('.25'))-D(40000),D(5000),D(0)),
 ('GM58-annual-saving',D(300)*12,D(3600),D(0)),
 ('GM58-preference-gap',D('.40')-D('.20'),D('.20'),D(0)),
 ('GM58-preference-headroom',D('.45')-D('.40'),D('.05'),D(0)),
 ('GM58-goal-pools',D(60000)-D(40000)-D(10000),D(10000),D(0)),
]
manual_rows=[dict(id=name,independent=str(actual),displayed=str(expected),tolerance=str(tolerance),status='PASS' if abs(actual-expected)<=tolerance else 'FAIL') for name,actual,expected,tolerance in manual]
report=dict(date='2026-10-15',method='Independent 60-digit Python Decimal recalculation; explicit cash flows, numerical differentiation and Newton solving; no import of JavaScript test functions',registry_cases=len(rows),registry_lessons=len(set(r['lesson'] for r in rows)),methods=len(set(r['method'] for r in rows)),manual_golden_master_cases=len(manual_rows),passed=sum(r['status']=='PASS' for r in rows+manual_rows),failed=sum(r['status']=='FAIL' for r in rows+manual_rows),rows=rows,golden_master_checks=manual_rows,limits=['Recalculation validates stated mathematical premises, not product classification or legal eligibility.','Manual prose reading also checks units, attribution and explanations that numerical registries cannot detect.'])
(ROOT/'evidence/independent-calculation-audit.json').write_text(json.dumps(report,indent=2),encoding='utf8')
print(json.dumps({k:v for k,v in report.items() if k not in ('rows','golden_master_checks')}))
for r in rows+manual_rows:
    if r['status']=='FAIL': print(r)
assert report['failed']==0
