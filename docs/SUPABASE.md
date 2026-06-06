# Supabase Setup (production / cloud database)

## 1. Create project

1. Go to [supabase.com](https://supabase.com) and create a new project.
2. Save the **database password** shown during creation.

## 2. Create tables (pick one option)

### Option A — Recommended: let Flyway do it

**Skip** manual SQL. When you start the backend, Flyway creates `users`, `articles`, and `blogs` automatically.

### Option B — Run SQL manually first

Open **SQL Editor** in Supabase, paste `supabase/schema.sql`, and click **Run**.

The backend is configured with `baseline-on-migrate: true`, so Flyway will accept an existing schema and not fail.

> Do not worry if you already ran `schema.sql` and saw a Flyway error before — pull the latest code and restart the backend.

## 3. Configure connection

```bash
bash scripts/configure-supabase.sh
```

Or edit `backend/.env` manually:

```env
DATABASE_URL=jdbc:postgresql://db.YOUR_PROJECT_REF.supabase.co:5432/postgres?sslmode=require
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=your_password_here
```

Use the **direct** connection on port **5432** (not the pooler on 6543).

Find your project ref in **Project Settings → Database** from the host `db.XXXX.supabase.co`.

## 4. Start backend

```bash
docker compose down          # stop local Docker DB if running
bash scripts/start-backend.sh
```

On first start, the app seeds articles and blogs if the tables are empty.

## 5. Start frontend

```bash
npm run dev
```

Open http://localhost:5173 — admin login: `admin@contenthub.com` / `admin123`

## Troubleshooting

| Error | Fix |
|-------|-----|
| `no schema history table` | Update to latest code (`baseline-on-migrate` is enabled) and restart backend |
| `Connection refused` | Check `DATABASE_URL`, password, and use port **5432** |
| `zsh: event not found` | Run `bash scripts/start-backend.sh` — do not paste script lines into zsh |
