#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"

"$ROOT/scripts/start-db.sh"

# Start backend in background
"$ROOT/scripts/start-backend.sh" &
BACKEND_PID=$!

cleanup() {
  kill "$BACKEND_PID" 2>/dev/null || true
}
trap cleanup EXIT

echo "Waiting for API…"
for i in {1..60}; do
  if curl -sf http://localhost:8080/api/articles >/dev/null 2>&1; then
    echo "API is up."
    break
  fi
  sleep 2
done

cd "$ROOT"
npm run dev
