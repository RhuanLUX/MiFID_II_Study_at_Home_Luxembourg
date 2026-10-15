# Source issues and verification limits

Checked 15 October 2026. Scope: reading-only Phase 1. The archived master prompt is superseded where it conflicts with `OWNER_SCOPE_CORRECTION.txt`.

| ID | Issue | Evidence and resolution | Status / effect |
|---|---|---|---|
| SRC-01 | Exam scoring inconsistency | EFPA examination PDF p. 1 lists 30/15/5 questions with +1/+2/+6, implying 90 maximum points, while also referring to 47/77 and 60% correct. Current programme link and an official-domain search found no verified clarification. | Open. Retained for future research; no simulator or score implemented. No official pass/fail inference. |
| SRC-02 | Seven syllabus modules versus Green Finance exam area | Six-page syllabus pp. 2–5 has seven modules; examination PDF p. 2 adds Green Finance and zero-weight Fintech. | Green Finance explicitly mapped as author expansion. No invented detailed official module or subweights. |
| SRC-03 | Historical EONIA reference | Syllabus 3.3.d mentions EONIA; ECB Economic Bulletin 4/2022 explains its cessation on 3 January 2022. | Resolved in curriculum: historical EONIA and current €STR distinguished; EURIBOR remains a separate benchmark. |
| SRC-04 | New sustainability supervisory statement | ESMA35-915049491-6291, 6 May 2026, pp. 2, 4–6 supports proportionate supervision, neutral collection and informed adaptation before recommendation. | Incorporated in suitability lesson. Not treated as repeal of delegated requirements. Future reforms need renewed review. |
| SRC-05 | Undated EFPA PDFs | PDFs contain no explicit publication/version date. Search-engine publication estimates are not authoritative version identifiers. | Recorded as undated, with retrieval date and SHA-256 hashes in evidence/downloads.json. |
| SRC-06 | Consolidated EUR-Lex endpoint unreadable | The requested consolidated 2017/565 HTML endpoint returned no usable text. The 2021/1253 amending PDF, ESMA Article 25/Article 4 rulebook and 2023/2026 ESMA material were readable. | Limitation disclosed. No claim of a complete consolidated-law audit. Specialist validation required before regulatory final approval. |
| SRC-07 | Luxembourg tax specificity | Guichet/ACD discovery identifies residence-, income- and product-dependent pathways. | Detailed tax units are planned, not authored. No unverified national rate/threshold appears in Golden Masters. Verify tax year, investor status, product and exceptions before each tax unit. |
| SRC-08 | CSSF circular depth | CSSF 23/835 application landing page verified; 17/665 and 17/670 routes identified. | Do not infer unexamined circular clauses or platform recognition. Complete detailed circular/current-amendment review when those units are authored. |
| SRC-09 | Non-Luxembourg educational sources | SEC and FINRA are primary publishers for their own investor education, used only for universal compounding/bond concepts. | Clearly secondary to EFPA for curriculum. No US tax, rules, test weights or certification content imported. |
| SRC-10 | Human validation | The owner approved Lesson 16 as the pedagogical reference and authorised continuous production. Arithmetic and source-linked author review continue per batch; independent regulatory/linguistic review and actual learner timing are not established by automated tests. | No batch UAT gate remains. Full-course completion and accredited equivalence are not claimed. |

No email or external message has been sent to EFPA. A possible future clarification request is: please identify the currently effective EIP marking and pass rule and reconcile the published maximum implied by the category weights with the 47/77 wording. Sending that request requires separate explicit messaging authorisation.

The official PDFs were read in full (syllabus: all six pages; regulation: all three pages). Local research copies and extracted text are under `evidence/`, with hashes. Source links in the textbook are optional; there are no online study dependencies.
