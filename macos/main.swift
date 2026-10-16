import AppKit
import WebKit
import UniformTypeIdentifiers

// This identity and content URL are independent of the installed .app path.
enum AcademyIdentity {
    static let bundleID = "lu.eip.academy.desktop"
    static let title = "EIP Luxembourg Academy"
    static func contentURL() throws -> URL {
        let support = try FileManager.default.url(for: .applicationSupportDirectory, in: .userDomainMask, appropriateFor: nil, create: true)
        return support.appendingPathComponent(bundleID, isDirectory: true).appendingPathComponent("Content", isDirectory: true).appendingPathComponent("Academy.html")
    }
}

final class AcademyDelegate: NSObject, NSApplicationDelegate, NSWindowDelegate, WKNavigationDelegate, WKUIDelegate, WKDownloadDelegate {
    var window: NSWindow!
    var webView: WKWebView!
    var contentURL: URL!
    var downloads: [ObjectIdentifier: WKDownload] = [:]
    #if PACKAGING_QA
    var qa: PackagingQA!
    #endif

    func applicationDidFinishLaunching(_ notification: Notification) {
        do {
            contentURL = try AcademyIdentity.contentURL()
            guard let bundled = Bundle.main.url(forResource: "Academy", withExtension: "html") else {
                throw NSError(domain: AcademyIdentity.bundleID, code: 1, userInfo: [NSLocalizedDescriptionKey: "The bundled Academy HTML is missing. Re-extract the complete application."])
            }
            let html = try Data(contentsOf: bundled)
            try FileManager.default.createDirectory(at: contentURL.deletingLastPathComponent(), withIntermediateDirectories: true)
            if (try? Data(contentsOf: contentURL)) != html {
                // Only the cached application content is replaced. Website/user data is never deleted.
                try html.write(to: contentURL, options: .atomic)
            }
            configureMenu()
            let configuration = WKWebViewConfiguration()
            configuration.websiteDataStore = .default() // Persistent WebKit storage, never a private session.
            webView = WKWebView(frame: .zero, configuration: configuration)
            webView.navigationDelegate = self
            webView.uiDelegate = self
            window = NSWindow(contentRect: NSRect(x: 0, y: 0, width: 1180, height: 850), styleMask: [.titled, .closable, .miniaturizable, .resizable], backing: .buffered, defer: false)
            window.title = AcademyIdentity.title
            window.minSize = NSSize(width: 390, height: 540)
            window.center()
            window.setFrameAutosaveName("AcademyStudyWindow")
            window.contentView = webView
            window.delegate = self
            window.makeKeyAndOrderFront(nil)
            NSApp.activate(ignoringOtherApps: true)
            #if PACKAGING_QA
            qa = PackagingQA(app: self)
            #endif
            webView.loadFileURL(contentURL, allowingReadAccessTo: contentURL.deletingLastPathComponent())
        } catch {
            showError("Academy could not open", error)
            NSApp.terminate(nil)
        }
    }

    func configureMenu() {
        let bar = NSMenu()
        let appItem = NSMenuItem()
        let appMenu = NSMenu()
        appMenu.addItem(withTitle: "Quit " + AcademyIdentity.title, action: #selector(NSApplication.terminate(_:)), keyEquivalent: "q")
        appItem.submenu = appMenu
        bar.addItem(appItem)
        let editItem = NSMenuItem()
        let edit = NSMenu(title: "Edit")
        for (title, selector, key) in [("Undo", "undo:", "z"), ("Cut", "cut:", "x"), ("Copy", "copy:", "c"), ("Paste", "paste:", "v"), ("Select All", "selectAll:", "a")] {
            edit.addItem(withTitle: title, action: Selector(selector), keyEquivalent: key)
        }
        editItem.submenu = edit
        bar.addItem(editItem)
        NSApp.mainMenu = bar
    }

    func applicationShouldTerminateAfterLastWindowClosed(_ sender: NSApplication) -> Bool { true }
    func showError(_ title: String, _ error: Error) {
        let alert = NSAlert()
        alert.messageText = title
        alert.informativeText = error.localizedDescription
        alert.alertStyle = .warning
        alert.runModal()
    }

    func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
        #if PACKAGING_QA
        qa.didLoad()
        #endif
    }
    func webView(_ webView: WKWebView, didFailProvisionalNavigation navigation: WKNavigation!, withError error: Error) { showError("Academy could not load", error) }
    func webView(_ webView: WKWebView, didFail navigation: WKNavigation!, withError error: Error) { showError("Academy could not load", error) }

