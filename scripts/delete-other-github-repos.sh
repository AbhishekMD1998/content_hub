#!/usr/bin/env bash
# Delete all repos under AbhishekMD1998 except content_hub.
# Requires: gh auth login (run once before this script)
set -euo pipefail

OWNER="AbhishekMD1998"
KEEP="content_hub"

if ! command -v gh >/dev/null 2>&1; then
  echo "Install GitHub CLI: brew install gh"
  exit 1
fi

if ! gh auth status >/dev/null 2>&1; then
  echo "Not logged in. Run: gh auth login"
  exit 1
fi

mapfile -t REPOS < <(gh repo list "$OWNER" --limit 200 --json name -q '.[].name')

if [ "${#REPOS[@]}" -eq 0 ]; then
  echo "No repositories found for $OWNER."
  exit 0
fi

TO_DELETE=()
for repo in "${REPOS[@]}"; do
  if [ "$repo" != "$KEEP" ]; then
    TO_DELETE+=("$repo")
  fi
done

if [ "${#TO_DELETE[@]}" -eq 0 ]; then
  echo "Nothing to delete. Only $KEEP exists."
  exit 0
fi

echo "Keeping: $KEEP"
echo "Will delete ${#TO_DELETE[@]} repo(s):"
printf '  - %s\n' "${TO_DELETE[@]}"
echo
read -r -p "Type DELETE to confirm: " confirm
if [ "$confirm" != "DELETE" ]; then
  echo "Cancelled."
  exit 1
fi

for repo in "${TO_DELETE[@]}"; do
  echo "Deleting $OWNER/$repo ..."
  gh repo delete "$OWNER/$repo" --yes
done

echo "Done. Remaining repos:"
gh repo list "$OWNER" --limit 50
