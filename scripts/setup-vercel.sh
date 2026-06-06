#!/usr/bin/env bash
# One-time Vercel setup for Content Hub (free Preview + Production).
# Run: bash scripts/setup-vercel.sh
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

if ! npx vercel whoami >/dev/null 2>&1; then
  echo "Log in to Vercel first:"
  npx vercel login
fi

read -rp "Your Render API URL (e.g. https://content-hub-api-xxxx.onrender.com): " API_URL
API_URL="${API_URL%/}"

if [[ -z "$API_URL" ]]; then
  echo "API URL is required." >&2
  exit 1
fi

echo "Linking project (if not already linked)…"
npx vercel link --yes 2>/dev/null || npx vercel link

echo "Setting VITE_API_BASE_URL for Production and Preview…"
printf '%s' "$API_URL" | npx vercel env add VITE_API_BASE_URL production
printf '%s' "$API_URL" | npx vercel env add VITE_API_BASE_URL preview

echo ""
echo "Deploying production (main)…"
npx vercel --prod

echo ""
echo "Done. Production URL is shown above."
echo "Preview: push to branch 'staging' or open a PR — Vercel deploys automatically."
echo ""
echo "Update Render → FRONTEND_URL and redeploy after you have your Vercel URL."
