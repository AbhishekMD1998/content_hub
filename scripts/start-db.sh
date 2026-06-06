#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

echo "Starting PostgreSQL (Docker)…"
docker compose up -d postgres

echo "Waiting for database…"
for i in {1..30}; do
  if docker compose exec -T postgres pg_isready -U contenthub -d content_hub >/dev/null 2>&1; then
    echo "Database is ready on localhost:5433"
    exit 0
  fi
  sleep 1
done

echo "Database did not become ready in time." >&2
exit 1
