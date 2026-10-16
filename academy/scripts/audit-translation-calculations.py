"""Translation technical audit: recalculate sensitive reading premises directly.

Independent of lesson calculation registries and JavaScript test functions.
Expected displayed values are comparisons only; Decimal computes every result.
"""
import json
from pathlib import Path
from decimal import Decimal as D, getcontext

getcontext().prec = 60
ROOT = Path(__file__).resolve().parents[1]
rows = []

def check(lesson, name, actual, displayed, tolerance='0.000001'):
    expected = D(displayed)
    rows.append(dict(lesson=lesson, case=name, independent=str(actual),
                     displayed=displayed, tolerance=tolerance,
                     status='PASS' if abs(actual-expected) <= D(tolerance) else 'FAIL'))

check(1, 'opportunity-cost', 6*D(35)-150, '60')
check(3, 'real-return-percent', (D('1.04')/D('1.06')-1)*100, '-1.88679245')
check(7, 'partial-refinancing-billions', 80*D('.02')+20*D('.04')-2, '.4')
check(10, 'fund-look-through-loss', D(5000)*(D(200000)/20000000), '50')
check(11, 'spread-round-trip-percent', (D(20000)-19880)/20000*100, '.6')
check(15, 'redemption-net', 100*D(118)*(1-D('.005')), '11741')
check(16, 'golden-master-compounding', D(12000)*D('1.04')**3, '13498.368')
check(17, 'dated-liability-present-value', D(5000)/D('1.03')+D(7000)/D('1.03')**3, '11260.360547', '.000001')
check(22, 'haircut-market-value-top-up', (D(1001000)-D(995000)*D('.98'))/D('.98'), '26428.57', '.005')
check(24, 'benchmark-margin-actual360', D(200000)*D('.04')*90/360, '2000')
price = D(40)/D('1.05')+D(1040)/D('1.05')**2
check(25, 'golden-master-dated-bond-price', price, '981.405896')
check(26, 'dirty-price-versus-coupon-gain', D(1050)-(1000+D(50)*330/360), '4.166667')
check(29, 'default-weighted-expected-receipt', D('.98')*1060+D('.02')*400, '1046.80')
check(34, 'loss-recovery-percent', D(400)/9600*100, '4.1667', '.00005')
check(38, 'margin-ledger-net-not-top-up', D(3600)-(3000+800), '-200')
check(39, 'call-payoff-less-premium', D(100)*(58-50)-300, '500')
check(40, 'protective-put-costed-floor-loss', D(100)*(45-50-2), '-700')
check(41, 'oversized-forward-net-euros', D(100000)/D('1.10')-30000, '60909.09', '.005')
check(41, 'incremental-overhedge-not-total-gap', D(70000)/D('1.10')-(D(100000)/D('1.10')-30000), '2727.27', '.005')
check(43, 'inverse-quote-round-trip', D(10000)*D('1.0990')/D('1.1010'), '9981.8347', '.00005')
check(44, 'net-indirect-yen-route', (D(10000)*D('1.0990')-10)*D('149.80')-500, '1644304')
check(45, 'home-currency-return-percent', (D('1.10')*D('1.10')/D('1.25')-1)*100, '-3.2')
check(46, 'partial-hedge-net-euros', D(55000)/D('1.10')+D(55000)/D('1.25')-200, '93800')
check(48, 'redemption-net-return-percent', (D(26000)-130-20-25000)/25000*100, '3.4')
check(49, 'ordinary-issuer-whole-weight-aggregate', 5*D('.08')+D('.06'), '.46')
check(50, 'fee-added-to-investment-return-percent', D(300)/10100*100, '2.9703', '.00005')
check(52, 'annual-standard-subscription-tax', D(100000000)*D('.0005'), '50000')
check(54, 'intensity-not-absolute', D(108000)/120, '900')
check(55, 'truncated-life-present-value-millions', sum(D(1)/D('1.08')**t for t in [1,2,3]), '2.5771', '.00005')
check(56, 'barrier-at-boundary', D(10000)+600, '10600')
check(56, 'barrier-just-below-boundary', D(10000)*D('.69')+600, '7500')
check(58, 'golden-master-house-capacity', D(60000)*D('.75')-40000, '5000')
check(62, 'geometric-growth-percent', ((D('1.10')*D('.95')*D('1.15')).ln()/3).exp()*100-100, '6.3175', '.00005')
check(63, 'sample-volatility-percent', (D('.05')/3).sqrt()*100, '12.9099', '.00005')
check(66, 'portfolio-zero-correlation-percent', (D('.6')**2*D('.2')**2+D('.4')**2*D('.1')**2).sqrt()*100, '12.6491', '.00005')
check(67, 'minimum-variance-weight', (D('.01')-D('.005'))/(D('.04')+D('.01')-D('.01')), '.125')
check(70, 'required-growth-percent', ((D(200000)/110000).ln()/10).exp()*100-100, '6.1607', '.00005')
check(72, 'money-weighted-annual-percent', ((-100+D(80400).sqrt())/200-1)*100, '-8.2255', '.00005')
check(73, 'policy-net-value', D(20000)*D('.98')*D('.90')*D('.99')-120, '17343.60')
check(75, 'fixed-period-year-end-payment', D(100000)*D('.02')/(1-D('1.02')**-10), '11132.65', '.005')
check(76, 'remaining-deduction-tax-benefit', (D(672)-300)*D('.30'), '111.60')
check(78, 'saving-annuity-end-year', D(3000)*sum(D('1.04')**t for t in range(20)), '89334.24', '.005')
check(80, 'combined-ceiling-nine-months', D(4500)*9/12, '3375')
check(80, 'half-annuity-base-tax', D(6000)*D('.5')*D('.30'), '900')
check(84, 'all-first-year-cost-layers', D(19800)*D('1.06')-D(19800)*D('.008')-D(19800)*D('.005')-40, '20690.60')
check(87, 'settlement-financing-not-penalty', D(20000)*D('.04')*2/365, '4.38', '.005')
check(90, 'lost-recurring-revenue', D(80000000)*D('.08')*D('.006'), '38400')
check(92, 'coupon-step-up-two-years', D(10000)*D('.0025')*2, '50')
check(93, 'taxonomy-eligible-denominator-percent', D(35)/60*100, '58.33', '.005')
check(94, 'observed-portion-average', (D('.5')*80+D('.3')*20)/D('.8'), '57.5')
check(95, 'changed-coverage-conditional-intensity', D('.8')*60+D('.2')*200, '88')

audit = json.loads((ROOT/'evidence/translation-audit-pass2.json').read_text(encoding='utf-8'))
report = dict(date='2026-10-16', content_sha256=audit['content_sha256'],
              method='60-digit Decimal, direct reading premises; no lesson registry or JavaScript functions imported',
              checks=len(rows), passed=sum(x['status']=='PASS' for x in rows),
              failed=sum(x['status']=='FAIL' for x in rows), rows=rows,
              limits=['Validates stipulated arithmetic, not legal eligibility or forecast reliability.'])
(ROOT/'evidence/translation-independent-calculations.json').write_text(json.dumps(report,indent=2),encoding='utf-8')
print(json.dumps({k:v for k,v in report.items() if k!='rows'}))
for row in rows:
    if row['status']=='FAIL': print(row)
assert report['failed']==0
