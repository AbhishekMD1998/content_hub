# Content Hub

React dashboard with a **Spring Boot** API and **Supabase PostgreSQL** for auth, articles, and blogs.

## Architecture

| Layer | Stack |
|-------|--------|
| Frontend | React + Vite (port 5173) |
| Backend | Spring Boot 3 + JWT + Google OAuth2 (port 8080) |
| Database | PostgreSQL on [Supabase](https://supabase.com) |

## 1. Supabase setup

1. Create a project at [supabase.com](https://supabase.com).
2. Open **SQL Editor** and run the script in [`supabase/schema.sql`](supabase/schema.sql) (creates `users`, `articles`, `blogs` tables).
3. Copy database credentials from **Project Settings → Database**:
   - Host, database `postgres`, user `postgres`, password, port `5432`
   - Use **connection string** with `?sslmode=require` for the JDBC URL.

## 2. Backend setup

```bash
cd backend
cp .env.example .env
# Edit .env with Supabase DATABASE_URL, JWT_SECRET, optional Google OAuth keys
```

**`.env` example (Supabase):**

```env
DATABASE_URL=jdbc:postgresql://db.YOUR_REF.supabase.co:5432/postgres?sslmode=require
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=your_password
JWT_SECRET=use-a-random-string-at-least-32-characters-long
FRONTEND_URL=http://localhost:5173
CORS_ALLOWED_ORIGINS=http://localhost:5173
GOOGLE_CLIENT_ID=optional
GOOGLE_CLIENT_SECRET=optional
```

Run the API:

```bash
cd backend
./mvnw spring-boot:run
# or: mvn spring-boot:run
```

On first start, Flyway creates tables and the app **seeds** articles + blogs from `backend/src/main/resources/seed/blogs.json`.

**Default admin user:**

| Email | Password |
|-------|----------|
| `admin@contenthub.com` | `admin123` |

## 3. Google sign-in (optional)

1. [Google Cloud Console](https://console.cloud.google.com/) → APIs & Services → Credentials → OAuth client (Web).
2. **Authorized redirect URI:** `http://localhost:8080/login/oauth2/code/google`
3. Set `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` in `backend/.env`.
4. In the app, use **Continue with Google** on the sign-in page.

## 4. Frontend setup

```bash
npm install
npm run dev
```

Vite proxies `/api`, `/oauth2`, and `/login` to `http://localhost:8080`.

Open [http://localhost:5173](http://localhost:5173).

## API endpoints

| Method | Path | Auth |
|--------|------|------|
| POST | `/api/auth/signup` | Public |
| POST | `/api/auth/login` | Public |
| GET | `/api/auth/me` | Bearer JWT |
| GET | `/api/articles` | Public |
| GET | `/api/articles/{slug}` | Public |
| GET | `/api/blogs` | Public |
| GET | `/api/blogs/{slug}` | Public |
| POST | `/api/blogs` | JWT |
| DELETE | `/api/blogs/{slug}` | JWT |
| GET | `/oauth2/authorization/google` | Public (if Google configured) |

## Adding blog content (developers)

Seed file: `backend/src/main/resources/seed/blogs.json` (loaded into Postgres on empty DB).

For reference, the frontend block schema lives in `src/data/blogs.schema.json`.

## Project structure

```
content-hub/
  backend/           # Spring Boot API
  supabase/          # SQL for Supabase dashboard
  src/               # React app
    api/             # fetch clients
    context/         # auth, articles, blogs state
```

## Build

```bash
npm run build
cd backend && mvn package -DskipTests
```
