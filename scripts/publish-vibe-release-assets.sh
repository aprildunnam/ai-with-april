#!/usr/bin/env bash
set -euo pipefail

asset_directory="${1:-}"
tag="${2:-vibe-session-assets}"

if [[ -z "$asset_directory" ]]; then
  echo "Usage: $0 /path/to/reviewed-recordings [release-tag]" >&2
  exit 1
fi

if [[ ! -d "$asset_directory" ]]; then
  echo "Missing reviewed recordings directory: $asset_directory" >&2
  exit 1
fi

gh auth status >/dev/null

if ! gh release view "$tag" >/dev/null 2>&1; then
  gh release create "$tag" \
    --title "Vibe session demo recordings" \
    --notes "Sanitized demo recordings for the AI with April Vibe sessions. The optimized slide decks, setup files, prompts, and sample data are available directly from the session pages. The removed Connectors demo is intentionally not included."
fi

assets=()

while IFS= read -r -d '' path; do
  assets+=("$path")
done < <(find "$asset_directory" -maxdepth 1 -type f -name '*.mp4' -print0)

if [[ ${#assets[@]} -eq 0 ]]; then
  echo "No reviewed MP4 recordings found in: $asset_directory" >&2
  exit 1
fi

gh release upload "$tag" "${assets[@]}" --clobber
echo "Published ${#assets[@]} assets to release $tag."
