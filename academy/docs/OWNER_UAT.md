# Owner UAT — reading-only Golden Masters

Historical review checklist for build **0.2.0-reading-uat**. **Superseded by OWNER_UAT_APPROVAL.txt:** the owner reviewed Lesson 16, approved it as the reference standard and authorised continuous production without new batch approval. The original checklist below records the earlier review state; it does not impose a current production gate. Current progress is in PROGRESS.md.

Open `dist/EIP_Luxembourg_Academy.html` directly in Edge or another modern browser. Only three authored lessons are available. The sidebar includes the full chronological reading plan; planned entries are explicitly unavailable and do not count as delivered lessons.

| Lesson | Content | English words | PT-BR words | Worked examples | Review status |
|---|---|---:|---:|---:|---|
| EIP-3.1-A | Simple/compound growth, present value, conventions, real/nominal distinction and comparing offers | 1,808 | 1,849 | 3 | Editorial and numerical checks passed; Owner UAT pending |
| EIP-3.4-A | Debt claim, cash flows, price, yield measures, duration interpretation and comparing bond proceeds | 1,930 | 2,071 | 3 | Editorial and numerical checks passed; Owner UAT pending |
| EIP-4.1-A | Service distinction, client evidence, suitability decisions, alternatives and sustainability | 2,084 | 2,144 | 3 | Source-linked editorial check passed; independent regulatory review pending |

Word counts describe the draft, not proof of educational quality. Duration is approximately 30 minutes for careful reading and following the worked reasoning; it has not been measured with a learner. These pilots are self-contained but occur at positions 16, 25 and 58 in the current plan; they do not replace the earlier beginner foundations.

## Review the material

Read one complete page at a normal study pace. Note elapsed time and where you had to reread because the explanation was unclear. The intended study involves understanding the worked calculations and decisions; there is no quiz or mandatory task. Personal notes are optional.

For each pilot, assess whether definitions arrive before they are needed, each calculation explains its inputs and result, the cases explain alternatives and consequences, and the lesson stands on its own without needing a basic explanation elsewhere. Reveal PT-BR and compare the theory, examples and conclusions. Flag omissions, unnatural wording or numerical inconsistency in either language.

Check simple behaviour: mark a lesson completed and see the green sidebar check; reload and see the next unfinished available lesson; reopen the completed lesson; type a note; export and restore a backup. During UAT, Previous/Next navigates only the available pilots.

## Gate checklist

| Criterion under corrected scope | Evidence / state |
|---|---|
| Exact syllabus references and stable IDs | All three lessons, objective links and block-level coverage map |
| Detailed why/how/when explanation, terms and misconceptions | Ten substantive reading blocks per lesson, including introduction and summary |
| Fully worked examples | Three per lesson; original fictional scenarios and explicit assumptions |
| Numerical verification | Independent accumulation, annuity valuation and finite-difference checks in tests/check.cjs |
| Full English and PT-BR | Every teaching block, objective, title, prerequisite and summary paired; paragraph checks and editorial review |
| One page per lesson | Full-page browser screenshots; normal scrolling |
| Offline runtime | file:// test in Edge with network disabled; zero remote requests |
| Completion, notes, next lesson, backup | Browser tests passed |
| 390px / 1200px and keyboard | All three pilots in both language states fit horizontally; keyboard translation verified |
| Independent regulatory and linguistic review | Pending; automated checks do not replace it |
| Actual novice study time | Pending Owner UAT; no invented pilot timing |
| Owner acceptance of depth and simplicity | **Pending** |
| Quizzes/exams/scoring/adaptive systems | Excluded by owner correction; not implemented |

Useful feedback format: lesson ID, section title, what was unclear or too shallow, suggested change, English/PT-BR issue if any, and actual reading time. Approval should explicitly say whether the three lessons establish the standard for subsequent production. Silence is not approval.
