#!/bin/bash

COMMON_FLAGS="--allow-read --allow-net --allow-env --allow-run"
ENTRY_POINT="src/main.ts"
VERSION=$(jq -r '.version' deno.json)
DIST_DIR="dist"

compile_for_target() {
    local target=$1
    local output=$2

    rm $DIST_DIR/$output
    deno compile $COMMON_FLAGS --target=$target --output=$DIST_DIR/$output $ENTRY_POINT
}

case "$1" in
    "linux")
        compile_for_target "x86_64-unknown-linux-gnu" "unthread-v${VERSION}.linux.amd64"
        compile_for_target "aarch64-unknown-linux-gnu" "unthread-v${VERSION}.linux.arm64"
        ;;
    "macos")
        compile_for_target "x86_64-apple-darwin" "unthread-v${VERSION}.darwin.amd64"
        compile_for_target "aarch64-apple-darwin" "unthread-v${VERSION}.darwin.arm64"
        ;;
    "windows")
        compile_for_target "x86_64-pc-windows-msvc" "unthread-v${VERSION}.exe"
        ;;
    "all")
        ./build.sh linux
        ./build.sh macos
        ./build.sh windows
        ;;
    *)
        echo "Usage: $0 {linux|macos|windows|all}"
        exit 1
        ;;
esac
