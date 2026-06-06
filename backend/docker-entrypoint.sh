#!/bin/sh
set -e

PROJECT_REF="${SUPABASE_PROJECT_REF:-}"
POOLER_HOST="${SUPABASE_POOLER_HOST:-}"

# Build JDBC URL from dashboard pooler host (Render is IPv4-only; do not use db.*.supabase.co).
if [ -z "$DATABASE_URL" ] && [ -n "$PROJECT_REF" ] && [ -n "$POOLER_HOST" ]; then
  export DATABASE_URL="jdbc:postgresql://${POOLER_HOST}:5432/postgres?sslmode=require"
  export DATABASE_USERNAME="postgres.${PROJECT_REF}"
  echo "Using Supabase session pooler: ${POOLER_HOST} (user postgres.${PROJECT_REF})"
fi

if [ -z "$DATABASE_URL" ]; then
  echo "FATAL: Database connection not configured."
  echo ""
  echo "Missing in Render → Environment:"
  [ -z "$POOLER_HOST" ] && echo "  - SUPABASE_POOLER_HOST (Supabase → Connect → Session pooler → copy host)"
  [ -z "$DATABASE_PASSWORD" ] && echo "  - DATABASE_PASSWORD (Supabase → Project Settings → Database)"
  [ -n "$POOLER_HOST" ] && [ -z "$PROJECT_REF" ] && echo "  - SUPABASE_PROJECT_REF"
  echo ""
  echo "Or set DATABASE_URL + DATABASE_USERNAME + DATABASE_PASSWORD instead."
  exit 1
fi

case "$DATABASE_URL" in
  *db.*.supabase.co*)
    echo "FATAL: Direct Supabase URL (db.*.supabase.co) is IPv6-only; Render cannot use it."
    echo "Use Session pooler host from Supabase → Connect (e.g. aws-1-ap-south-1.pooler.supabase.com)."
    exit 1
    ;;
  *localhost*|*127.0.0.1*)
    echo "FATAL: DATABASE_URL points to localhost."
    exit 1
    ;;
esac

if [ -z "$DATABASE_USERNAME" ] || [ -z "$DATABASE_PASSWORD" ]; then
  echo "FATAL: DATABASE_USERNAME and DATABASE_PASSWORD must be set."
  exit 1
fi

if [ -n "$GOOGLE_CLIENT_ID" ]; then
  if [ -n "$SPRING_PROFILES_ACTIVE" ]; then
    export SPRING_PROFILES_ACTIVE="${SPRING_PROFILES_ACTIVE},oauth"
  else
    export SPRING_PROFILES_ACTIVE="oauth"
  fi
  echo "Google OAuth enabled (profile: oauth)"
fi

echo "Starting API (database host: $(echo "$DATABASE_URL" | sed -E 's|jdbc:postgresql://([^:/]+).*|\1|'), user: $DATABASE_USERNAME)"
exec java -jar app.jar
