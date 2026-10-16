# Phase 2 QA — optional bilingual reinforcement

Release 2.0.0-reinforcement, 16 October 2026. Scope: exactly five optional selection exercises for each of the 95 existing approved lessons. Final build SHA-256: `57c7b4a714adac0e8883b5de1117ebb9edfc92a956dffc641340424df7a1da65`. Delivery file: `academy/dist/EIP_Luxembourg_Academy.html` (3,033,509 bytes).

## Content and review

| Measure | Completed |
|---|---:|
| Lessons with five exercises | 95/95 |
| Bilingual exercises | 475/475 |
| Easy / intermediate / challenging | 190 / 190 / 95 |
| Multiple choice | 165 |
| Selectable fill in the blank | 94 |
| Practical scenario | 204 |
| Matching | 12 |

All questions have stable lesson-derived identifiers and explicit teaching-block links. Full lesson reading preceded authoring. Answer uniqueness, plausible neighbouring concepts, difficulty progression, meaningful explanations and EN/PT meaning were reviewed during authoring; the ledger binds each lesson's exercise file to its SHA-256. Each selection question has four alternatives and one answer. Each matching solution is a unique permutation of three or four associations. Intermediate/challenging feedback explains the reasoning and material wrong alternatives. No typing, written submission or separate application is required for practice.

A further critical financial review examined the prompts, all alternatives and feedback of all 146 examples with calculation metadata. Python Decimal at 45-digit precision independently recomputed those 146 models and performed 41 additional direct-premise checks for later lessons: 187 checks passed (checks are not a claim of 187 distinct examples). The Python implementation does not import or evaluate the JavaScript formula implementation; its IRR uses iterative solution. Numerical verification alone cannot establish legal classification or pedagogical quality.

Targeted official-source rechecks covered Luxembourg residence/assimilation and capital-income routes, deposit guarantees, collateral haircuts, benchmarks, UCITS concentration and subscription tax, MiFID service classification/suitability/costs/inducements, pension and ordinary insurance tax distinctions, sustainability disclosures and claims, market abuse, AML and ethics. Dated URLs and the scoped findings are in `evidence/reinforcement-content-review.json`. In particular, the 2026 coordinated LIR confirms the combined €4,500 Article 111bis/111ter limit, rather than older €3,200 guidance; the ordinary insurance/debit-interest ceiling is a separate €672 framework. Proposed reforms are not presented as effective rules. This was targeted source verification, not a new exhaustive specialist review of every consolidated legal provision.

## Findings and corrections

1. A present-value expected result differed below one cent. Independent Decimal calculation corrected the exercise expectation and six-decimal feedback; the cent result remains €11,260.36.
2. Basic-question distractors in 33 early lesson files were strengthened with neighbouring concepts and realistic base/sign/timing/legal confusions. Residence, fund-income and half-dividend wording was clarified.
3. An inheritance question could admit competing conclusions. It was narrowed to the specific knowledge/understanding issue.
4. One switching-cost distractor incorrectly scaled 0.3%; another cost distractor's label did not match its €1,100 calculation. Both EN/PT versions were corrected.
5. The retirement-product cost comparison gives `20,000 × (1.04^20 − 1.03^20) = 7,700.238167...`, rounding to **€7,700.24**. Exercise EIP-6.2-03-R5 was corrected. The approved reading EIP-6.2-03-B05 (chronological Lesson 79) still states €7,700.23; that one-cent baseline discrepancy is retained because the owner prohibited rewriting approved lessons.
6. Two challenging prompts depended on numerical premises from the previous question. The order-book and risky-portfolio inputs are now repeated so each optional exercise is independently answerable.
7. Full matching definitions are displayed above dropdowns because native selects clip long text on narrow screens. The list and explanatory feedback preserve the complete definitions.

## Validation

| Check | Result |
|---|---|
| Existing unit/storage/build checks | 15 passed |
| Existing reading numerical cases | 461 passed |
| Coverage | 95 units; 78 official leaves; 109 explicit objectives; 285 worked readings |
| Existing translations | 95 complete; zero pending; 2,180 fields; 3,850 paragraph pairs; 2,102 strict numeric fields |
| Reinforcement structure/baseline/numeric checks | 95 lessons, 475 questions; full EN/PT numeric-token consistency; global IDs and unique matching text |
| Independent Decimal checks | 187 passed |
| Reading regression, Edge offline | 95 lessons; 190 responsive checks at 390/1200px; notes, completion, navigation and backup |
| Reinforcement regression, Edge offline | 475 wrong → feedback → retry → correct interactions; 190 responsive lesson checks; translation retains response state |
| Network/page errors | Zero remote requests; zero page errors |
| Optional placement/completion | After notes, before navigation; completion succeeds before answering |

The final browser evidence must match the final build hash above. Evidence files: `unit-results.json`, `calculation-results.json`, `coverage-results.json`, `translation-results.json`, `browser-results.json`, `reinforcement-results.json`, `reinforcement-browser-results.json`, `reinforcement-decimal-results.json`, and the reinforcement desktop/mobile screenshots in `academy/evidence/`.

Preservation checks compare entire English/PT lesson data, sources and reading storage to the approved baseline. Original app/style hashes are checked after removing only the authorised extension. Practice does not alter backup schemas or persist answers. The translation regression reports `interface_preserved: false` because the authorised new section changes the interface, alongside `authorized_reinforcement_extension: true`; this does not indicate a redesign or translation regression.

## Limits and delivery

The single HTML is fully offline for reading and practice; source links require internet when deliberately opened. Edge was tested; a separate Chrome or independent screen-reader audit is not recorded. Reviews were performed by Codex using distinct methods, without independent specialist sign-off or official EFPA/CSSF accreditation. Legal/tax outcomes remain fact-, residence-, treaty- and date-dependent; the historical source-issues report remains applicable. Learner timing has not been empirically calibrated. The known one-cent approved-reading discrepancy above is the only newly identified unresolved content defect in this Phase 2 review; no known exercise defect remains after corrections and tests.

Git delivery uses the existing `main` branch and official origin, preserving history and remote content. The final commit SHA, push and clean local/remote synchronization are confirmed in the owner delivery message, avoiding a self-referential commit hash in tracked reports.
