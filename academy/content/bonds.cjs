module.exports={
  "id": "EIP-3.4-A",
  "module": 3,
  "refs": [
    "3.4.a",
    "3.4.b",
    "3.4.c"
  ],
  "version": "0.1.0-uat",
  "status": "Owner UAT pending",
  "minutes": 30,
  "title": {
    "en": "Bonds: price, yield and the meaning of duration",
    "pt": "Títulos de dívida: preço, rendimento e significado da duration"
  },
  "prerequisites": {
    "en": "EIP-3.1-A: discount a dated payment; distinguish percentages from decimal rates. This session introduces duration interpretation; full multi-coupon duration and convexity belong to a later session.",
    "pt": "EIP-3.1-A: descontar um pagamento datado; distinguir porcentagens de taxas decimais. Esta sessão introduz a interpretação da duration; o cálculo completo para múltiplos cupons e a convexidade pertencem a uma sessão posterior."
  },
  "objectives": [
    {
      "id": "BOND-1",
      "text": {
        "en": "Build a bond cash-flow timeline and value its promised payments.",
        "pt": "Construir a linha do tempo de um título e avaliar seus pagamentos prometidos."
      },
      "curriculum_objective_ids": [
        "EIP-3-4-01"
      ]
    },
    {
      "id": "BOND-2",
      "text": {
        "en": "Distinguish coupon rate, current yield and yield to maturity.",
        "pt": "Distinguir taxa de cupom, rendimento corrente e rendimento até o vencimento."
      },
      "curriculum_objective_ids": [
        "EIP-3-4-03"
      ]
    },
    {
      "id": "BOND-3",
      "text": {
        "en": "Estimate a small price change with modified duration and state its limitations.",
        "pt": "Estimar uma pequena variação de preço com duration modificada e indicar suas limitações."
      },
      "curriculum_objective_ids": [
        "EIP-3-4-04",
        "EIP-3-4-05"
      ]
    }
  ],
  "timing": {
    "en": "About 30 minutes of reading and following the worked calculations/cases. This is an editorial estimate, not a measured learner result; Owner UAT will check pace and depth. Personal notes are optional.",
    "pt": "Cerca de 30 minutos para leitura e acompanhamento dos cálculos/casos resolvidos. É uma estimativa editorial, não resultado medido com aluno; o Owner UAT verificará ritmo e profundidade. Anotações pessoais são opcionais."
  },
  "sources": [
    "EFPA-SYL",
    "SEC-BONDS",
    "FINRA-DURATION",
    "AUTHOR-MATH"
  ],
  "blocks": [
    {
      "id": "BOND-R",
      "kind": "introduction",
      "title": {
        "en": "Introduction and first illustration",
        "pt": "Introdução e primeira ilustração"
      },
      "text": {
        "en": "This lesson turns a bond’s contractual promises into a price, separates three different yield measures and explains duration as an estimate of rate sensitivity. The starting idea is discounting: €1,040 due in one year has a present value of €1,000 at 4%, but €990.48 at 5%. The promise has not shrunk; its current value has fallen because a new buyer requires a higher return. The lesson develops that distinction into a practical explanation of bond-price risk.",
        "pt": "Esta aula transforma promessas contratuais de um título em preço, separa três medidas de rendimento e explica duration como estimativa de sensibilidade às taxas. O ponto de partida é o desconto: €1.040 em um ano valem hoje €1.000 a 4%, mas €990,48 a 5%. A promessa não diminuiu; seu valor atual caiu porque um novo comprador exige retorno maior. A aula desenvolve essa distinção em uma explicação prática do risco de preço dos títulos."
      },
      "sources": [
        "AUTHOR-MATH"
      ],
      "syllabus_refs": [
        "3.4.b"
      ]
    },
    {
      "id": "BOND-T4",
      "kind": "theory",
      "title": {
        "en": "From savings to a debt claim",
        "pt": "Da poupança a um direito de crédito"
      },
      "text": {
        "en": "When a company issues a bond, it receives funding and undertakes contractual payment obligations. An investor who later buys that bond from another investor normally pays the seller, not the company. The secondary-market price can therefore change without a new loan amount being agreed with the issuer. This is a useful distinction for someone encountering bonds for the first time: issuance creates the financing relationship; subsequent trading transfers the claim.\nThe issuer is the debtor. The bondholder is a creditor rather than a shareholder merely because they own the bond. The maturity date specifies when principal is due under the contract. Coupon frequency states how often contractual interest is paid. Seniority describes the claim's position relative to other claims in a default or insolvency process. Security or collateral may support a claim but does not make recovery certain. The precise rights depend on the terms and applicable law; a short product label cannot replace those documents.\nA price quote may be expressed per €100 of nominal amount. A clean quote of 98.50 means 98.5% of par, not €98.50 for every size of holding. On €10,000 nominal, that clean price is €9,850. If accrued interest is €75 under the specified settlement convention, the dirty amount is €9,925 before transaction costs. The €75 compensates the seller for accrued coupon entitlement; it is not a second coupon rate. A later lesson calculates accrual from dates and day-count conventions. Here the supplied accrued amount is an assumption.\nCredit spread is the additional yield over a chosen reference yield for a comparable maturity and convention. It may reflect credit risk, liquidity and other differences; it is not a direct probability of default. A sovereign benchmark yield can stay unchanged while a corporate bond's spread widens, reducing the corporate bond's price. This explains why looking only at central-bank announcements can miss an important cause of a client's loss.\nReinvestment risk points in another direction. When rates fall, a fixed bond's price may rise, but coupons received along the way may earn less when reinvested. The investor's horizon matters: a near-term seller focuses strongly on sale price, while a long-term accumulator also cares about what intermediate cash flows can earn. Neither perspective justifies describing every bond as safe or every bond-price fall as a permanent realised loss.",
        "pt": "Quando uma empresa emite um título, recebe financiamento e assume obrigações contratuais de pagamento. Um investidor que depois compra esse título de outro investidor normalmente paga ao vendedor, não à empresa. O preço secundário pode, portanto, mudar sem que um novo valor de empréstimo seja acordado com o emissor. Essa distinção é útil para quem conhece títulos pela primeira vez: a emissão cria a relação de financiamento; a negociação posterior transfere o direito de crédito.\nO emissor é o devedor. O detentor é credor, e não acionista apenas por possuir o título. A data de vencimento indica quando o principal é devido pelo contrato. A frequência do cupom informa quantas vezes os juros contratuais são pagos. A senioridade descreve a posição do crédito em relação a outros créditos em inadimplência ou insolvência. Garantias ou colaterais podem apoiar um crédito, mas não tornam certa a recuperação. Os direitos exatos dependem dos termos e da legislação aplicável; um rótulo curto não substitui esses documentos.\nUma cotação pode ser expressa por €100 de valor nominal. Uma cotação limpa de 98,50 significa 98,5% do nominal, não €98,50 para qualquer posição. Sobre €10.000 nominais, o preço limpo é €9.850. Se os juros acumulados forem €75 conforme a convenção de liquidação especificada, o valor sujo será €9.925 antes dos custos. Os €75 compensam o vendedor pelos juros acumulados a que tem direito; não são uma segunda taxa de cupom. Outra aula calculará o acúmulo a partir de datas e convenções. Aqui, o valor acumulado fornecido é uma hipótese.\nSpread de crédito é a yield adicional sobre uma referência escolhida para prazo e convenção comparáveis. Pode refletir risco de crédito, liquidez e outras diferenças; não é probabilidade direta de inadimplência. A yield de um título soberano de referência pode ficar constante enquanto o spread corporativo aumenta, reduzindo o preço do título corporativo. Isso explica por que olhar apenas anúncios do banco central pode deixar passar uma causa importante de perda do cliente.\nRisco de reinvestimento aponta em outra direção. Quando as taxas caem, o preço de um título fixo pode subir, mas os cupons recebidos podem render menos ao serem reinvestidos. O horizonte importa: quem venderá em breve se concentra fortemente no preço de venda, enquanto quem acumula por longo prazo também considera o rendimento dos fluxos intermediários. Nenhuma perspectiva justifica descrever todo título como seguro nem toda queda de preço como perda realizada permanente."
      },
      "sources": [
        "SEC-BONDS",
        "AUTHOR-MATH"
      ],
      "syllabus_refs": [
        "3.4.a",
        "3.4.c"
      ]
    },
    {
      "id": "BOND-T1",
      "kind": "theory",
      "title": {
        "en": "Read the contract before the price",
        "pt": "Leia o contrato antes do preço"
      },
      "text": {
        "en": "A conventional bond is a debt claim. Face value (par) is the amount used to calculate coupons and, in our examples, repaid at maturity. A fixed coupon rate c creates an annual coupon C = face value × c. A €1,000 bond with a 4% annual coupon promises €40 each year. The coupon is not automatically 4% of the price you pay in the secondary market. If you buy at €960, the promised €40 remains €40.\nThe last payment includes both the final coupon and principal. A two-year bond therefore pays €40 at t = 1 and €1,040 at t = 2. Omitting the final coupon understates value; counting principal in every year overstates it. A zero-coupon bond pays no intermediate coupons and, if performed, one redemption payment at maturity. A callable bond has an issuer redemption option and requires additional analysis; the fixed cash-flow calculations here do not describe every bond.\nFor the numerical cases assume annual coupons, purchase immediately after a coupon date, annual effective yield, no accrued interest, no fees or taxes and no default. Price means the full settlement value under those assumptions. Between coupon dates, quoted clean price normally excludes accrued interest while dirty price includes it; settlement conventions and day counts must be specified before calculation. That is a separate planned lesson, not an omitted term in today's simplified equation.",
        "pt": "Um título de dívida convencional é um direito de crédito. O valor nominal (par) é usado para calcular cupons e, nos exemplos, é devolvido no vencimento. Uma taxa de cupom fixa c gera cupom anual C = valor nominal × c. Um título de €1.000 com cupom anual de 4% promete €40 por ano. O cupom não corresponde automaticamente a 4% do preço pago no mercado secundário. Se você compra por €960, os €40 prometidos continuam sendo €40.\nO último pagamento inclui cupom final e principal. Um título de dois anos paga, portanto, €40 em t = 1 e €1.040 em t = 2. Omitir o cupom final subestima o valor; contar o principal em todos os anos o superestima. Um título sem cupom não paga cupons intermediários e, se o contrato for cumprido, faz um único pagamento de resgate no vencimento. Um título resgatável antecipadamente pelo emissor possui uma opção e exige análise adicional; os cálculos de fluxos fixos aqui não descrevem todos os títulos.\nNos casos numéricos, suponha cupons anuais, compra imediatamente após uma data de cupom, yield efetiva anual, ausência de juros acumulados, tarifas, impostos e inadimplência. O preço é o valor integral de liquidação nessas condições. Entre datas de cupom, o preço limpo normalmente exclui juros acumulados, enquanto o preço sujo os inclui; convenções de liquidação e contagem de dias precisam ser definidas antes do cálculo. Isso pertence a outra aula planejada, não é um termo esquecido na equação simplificada de hoje."
      },
      "sources": [
        "SEC-BONDS",
        "AUTHOR-MATH"
      ],
      "syllabus_refs": [
        "3.4.a"
      ]
    },
    {
      "id": "BOND-T2",
      "kind": "theory",
      "title": {
        "en": "Three rates answering three questions",
        "pt": "Três taxas que respondem a três perguntas"
      },
      "text": {
        "en": "Coupon rate answers: what annual payment does the contract calculate relative to face value? Current yield answers: how large is the annual coupon relative to today's price? Current yield = annual coupon / price. It ignores capital gain or loss on redemption and the dates of payments. A discounted bond can have a current yield below its yield to maturity because recovery toward par also contributes to the modelled return.\nYield to maturity (YTM) is the discount rate y that makes the present value of the promised coupons and redemption equal to the observed full price. For annual payments, P = Σ[C/(1+y)^t] + F/(1+y)^n, with coupons at t = 1 through n and principal F at n. Price is in euros, y is a decimal rate per year and n is years. It is usually easier to calculate a price from y than to solve y from a price. For one remaining payment, rearrangement gives y directly.\nYTM is a promised-cash-flow internal rate of return, not a guaranteed outcome. Default changes payments; selling early changes the sale price; fees and taxes reduce investor proceeds. To interpret a coupon bond's YTM as a compounded terminal-wealth rate, interim coupons must be reinvested at that rate. You can compute YTM without claiming reinvestment is guaranteed. If the fixed coupon and required yield match, our conventional bond prices at par. If required yield exceeds the coupon rate, price is below par; reversing that relationship gives a premium.",
        "pt": "A taxa de cupom responde: qual pagamento anual o contrato calcula em relação ao valor nominal? O rendimento corrente responde: qual é o tamanho do cupom anual em relação ao preço de hoje? Rendimento corrente = cupom anual / preço. Ele ignora ganho ou perda de capital no resgate e as datas dos pagamentos. Um título com desconto pode ter rendimento corrente inferior ao rendimento até o vencimento porque a recuperação em direção ao nominal também contribui para o retorno modelado.\nO rendimento até o vencimento (yield to maturity, YTM) é a taxa de desconto y que iguala o valor presente dos cupons e do resgate prometidos ao preço integral observado. Para pagamentos anuais, P = Σ[C/(1+y)^t] + F/(1+y)^n, com cupons em t = 1 até n e principal F em n. O preço está em euros, y é uma taxa decimal anual e n é o número de anos. Normalmente é mais fácil calcular preço a partir de y do que resolver y a partir de um preço. Com apenas um pagamento restante, rearranjar a equação fornece y diretamente.\nYTM é a taxa interna de retorno dos fluxos prometidos, não um resultado garantido. A inadimplência muda os pagamentos; uma venda antecipada muda o preço de saída; tarifas e impostos reduzem os recebimentos. Para interpretar a YTM de um título com cupom como taxa composta de riqueza terminal, os cupons intermediários precisam ser reinvestidos nessa taxa. É possível calcular YTM sem afirmar que o reinvestimento é garantido. Se cupom fixo e yield exigida coincidirem, o título convencional vale o nominal. Se a yield exigida superar o cupom, o preço fica abaixo do nominal; a relação inversa produz ágio."
      },
      "sources": [
        "AUTHOR-MATH",
        "SEC-BONDS"
      ],
      "syllabus_refs": [
        "3.4.b"
      ]
    },
    {
      "id": "BOND-T3",
      "kind": "theory",
      "title": {
        "en": "Duration describes sensitivity, not a guarantee",
        "pt": "Duration descreve sensibilidade, não uma garantia"
      },
      "text": {
        "en": "Maturity is the final payment date. Macaulay duration is the average time of the promised payments, weighted by each payment's present value as a fraction of price. Earlier coupons pull this average below maturity. For an annual-pay fixed cash-flow bond, modified duration Dmod = Dmac/(1+y). Its practical use is ΔP/P ≈ −Dmod × Δy. Use Δy as a decimal: a 50 basis-point increase is 0.005, not 0.5 and not 50. The result is a fractional price change, so −0.02 means approximately −2%.\nThis is a local, straight-line approximation. It holds other influences fixed and is best for small yield changes; exact bond prices form a curve. Convexity describes the curvature, studied later. Embedded options can change cash flows when rates change, so effective-duration techniques may be needed. A low duration does not remove credit or liquidity risk. A client needing cash before maturity cannot dismiss a possible sale-price loss simply because the bond is labelled fixed income.\nFor illustration, a bond has Dmod = 4 and yields rise by 0.25 percentage point. Δy = 0.0025; −4 × 0.0025 = −0.01, approximately −1%. This is an estimate, not the coupon or the probability of default.",
        "pt": "Vencimento é a data do último pagamento. Duration de Macaulay é o tempo médio dos pagamentos prometidos, ponderado pelo valor presente de cada pagamento como fração do preço. Cupons anteriores reduzem essa média em relação ao vencimento. Para um título de fluxos fixos e pagamentos anuais, duration modificada Dmod = Dmac/(1+y). Sua aplicação prática é ΔP/P ≈ −Dmod × Δy. Use Δy em decimal: uma alta de 50 pontos-base é 0,005, não 0,5 nem 50. O resultado é uma variação fracionária de preço; −0,02 significa aproximadamente −2%.\nEssa é uma aproximação local em linha reta. Mantém outras influências constantes e funciona melhor para pequenas variações de yield; os preços exatos formam uma curva. A convexidade descreve essa curvatura e será estudada depois. Opções embutidas podem alterar fluxos quando as taxas mudam, exigindo técnicas de duration efetiva. Duration baixa não elimina risco de crédito nem de liquidez. Um cliente que precisa de dinheiro antes do vencimento não pode ignorar uma possível perda na venda apenas porque o título é chamado de renda fixa.\nComo ilustração, um título tem Dmod = 4 e a yield sobe 0,25 ponto percentual. Δy = 0,0025; −4 × 0,0025 = −0,01, aproximadamente −1%. É uma estimativa, não o cupom nem a probabilidade de inadimplência."
      },
      "sources": [
        "FINRA-DURATION",
        "AUTHOR-MATH"
      ],
      "syllabus_refs": [
        "3.4.c"
      ]
    },
    {
      "id": "BOND-E1",
      "kind": "example",
      "title": {
        "en": "Worked example A · value every payment",
        "pt": "Exemplo resolvido A · avalie cada pagamento"
      },
      "text": {
        "en": "Data: face €1,000; coupon 4% paid annually; maturity two years; required YTM 5%; purchase on a coupon date just after payment.\n1. Coupon C = €1,000 × 0.04 = €40. Timeline: €40 in year 1; €40 + €1,000 = €1,040 in year 2.\n2. Discount separately: PV1 = €40/1.05 = €38.095238; PV2 = €1,040/1.05² = €943.310658.\n3. Add: price = €981.405896, rounded €981.41. This is below par because a €40 coupon alone is less attractive than the market's 5% required rate on par capital.\n4. Current yield = €40/€981.405896 = 4.075786%, approximately 4.08%. Coupon rate is 4%; current yield is about 4.08%; YTM is 5%. They are different measurements, not competing answers to one calculation.\n5. Reprice at 6%: €40/1.06 + €1,040/1.06² = €963.332147, or €963.33. Price falls €18.07, about 1.84%, while the coupon remains €40. An existing holder's contractual cash flow is unchanged; a buyer's required discount rate has changed.",
        "pt": "Dados: nominal de €1.000; cupom de 4% pago anualmente; vencimento em dois anos; YTM exigida de 5%; compra em data de cupom logo após o pagamento.\n1. Cupom C = €1.000 × 0,04 = €40. Linha do tempo: €40 no primeiro ano; €40 + €1.000 = €1.040 no segundo.\n2. Desconte separadamente: VP1 = €40/1,05 = €38,095238; VP2 = €1.040/1,05² = €943,310658.\n3. Some: preço = €981,405896, arredondado para €981,41. Está abaixo do nominal porque um cupom de €40 sozinho é menos atraente do que os 5% exigidos pelo mercado sobre o capital nominal.\n4. Rendimento corrente = €40/€981,405896 = 4,075786%, aproximadamente 4,08%. A taxa de cupom é 4%; o rendimento corrente é cerca de 4,08%; a YTM é 5%. São medidas diferentes, não respostas concorrentes para um mesmo cálculo.\n5. Reprecifique a 6%: €40/1,06 + €1.040/1,06² = €963,332147, ou €963,33. O preço cai €18,07, cerca de 1,84%, enquanto o cupom permanece €40. O fluxo contratual do detentor não muda; a taxa de desconto exigida por um comprador mudou."
      },
      "sources": [
        "AUTHOR-MATH"
      ],
      "syllabus_refs": [
        "3.4.a",
        "3.4.b",
        "3.4.c"
      ]
    },
    {
      "id": "BOND-E2",
      "kind": "example",
      "title": {
        "en": "Worked example B · estimate and then check",
        "pt": "Exemplo resolvido B · estime e confira"
      },
      "text": {
        "en": "Use a two-year zero-coupon bond paying €1,000 at maturity, initially yielding 5% effective annually. With only one cash flow, Macaulay duration is exactly two years: all present-value weight sits at t = 2.\n1. Initial price P = €1,000/1.05² = €907.029478.\n2. Dmod = 2/1.05 = 1.904762 years. Suppose yield rises to 5.5%: Δy = 0.055 − 0.05 = 0.005, or 50 basis points.\n3. Estimated proportional change = −1.904762 × 0.005 = −0.00952381, or −0.952381%. Estimated euro change = €907.029478 × −0.00952381 = −€8.638376. Estimated new price = €898.391102, approximately €898.39.\n4. Exact repricing: €1,000/1.055² = €898.452416, approximately €898.45. The estimate is lower by about €0.06 because a straight-line approximation misses curvature.\n5. Interpretation: duration was useful for a quick stress estimate, not an exact valuation. It says nothing about whether the issuer defaults or whether a buyer is available. Explain to a client why holding to maturity removes the need to realise this particular interim price change only if the client can actually wait and the issuer pays.",
        "pt": "Use um título sem cupom de dois anos que paga €1.000 no vencimento e rende inicialmente 5% efetivos anuais. Com apenas um fluxo, a duration de Macaulay é exatamente dois anos: todo o peso do valor presente está em t = 2.\n1. Preço inicial P = €1.000/1,05² = €907,029478.\n2. Dmod = 2/1,05 = 1,904762 anos. Suponha alta da yield para 5,5%: Δy = 0,055 − 0,05 = 0,005, ou 50 pontos-base.\n3. Variação proporcional estimada = −1,904762 × 0,005 = −0,00952381, ou −0,952381%. Variação em euros = €907,029478 × −0,00952381 = −€8,638376. Novo preço estimado = €898,391102, aproximadamente €898,39.\n4. Reprecificação exata: €1.000/1,055² = €898,452416, aproximadamente €898,45. A estimativa fica cerca de €0,06 abaixo porque a aproximação linear ignora a curvatura.\n5. Interpretação: a duration foi útil para uma estimativa rápida de estresse, não para uma avaliação exata. Ela não diz se haverá inadimplência nem se existirá comprador. Explique ao cliente por que manter até o vencimento evita realizar essa variação intermediária específica apenas se ele realmente puder esperar e o emissor pagar."
      },
      "sources": [
        "AUTHOR-MATH",
        "FINRA-DURATION"
      ],
      "syllabus_refs": [
        "3.4.c"
      ]
    },
    {
      "id": "BOND-E3",
      "kind": "example",
      "title": {
        "en": "Worked decision · income is not the whole return",
        "pt": "Decisão resolvida · renda não é todo o retorno"
      },
      "text": {
        "en": "A client needs €10,000 in one year and is shown two fictional bonds, each with €10,000 face value and exactly one year remaining. Bond A costs €10,200 and pays a €400 final coupon plus principal. Bond B costs €9,900 and pays a €150 final coupon plus principal. Assume certain payments, no fees or taxes, immediate purchase after the previous coupon date and no other cash flows. The different purchase amounts must be recognised before comparing returns.\nFor A, final receipts are €10,400. Net gain is €10,400 − €10,200 = €200. Return on the actual investment is €200/€10,200 = 1.960784%. A's 4% coupon is not its holding-period return: €200 of the coupon merely offsets the premium lost when redemption is at €10,000.\nFor B, final receipts are €10,150. Net gain is €250 and return is €250/€9,900 = 2.525253%. Its 1.5% coupon is lower, yet its one-year return is higher because the investor also gains €100 between purchase and redemption. The result illustrates why screening only for the largest coupon can rank offers incorrectly.\nIf the client has exactly €10,000 available and must purchase in a €10,000 nominal lot, A also exceeds the budget by €200. B leaves €100 uninvested; assuming zero interest on that balance, total final wealth is €10,250. This budget observation depends on the assumed trading lot and must not be generalised to every bond market. If partial nominal holdings are allowed, the comparison can instead scale positions to the same invested amount.\nEven after this arithmetic, B is not automatically suitable. Verify issuer risk, liquidity, settlement date and payment timing relative to the client's obligation. A payment arriving after the client's bill is due does not fund that bill on time. The calculations explain the alternatives; the client decision requires those additional facts.",
        "pt": "Um cliente precisa de €10.000 em um ano e recebe duas propostas fictícias de títulos, cada um com nominal de €10.000 e exatamente um ano restante. A custa €10.200 e paga cupom final de €400 mais principal. B custa €9.900 e paga cupom final de €150 mais principal. Suponha pagamentos certos, ausência de tarifas e impostos, compra logo após a data do cupom anterior e nenhum outro fluxo. É preciso reconhecer os valores de compra diferentes antes de comparar retornos.\nEm A, os recebimentos finais são €10.400. O ganho líquido é €10.400 − €10.200 = €200. O retorno sobre o investimento efetivo é €200/€10.200 = 1,960784%. O cupom de 4% não é o retorno do período: €200 do cupom apenas compensam o ágio perdido quando o resgate ocorre a €10.000.\nEm B, os recebimentos finais são €10.150. O ganho líquido é €250 e o retorno é €250/€9.900 = 2,525253%. O cupom de 1,5% é menor, mas o retorno anual é maior porque o investidor também ganha €100 entre compra e resgate. Isso ilustra por que selecionar apenas o maior cupom pode classificar propostas incorretamente.\nSe o cliente dispõe de exatamente €10.000 e precisa comprar lote nominal de €10.000, A também excede o orçamento em €200. B deixa €100 sem investir; supondo juros zero nesse saldo, a riqueza final total é €10.250. Essa observação depende do lote suposto e não deve ser generalizada a todos os mercados. Se posições nominais parciais forem permitidas, a comparação pode dimensionar posições para o mesmo valor investido.\nMesmo após o cálculo, B não é automaticamente adequado. Verifique risco do emissor, liquidez, liquidação e momento do pagamento em relação à obrigação do cliente. Um pagamento posterior ao vencimento da conta não a financia pontualmente. Os cálculos explicam as alternativas; a decisão do cliente exige esses fatos adicionais."
      },
      "sources": [
        "AUTHOR-MATH"
      ],
      "syllabus_refs": [
        "3.4.b",
        "3.4.c"
      ]
    },
    {
      "id": "BOND-P",
      "kind": "pitfalls",
      "title": {
        "en": "Three traps in client explanations",
        "pt": "Três armadilhas ao explicar ao cliente"
      },
      "text": {
        "en": "Calling a 4% coupon “a guaranteed 4% return” confuses contractual interest with the investor's purchase price and actual outcome. Buying above par can create a redemption loss. Repair the explanation by showing purchase price, coupons and redemption separately.\nTreating a 1% relative rise in a 5% yield as a one-percentage-point rise confuses units: 5% × 1.01 = 5.05%, a 5 basis-point increase; 5% + 1 percentage point = 6%, a 100 basis-point increase. Write the two yields as decimals and subtract.\nTreating duration as the date principal returns confuses a weighted average or sensitivity with maturity. For a coupon bond, some money arrives early; for a zero-coupon bond Macaulay duration equals maturity, but modified duration still differs when yield is nonzero. Revisit the single-payment example to separate these measures.",
        "pt": "Chamar um cupom de 4% de “retorno garantido de 4%” confunde juros contratuais com o preço pago e o resultado efetivo do investidor. Comprar acima do nominal pode gerar perda no resgate. Corrija a explicação mostrando preço de compra, cupons e resgate separadamente.\nTratar uma alta relativa de 1% em uma yield de 5% como alta de um ponto percentual confunde unidades: 5% × 1,01 = 5,05%, alta de 5 pontos-base; 5% + 1 ponto percentual = 6%, alta de 100 pontos-base. Escreva as duas yields em decimais e subtraia.\nTratar duration como a data de devolução do principal confunde média ponderada ou sensibilidade com vencimento. Em um título com cupom, parte do dinheiro chega antes; em um título sem cupom, a duration de Macaulay coincide com o vencimento, mas a modificada ainda difere quando a yield é diferente de zero. Retome o exemplo de pagamento único para separar as medidas."
      },
      "sources": [
        "AUTHOR-MATH"
      ],
      "syllabus_refs": [
        "3.4.a",
        "3.4.b",
        "3.4.c"
      ]
    },
    {
      "id": "BOND-C",
      "kind": "recap",
      "title": {
        "en": "Explain a price move in three sentences",
        "pt": "Explique uma variação de preço em três frases"
      },
      "text": {
        "en": "A bond price is the present value of its promised cash flows under a stated yield convention. Coupon rate, current yield and YTM answer different questions. Rising required yields reduce fixed-cash-flow prices. Modified duration estimates a small price change; maturity, credit risk and liquidity are separate considerations. Later lessons deepen settlement, yield solving, duration/convexity and Luxembourg taxation; this pilot provides foundations, not complete coverage of 3.4.",
        "pt": "O preço de um título é o valor presente dos fluxos prometidos conforme uma convenção de yield. Taxa de cupom, rendimento corrente e YTM respondem a perguntas diferentes. Alta das yields exigidas reduz preços de fluxos fixos. Duration modificada estima pequena variação de preço; vencimento, crédito e liquidez são considerações separadas. Aulas posteriores aprofundam liquidação, cálculo de yield, duration/convexidade e tributação luxemburguesa; este piloto fornece fundamentos, não cobertura integral de 3.4."
      },
      "sources": [
        "AUTHOR-MATH"
      ],
      "syllabus_refs": [
        "3.4.a",
        "3.4.b",
        "3.4.c"
      ]
    }
  ]
};
