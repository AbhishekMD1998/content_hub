# Deploy Content Hub

| Part | Platform | Why |
|------|----------|-----|
| **Frontend** (React) | [Vercel](https://vercel.com) | Static Vite build + SPA routing |
| **Backend** (Spring Boot) | [Render](https://render.com) (Docker) | JVM apps use `runtime: docker` on Render |
| **Database** | [Supabase](https://supabase.com) | PostgreSQL (already configured) |

Vercel **cannot** run the Spring Boot API — only the React app.

---

## 1. Deploy backend (Render)

1. Push code to GitHub.
2. [render.com](https://render.com) → **New → Blueprint** → connect `content_hub` repo.
3. Uses `render.yaml` in the repo root.
4. Set environment variables in Render:

| Variable | Example |
|----------|---------|
| `DATABASE_URL` | `jdbc:postgresql://db.xxx.supabase.co:5432/postgres?sslmode=require` |
| `DATABASE_USERNAME` | `postgres` |
| `DATABASE_PASSWORD` | your Supabase password |
| `JWT_SECRET` | long random string |
| `FRONTEND_URL` | `https://your-app.vercel.app` (set after Vercel deploy) |
| `CORS_ALLOWED_ORIGINS` | `https://your-app.vercel.app` |
| `GOOGLE_CLIENT_ID` | optional |
| `GOOGLE_CLIENT_SECRET` | optional |

5. Deploy → note your API URL, e.g. `https://content-hub-api.onrender.com`

**Google OAuth redirect URI (production):**
`https://content-hub-api.onrender.com/login/oauth2/code/google`

---

## 2. Deploy frontend (Vercel)

### Option A — Vercel CLI

```bash
cd /Users/abhishekmd/Projects/content-hub
npm i -g vercel    # once
vercel login
vercel --prod
```

When prompted, set **Environment Variable**:

```
VITE_API_BASE_URL=https://content-hub-api.onrender.com
```

### Option B — Vercel Dashboard

1. [vercel.com/new](https://vercel.com/new) → Import GitHub repo `content_hub`.
2. Framework: **Vite** (auto-detected).
3. **Environment Variables:**
   - `VITE_API_BASE_URL` = your Render API URL (no trailing slash)
4. Deploy.

---

## 3. Finish configuration

1. Update Render `FRONTEND_URL` and `CORS_ALLOWED_ORIGINS` to your Vercel URL.
2. Redeploy backend if CORS changed.
3. In Supabase SQL Editor, ensure `supabase/schema.sql` was run (or let Flyway handle it).

---

## 4. Verify

- Frontend: `https://your-app.vercel.app`
- API: `https://your-api.onrender.com/api/articles`
- Login: `admin@contenthub.com` / `admin123`

---

## Local vs production

| | Local | Production |
|---|-------|------------|
| Frontend | `npm run dev` :5173 | Vercel |
| API | `bash scripts/start-backend.sh` :8080 | Render |
| `VITE_API_BASE_URL` | unset (Vite proxy) | `https://api...` |
