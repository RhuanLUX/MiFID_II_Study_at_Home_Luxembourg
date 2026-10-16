# Phase 1.1 — completed translation audits

Release: **1.1.0-bilingual**, 16 October 2026. All 95 English lessons have complete PT-BR counterparts: 92 newly authored translations and three preserved bilingual Golden Masters. No pending translations. English remains primary; the approved eye control reveals the corresponding Portuguese reading offline.

## First pass: completeness and fidelity

All meaningful English/PT fields in all 95 lessons were read in full after production: titles, prerequisites, timing, objectives, block headings and paragraphs. Examples, conclusions, qualifications and exclusions were compared with the originals. The three Golden Masters were reviewed contextually, including their existing localized notation, without editing their source files. Per-lesson review records are in `evidence/translation-audit-pass1.json`.

Structural checks separately confirm 2,180 populated Portuguese fields, 3,850 corresponding paragraph pairs in the 92 new translations and 2,102 fields with matching numerical tokens and mathematical signs. This supports the full reading; it is not a word-count-based substitute for fidelity review. The original English projection, source catalogue, IDs, calculation data and approved application files match the accepted `e0368a7` baseline.

## Second pass: distinct technical verification

A separate challenge pass revisited a high-risk bilingual paragraph in **every one of the 95 lessons**, prioritizing restrictive conditions, signs, units, denominators, legal scope and statements that could imply guarantees. This is a different method by the same Codex reviewer, not a second independent human reviewer. Its actual coverage and findings are in `evidence/translation-audit-pass2.json`.

It also recalculated **51 sensitive examples directly from their reading premises**, using 60-digit Python Decimal arithmetic, without importing the lesson calculation registry or JavaScript implementations. All 51 passed. They include dated discounting, dirty bond prices, haircut inversion, option and barrier boundaries, incremental over-hedging, FX direction, covariance and geometric growth, annuities, tax bases, fee timing and sustainability denominators. Reproduce with `python scripts/audit-translation-calculations.py`; results are in `evidence/translation-independent-calculations.json`.

The initial Lesson 17 comparison value in this new audit script was transcribed incorrectly. Inspection of the complete reading confirmed the lesson's €11,260.360547 and the independent result €11,260.36054751095. The audit fixture was corrected; no lesson correction was warranted.

Technical terminology was additionally challenged against the retained official ACD 2026 LIR excerpts on Articles 105(4), 107, 111bis(7)/111ter(7) and premature payments, and the CSSF coordinated AML text on attempted transactions, suspicion, PEP controls and FIU instructions. These were targeted checks of translation meaning against the approved source snapshot; they do not represent a repeated complete English legal audit or clearance of every legal consolidation.

## Translation corrections

| ID | Lesson | Confirmed issue and correction |
|---|---|---|
| T01 | 24 | Benchmark “economic interest” now describes the economic quantity measured, avoiding the literal personal-interest implication. Corrected during production. |
| T02 | 34 | Summary explicitly states final-to-initial wealth ratio, removing an ambiguous “initial/final” shorthand. Formula was already correct. |
| T03 | 42 | “Regime de tributação definitiva dos juros” clarifies that finality qualifies taxation. |
| T04 | 88 | “Quem está sob suspeita” correctly identifies the party an informal investigation could alert, replacing “o objeto.” |
| T05 | 89 | Objective distinguishes unusual activity from a conclusion that an offence occurred, avoiding confusion with completed versus attempted conduct. |
| T06 | 91 | Authoritative sources are described as current and recognized as reliable, rather than merely “authorized.” |
| T07 | 93 | Latest reported 27% is a dated observation; “ocasionalmente” was removed because no frequency claim was established. |
| T08 | 40 | Below-strike call profit explicitly equals the negative value of the premium paid. The premium itself is not described as negative. Identified in pass two and rechecked against the original. |

All eight are wording, terminology or directional-clarity corrections. None changed original numbers, formulas, legal classifications, sources, English text or application behavior. No confirmed translation defect remains open. A minor pre-existing English heading inconsistency in Lesson 18 is documented separately in `TRANSLATION_ISSUES_EN.md`; its correct body and calculations remain preserved as authorized.

## Final regression and delivery artifact

- 15 structural/regression checks and 461 existing numerical cases passed.
- Coverage: all 78 official lettered syllabus leaves, the separate Green Finance examination area, 109 supplied objectives and 285 worked reading examples.
- All 95 lessons opened under `file://` in offline Edge 155.0.4283.45; 190 page/viewport checks at 390px and 1200px passed.
- Every Portuguese block heading/body matched its source after activating the existing translation control. Navigation, keyboard translation, notes, completion, next-unfinished selection, backup/export/import, malformed imports, old Golden Master progress and storage-failure handling passed.
- Zero external requests and zero page errors. No translation service or runtime network dependency.

Final HTML: `dist/EIP_Luxembourg_Academy.html`, 2,224,714 bytes. SHA-256: `1758aa49107f2bc76086a28638eabb0da31c2bdaa5b42c670462c86abe1ae7cc`. All final regression evidence is bound to this hash; both translation reviews and independent recalculations are bound to the current content hash.

The official repository is https://github.com/RhuanLUX/MiFID_II_Study_at_Home_Luxembourg, branch `main`. Existing history was retained. Commit/push and local/remote synchronization are verified after report generation and reported with the observed final commit SHA in the delivery message.

## Remaining limitations

The two Codex translation methods do not imply independent human linguistic approval, specialist regulatory sign-off or accreditation. Original source-access/consolidation limitations, individual tax/treaty classifications, future legal changes and unmeasured learner study time remain documented in `ISSUES_DE_FONTES.md` and the original English audit. Chrome and an independent screen-reader audit were not recorded.

New translations deliberately retain English numerical notation for direct comparison: `1,000` means one thousand and `1.25` means one and a quarter. Existing Golden Masters retain their approved Brazilian formatting. Original publication titles, institution names, acronyms and citation metadata remain intact. No Brazilian tax or regulatory regime was substituted for Luxembourg/EU content. No redesign, new lessons, exercises, simulators or gamification were introduced.
