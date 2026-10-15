# Phase 1.1 translation production — in progress

Approved English baseline: 1.0.1-reading, commit e0368a7. All 95 English lessons, formulas, numerical assumptions/results, citations, IDs, curriculum sequence and approved application functions must remain unchanged. Owner authorisation is preserved in OWNER_TRANSLATION_AUTHORIZATION.txt.

The three original bilingual Golden Masters are retained. The other 92 translations are authored in content/pt-BR/ and attached to their corresponding existing lesson fields at build time. No translation API or online runtime dependency is introduced. English is the primary language; the approved eye control displays the corresponding complete Portuguese.

Production uses batches of 10–15 lessons. Correspondence checks compare all meaningful lesson fields, paragraph counts, numerical tokens and preserved English content. Financial terminology follows professional PT-BR, retaining useful examination terms such as YTM, NAV and duration. Amounts, percentages, formulas and dates retain the original English numerical notation to support direct side-by-side comparison; they must not be silently interpreted as different values.

Neither translation production nor the final two translation audits are complete at this stage. Automated counts and numerical-token matching support, but do not replace, semantic fidelity review. Current audited English reports remain historical evidence for the approved baseline rather than claiming validation of unfinished translations.

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
