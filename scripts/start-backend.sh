#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT/backend"

# shellcheck disable=SC1091
source "$ROOT/scripts/load-env.sh"

if [[ -n "${GOOGLE_CLIENT_ID:-}" ]]; then
  export SPRING_PROFILES_ACTIVE="${SPRING_PROFILES_ACTIVE:-oauth}"
  echo "Google OAuth enabled (profile: oauth)"
fi

if [[ ! -f "$ROOT/backend/mvnw" ]]; then
  echo "Maven wrapper missing. Run: ./scripts/setup.sh" >&2
  exit 1
fi

echo "Starting Spring Boot API on http://localhost:8080 …"
exec ./mvnw spring-boot:run
