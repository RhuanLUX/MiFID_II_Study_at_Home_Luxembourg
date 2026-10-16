import AppKit
import WebKit

// Compiled only into the CI harness; never included in the delivered executable.
final class PackagingQA {
    unowned let app: AcademyDelegate
    let stage = ProcessInfo.processInfo.environment["ACADEMY_QA_STAGE"] ?? ""
    let directory = URL(fileURLWithPath: ProcessInfo.processInfo.environment["ACADEMY_QA_DIRECTORY"] ?? "/nonexistent")
    var backupURL: URL { directory.appendingPathComponent("reading-backup.json") }
    var externalRequests = 0
    var openPanelCalls = 0
    var confirmCalls = 0
    var loaded = false
    var checks: [String: Any] = [:]
    init(app: AcademyDelegate) {
        self.app = app
        guard ProcessInfo.processInfo.environment["CI"] == "true", !stage.isEmpty else {
            fatalError("Packaging QA must run only in the disposable CI user account.")
        }
        DispatchQueue.main.asyncAfter(deadline: .now() + 180) { self.fail("QA timed out") }
    }
    func fail(_ message: String) -> Never {
        fputs("PACKAGING_QA_FAILURE: \(stage): \(message)\n", stderr)
        exit(1)
    }
    func evaluate(_ script: String, _ completion: @escaping (Any?) -> Void) {
        app.webView.evaluateJavaScript(script) { value, error in
            if let error = error { self.fail(error.localizedDescription) }
            completion(value)
        }
    }
    func didLoad() {
        guard !loaded else { return }
        loaded = true
        if stage == "seed" {
            guard let js = Bundle.main.url(forResource: "check-academy", withExtension: "js"), let script = try? String(contentsOf: js, encoding: .utf8) else { fail("QA script missing") }
            evaluate(script) { value in
                self.checks["curriculum_interactions"] = value
                self.evaluate("document.querySelector('#backup').click();document.querySelector('#export').click();'native download requested'") { _ in }
            }
        } else {
            evaluate(Self.checkPersisted) { value in
                self.checks["persistent_state"] = value
                if self.stage == "updated" {
                    self.evaluate("document.querySelector('#notes').value='temporary after export';document.querySelector('#notes').dispatchEvent(new Event('input'));document.querySelector('#backup').click();document.querySelector('#import-file').click();'native import requested'") { _ in
                        self.waitForImport(attempt: 0)
                    }
                } else { self.succeed() }
            }
        }
    }
    func didExport() {
        do {
            let data = try Data(contentsOf: backupURL)
            guard let envelope = try JSONSerialization.jsonObject(with: data) as? [String: Any],
                  envelope["app"] as? String == "eip-luxembourg-textbook",
                  let state = envelope["state"] as? [String: Any],
                  let notes = state["notes"] as? [String: String],
                  notes["EIP-3.1-02"] == "Mac persistence note — português ✓" else { fail("Exported backup does not contain the actual reading state") }
            checks["native_blob_download_export"] = "PASS"
            succeed()
        } catch { fail("Could not read native backup export: \(error)") }
    }
    func waitForImport(attempt: Int) {
        guard attempt < 40 else { fail("Native file-picker import did not restore the backup") }
        DispatchQueue.main.asyncAfter(deadline: .now() + 0.25) {
            self.evaluate("document.querySelector('#backup-status').textContent") { value in
                if (value as? String)?.contains("Backup restored") == true {
                    guard self.openPanelCalls > 0, self.confirmCalls > 0 else { self.fail("Native picker/confirmation delegates were not used") }
                    self.evaluate(Self.checkPersisted) { result in
                        self.checks["native_file_picker_backup_import"] = "PASS"
                        self.checks["restored_state"] = result
                        self.succeed()
                    }
                } else { self.waitForImport(attempt: attempt + 1) }
            }
        }
    }
    func succeed() {
        guard externalRequests == 0 else { fail("Unexpected external navigation") }
        checks["stage"] = stage
        checks["status"] = "PASS"
        checks["macOS"] = ProcessInfo.processInfo.operatingSystemVersionString
        checks["bundle_id"] = Bundle.main.bundleIdentifier
        checks["stable_content_url"] = app.contentURL.path
        checks["external_navigation_requests"] = externalRequests
        checks["native_open_panel_calls"] = openPanelCalls
        checks["native_confirm_calls"] = confirmCalls
        checks["limitations"] = ["Native save/open panels are automatically answered by CI instrumentation; manual Gatekeeper/first-launch UAT is not claimed.", "A physical Mac reboot is not performed by this hosted runner."]
        let destination = directory.appendingPathComponent(stage + ".json")
        do { try JSONSerialization.data(withJSONObject: checks, options: [.prettyPrinted, .sortedKeys]).write(to: destination) }
        catch { fail("Could not save QA evidence: \(error)") }
        // Allow the persistent WebKit process to settle, then terminate the real application process.
        DispatchQueue.main.asyncAfter(deadline: .now() + 3) { NSApp.terminate(nil) }
    }
    static let checkPersisted = """
    (()=>{const s=JSON.parse(localStorage.getItem('eip-luxembourg-textbook-progress'));if(!s.completed['EIP-3.1-A'])throw Error('Completion lost');if(s.notes['EIP-3.1-A']!=='Original Mac note')throw Error('First note lost');if(s.notes['EIP-3.1-02']!=='Mac persistence note — português ✓')throw Error('Current note lost');if(s.lastLesson!=='EIP-3.1-02')throw Error('Last lesson lost');if(document.querySelector('#notes').value!==s.notes['EIP-3.1-02'])throw Error('Note not rendered');if(document.querySelector('#storage-message').hidden!==true)throw Error('Storage error');return {notes:true,completion:true,current_lesson:true,rendered:true};})()
    """
}
