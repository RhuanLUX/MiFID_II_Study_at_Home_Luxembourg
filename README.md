# EIP Luxembourg Academy

Independent educational reading platform for the EFPA Luxembourg EIP syllabus. Official project repository: https://github.com/RhuanLUX/MiFID_II_Study_at_Home_Luxembourg.

**Release 1.1.0-bilingual is complete:** 95 English lessons and 95 full PT-BR translations (100%; zero pending). Both translation audits are complete: a full bilingual fidelity reading and a distinct technical review across all 95 lessons, supported by 51 independent Decimal recalculations and final offline regression. Eight translation wording/terminology issues were corrected across production and audit. The approved English baseline remains commit `e0368a7`, with its two original content audits, 285 worked examples and all approved application files preserved. The three original bilingual Golden Masters are unchanged.

Open [the standalone HTML](academy/dist/EIP_Luxembourg_Academy.html) directly in a browser. Study content, notes, completion and JSON backups work offline. Source links optionally require internet. The existing eye button reveals complete Portuguese for every lesson.

## Repository layout

- `academy/src/`: approved application, styling and local storage.
- `academy/content/`: English lessons, curriculum, references and `pt-BR/` translations.
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
```

Browser regression uses Playwright and Microsoft Edge in the development environment: `node academy/tests/browser.cjs`. These dependencies are not required to use the delivered HTML. See [the academy README](academy/README.md), [English content audit](academy/docs/CONTENT_AUDIT.md) and [translation audit](academy/docs/TRANSLATION_AUDIT.md) and [QA report](academy/docs/QA_REPORT.md) for validated results and limitations.

The course is not official EFPA accreditation or individual legal/investment advice. The editorial study plan is not certified training-hour equivalence. Translation does not replace Luxembourg/European rules with Brazilian law. Secrets, personal reading backups, research downloads and development caches are excluded from the repository.

New PT-BR translations retain English number separators for direct comparison (`1,000` = one thousand; `1.25` = one and a quarter). The three approved Golden Masters retain their existing Brazilian formatting.
