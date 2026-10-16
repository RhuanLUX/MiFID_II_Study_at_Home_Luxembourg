# EIP Luxembourg Academy

Independent educational reading platform for the EFPA Luxembourg EIP syllabus. Official project repository: https://github.com/RhuanLUX/MiFID_II_Study_at_Home_Luxembourg.

**Phase 2 is FROZEN — ready for Owner UAT:** 95/95 lessons each contain five optional bilingual exercises (475/475), with explanatory feedback and individual retry. See [reinforcement QA and known limitations](academy/docs/REINFORCEMENT_QA.md) and [progress](academy/docs/REINFORCEMENT_PROGRESS.md). Release: 2.0.1-reinforcement. The Owner-authorised final cent correction aligns Lesson 79 in both languages with its exercise at €7,700.24; all other educational content and the interface are preserved.

**Phase 3 is POSTPONED:** the supplied simulator is preserved only as an unreviewed future reference. No audit or development may begin without further explicit Owner authorisation. See [postponed scope and reference integrity](academy/docs/PHASE3_POSTPONED.md).

**The approved Release 1.1.0-bilingual baseline is complete:** 95 English lessons and 95 full PT-BR translations (100%; zero pending). Both translation audits are complete: a full bilingual fidelity reading and a distinct technical review across all 95 lessons, supported by 51 independent Decimal recalculations and final offline regression. Eight translation wording/terminology issues were corrected across production and audit. The approved English baseline remains commit `e0368a7`, with its two original content audits, 285 worked examples and all approved application files preserved. The three original bilingual Golden Masters are unchanged.

Open [the standalone HTML](academy/dist/EIP_Luxembourg_Academy.html) directly in a browser. Study content, notes, completion and JSON backups work offline. Source links optionally require internet. The existing eye button reveals complete Portuguese for lessons and exercises. Practice is optional and does not change completion. Practice selections reset when the page is reloaded; reading notes and progress remain in the existing local storage and JSON backups.

## Repository layout

- `academy/src/`: approved application, styling and local storage.
- `academy/content/`: English lessons, curriculum, references, `pt-BR/` translations and `reinforcement/` exercise JSON files.
- `academy/dist/`: final standalone HTML and its build manifest.
- `academy/docs/`: syllabus matrices, audit records, QA and progress reports.
- `academy/tests/`: numerical, coverage, translation and functional regression checks.
- `academy/scripts/`: build and validation-report scripts.
- `EIP_Luxembourg_Codex_Pacote_Master/`: preserved supplied project package and original baseline.

## Development and offline use

Node.js is required only to rebuild and run the development checks:

```sh
node academy/scripts/build.cjs
node academy/tests/check.cjs
node academy/tests/calculations.cjs
node academy/tests/coverage.cjs
node academy/tests/translation.cjs --final
node academy/tests/reinforcement.cjs --final
python academy/scripts/audit-reinforcement-calculations.py
```

Reinforcement browser checks: `node academy/tests/reinforcement-browser.cjs`.

Browser regression uses Playwright and Microsoft Edge in the development environment: `node academy/tests/browser.cjs`. These dependencies are not required to use the delivered HTML. See [the academy README](academy/README.md), [English content audit](academy/docs/CONTENT_AUDIT.md) and [translation audit](academy/docs/TRANSLATION_AUDIT.md) and [QA report](academy/docs/QA_REPORT.md) for validated results and limitations.

The course is not official EFPA accreditation or individual legal/investment advice. The editorial study plan is not certified training-hour equivalence. Translation does not replace Luxembourg/European rules with Brazilian law. Secrets, personal reading backups, research downloads and development caches are excluded from the repository.

New PT-BR translations retain English number separators for direct comparison (`1,000` = one thousand; `1.25` = one and a quarter). The three approved Golden Masters retain their existing Brazilian formatting.