    func webView(_ webView: WKWebView, decidePolicyFor action: WKNavigationAction, decisionHandler: @escaping (WKNavigationActionPolicy) -> Void) {
        guard let url = action.request.url else { decisionHandler(.cancel); return }
        if ["https", "http"].contains(url.scheme ?? "") {
            // Source references open in the default browser, never inside the study view.
            #if PACKAGING_QA
            qa.externalRequests += 1
            #else
            NSWorkspace.shared.open(url)
            #endif
            decisionHandler(.cancel)
        } else if action.shouldPerformDownload && url.scheme == "blob" {
            decisionHandler(.download)
        } else if url.isFileURL && url.standardizedFileURL.path == contentURL.standardizedFileURL.path {
            decisionHandler(.allow)
        } else {
            decisionHandler(.cancel)
        }
    }

    func webView(_ webView: WKWebView, navigationAction: WKNavigationAction, didBecome download: WKDownload) { track(download) }
    func track(_ download: WKDownload) {
        downloads[ObjectIdentifier(download)] = download
        download.delegate = self
    }
    func download(_ download: WKDownload, decideDestinationUsing response: URLResponse, suggestedFilename: String, completionHandler: @escaping (URL?) -> Void) {
        #if PACKAGING_QA
        completionHandler(qa.backupURL)
        return
        #else
        let panel = NSSavePanel()
        panel.title = "Export reading backup"
        panel.nameFieldStringValue = URL(fileURLWithPath: suggestedFilename).lastPathComponent
        panel.allowedContentTypes = [.json]
        panel.canCreateDirectories = true
        panel.beginSheetModal(for: window) { result in completionHandler(result == .OK ? panel.url : nil) }
        #endif
    }
    func downloadDidFinish(_ download: WKDownload) {
        downloads.removeValue(forKey: ObjectIdentifier(download))
        #if PACKAGING_QA
        qa.didExport()
        #endif
    }
    func download(_ download: WKDownload, didFailWithError error: Error, resumeData: Data?) {
        downloads.removeValue(forKey: ObjectIdentifier(download))
        #if PACKAGING_QA
        qa.fail("Native backup download failed: \(error)")
        #else
        showError("Backup could not be saved", error)
        #endif
    }

    func webView(_ webView: WKWebView, runOpenPanelWith parameters: WKOpenPanelParameters, initiatedByFrame frame: WKFrameInfo, completionHandler: @escaping ([URL]?) -> Void) {
        #if PACKAGING_QA
        qa.openPanelCalls += 1
        completionHandler([qa.backupURL])
        #else
        let panel = NSOpenPanel()
        panel.title = "Restore reading backup"
        panel.allowedContentTypes = [.json]
        panel.allowsMultipleSelection = false
        panel.canChooseDirectories = false
        panel.beginSheetModal(for: window) { result in completionHandler(result == .OK ? panel.urls : nil) }
        #endif
    }
    func webView(_ webView: WKWebView, runJavaScriptConfirmPanelWithMessage message: String, initiatedByFrame frame: WKFrameInfo, completionHandler: @escaping (Bool) -> Void) {
        #if PACKAGING_QA
        qa.confirmCalls += 1
        completionHandler(true)
        #else
        let alert = NSAlert()
        alert.messageText = "Confirm Academy action"
        alert.informativeText = message
        alert.addButton(withTitle: "OK")
        alert.addButton(withTitle: "Cancel")
        alert.beginSheetModal(for: window) { result in completionHandler(result == .alertFirstButtonReturn) }
        #endif
    }
}

let app = NSApplication.shared
let delegate = AcademyDelegate()
app.setActivationPolicy(.regular)
app.delegate = delegate
app.run()
