#!/bin/sh
set -e

if [ -z "$DATABASE_URL" ]; then
  echo "FATAL: DATABASE_URL is not set."
  echo "Render → content-hub-api → Environment → add DATABASE_URL (Supabase JDBC URL)."
  exit 1
fi

case "$DATABASE_URL" in
  *localhost*|*127.0.0.1*)
    echo "FATAL: DATABASE_URL points to localhost ($DATABASE_URL)."
    echo "Use Supabase, e.g. jdbc:postgresql://db.<project>.supabase.co:5432/postgres?sslmode=require"
    exit 1
    ;;
esac

if [ -z "$DATABASE_USERNAME" ] || [ -z "$DATABASE_PASSWORD" ]; then
  echo "FATAL: DATABASE_USERNAME and DATABASE_PASSWORD must be set in Render Environment."
  exit 1
fi

echo "Starting API (database host: $(echo "$DATABASE_URL" | sed -E 's|jdbc:postgresql://([^:/]+).*|\1|'))"
exec java -jar app.jar
