# macOS desktop delivery QA

Status: DELIVERED. Real universal application generated on macOS and available as [a permanent ZIP download](https://github.com/RhuanLUX/MiFID_II_Study_at_Home_Luxembourg/releases/download/macos-v2.0.1-1/EIP_Luxembourg_Academy_macOS.zip) or [the GitHub Release](https://github.com/RhuanLUX/MiFID_II_Study_at_Home_Luxembourg/releases/tag/macos-v2.0.1-1). The local delivery copy is macos/downloads/delivery/EIP_Luxembourg_Academy_macOS.zip (ignored build/download output). ZIP size: 990034 bytes. SHA-256: 21b3f30f34e7ac05d15087f130a72e2a69a8020eb8cd44de46f297512546614e.

The ZIP contains EIP Luxembourg Academy.app and FIRST_LAUNCH.txt, rather than source or installation scripts. Its Mach-O executable contains arm64 and x86_64 slices, and ZIP extraction preserves its executable permissions. macOS minimum deployment target:12.3; actual Apple Silicon and Intel tests ran on 15.7.9. It uses native AppKit/WebKit without a third-party desktop runtime.

## Actual validation

[GitHub Actions run 38927600003](https://github.com/RhuanLUX/MiFID_II_Study_at_Home_Luxembourg/actions/runs/38927600003) completed successfully for both architectures. Build source commit: 3818ea1e5bdbb56ff577eaf5558af13a7936d0fb. Later documentation/evidence commits do not change the tested executable sources.

- The exact shipped executable from the extracted ZIP started and remained running on both architectures.
- A CI-only compilation of the same wrapper source and stable bundle identifier checked all 95 English/PT lesson renderings and all 475 wrong-answer/feedback/retry/correct-answer exercise interactions in the actual WebKit view on each architecture.
- Reading notes, completion and last lesson survived complete process exits, relaunch, moving the application to the CI user’s ~/Applications folder and replacement with a newer bundle version.
- The actual Blob-backed backup exported to a JSON file through WKDownload. Import used the real file-input delegate and confirmation flow, restored the exported notes/progress. Native picker and confirmation responses were supplied automatically by CI-only instrumentation.
- Core test processes ran with network access denied. Remote core resources and unexpected external navigation: zero. Optional reference links are separate and open in the default browser.
- The original HTML inside the ZIP is byte-identical to the frozen baseline: ffc67d3f473e4673a69afeeb9510cb0e4ab31844068ff4c59b6419d7419382bb. No lesson, exercise, approved interface, storage schema or browser source changed. The existing 16 structural/storage/unit checks and 475-exercise validation also passed on the Mac runner.

Reproducible detailed evidence is in evidence/macos-qa.json. Full original CI logs/artifacts are linked from the run; artifact copies have 30-day retention, while the Release ZIP is independently published. The public Release download was fetched without authentication and its SHA-256 was verified.

## Persistence and first launch

Stable application identity: lu.eip.academy.desktop. The page loads from a stable Application Support path outside the bundle, and WebKit uses its default persistent data store. App location changes cannot alter that page URL. Updates replace the cached HTML only, never clear website data and retain the identifier. Notes, completion and the last lesson use the unchanged browser schema. Exercise selections and the translation toggle remain transient exactly as before; no saved answers are invented.

Extract the ZIP, drag the .app into Applications and open it. If blocked, after attempting launch use System Settings > Privacy & Security > Open Anyway (Monterey: System Preferences > Security & Privacy > General > Open Anyway), trusting only the supplied package. The binary is ad-hoc signed, without Developer ID or notarization. Do not disable security globally. No developer tools are required.

## Remaining UAT limits

A physical Mac reboot, quarantine/Gatekeeper first-launch interaction and human native-panel interaction were not performed on these hosted runners. Persistent on-disk design supports subsequent-day use, but a target-Mac reboot and first launch remain explicit Owner UAT steps. Actual testing covers macOS 15.7.9, not every version at or above the 12.3 deployment target. Keep exported JSON backups separately. No cloud services, telemetry, accounts, automatic updates or Phase 3 development were added.
