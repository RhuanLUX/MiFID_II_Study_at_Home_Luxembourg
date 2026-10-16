"""Runs real AppKit/WebKit processes on a disposable macOS CI account."""
from pathlib import Path
import hashlib, json, os, plistlib, shutil, subprocess, time, zipfile

assert os.environ.get('CI') == 'true', 'Only run in the disposable CI account; never overwrite a student profile.'
root = Path(__file__).resolve().parents[2]
os.chdir(root)
out = (root / os.environ.get('MACOS_OUTPUT', 'macos/out')).resolve()
evidence = out / 'qa' / os.uname().machine
evidence.mkdir(parents=True, exist_ok=True)
archive = out / 'EIP_Luxembourg_Academy_macOS.zip'
assert archive.is_file()
unpacked = out / 'unpacked'
subprocess.run(['ditto', '-x', '-k', str(archive), str(unpacked)], check=True)
production = unpacked / 'EIP Luxembourg Academy.app'
executable = production / 'Contents/MacOS/AcademyDesktop'
subprocess.run(['codesign', '--verify', '--deep', '--strict', str(production)], check=True)
subprocess.run(['lipo', str(executable), '-verify_arch', 'arm64', 'x86_64'], check=True)
expected = json.loads((root/'academy/evidence/phase2-frozen-baseline.json').read_text())['html_sha256']
assert hashlib.sha256((production/'Contents/Resources/Academy.html').read_bytes()).hexdigest() == expected
assert os.access(executable, os.X_OK), 'ZIP lost executable permissions'

# Smoke-launch the exact shipped executable, not just the instrumented test build.
smoke_log = (evidence/'production-launch.log').open('w')
smoke = subprocess.Popen([str(executable)], stdout=smoke_log, stderr=smoke_log)
time.sleep(8)
assert smoke.poll() is None, 'Shipped .app exited during launch'
smoke.terminate()
smoke.wait(timeout=20)
smoke_log.close()

# Same wrapper source and bundle identity, with CI-only panel automation and DOM assertions.
qa_app = out / 'qa-app' / 'EIP Luxembourg Academy.app'
shutil.copytree(production, qa_app, dirs_exist_ok=True)
sdk = subprocess.check_output(['xcrun','--sdk','macosx','--show-sdk-path'],text=True).strip()
subprocess.run(['xcrun','swiftc','-swift-version','5','-D','PACKAGING_QA','-sdk',sdk,'macos/main.swift','macos/tests/PackagingQA.swift','-o',str(qa_app/'Contents/MacOS/AcademyDesktop'),'-framework','AppKit','-framework','WebKit','-framework','UniformTypeIdentifiers'],check=True)
shutil.copyfile(root/'macos/tests/check-academy.js',qa_app/'Contents/Resources/check-academy.js')
subprocess.run(['codesign','--force','--sign','-','--timestamp=none',str(qa_app)],check=True)

def run(stage, app):
    env = dict(os.environ, ACADEMY_QA_STAGE=stage, ACADEMY_QA_DIRECTORY=str(evidence))
    with (evidence/(stage+'.log')).open('w') as log:
        # Deny network access at the application process level during all core tests.
        subprocess.run(['sandbox-exec','-p','(version 1)(allow default)(deny network*)',str(app/'Contents/MacOS/AcademyDesktop')],env=env,stdout=log,stderr=log,check=True,timeout=200)
    report = json.loads((evidence/(stage+'.json')).read_text())
    assert report['status']=='PASS'
    return report

reports = [run('seed', qa_app), run('reopen', qa_app)]
moved = Path.home()/'Applications'/'EIP Luxembourg Academy.app'
assert not moved.exists(), 'Refusing to overwrite another installed application'
moved.parent.mkdir(exist_ok=True)
shutil.move(str(qa_app),str(moved))
reports.append(run('moved',moved))
# Replace only this job's own application bundle, leaving all user data in place.
update = out/'update'/'EIP Luxembourg Academy.app'
shutil.copytree(moved,update)
info = update/'Contents/Info.plist'
with info.open('rb') as f: properties = plistlib.load(f)
properties['CFBundleVersion']='2'
with info.open('wb') as f: plistlib.dump(properties,f)
subprocess.run(['codesign','--force','--sign','-','--timestamp=none',str(update)],check=True)
assert moved.resolve().parent == (Path.home()/'Applications').resolve()
shutil.rmtree(moved)
shutil.move(str(update),str(moved))
reports.append(run('updated',moved))
assert len({r['stable_content_url'] for r in reports})==1
summary={'status':'PASS','architecture_tested':os.uname().machine,'shipped_executable_launch':'PASS','network_denied_core_tests':True,'lessons':95,'translations':95,'exercises':475,'process_restart_persistence':'PASS','move_into_Applications_persistence':'PASS','bundle_update_persistence':'PASS','native_backup_export_import':'PASS','academy_sha256':expected,'physical_Mac_reboot_tested':False,'Gatekeeper_manual_launch_tested':False,'instrumentation':'CI-only test compilation uses the same wrapper source and bundle identity; native panels are answered automatically.'}
(evidence/'summary.json').write_text(json.dumps(summary,indent=2))
print(json.dumps(summary))
