module.exports={
  "id": "EIP-3.1-A",
  "module": 3,
  "refs": [
    "3.1.a",
    "3.1.b"
  ],
  "version": "0.1.0-uat",
  "status": "Owner UAT pending",
  "minutes": 30,
  "title": {
    "en": "Money across time: build, discount, compare",
    "pt": "Dinheiro no tempo: acumular, descontar e comparar"
  },
  "prerequisites": {
    "en": "Percentages, multiplication and powers. Use a basic calculator; write the cash-flow timeline before calculating.",
    "pt": "Porcentagens, multiplicação e potências. Use uma calculadora básica; desenhe a linha do tempo dos fluxos antes de calcular."
  },
  "objectives": [
    {
      "id": "TVM-1",
      "text": {
        "en": "Calculate simple and compound future values, showing which balance earns interest.",
        "pt": "Calcular valores futuros simples e compostos, mostrando qual saldo rende juros."
      },
      "curriculum_objective_ids": [
        "EIP-3-1-01"
      ]
    },
    {
      "id": "TVM-2",
      "text": {
        "en": "Discount a future goal and compare dated cash flows on the same date.",
        "pt": "Descontar uma meta futura e comparar fluxos em uma mesma data."
      },
      "curriculum_objective_ids": [
        "EIP-3-1-03",
        "EIP-3-1-04"
      ]
    },
    {
      "id": "TVM-3",
      "text": {
        "en": "Match rate and period conventions and explain why a projection is conditional.",
        "pt": "Compatibilizar taxas e períodos e explicar por que uma projeção é condicional."
      },
      "curriculum_objective_ids": [
        "EIP-3-1-02"
      ]
    }
  ],
  "timing": {
    "en": "About 30 minutes of reading and following the worked calculations/cases. This is an editorial estimate, not a measured learner result; Owner UAT will check pace and depth. Personal notes are optional.",
    "pt": "Cerca de 30 minutos para leitura e acompanhamento dos cálculos/casos resolvidos. É uma estimativa editorial, não resultado medido com aluno; o Owner UAT verificará ritmo e profundidade. Anotações pessoais são opcionais."
  },
  "sources": [
    "EFPA-SYL",
    "SEC-COMPOUND",
    "AUTHOR-MATH"
  ],
  "blocks": [
    {
      "id": "TVM-R",
      "kind": "introduction",
      "title": {
        "en": "Introduction and first illustration",
        "pt": "Introdução e primeira ilustração"
      },
      "text": {
        "en": "This lesson explains how a dated amount grows, how a future need can be translated into capital required today, and why rates must be read with their conventions. It matters whenever a client compares investments or plans a future payment. As a starting illustration, 3% of €8,000 is €240. If that interest stays invested, next year’s base is €8,240 and 3% produces €247.20. If the interest is withdrawn and kept uninvested, it cannot earn further interest. The destination of the interest changes the growth process.",
        "pt": "Esta aula explica como um valor datado cresce, como uma necessidade futura se converte em capital necessário hoje e por que taxas devem ser lidas com suas convenções. Isso importa sempre que um cliente compara investimentos ou planeja um pagamento futuro. Como ilustração inicial, 3% de €8.000 são €240. Se os juros permanecem investidos, a base do ano seguinte é €8.240 e 3% produzem €247,20. Se os juros são retirados e mantidos sem investir, não rendem novos juros. O destino dos juros muda o processo de crescimento."
      },
      "sources": [
        "AUTHOR-MATH"
      ],
      "syllabus_refs": [
        "3.1.a"
      ]
    },
    {
      "id": "TVM-T1",
      "kind": "theory",
      "title": {
        "en": "Start with a dated promise",
        "pt": "Comece com uma promessa datada"
      },
      "text": {
        "en": "A client can receive €10,000 today or a larger amount in three years. Comparing the euro amounts alone misses an important opportunity: today's money can be invested before the later payment arrives. A useful comparison therefore puts both alternatives on one date. A future value moves money forward; a present value moves a future payment back to today. Neither operation establishes whether the issuer will pay. Credit risk, liquidity, fees and taxes must be considered separately.\nDraw t = 0, 1, 2, 3 and mark when each payment occurs. In this lesson, cash flows occur at year-end, rates are fixed and positive, there are no contributions, fees or taxes, and all promised payments are assumed to occur. These are modelling assumptions, not promises about a real product. Keep amounts in euros, rates in decimals and time in the units specified. A rate of 4% is 0.04; 4 is four hundred percent.",
        "pt": "Um cliente pode receber €10.000 hoje ou um valor maior em três anos. Comparar apenas os montantes ignora uma oportunidade importante: o dinheiro de hoje pode ser investido antes da chegada do pagamento posterior. Uma comparação útil coloca as duas alternativas na mesma data. O valor futuro leva o dinheiro adiante; o valor presente traz um pagamento futuro para hoje. Nenhuma operação determina se o emissor pagará. Risco de crédito, liquidez, tarifas e impostos devem ser considerados separadamente.\nDesenhe t = 0, 1, 2, 3 e marque cada pagamento. Nesta aula, os fluxos ocorrem ao final do ano, as taxas são fixas e positivas, não há aportes, tarifas ou impostos e todos os pagamentos prometidos são considerados realizados. São hipóteses do modelo, não promessas sobre um produto real. Mantenha valores em euros, taxas em decimais e tempo nas unidades indicadas. Uma taxa de 4% é 0,04; o número 4 equivale a quatrocentos por cento."
      },
      "sources": [
        "AUTHOR-MATH"
      ],
      "syllabus_refs": [
        "3.1.b"
      ]
    },
    {
      "id": "TVM-T2",
      "kind": "theory",
      "title": {
        "en": "Why simple and compound growth diverge",
        "pt": "Por que o crescimento simples e o composto divergem"
      },
      "text": {
        "en": "Under simple interest, only the initial principal P earns interest. Each full year adds the same P × r. Interest I = P × r × t; future value FV = P × (1 + r × t), where r is the annual simple rate and t is years. At 4%, €10,000 earns €400 per year, so three years add €1,200. Fractional years are permitted when the contract specifies that convention: nine months is 9/12 of a year. Actual day-count conventions require the contract; do not silently substitute 365 for 360.\nWith annual compounding, each year's closing balance becomes the following year's opening balance. One year multiplies the balance by (1 + r); n years multiply by this factor n times: FV = P × (1 + r)^n. The first year still earns €400. The second year's base is €10,400, so it earns €416. The extra €16 is interest on the first year's interest. The growth is multiplicative, not a sequence of identical euro additions.\nThe methods agree after one year but not after three. They use the same initial base for year 1; only compounding expands the base afterwards. At zero interest they coincide at every horizon. Do not generalise the positive-rate comparison blindly to negative-rate products.",
        "pt": "Nos juros simples, apenas o capital inicial P rende juros. Cada ano completo acrescenta o mesmo P × r. Juros I = P × r × t; valor futuro VF = P × (1 + r × t), sendo r a taxa simples anual e t o tempo em anos. A 4%, €10.000 rendem €400 por ano; três anos acrescentam €1.200. Frações de ano são permitidas quando o contrato determina essa convenção: nove meses equivalem a 9/12 de ano. Convenções de contagem de dias exigem consultar o contrato; não substitua 360 por 365 silenciosamente.\nNa capitalização anual, o saldo final de cada ano vira o saldo inicial do seguinte. Um ano multiplica o saldo por (1 + r); n anos multiplicam por esse fator n vezes: VF = P × (1 + r)^n. O primeiro ano ainda rende €400. A base do segundo é €10.400, rendendo €416. Os €16 adicionais são juros sobre os juros do primeiro ano. O crescimento é multiplicativo, não uma sequência de acréscimos iguais em euros.\nOs métodos coincidem após um ano, mas não após três. Ambos usam a mesma base inicial no primeiro ano; só a capitalização amplia a base depois. A juros zero, coincidem em qualquer prazo. Não generalize a comparação de taxas positivas sem análise para produtos com taxas negativas."
      },
      "sources": [
        "SEC-COMPOUND",
        "AUTHOR-MATH"
      ],
      "syllabus_refs": [
        "3.1.a"
      ]
    },
    {
      "id": "TVM-T3",
      "kind": "theory",
      "title": {
        "en": "Discounting reverses the journey",
        "pt": "O desconto faz o caminho inverso"
      },
      "text": {
        "en": "If FV = PV × (1 + r)^n, dividing both sides by the growth factor gives PV = FV / (1 + r)^n. Discounting is not subtracting n × r percent from the future payment. At 5%, the correct one-year discount factor is 1/1.05, about 0.952381, rather than 0.95. Why? Multiplication by 1.05 followed by division by 1.05 must return the starting amount.\nFor several payments, discount each separately to the common date, then add. A euro arriving in year 1 and a euro arriving in year 3 do not have the same present value at a positive rate. This is the foundation for bond pricing in the next lesson. The selected discount rate represents the comparison required by the model; applying a bank deposit rate to a risky investment does not make the two economically equivalent.\nAn advertised nominal annual rate j compounded m times a year uses the periodic rate j/m and n = m × years. Its effective annual rate is (1 + j/m)^m − 1. A 6% nominal rate compounded twice yearly therefore means 3% per half-year and 1.03² − 1 = 6.09% effective annually. A quoted 6% effective annual rate is already a one-year growth rate: dividing it by two is not an exact half-year conversion. Always identify the label before calculating.",
        "pt": "Se VF = VP × (1 + r)^n, dividir os dois lados pelo fator de crescimento resulta em VP = VF / (1 + r)^n. Descontar não significa subtrair n × r por cento do pagamento futuro. A 5%, o fator correto de desconto de um ano é 1/1,05, aproximadamente 0,952381, e não 0,95. Por quê? Multiplicar por 1,05 e depois dividir por 1,05 deve devolver o valor inicial.\nPara vários pagamentos, desconte cada um separadamente para a data comum e depois some. Um euro recebido no primeiro ano e um euro recebido no terceiro não têm o mesmo valor presente a uma taxa positiva. Essa é a base da precificação de títulos na próxima aula. A taxa de desconto representa a comparação exigida pelo modelo; aplicar a taxa de um depósito bancário a um investimento arriscado não os torna economicamente equivalentes.\nUma taxa nominal anual j com m capitalizações anuais usa a taxa periódica j/m e n = m × anos. Sua taxa efetiva anual é (1 + j/m)^m − 1. Assim, uma taxa nominal de 6% capitalizada duas vezes ao ano significa 3% por semestre e 1,03² − 1 = 6,09% efetivos ao ano. Uma taxa anunciada como 6% efetivos anuais já é uma taxa de crescimento anual: dividi-la por dois não é uma conversão semestral exata. Identifique sempre o rótulo antes de calcular."
      },
      "sources": [
        "AUTHOR-MATH"
      ],
      "syllabus_refs": [
        "3.1.a",
        "3.1.b"
      ]
    },
    {
      "id": "TVM-T4",
      "kind": "theory",
      "title": {
        "en": "A small vocabulary for comparing offers",
        "pt": "Um pequeno vocabulário para comparar propostas"
      },
      "text": {
        "en": "Principal is the capital placed at the start. Interest is the compensation calculated on a stated balance. Capitalisation means adding interest to the balance that will earn future interest. The rate describes growth per unit of time; the return over a holding period describes the change relative to the capital committed over that particular interval. These distinctions prevent a common misunderstanding: a 4% annual rate and a 12% three-year total return are not interchangeable labels.\nFor simple growth over three years, a 4% annual rate produces a 12% total return. For annual compounding it produces 1.04³ − 1 = 12.4864%. If an offer instead promises a total 12% over three years with annual compounding, the equivalent annual rate solves (1+r)³ = 1.12. Therefore r = 1.12^(1/3) − 1, approximately 3.8499%. Dividing the total return by three gives 4%, which is the simple annual equivalent, not the compound annual equivalent. The underlying distinction is the same: do later periods earn returns on earlier returns?\n“Nominal” also has two uses in finance. In a compounding quotation it can mean an annual rate before allowing for within-year capitalisation. When contrasting purchasing power, a nominal amount or return is measured in currency units without adjusting for inflation. Identify which contrast is intended. An effective annual interest rate is not automatically an inflation-adjusted return.\nFor example, if a balance grows from €1,000 to €1,050 while the price of the same consumption basket rises from €100 to €103, purchasing capacity changes from 10 baskets to 1,050/103 = 10.194175 baskets. The real gain is about 1.9417%, calculated as 1.05/1.03 − 1. Subtracting 3% inflation from 5% nominal return gives a convenient approximation of 2%, not the exact answer. The example illustrates units and comparison; it is not a forecast of inflation or deposit rates.\nFor an adviser, these labels are practical safeguards. A client may hear “6%” and interpret it as a guaranteed annual net increase in spending power. The quoted number may instead be nominal, gross, conditional or measured over several years. A clear explanation states the period, compounding frequency, gross/net basis, certainty of cash flows and whether purchasing power is being discussed. You cannot fix an ambiguous quotation simply by entering it into a calculator.",
        "pt": "Principal é o capital aplicado inicialmente. Juros são a remuneração calculada sobre um saldo especificado. Capitalização significa adicionar juros ao saldo que renderá juros futuros. A taxa descreve crescimento por unidade de tempo; o retorno de um período descreve a mudança em relação ao capital comprometido naquele intervalo. Essas distinções evitam um equívoco comum: taxa anual de 4% e retorno total de 12% em três anos não são rótulos intercambiáveis.\nNo crescimento simples de três anos, 4% anuais produzem retorno total de 12%. Na capitalização anual, produzem 1,04³ − 1 = 12,4864%. Se uma proposta promete retorno total de 12% em três anos com capitalização anual, a taxa anual equivalente resolve (1+r)³ = 1,12. Portanto, r = 1,12^(1/3) − 1, aproximadamente 3,8499%. Dividir o retorno total por três fornece 4%, equivalente anual simples, não composto. A distinção fundamental é a mesma: os períodos seguintes rendem sobre os retornos anteriores?\n“Nominal” também tem dois usos em finanças. Em uma cotação de capitalização, pode significar taxa anual antes de considerar capitalização dentro do ano. Na comparação de poder de compra, um valor ou retorno nominal é medido em unidades monetárias sem ajuste pela inflação. Identifique qual contraste está sendo feito. Uma taxa efetiva anual de juros não é automaticamente um retorno ajustado pela inflação.\nPor exemplo, se um saldo cresce de €1.000 para €1.050 enquanto o preço da mesma cesta de consumo sobe de €100 para €103, a capacidade de compra passa de 10 cestas para 1.050/103 = 10,194175 cestas. O ganho real é de aproximadamente 1,9417%, calculado como 1,05/1,03 − 1. Subtrair inflação de 3% do retorno nominal de 5% fornece aproximação conveniente de 2%, não a resposta exata. O exemplo ilustra unidades e comparação; não é previsão de inflação nem de taxas de depósitos.\nPara um assessor, esses rótulos são salvaguardas práticas. Um cliente pode ouvir “6%” e interpretar como aumento anual líquido e garantido do poder de compra. O número anunciado pode ser nominal, bruto, condicional ou medido em vários anos. Uma explicação clara informa período, frequência de capitalização, base bruta/líquida, certeza dos fluxos e se está discutindo poder de compra. Não se corrige uma cotação ambígua apenas inserindo-a na calculadora."
      },
      "sources": [
        "AUTHOR-MATH"
      ],
      "syllabus_refs": [
        "3.1.a",
        "3.1.b"
      ]
    },
    {
      "id": "TVM-E1",
      "kind": "example",
      "title": {
        "en": "Worked example A · follow the balance",
        "pt": "Exemplo resolvido A · acompanhe o saldo"
      },
      "text": {
        "en": "Data: €12,000 at t = 0; annual rate 4%; three years; no withdrawals. Compare simple interest and annual compounding.\n1. Simple interest: yearly interest = €12,000 × 0.04 = €480. Three years earn €1,440. FV = €12,000 + €1,440 = €13,440.\n2. Compound year 1: €12,000 × 1.04 = €12,480. Year 2: €12,480 × 1.04 = €12,979.20. Year 3: €12,979.20 × 1.04 = €13,498.368, or €13,498.37 rounded only at the end.\n3. Formula check: €12,000 × 1.04³ gives the same value. Compound interest totals €1,498.37, not €13,498.37: distinguish interest from final capital.\n4. Interpretation: compounding adds €58.37 relative to simple growth because retained interest earns interest. This is not an extra contractual rate or a risk premium. If annual interest were withdrawn and left uninvested, the account plus withdrawals would total €13,440 instead.\nThe year-2 interest is €499.20, which is €480 plus 4% of the first €480.",
        "pt": "Dados: €12.000 em t = 0; taxa anual de 4%; três anos; sem retiradas. Compare juros simples e capitalização anual.\n1. Juros simples: juros anuais = €12.000 × 0,04 = €480. Três anos rendem €1.440. VF = €12.000 + €1.440 = €13.440.\n2. Ano composto 1: €12.000 × 1,04 = €12.480. Ano 2: €12.480 × 1,04 = €12.979,20. Ano 3: €12.979,20 × 1,04 = €13.498,368, ou €13.498,37 arredondados apenas ao final.\n3. Conferência pela fórmula: €12.000 × 1,04³ produz o mesmo valor. Os juros compostos somam €1.498,37, não €13.498,37: diferencie juros de capital final.\n4. Interpretação: a capitalização acrescenta €58,37 em relação ao crescimento simples porque os juros retidos rendem juros. Isso não é uma taxa contratual extra nem um prêmio de risco. Se os juros anuais fossem retirados e mantidos sem rendimento, a conta mais as retiradas totalizariam €13.440.\nOs juros do segundo ano são €499,20, equivalentes a €480 mais 4% dos primeiros €480."
      },
      "sources": [
        "AUTHOR-MATH"
      ],
      "syllabus_refs": [
        "3.1.a",
        "3.1.b"
      ]
    },
    {
      "id": "TVM-E2",
      "kind": "example",
      "title": {
        "en": "Worked example B · fund a dated goal",
        "pt": "Exemplo resolvido B · financie uma meta datada"
      },
      "text": {
        "en": "Data: €15,000 needed exactly three years from now; a hypothetical investment earns 3% effective annually; no default, fees or taxes in this model. What initial capital is required?\n1. Timeline: an unknown outflow at t = 0 funds €15,000 at t = 3. We need PV, not FV.\n2. Growth factor = 1.03³ = 1.092727. PV = €15,000 / 1.092727 = €13,727.12489, approximately €13,727.12. An actual minimum deposit rounded to cents should be rounded up to €13,727.13 to avoid a tiny shortfall.\n3. Independent check: multiplying the unrounded PV by 1.092727 returns €15,000. The economic discount is about €1,272.88.\n4. A client with only €13,500 has a present funding gap of €227.12 approximately; the future shortfall is €15,000 − €13,500 × 1.092727 = €248.19. These gaps are at different dates and must not be interchanged.\n5. A higher assumed return lowers calculated PV, but choosing a riskier product to force the goal to appear affordable does not guarantee the goal. A practical plan checks the reliability of the return and the client's ability to tolerate a shortfall.",
        "pt": "Dados: serão necessários €15.000 exatamente daqui a três anos; um investimento hipotético rende 3% efetivos anuais; sem inadimplência, tarifas ou impostos neste modelo. Qual capital inicial é necessário?\n1. Linha do tempo: uma saída desconhecida em t = 0 financia €15.000 em t = 3. Precisamos do VP, não do VF.\n2. Fator de crescimento = 1,03³ = 1,092727. VP = €15.000 / 1,092727 = €13.727,12489, aproximadamente €13.727,12. Um depósito mínimo real em centavos deve ser arredondado para cima, a €13.727,13, para evitar uma pequena insuficiência.\n3. Conferência independente: multiplicar o VP não arredondado por 1,092727 devolve €15.000. O desconto econômico é de aproximadamente €1.272,88.\n4. Um cliente com apenas €13.500 tem uma insuficiência presente de aproximadamente €227,12; a insuficiência futura é €15.000 − €13.500 × 1,092727 = €248,19. Essas diferenças estão em datas distintas e não são intercambiáveis.\n5. Um retorno assumido maior reduz o VP calculado, mas escolher um produto mais arriscado para fazer a meta parecer viável não garante seu cumprimento. Um plano prático verifica a confiabilidade do retorno e a capacidade do cliente de suportar uma insuficiência."
      },
      "sources": [
        "AUTHOR-MATH"
      ],
      "syllabus_refs": [
        "3.1.b"
      ]
    },
    {
      "id": "TVM-E3",
      "kind": "example",
      "title": {
        "en": "Worked comparison · two offers and one spending date",
        "pt": "Comparação resolvida · duas propostas e uma data de gasto"
      },
      "text": {
        "en": "Suppose a client has €10,000 and needs the money in exactly two years. Offer A is a hypothetical two-year contract paying 4% simple annual interest at the end. Offer B pays 3.9% effective annually, with all interest retained. For the initial comparison only, assume identical credit risk, no early withdrawal, no fees, no tax and certain promised payments. These assumptions isolate the interest calculation; real offers need separate contract checks.\nOffer A adds €10,000 × 0.04 × 2 = €800, giving €10,800. Offer B gives €10,000 × 1.039². The first year closes at €10,390; the second year's interest is €10,390 × 0.039 = €405.21, so the final amount is €10,795.21. A produces €4.79 more at the common spending date. The superficially different rates are very close once the conventions are aligned. Saying “compounding always wins” would be wrong because the quoted rates differ.\nNow suppose B has a €15 fee payable at maturity, while A has none. B's final proceeds become €10,780.21, and the difference rises to €19.79. The fee date matters: a fee paid today would instead reduce initial investable capital or require an additional outflow. Do not subtract it at an arbitrary date.\nThe narrow numerical preference for A is not yet a complete recommendation. If A has materially weaker credit quality, a withdrawal restriction incompatible with the client's needs or a different tax treatment, €19.79 does not settle the decision. A defensible comparison first establishes comparable dates and conventions, then examines those conditions. This is why the mathematical result should be described as “higher modelled proceeds under these assumptions”, not “the best investment”.",
        "pt": "Suponha que um cliente tenha €10.000 e precise do dinheiro exatamente em dois anos. A proposta A é um contrato hipotético de dois anos com juros simples anuais de 4%, pagos ao final. A proposta B paga 3,9% efetivos anuais, com todos os juros retidos. Apenas na comparação inicial, suponha risco de crédito idêntico, ausência de retirada antecipada, tarifas e impostos e certeza dos pagamentos prometidos. Essas hipóteses isolam o cálculo dos juros; propostas reais exigem verificações contratuais separadas.\nA acrescenta €10.000 × 0,04 × 2 = €800, chegando a €10.800. B produz €10.000 × 1,039². O primeiro ano termina com €10.390; os juros do segundo são €10.390 × 0,039 = €405,21, resultando em €10.795,21. A gera €4,79 a mais na mesma data de gasto. Taxas aparentemente diferentes ficam muito próximas quando se alinham as convenções. Dizer “capitalização sempre vence” estaria errado porque as taxas anunciadas são diferentes.\nAgora suponha tarifa de €15 em B, paga no vencimento, enquanto A não tem tarifa. Os recebimentos finais de B passam a €10.780,21, aumentando a diferença para €19,79. A data da tarifa importa: uma tarifa paga hoje reduziria o capital inicialmente investível ou exigiria uma saída adicional. Não a subtraia em data arbitrária.\nA preferência numérica limitada por A ainda não é uma recomendação completa. Se A tiver qualidade de crédito significativamente pior, restrição de retirada incompatível com as necessidades do cliente ou tributação diferente, €19,79 não resolvem a decisão. Uma comparação fundamentada estabelece primeiro datas e convenções comparáveis e depois examina essas condições. Por isso, o resultado matemático deve ser descrito como “maiores recebimentos modelados nessas hipóteses”, não “o melhor investimento”."
      },
      "sources": [
        "AUTHOR-MATH"
      ],
      "syllabus_refs": [
        "3.1.a",
        "3.1.b"
      ]
    },
    {
      "id": "TVM-P",
      "kind": "pitfalls",
      "title": {
        "en": "Diagnose the mistake, then repair it",
        "pt": "Diagnostique o erro e corrija-o"
      },
      "text": {
        "en": "“Three years at 4% is always 12%.” This adds rates and is correct only for the simple-interest assumption. Rebuild annual balances to test compounding. “€10,000 in two years discounted at 5% is €9,000.” This subtracts 10%; repair it by dividing by 1.05². “An annual rate can be used with a number of months.” That multiplies incompatible units: convert either time or the rate under the stated convention.\n“The larger future amount is the better deal.” First align dates, then compare risk, costs and access to money. “The calculator shows many decimals, so the estimate is precise.” Arithmetic precision cannot remove uncertainty in a forecast rate. Keep intermediate precision and round euros at the end, but explain the assumptions as carefully as the arithmetic.",
        "pt": "“Três anos a 4% são sempre 12%.” Isso soma taxas e só está correto sob a hipótese de juros simples. Reconstrua os saldos anuais para testar a capitalização. “€10.000 em dois anos descontados a 5% valem €9.000.” Isso subtrai 10%; corrija dividindo por 1,05². “Uma taxa anual pode ser usada com uma quantidade de meses.” Isso combina unidades incompatíveis: converta o tempo ou a taxa conforme a convenção indicada.\n“O maior valor futuro é o melhor negócio.” Primeiro alinhe as datas, depois compare risco, custos e acesso ao dinheiro. “A calculadora mostra muitas casas decimais, portanto a estimativa é precisa.” A precisão aritmética não elimina a incerteza de uma taxa projetada. Preserve a precisão intermediária e arredonde os euros ao final, mas explique as hipóteses com o mesmo cuidado dedicado ao cálculo."
      },
      "sources": [
        "AUTHOR-MATH"
      ],
      "syllabus_refs": [
        "3.1.a",
        "3.1.b"
      ]
    },
    {
      "id": "TVM-C",
      "kind": "recap",
      "title": {
        "en": "Close the loop",
        "pt": "Feche o ciclo"
      },
      "text": {
        "en": "Simple interest uses the initial principal; compounding grows the interest base. Present value reverses the growth operation, and payments on different dates must be aligned before comparison. Match the rate to its period and distinguish nominal quotations, effective growth and purchasing power. A correct calculation remains conditional on its assumptions. The next topic applies separate discounting to the coupons and redemption of a bond.",
        "pt": "Juros simples usam o capital inicial; capitalização amplia a base dos juros. Valor presente inverte a operação de crescimento, e pagamentos em datas diferentes precisam ser alinhados antes da comparação. Compatibilize taxa e período e diferencie cotações nominais, crescimento efetivo e poder de compra. Um cálculo correto continua condicionado às hipóteses. O próximo assunto aplica desconto separado aos cupons e ao resgate de um título."
      },
      "sources": [
        "AUTHOR-MATH"
      ],
      "syllabus_refs": [
        "3.1.a",
        "3.1.b"
      ]
    }
  ]
};
