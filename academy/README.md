# EIP Luxembourg — offline reading textbook

**Golden Master release for Owner UAT, not the completed course.** The owner's corrected Phase 1 scope is authoritative; see `docs/OWNER_SCOPE_CORRECTION.txt`.

Open **dist/EIP_Luxembourg_Academy.html** directly in a modern browser. No installation or internet is needed. Read a lesson, optionally reveal the full PT-BR translation and take notes, then mark it completed. Completed lessons have a green check. The next visit opens the next unfinished available lesson. Use **Backup** to export or restore reading progress and notes.

Three complete reading lessons are available. The 95-unit plan maps all 78 official lettered syllabus items plus the separately identified Green Finance exam area. Other sidebar titles are planned, not authored. Further content production awaits the owner's review of the three pilots.

## Build and verification

With Node.js available for development:

```text
node scripts/build.cjs
node tests/check.cjs
```

The build uses Node built-ins only and is deterministic for unchanged inputs. `dist/manifest.json` records its SHA-256 and content metrics. Browser QA additionally uses Playwright installed in the development environment:

```text
node tests/browser.cjs
```

On this workstation, the bundled Node package directory must be on `NODE_PATH`; the test launches installed Edge headlessly. The delivered HTML does not use those dependencies.

## Review files

- `docs/OWNER_UAT.md`: review procedure, criteria and pending decisions.
- `docs/CURRICULO_COMPLETO.md`: chronological lesson architecture and workload assumptions.
- `docs/MATRIZ_COBERTURA.csv`: official leaf → objective → planned/implemented lesson → teaching blocks/examples → source/test evidence.
- `docs/FONTES_VERIFICADAS.md`: source register with sections, dates, jurisdictions and limitations.
- `docs/ISSUES_DE_FONTES.md`: unresolved scoring, version and regulatory issues.
- `docs/BASELINE_AUDIT.md`: preserved baseline, architecture and storage behaviour.
- `evidence/`: test results, screenshots, source-download hashes and local research copies.

The platform is independent educational material, not an official/accredited EFPA course, legal advice, investment advice or a guarantee of passing. No quizzes, assessments, question banks, simulations or spaced-repetition engine are included.
