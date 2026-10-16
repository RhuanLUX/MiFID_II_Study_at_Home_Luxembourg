# EIP Luxembourg — offline reading textbook

**Phase 1 English reading production complete: 95/95 lessons; both content-audit passes complete.** The owner's corrected scope and continuous-production approval are recorded in `docs/OWNER_SCOPE_CORRECTION.txt` and `docs/OWNER_UAT_APPROVAL.txt`. The audit uses two distinct verification methods by Codex; independent specialist approval is not implied.

Open **dist/EIP_Luxembourg_Academy.html** directly in a modern browser. No installation or internet is needed. Read a lesson, optionally reveal the full PT-BR translation and take notes, then mark it completed. Completed lessons have a green check. The next visit opens the next unfinished available lesson. Use **Backup** to export or restore reading progress and notes.

All 95 English lessons are available, with 285 worked reading examples. Coverage includes all 78 official lettered syllabus items and the separately identified Green Finance examination area, explicitly treated as an author-developed expansion. All 109 supplied micro-objective IDs have explicit authored outcomes. The three bilingual Golden Masters remain unchanged. Phase 1.1 is complete in release 1.1.0-bilingual: 95/95 full PT-BR readings, zero pending; both full-course translation audits completed with distinct methods. See docs/TRANSLATION_AUDIT.md for findings, methods and limits. See docs/TRANSLATION_QA.md and docs/TRANSLATION_PROGRESS.json. The editorial reading plan totals 2,740 minutes (45.7 hours), with actual study duration pending learner calibration; this is not registered training or a claim of equivalence to EFPA's 80-hour reference.

## Build and verification

With Node.js available for development:

```text
node scripts/build.cjs
node tests/check.cjs
node tests/calculations.cjs
node tests/coverage.cjs
node tests/translation.cjs --final
```

The build uses Node built-ins only and is deterministic for unchanged inputs. `dist/manifest.json` records its SHA-256 and content metrics. Browser QA additionally uses Playwright installed in the development environment:

```text
node tests/browser.cjs
node scripts/progress.cjs
```

On this workstation, the bundled Node package directory must be on `NODE_PATH`; the test launches installed Edge headlessly. The delivered HTML does not use those dependencies.

## Review files

- `docs/OWNER_UAT_APPROVAL.txt`: owner acceptance of Lesson 16 and production authorisation.
- `docs/PROGRESS.md`: final counts, completed modules and translation status.
- `docs/QA_REPORT.md`: final 461 numerical cases, 190 offline layout checks and remaining validation limits.
- `docs/CONTENT_AUDIT.md`: all-95 reading review, second critical verification, five corrections and official-source checks; 477 checks independently recomputed using Python Decimal.
- `docs/COBERTURA_OBJETIVOS.csv`: all 109 original objectives linked to explicit authored outcomes.
- `docs/CURRICULO_COMPLETO.md`: chronological lesson architecture and workload assumptions.
- `docs/MATRIZ_COBERTURA.csv`: official leaf → objective → implemented lesson → teaching blocks/examples → source/test evidence.
- `docs/FONTES_VERIFICADAS.md`: source register with sections, dates, jurisdictions and limitations.
- `docs/ISSUES_DE_FONTES.md`: unresolved scoring, version and regulatory issues.
- `docs/BASELINE_AUDIT.md`: preserved baseline, architecture and storage behaviour.
- `evidence/`: test results, screenshots, source-download hashes and local research copies.

The platform is independent educational material, not an official/accredited EFPA course, legal advice, investment advice or a guarantee of passing. No quizzes, assessments, question banks, simulations or spaced-repetition engine are included.

Translation audit arithmetic is reproducible with `python scripts/audit-translation-calculations.py` (51 sensitive examples recalculated directly from reading premises). Original English audit arithmetic is reproducible with Python's standard library: run `python scripts/audit-calculations.py` against the retained input dataset. The separate reference-access script performs read-only network checks; its blocked/challenged/TLS outcomes are recorded rather than bypassed. Complete legal-consolidation review, case-specific tax/treaty determinations, independent specialist approval and measured learner timing remain limitations documented in the audit and source-issues reports.
