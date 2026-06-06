#!/bin/sh
set -e

PROJECT_REF="${SUPABASE_PROJECT_REF:-}"
POOLER_REGION="${SUPABASE_POOLER_REGION:-}"

# Render is IPv4-only; Supabase direct db.*.supabase.co is IPv6-only → use Supavisor pooler.
if [ -n "$PROJECT_REF" ] && [ -n "$POOLER_REGION" ]; then
  export DATABASE_URL="jdbc:postgresql://aws-0-${POOLER_REGION}.pooler.supabase.com:5432/postgres?sslmode=require"
  export DATABASE_USERNAME="postgres.${PROJECT_REF}"
  echo "Using Supabase session pooler (IPv4): aws-0-${POOLER_REGION}.pooler.supabase.com"
fi

if [ -z "$DATABASE_URL" ]; then
  echo "FATAL: DATABASE_URL is not set."
  echo "Set SUPABASE_PROJECT_REF + SUPABASE_POOLER_REGION, or DATABASE_URL in Render Environment."
  exit 1
fi

case "$DATABASE_URL" in
  *db.*.supabase.co*)
    echo "FATAL: Direct Supabase URL uses IPv6; Render cannot reach db.*.supabase.co."
    echo "Set SUPABASE_POOLER_REGION (from Supabase Dashboard → Connect → Session pooler)."
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

echo "Starting API (database host: $(echo "$DATABASE_URL" | sed -E 's|jdbc:postgresql://([^:/]+).*|\1|'))"
exec java -jar app.jar
