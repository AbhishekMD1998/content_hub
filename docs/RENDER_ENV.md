# Render environment variables

## "tenant/user postgres.xxx not found"

The pooler **hostname** is wrong. Supabase assigns hosts like `aws-1-ap-south-1.pooler.supabase.com` — **do not guess** `aws-0-ap-south-1`.

Copy the **exact** host from your project dashboard.

---

## Setup (5 minutes)

### 1. Get pooler host from Supabase

1. [Supabase Dashboard](https://supabase.com/dashboard) → your project
2. Click **Connect** (top bar)
3. Open **Session pooler** (port **5432**)
4. Copy the **host** only, e.g. `aws-1-ap-south-1.pooler.supabase.com`

### 2. Set Render environment variables

Render → **content-hub-api** → **Environment**:

| Key | Value |
|-----|--------|
| `SUPABASE_POOLER_HOST` | Host from step 1 (exact, no `https://`) |
| `DATABASE_PASSWORD` | Supabase database password |
| `JWT_SECRET` | Long random string |
| `FRONTEND_URL` | Vercel URL or `http://localhost:5173` |
| `CORS_ALLOWED_ORIGINS` | Same as `FRONTEND_URL` |

`SUPABASE_PROJECT_REF` is set in `render.yaml` (`ddppgnmbiwibscgfxaxv`).

**Remove** old vars if present: `DATABASE_URL`, `DATABASE_USERNAME`, `SUPABASE_POOLER_REGION`.

### 3. Redeploy

**Manual Deploy** → **Clear build cache & deploy**

---

## Alternative: paste full JDBC URL

Instead of `SUPABASE_POOLER_HOST`, set:

| Key | Value |
|-----|--------|
| `DATABASE_URL` | `jdbc:postgresql://YOUR-POOLER-HOST:5432/postgres?sslmode=require` |
| `DATABASE_USERNAME` | `postgres.ddppgnmbiwibscgfxaxv` |
| `DATABASE_PASSWORD` | Supabase password |

---

## Verify

Logs should show:

```
Using Supabase session pooler: aws-1-ap-south-1.pooler.supabase.com (user postgres.ddppgnmbiwibscgfxaxv)
```

Test: `https://YOUR-SERVICE.onrender.com/api/articles`

---

## Error reference

| Error | Cause | Fix |
|-------|--------|-----|
| `Network unreachable` | Direct `db.*.supabase.co` (IPv6) | Use session pooler host |
| `tenant/user ... not found` | Wrong pooler host | Copy host from **Connect → Session pooler** |
| `password authentication failed` | Wrong password | Reset in Supabase → Database settings |
