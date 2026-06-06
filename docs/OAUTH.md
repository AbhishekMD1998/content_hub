# Google sign-in & auth (production)

## Signup / login not working?

### 1. Correct API URL

Use **your** Render URL from the dashboard — not `content-hub-api.onrender.com` (that may be someone else's app).

**Vercel** → Settings → Environment Variables:

```
VITE_API_BASE_URL=https://YOUR-ACTUAL-SERVICE.onrender.com
```

Redeploy Vercel after changing.

### 2. CORS on Render

`CORS_ALLOWED_ORIGINS` must **exactly** match your frontend origin (no trailing slash):

```
https://your-app.vercel.app
```

Same value for `FRONTEND_URL` (used after Google OAuth redirect).

### 3. Google OAuth on Render

Add in Render → Environment:

| Variable | Value |
|----------|--------|
| `GOOGLE_CLIENT_ID` | From Google Cloud Console |
| `GOOGLE_CLIENT_SECRET` | From Google Cloud Console |
| `FRONTEND_URL` | `https://your-app.vercel.app` |
| `CORS_ALLOWED_ORIGINS` | `https://your-app.vercel.app` |

Redeploy Render. Logs should show: `Google OAuth enabled (profile: oauth)`

### 4. Google Cloud Console

[console.cloud.google.com](https://console.cloud.google.com) → APIs & Services → Credentials → your OAuth client:

**Authorized JavaScript origins:**

```
https://your-app.vercel.app
https://YOUR-ACTUAL-SERVICE.onrender.com
```

**Authorized redirect URIs:**

```
https://YOUR-ACTUAL-SERVICE.onrender.com/login/oauth2/code/google
```

Save, wait 1–2 minutes, then try again.

---

## Local development

1. `backend/.env` — set `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `FRONTEND_URL=http://localhost:5173`
2. `bash scripts/start-backend.sh` (activates `oauth` profile automatically)
3. `npm run dev`
4. Google redirect URI for local: `http://localhost:8080/login/oauth2/code/google`
