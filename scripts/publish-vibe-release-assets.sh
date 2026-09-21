#!/usr/bin/env bash
set -euo pipefail

source_root="${1:-}"
tag="${2:-vibe-session-assets}"

if [[ -z "$source_root" ]]; then
  echo "Usage: $0 /path/to/Vibe [release-tag]" >&2
  exit 1
fi

session_one="$source_root/Session1_IDidntKnowCopilot_DemoPack"
session_two="$source_root/Session2_Cowork_DemoPack"

for directory in "$session_one/DemoRecordings" "$session_two/VideoRecordings"; do
  if [[ ! -d "$directory" ]]; then
    echo "Missing recordings directory: $directory" >&2
    exit 1
  fi
done

gh auth status >/dev/null

if ! gh release view "$tag" >/dev/null 2>&1; then
  gh release create "$tag" \
    --title "Vibe session demo recordings" \
    --notes "Demo recordings for the AI with April Vibe sessions. The optimized slide decks, setup files, prompts, and sample data are available directly from the session pages."
fi

assets=()

while IFS= read -r -d '' path; do
  assets+=("$path")
done < <(find "$session_one/DemoRecordings" "$session_two/VideoRecordings" -type f -name '*.mp4' -print0)

gh release upload "$tag" "${assets[@]}" --clobber
echo "Published ${#assets[@]} assets to release $tag."
