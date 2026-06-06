#!/usr/bin/env bash
# Interactive Supabase configuration → writes backend/.env
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
ENV_FILE="$ROOT/backend/.env"

echo "=== Content Hub — Supabase configuration ==="
echo ""
echo "Get these from: Supabase Dashboard → Project Settings → Database"
echo "Use the DIRECT connection (port 5432), not the pooler (6543)."
echo ""

read -rp "Project ref (from db.XXXX.supabase.co): " PROJECT_REF
read -rp "Database password: " -s DB_PASSWORD
echo ""
read -rp "JWT secret (press Enter to auto-generate): " JWT_SECRET
if [[ -z "$JWT_SECRET" ]]; then
  JWT_SECRET=$(openssl rand -base64 48)
  echo "Generated JWT secret."
fi

read -rp "Google Client ID (optional, Enter to skip): " GOOGLE_ID
read -rp "Google Client Secret (optional): " -s GOOGLE_SECRET
echo ""

cat > "$ENV_FILE" <<EOF
# Supabase PostgreSQL
DATABASE_URL=jdbc:postgresql://db.${PROJECT_REF}.supabase.co:5432/postgres?sslmode=require
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=${DB_PASSWORD}

JWT_SECRET=${JWT_SECRET}
JWT_EXPIRATION_MS=86400000

FRONTEND_URL=http://localhost:5173
CORS_ALLOWED_ORIGINS=http://localhost:5173

GOOGLE_CLIENT_ID=${GOOGLE_ID}
GOOGLE_CLIENT_SECRET=${GOOGLE_SECRET}
EOF

echo ""
echo "Wrote $ENV_FILE"
echo ""
echo "Next steps:"
echo "  1. Run supabase/schema.sql in Supabase SQL Editor (if not done yet)"
echo "  2. ./scripts/start-backend.sh"
echo "  3. npm run dev"
