#!/usr/bin/env bash
# Export variables from backend/.env for Spring Boot.
ENV_FILE="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)/backend/.env"
if [[ -f "$ENV_FILE" ]]; then
  # Disable history expansion so passwords/JWT secrets with "!" are safe in zsh.
  set +o histexpand 2>/dev/null || set +H 2>/dev/null || true
  set -a
  # shellcheck disable=SC1090
  source "$ENV_FILE"
  set +a
fi
