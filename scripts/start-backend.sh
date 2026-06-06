#!/usr/bin/env bash
# Run with:  bash scripts/start-backend.sh
# Do not paste this file into zsh — "!" triggers history expansion errors.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT/backend"

# shellcheck disable=SC1091
source "$ROOT/scripts/load-env.sh"

if [[ -n "${GOOGLE_CLIENT_ID:-}" ]]; then
  export SPRING_PROFILES_ACTIVE="${SPRING_PROFILES_ACTIVE:-oauth}"
  echo "Google OAuth enabled (profile: oauth)"
fi

if [[ -f "$ROOT/backend/mvnw" ]]; then
  :
else
  echo "Maven wrapper missing. Run: bash scripts/setup.sh" >&2
  exit 1
fi

PORT_IN_USE="$(lsof -ti :8080 2>/dev/null | head -1 || true)"
if [[ -n "$PORT_IN_USE" ]]; then
  echo "Port 8080 is already in use (PID $PORT_IN_USE)." >&2
  echo "Stop it with:  kill $PORT_IN_USE" >&2
  echo "Or find it with:  lsof -i :8080" >&2
  exit 1
fi

echo "Starting Spring Boot API on http://localhost:8080 …"
exec ./mvnw spring-boot:run
