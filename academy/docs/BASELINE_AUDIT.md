# Baseline and technical assessment

The supplied baseline remains byte-for-byte unchanged. SHA-256: `b990bdc7038cf980609484eb6aa24ebc1da8cf97d3af5c58e2cb44ede3a364c1`. `scripts/audit-baseline.cjs` reproduces the metrics in `evidence/baseline-audit.json`.

The baseline contains 111 lessons and 148 scheduled days across eight modules. Average English explanation: 25.4 words; worked example: 17.0; answer rationale: 7.3. Average Portuguese explanation: 10.7 words. These fields cannot provide the requested self-contained teaching depth. The old lesson prose was not reused as final content.

Retained visual vocabulary: navy header, light grey background, restrained white cards, blue buttons, a left navigation column, normal document scrolling and responsive layout. No new visual framework, animations, dashboard or gamification was introduced. The rebuilt page is English-first with full PT-BR reveal.

The earlier baseline has a single question per lesson, a lesson-derived examination bank and an expiry display without automatic submission. These are recorded only as audit findings. The owner's later correction removes assessment and exam development entirely; none of those mechanisms are part of the rebuilt platform.

The baseline uses `eip-lu-daily-20261014-v1`. The rebuilt textbook uses a new stable storage key and app identifier because old content completion must not be silently relabelled as completion of a different lesson. Old records and the baseline file remain untouched. Textbook backups reject baseline backups with an explanation; they are not discarded or overwritten.

## Architecture

- `content/*.cjs`: authored bilingual lesson/source data; no lesson-generation boilerplate and no question bank.
- `content/plan.cjs`: planned reading titles, exact leaf references and duration estimates.
- `src/app.js`, `src/style.css`: small DOM-based reading interface; user notes are plain text.
- `src/storage.js`: a documented, validated state schema and defensive storage handling.
- `scripts/build.cjs`: reproducible Node build, with only built-in Node dependencies, yielding one self-contained HTML.
- `tests/`: data, arithmetic, storage and browser verification. Playwright is development-only.

Runtime requires no Node, Python, server, installation, login, API key or network. The optional development preview server is not part of the delivered application's requirements.

## Persistence limits

The app records reading completion, personal notes and the last open lesson. On reopening it resumes an unfinished current lesson, or chooses the next unfinished available lesson after a completion. Completed lessons remain readable. Repeated clicks do not add duplicate completion entries; undo requires confirmation.

Browser storage for local files can differ by browser and file location. Backup/export protects transfers and updates. Invalid or future-version stored data is preserved in a read-only recovery state rather than erased. Import validates before replacement and saves a local pre-import copy. Storage failures are visible and permit manual export of current in-memory progress. This release does not promise transparent cross-browser or cross-path storage sharing.
