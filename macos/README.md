# EIP Luxembourg Academy — native macOS packaging

This directory wraps the frozen Academy HTML without changing its lessons, exercises, interface or browser version. It is a packaging project, not Phase 3. The examination simulator remains postponed.

The application uses AppKit and the macOS WebKit framework, with no bundled Chromium, JavaScript runtime, Rust runtime, external service or student installation dependency. The universal executable contains Apple Silicon (`arm64`) and Intel (`x86_64`) slices. Minimum macOS version: 12.3. Compatibility with the minimum version is a deployment target; actual runner versions and tested architectures must be recorded in the delivery QA report.

## Student installation

Extract `EIP_Luxembourg_Academy_macOS.zip`, move `EIP Luxembourg Academy.app` into Applications and open it. The ZIP also includes `FIRST_LAUNCH.txt`. There are no terminal commands or developer tools to install.

This build has an ad-hoc signature for executable integrity, without Apple Developer ID signing or notarization. Gatekeeper can block first launch. After trying to open the app, use **Apple menu > System Settings > Privacy & Security > Open Anyway** if you trust the supplied file; on Monterey use **System Preferences > Security & Privacy > General > Open Anyway**. Do not disable protections globally. See [Apple’s first-launch guidance](https://support.apple.com/en-ie/102445).

## Persistence and boundaries

The stable application identifier is `lu.eip.academy.desktop`. A byte-identical copy of the bundled HTML is placed at `~/Library/Application Support/lu.eip.academy.desktop/Content/Academy.html` and loaded from that fixed file URL. This avoids changing the page location when the `.app` is extracted elsewhere, moved to Applications, translocated by macOS or replaced by an update. Only the cached HTML is refreshed; the wrapper never clears website data or replaces reading progress.

WebKit’s default persistent website data store preserves the existing `localStorage` schema for notes, completion and last lesson. The window frame uses a stable native autosave name. Errors opening the bundle or support directory stop launch with an explicit message; the wrapper does not fall back to a private session. Existing HTML storage-error and recovery messages remain unchanged.

Reinforcement selections and the translation toggle remain temporary, as in the frozen browser version. No previously saved exercise answers exist to migrate. The desktop app may start with empty progress, separate from the browser; a compatible exported reading backup can be imported. Backup export uses `WKDownload` and a native save panel; import uses WebKit’s file input and a native open panel. Destructive confirmations use native confirmation dialogs. Optional HTTP/HTTPS references open in the default browser, not in the study window. Core content is local and the original HTML Content Security Policy is unchanged.

Deleting user website data or the support folders can remove progress. Keep exported JSON backups separately. Updates must retain the same identifier and stable content path. There are no accounts, cloud storage, synchronization, analytics or automatic updates.

## Building and QA

A real macOS host with Xcode Command Line Tools is required for development. Windows cannot produce or validate this executable. GitHub Actions workflow **Build macOS Academy** is manual (`workflow_dispatch`) so documentation pushes do not spend additional build minutes.

```sh
bash macos/scripts/build.sh
# Only in a disposable GitHub Actions account; never a student's live profile:
CI=true python3 macos/scripts/test.py
```

The build checks the frozen HTML hash, compiles both architectures with the macOS SDK, creates the `.app` bundle, verifies its ad-hoc signature and architecture slices, and packages it using macOS `ditto` so executable permissions and bundle structure survive ZIP extraction. Build outputs, downloaded artifacts and development caches are ignored by Git.

QA first launches the exact production executable from the extracted ZIP. A separate CI-only compilation of the same wrapper source then automates the native delegates and the actual WebKit view. It checks all 95 English/PT lessons and 475 wrong/retry/correct exercise interactions, exports the actual reading backup, restarts the process, moves the bundle to Applications, replaces it with a newer bundle version, and imports the backup through the file-input delegate and confirmation flow. Core runs use a process-level network-denying sandbox. The same ZIP must pass on both Apple Silicon and Intel runners.

The CI-only QA code is not shipped. Native panel answers are automated; human first-launch/Gatekeeper interaction and a physical Mac reboot are not claimed tested. Persistence across a physical restart follows the persistent on-disk design and still merits student UAT on the target Mac. Inspect actual CI results before claiming delivery is complete. Creating this workflow alone is not delivery.

Apple API references: [persistent website data store](https://developer.apple.com/documentation/webkit/wkwebsitedatastore), [file input delegate](https://developer.apple.com/documentation/webkit/wkuidelegate), [download destination delegate](https://developer.apple.com/documentation/webkit/wkdownloaddelegate).
