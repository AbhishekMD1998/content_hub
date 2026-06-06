# Supabase Setup (production / cloud database)

## 1. Create project

1. Go to [supabase.com](https://supabase.com) and create a new project.
2. Save the **database password** shown during creation.

## 2. Run schema

Open **SQL Editor** in Supabase and paste the full contents of:

```
supabase/schema.sql
```

Click **Run**. This creates `users`, `articles`, and `blogs` tables.

## 3. Connection string

**Project Settings → Database → Connection string → URI**

Use the **direct** connection on port **5432** (not the pooler on 6543) for Spring Boot + Flyway.

Example JDBC format for `backend/.env`:

```env
DATABASE_URL=jdbc:postgresql://db.abcdefghijklmnop.supabase.co:5432/postgres?sslmode=require
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=your_password_here
```

Copy `backend/.env.supabase.example` to `backend/.env` and fill in values.

## 4. Start backend

```bash
./scripts/start-backend.sh
```

Flyway runs migrations; the app seeds articles and blogs on first empty database.

## 5. Deploy frontend + backend

Set `FRONTEND_URL` and `CORS_ALLOWED_ORIGINS` to your production frontend URL.

Update Google OAuth redirect URI to your production backend URL.
