#!/usr/bin/env bash
# Genereert de social-preview (public/og.jpg) en het touch-icon
# (public/apple-touch-icon.png) uit de SVG-bronnen hiernaast.
#
#   ./scripts/make-images.sh
#
# Vereist macOS (qlmanage + sips). Alleen nodig als je scripts/og.svg of
# scripts/apple-touch-icon.svg aanpast — de resultaten staan in git.
set -euo pipefail

cd "$(dirname "$0")/.."
tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT

# qlmanage schaalt naar een vierkant canvas. og.svg is daarom 1200x1200 met de
# kaart verticaal gecentreerd; sips snijdt de band van 1200x630 eruit.
qlmanage -t -s 1200 -o "$tmp" scripts/og.svg >/dev/null 2>&1
sips -c 630 1200 "$tmp/og.svg.png" --out "$tmp/og-crop.png" >/dev/null
sips -s format jpeg -s formatOptions 88 "$tmp/og-crop.png" --out public/og.jpg >/dev/null

qlmanage -t -s 180 -o "$tmp" scripts/apple-touch-icon.svg >/dev/null 2>&1
cp "$tmp/apple-touch-icon.svg.png" public/apple-touch-icon.png

echo "public/og.jpg              $(sips -g pixelWidth -g pixelHeight public/og.jpg | tail -2 | tr -d ' \n')"
echo "public/apple-touch-icon.png $(sips -g pixelWidth -g pixelHeight public/apple-touch-icon.png | tail -2 | tr -d ' \n')"
