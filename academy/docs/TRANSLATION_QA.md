# Phase 1.1 translation QA — complete

Approved English baseline: 1.0.1-reading, commit e0368a7. All 95 English lessons, formulas, numerical assumptions/results, citations, IDs, curriculum sequence and approved application functions must remain unchanged. Owner authorisation is preserved in OWNER_TRANSLATION_AUTHORIZATION.txt.

The three original bilingual Golden Masters are retained. The other 92 translations are authored in content/pt-BR/ and attached to their corresponding existing lesson fields at build time. No translation API or online runtime dependency is introduced. English is the primary language; the approved eye control displays the corresponding complete Portuguese.

Production uses batches of 10–15 lessons. Correspondence checks compare all meaningful lesson fields, paragraph counts, numerical tokens and preserved English content. Financial terminology follows professional PT-BR, retaining useful examination terms such as YTM, NAV and duration. Amounts, percentages, formulas and dates retain the original English numerical notation to support direct side-by-side comparison; they must not be silently interpreted as different values.

Final status: all 95 translations and both full-course translation audits are complete. See TRANSLATION_AUDIT.md and the final section below. The batch entries that follow are historical checkpoints: their pending status describes that checkpoint, not the final release. Automated comparisons support the actual recorded semantic and technical reviews.

## Batch 01 — Lessons 1–10

Ten complete new translations integrated; together with the three preserved bilingual Golden Masters, 13/95 lessons are available in Portuguese (13.68%). The remaining 82 are explicitly pending. All 230 new translated fields retain corresponding paragraph counts, numeric tokens and mathematical signs; 428 paragraph pairs were checked. Source-linked meaning, economic assumptions, scenario caveats and complete reasoning were reviewed during translation. Specific terminology includes custo de oportunidade, saldo primário, pontos-base, capacidade/necessidade de financiamento líquida, alavancagem operacional and valor patrimonial líquido (NAV).

English content, all source metadata and approved app.js/style.css/storage.js hashes match the approved baseline. All 461 existing calculation checks, 15 structural checks and the 78-leaf/109-objective coverage test passed. Offline Edge opened all 95 English pages at both 390px and 1200px, exercised the available PT eye controls, notes, completion and backups, with zero external requests/page errors. Build: 1.1.0-translation-b01; SHA-256 1a33a7dda7214dc2cbe52fea82711f110cc0fcbbcadd104eeb5f471df12108f8.

The previous coverage test hardcoded 92 pending translations and the browser test hardcoded the first lesson as untranslated. Those historical assumptions were updated to inspect actual translation status; educational coverage and functional assertions remain intact. This was a test-expectation adjustment, not a change to the approved application. Final global fidelity and technical-language audits remain pending until production is complete. No push has been made; the GitHub origin is configured and main retains the complete local history.

## Batch 02 — Lessons 11–24, excluding the already bilingual Lesson 16

Thirteen additional complete translations integrated. Availability: 26/95 (27.37%), including the three preserved Golden Masters; 69 pending. All 521 new translated fields passed numerical-token, mathematical-sign and paragraph checks, covering 971 paragraph pairs. Careful translation retained trading-route distinctions, order risks, quote sides, tax bases, creditable advances, resident-only elections, deposit aggregation, haircut inversion and day-count/benchmark conventions. No English factual rewrite was performed.

All 461 numerical, 15 structural and full syllabus/objective coverage checks passed. Offline Edge passed all 190 page/viewport checks with zero external requests/page errors. The browser regression now also compares every translated block heading and body with the exact corresponding PT field after the eye control is activated. Its first run exposed a test-selector issue with dots in stable lesson IDs; quoting the ID attribute corrected the test, without changing any application code. Build 1.1.0-translation-b02; SHA-256 bae78d0773e4ec8ff08a2e1fa960ed3162adbd8375d8c9f42ea893354e9c02a1.

Progress generation now distinguishes the completed historical English content audits from the still-pending global translation audits. The English-audit evidence is retained unchanged; it is not rebound to incomplete translations. Current progress and regression results describe the actual bilingual build.

## Translation corrections during production

T01 — In Lesson 24, the draft literal rendering of “economic interest” as “interesse econômico” was replaced with “grandeza econômica que medem” / “medida econômica” in the benchmark context. This preserves the distinction between the economic measurement underlying term and overnight references, without suggesting an investor's personal interest. No English, number or formula changed. The correction will be included in the next validated build.

T02 — Lesson 34's summary now says “relação entre patrimônio final e inicial”, consistently with the displayed annualisation formula. The draft shorthand “inicial/final” could suggest an inverted ratio even though the worked formula was correct. No original calculation or English text changed.

## Batch 03 — Lessons 26–38

Thirteen additional complete translations integrated. Availability: 39/95 (41.05%), including the preserved Golden Masters; 56 remain pending. New translations cover clean/full bond prices, accrued interest, YTM, duration/convexity, credit/liquidity/reinvestment, bond/equity taxation, share rights, valuation, total return, concentration, forwards and futures margin. The 808 new translated fields retain numerical tokens and mathematical signs, with 1,507 corresponding paragraph pairs. Corrections T01/T02 are included.

