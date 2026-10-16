#!/bin/bash
set -euo pipefail
cd "$(dirname "$0")/../.."
[[ "$(uname -s)" == Darwin ]] || { echo "A macOS build host is required." >&2; exit 1; }
OUT="${MACOS_OUTPUT:-macos/out}"
APP="$OUT/EIP Luxembourg Academy.app"
mkdir -p "$APP/Contents/MacOS" "$APP/Contents/Resources" "$OUT/objects"
node - <<'JS'
const fs=require('fs'),c=require('crypto'),a=require('assert/strict'),f=require('./academy/evidence/phase2-frozen-baseline.json');
a.equal(c.createHash('sha256').update(fs.readFileSync('academy/dist/EIP_Luxembourg_Academy.html')).digest('hex'),f.html_sha256,'Frozen Academy changed');
JS
SDK="$(xcrun --sdk macosx --show-sdk-path)"
for ARCH in arm64 x86_64; do
  xcrun swiftc -swift-version 5 -O -sdk "$SDK" -target "$ARCH-apple-macosx12.3" macos/main.swift -o "$OUT/objects/AcademyDesktop-$ARCH" -framework AppKit -framework WebKit -framework UniformTypeIdentifiers
done
xcrun lipo -create "$OUT/objects/AcademyDesktop-arm64" "$OUT/objects/AcademyDesktop-x86_64" -output "$APP/Contents/MacOS/AcademyDesktop"
cp macos/Info.plist "$APP/Contents/Info.plist"
cp academy/dist/EIP_Luxembourg_Academy.html "$APP/Contents/Resources/Academy.html"
chmod 755 "$APP/Contents/MacOS/AcademyDesktop"
# Ad-hoc signing makes the executable loadable, including on Apple Silicon.
# It is NOT Developer ID signing or Apple notarization.
codesign --force --sign - --timestamp=none "$APP"
codesign --verify --deep --strict "$APP"
xcrun lipo -verify_arch arm64 x86_64 "$APP/Contents/MacOS/AcademyDesktop"
plutil -lint "$APP/Contents/Info.plist"
cp macos/FIRST_LAUNCH.txt "$OUT/FIRST_LAUNCH.txt"
ditto -c -k --sequesterRsrc --keepParent "$APP" "$OUT/EIP_Luxembourg_Academy_macOS.zip"
shasum -a 256 "$OUT/EIP_Luxembourg_Academy_macOS.zip" > "$OUT/SHA256SUMS.txt"
node - "$OUT" <<'JS'
const fs=require('fs'),cp=require('child_process'),path=require('path');const out=process.argv[2];
fs.writeFileSync(path.join(out,'build.json'),JSON.stringify({host:cp.execFileSync('sw_vers',['-productVersion'],{encoding:'utf8'}).trim(),architectures:['arm64','x86_64'],minimum_macos:'12.3',identity:'lu.eip.academy.desktop',academy_sha256:require('./academy/evidence/phase2-frozen-baseline.json').html_sha256,source_commit:cp.execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim(),signing:'ad-hoc only; no Developer ID or notarization',zip:'EIP_Luxembourg_Academy_macOS.zip'},null,2));
JS
