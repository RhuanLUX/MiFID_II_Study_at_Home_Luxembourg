# EIP Luxembourg Academy

Independent educational reading platform for the EFPA Luxembourg EIP syllabus. Official project repository: https://github.com/RhuanLUX/MiFID_II_Study_at_Home_Luxembourg.

The approved English baseline is **1.0.1-reading**, commit `e0368a7`: 95 English lessons, 285 worked examples, two documented content-audit passes and offline regression validation. **Phase 1.1 PT-BR translation is in progress: 39/95 lessons available (41.05%), 56 pending after batch 03.** This includes the three preserved bilingual Golden Masters. Full bilingual completion and the final two translation audits are not yet claimed; remaining translations are being authored and checked against the preserved English baseline.

Open [the standalone HTML](academy/dist/EIP_Luxembourg_Academy.html) directly in a browser. Study content, notes, completion and JSON backups work offline. Source links optionally require internet. The existing eye button reveals complete Portuguese where available; untranslated lessons remain explicitly pending.

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
node academy/tests/translation.cjs
```

Browser regression uses Playwright and Microsoft Edge in the development environment: `node academy/tests/browser.cjs`. These dependencies are not required to use the delivered HTML. See [the academy README](academy/README.md), [English content audit](academy/docs/CONTENT_AUDIT.md) and [QA report](academy/docs/QA_REPORT.md) for validated results and limitations.

The course is not official EFPA accreditation or individual legal/investment advice. The editorial study plan is not certified training-hour equivalence. Translation does not replace Luxembourg/European rules with Brazilian law. Secrets, personal reading backups, research downloads and development caches are excluded from the repository.