All 461 existing numerical cases, 15 structure/regression checks and full syllabus/objective coverage passed. All 190 offline Edge page/viewport checks passed, including exact translated block headings/body text after the existing eye control is activated, notes, completion, backups and storage handling. No remote requests or page errors. Approved English data, all references and application files remain unchanged. Build 1.1.0-translation-b03; SHA-256 b7cf5cd8c42c1d55c6a0189d7c74319ef47ec6bb04801dff8b76e5c967054fe4.

This is a validated production checkpoint, not completion of Phase 1.1. The two full-course translation audits and final GitHub push remain pending.

## Batch 04 — Lessons 39–51

Thirteen additional full translations integrated: 52/95 available (54.74%); 43 pending. Options, swaps, hedging, FX, structured products and fund policy/operations/risk were translated with all scenario limitations, exposure bases and regulatory exceptions retained. All 1,097 new translated fields passed numerical-token/sign checks, covering 2,048 paragraph pairs. English, source and approved interface hashes remain unchanged.

All 461 numerical cases, 15 structural checks, complete coverage and 190 offline Edge page/viewport checks passed, including available PT blocks, notes/completion/backups, zero remote requests and zero page errors. Build 1.1.0-translation-b04; SHA-256 506ad3065ec4dd30de799c52ec4126d43d920192f4ca2786f4e5c4047b3d4963. Global translation audits and final GitHub push remain pending.

## Batch 05 — Lessons 52–65, excluding the preserved bilingual Lesson 58

Thirteen additional full translations integrated: 65/95 available (68.42%); 30 pending. Fund taxation, ESG factors/scenarios, complex-product classification, client evidence/preferences and introductory portfolio statistics retain their complete reasoning, conditions and examples. All 1,390 new translated fields passed numerical-token/sign checks, with 2,598 corresponding paragraph pairs. No English, source catalogue or approved interface changes.

All 461 numerical cases, 15 structural checks, complete coverage and 190 offline Edge page/viewport checks passed; no remote requests or page errors. Build 1.1.0-translation-b05, dated 16 October 2026; SHA-256 eb02ff13a87f8648eef1362c5fb7c34a67d1627d258b2ebdbbce4b992c8e815f. Historical source/English-audit dates remain unchanged. Both global translation audits and final push remain pending.

## Batch 06 — Lessons 66–80

Fifteen additional full translations integrated: 80/95 available (84.21%); 15 pending. Portfolio risk/efficiency/performance, policy roles/settlements and retirement/tax conditions retain every explanation, scenario and qualification. All 1,739 new translated fields passed numerical-token/sign checks, with 3,257 corresponding paragraph pairs. English, references, approved interface and Golden Master source hashes remain unchanged.

All 461 numerical cases, 15 structural checks, complete coverage and 190 offline Edge page/viewport checks passed, zero external requests/page errors. Build 1.1.0-translation-b06; SHA-256 d4547544a52dcf1dc20dbabfe9b993d7fcf32f51cd5857673b7518a1b0980c05. Test/progress report dates now use the release date, 16 October 2026; historical source retrieval dates and test-fixture dates remain intact. Both global translation audits and final GitHub push remain pending.

## Batch 07 — Lessons 81–95

Fifteen additional complete translations integrated: 95/95 (100%), no pending translation. All 2,180 populated PT fields are present; the 92 newly authored translations comprise 2,102 fields with identical numerical tokens/mathematical signs and 3,850 corresponding paragraph pairs. Conduct, AML, market abuse, ethics, secondary-market operations and Green Finance preserve the current-law/proposal distinctions and all scenario limitations. Original English, sources, approved interface and Golden Master files remain unchanged.

All 461 numerical cases, 15 structural checks, full coverage and 190 offline Edge checks passed, with zero external requests/page errors and complete PT block rendering. Build 1.1.0-translation-b07; SHA-256 0d836660d9622af7f757b0db3c1617ab9722391a079be8d9afea8c7f7ba57c45. Translation production is complete; the two global translation audits are still pending. No final-completion or GitHub-push claim is made.

## Final release — 16 October 2026

Production and both translation audits are complete:95/95 PT-BR, zero pending. Pass1 read all bilingual fields in full; pass2 separately challenged technical qualifiers across all95 lessons and independently recalculated51 sensitive examples with Decimal. T01–T08 are corrected, documented in TRANSLATION_AUDIT.md. A minor original English heading observation remains separately documented; English was not edited.

Final15 structural,461 numerical and fullcoverage checks passed. All190 offline Edge page/viewport checks passed, including every PT block, notes/completion/navigation/backups and storage-error handling; zero remote requests/page errors. English, sources, approved application files and Golden Masters match their accepted hashes. FinalHTML SHA-256: 1758aa49107f2bc76086a28638eabb0da31c2bdaa5b42c670462c86abe1ae7cc.

There is no open confirmed translation defect. Independent human/specialist approval and original source-consolidation limitations remain outside these two Codex verification methods. GitHub commit/push/synchronization is verified after generating the reports and reported in the delivery message.
