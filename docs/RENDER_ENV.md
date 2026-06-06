# Render environment variables (required)

If you see `Connection to localhost:5433 refused`, **DATABASE_URL is not set on Render**.

## Steps

1. [dashboard.render.com](https://dashboard.render.com) → click **content-hub-api**
2. Left menu → **Environment**
3. Click **Add Environment Variable** for each row below
4. Click **Save Changes** (triggers redeploy)

## Required variables

| Key | Value |
|-----|--------|
| `DATABASE_URL` | `jdbc:postgresql://db.YOUR_PROJECT_REF.supabase.co:5432/postgres?sslmode=require` |
| `DATABASE_USERNAME` | `postgres` |
| `DATABASE_PASSWORD` | Your Supabase database password |
| `JWT_SECRET` | Long random string (e.g. 48 chars) |
| `FRONTEND_URL` | `https://your-app.vercel.app` or `http://localhost:5173` |
| `CORS_ALLOWED_ORIGINS` | Same as `FRONTEND_URL` |

### Example `DATABASE_URL`

Replace `YOUR_PROJECT_REF` with your Supabase project ref (from **Project Settings → Database**):

```
jdbc:postgresql://db.ddppgnmbiwibscgfxaxv.supabase.co:5432/postgres?sslmode=require
```

## Checklist

- [ ] No typos in variable **names** (must be exactly `DATABASE_URL`)
- [ ] URL starts with `jdbc:postgresql://`
- [ ] Port is **5432** (not 6543)
- [ ] Ends with `?sslmode=require`
- [ ] Clicked **Save Changes** after adding all vars

## Verify

After deploy shows **Live**:

```
https://YOUR-SERVICE.onrender.com/api/articles
```

Should return JSON, not an error page.
