# Render environment variables

## IPv6 / "Network unreachable"

Supabase **direct** connections (`db.xxx.supabase.co`) use **IPv6**. **Render only supports IPv4**, so you get:

```
java.net.SocketException: Network unreachable
```

**Fix:** use the Supabase **Session pooler** (IPv4). This repo sets that automatically via `SUPABASE_PROJECT_REF` + `SUPABASE_POOLER_REGION` in `render.yaml`.

### Find your pooler region

Supabase Dashboard → **Connect** → **Session pooler** → host looks like:

```
aws-0-ap-south-1.pooler.supabase.com
```

Use the region part (`ap-south-1`) as `SUPABASE_POOLER_REGION` in Render if the default is wrong.

---

## Required in Render

| Key | Value |
|-----|--------|
| `SUPABASE_PROJECT_REF` | `ddppgnmbiwibscgfxaxv` (auto from `render.yaml`) |
| `SUPABASE_POOLER_REGION` | e.g. `ap-south-1` (from Connect → Session pooler) |
| `DATABASE_PASSWORD` | Supabase database password |
| `JWT_SECRET` | Long random string |
| `FRONTEND_URL` | Vercel URL or `http://localhost:5173` |
| `CORS_ALLOWED_ORIGINS` | Same as `FRONTEND_URL` |

You can **remove** old `DATABASE_URL` / `DATABASE_USERNAME` from Render — the Docker entrypoint builds them from the pooler settings.

---

## Verify

After deploy is **Live**, logs should show:

```
Using Supabase session pooler (IPv4): aws-0-ap-south-1.pooler.supabase.com
Starting API (database host: aws-0-ap-south-1.pooler.supabase.com)
```

Test: `https://YOUR-SERVICE.onrender.com/api/articles`
