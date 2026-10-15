# Golden Master QA — reading-only release

Date: 15 October 2026. Scope: three bilingual reading lessons and the minimal offline textbook interface. The 92 other planned titles have not been authored or validated as teaching content.

## Reproducible evidence

`node scripts/build.cjs` builds one standalone HTML using only Node built-ins. `node tests/check.cjs` validates structure, source references, coverage allocation, independent mathematics, backup schema and offline packaging. `node tests/browser.cjs` exercises the actual HTML through `file://` with Edge in an isolated profile and networking disabled. Exact outcomes are recorded in `evidence/unit-results.json` and `evidence/browser-results.json`.

The automated checks cover:

- Original baseline hash; unique lesson/objective/block IDs and complete bilingual teaching fields.
- All 78 official lettered leaves and the additional Green Finance exam area mapped to the reading plan; all 109 supplied author objective IDs retained.
- Corrected scope boundaries: no assessment, examination or adaptive learning data or functionality.
- Compounding checked by iterative annual accumulation; discounting checked by repeated reverse division.
- Bond valuation checked with an annuity formula; duration checked with an independent numerical derivative and exact repricing.
- Client-case arithmetic and percentage-point comparisons.
- Valid backup roundtrip, malformed/unsupported backup rejection and preservation of unknown future lesson IDs.
- Visible storage failure and preservation of corrupted stored data for recovery.
- Inline script syntax, a single offline HTML and absence of remote runtime requests.
- Actual lesson rendering, full Portuguese reveal, note persistence, green completion marks, next unfinished lesson, reopening completed lessons, backup download/restore and rejected malformed import.
- All three lessons at widths 390px and 1200px in both language states, with no horizontal overflow; keyboard operation of translation and focus progression.

The Edge run recorded zero HTTP(S) requests and zero page errors. This checks application requests, not all possible background traffic from a browser installation. The browser is launched in offline mode.

## Editorial review

The teaching content was reviewed against the corrected reading requirements: introductions, definitions, explanation of why/how/when, assumptions, alternatives, step-by-step calculations or decisions, risks, common misunderstandings, summaries and linked sources. Each pilot has three original worked examples. Full PT-BR text accompanies each teaching block, objective, prerequisite and lesson title; this is not a shortened summary.

Screenshots under `evidence/` show the desktop, mobile and complete lesson layouts. Visual inspection covered the header, sidebar, reading cards and translated mobile state. Technical checks and the author's editorial review are not independent specialist approval.

## Remaining limits

- Owner UAT and measured novice reading times remain pending.
- Independent Luxembourg regulatory review and independent linguistic review remain pending.
- Chrome and a human screen-reader audit are not recorded as completed.
- Planned tax lessons need individual current-law research; no unverified national tax rate is taught in the pilots.
- The complete course has not been produced. The matrix's planned rows are not claimed as substantive delivered coverage.
- Browser local-file storage can vary by file path and browser. JSON backup is the supported transfer mechanism; old baseline progress is preserved separately.

The Owner UAT gate is defined by the owner's corrected instructions. Production of the remaining reading units starts only after explicit acceptance or requested revisions to the three pilots.
