#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

echo "==> Content Hub setup"

# Maven wrapper
if [[ ! -f "$ROOT/backend/mvnw" ]]; then
  echo "Installing Maven wrapper…"
  if command -v mvn >/dev/null 2>&1; then
    (cd "$ROOT/backend" && mvn -N wrapper:wrapper -q && chmod +x mvnw)
  else
    echo "Install Maven first: brew install maven" >&2
    exit 1
  fi
  echo "Maven wrapper installed."
fi

# Frontend deps
if [[ ! -d "$ROOT/node_modules" ]]; then
  echo "Installing npm packages…"
  npm install
fi

# Env file
if [[ ! -f "$ROOT/backend/.env" ]]; then
  cp "$ROOT/backend/.env.example" "$ROOT/backend/.env"
  JWT=$(openssl rand -base64 48)
  if [[ "$(uname)" == "Darwin" ]]; then
    sed -i '' "s|JWT_SECRET=.*|JWT_SECRET=${JWT}|" "$ROOT/backend/.env"
  else
    sed -i "s|JWT_SECRET=.*|JWT_SECRET=${JWT}|" "$ROOT/backend/.env"
  fi
  echo "Created backend/.env with local Docker defaults."
fi

# Local database (Docker)
if command -v docker >/dev/null 2>&1; then
  if docker info >/dev/null 2>&1; then
    "$ROOT/scripts/start-db.sh"
  else
    echo ""
    echo "Docker is installed but not running."
    echo "  Option A: Start Docker Desktop, then run: ./scripts/start-db.sh"
    echo "  Option B: Use Supabase: ./scripts/configure-supabase.sh"
  fi
else
  echo "Docker not found — use Supabase: ./scripts/configure-supabase.sh"
fi

echo ""
echo "Setup complete."
echo "  ./scripts/start-backend.sh   → API http://localhost:8080"
echo "  npm run dev                → UI  http://localhost:5173"
echo ""
echo "Docs: docs/SUPABASE.md | docs/GOOGLE_OAUTH.md"
