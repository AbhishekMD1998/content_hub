# Content Hub

React dashboard with **Spring Boot** API and **PostgreSQL** (local Docker or Supabase).

## Quick start (configured for local dev)

```bash
# One-time setup (Maven wrapper, npm, Docker Postgres)
./scripts/setup.sh

# Terminal 1 — API
./scripts/start-backend.sh

# Terminal 2 — UI
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

| Service | URL |
|---------|-----|
| Frontend | http://localhost:5173 |
| Backend API | http://localhost:8080 |
| PostgreSQL | localhost:5433 |

**Default admin:** `admin@contenthub.com` / `admin123`

Or run both with: `./scripts/dev.sh`

---

## Supabase (cloud database)

```bash
./scripts/configure-supabase.sh   # interactive — writes backend/.env
```

Then run `supabase/schema.sql` in Supabase SQL Editor. Details: [docs/SUPABASE.md](docs/SUPABASE.md)

---

## Google sign-in

1. Create OAuth credentials in Google Cloud Console  
2. Add to `backend/.env`:
   ```env
   GOOGLE_CLIENT_ID=....apps.googleusercontent.com
   GOOGLE_CLIENT_SECRET=GOCSPX-...
   ```
3. Restart backend

Full steps: [docs/GOOGLE_OAUTH.md](docs/GOOGLE_OAUTH.md)

---

## Configuration files

| File | Purpose |
|------|---------|
| `backend/.env` | Database, JWT, Google (gitignored) |
| `backend/.env.example` | Local Docker defaults |
| `backend/.env.supabase.example` | Supabase template |
| `docker-compose.yml` | Local Postgres on port 5433 |

---

## API

| Method | Path | Auth |
|--------|------|------|
| POST | `/api/auth/signup` | Public |
| POST | `/api/auth/login` | Public |
| GET | `/api/auth/me` | Bearer JWT |
| GET | `/api/articles` | Public |
| GET | `/api/blogs` | Public |
| POST | `/api/blogs` | JWT |
| DELETE | `/api/blogs/{slug}` | JWT |
| GET | `/oauth2/authorization/google` | Public (if Google configured) |

---

## Project structure

```
content-hub/
  backend/          Spring Boot API
  scripts/          setup, start-db, start-backend, dev
  supabase/         SQL for Supabase dashboard
  docs/             Supabase + Google guides
  src/              React frontend
```
