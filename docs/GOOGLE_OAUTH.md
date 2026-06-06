# Google Sign-In Setup

1. Open [Google Cloud Console](https://console.cloud.google.com/apis/credentials).
2. Create a project (or pick an existing one).
3. **APIs & Services → Credentials → Create credentials → OAuth client ID**
4. Application type: **Web application**
5. **Authorized JavaScript origins:**
   - `http://localhost:5173`
   - `http://localhost:8080`
6. **Authorized redirect URIs:**
   - `http://localhost:8080/login/oauth2/code/google`
7. Copy **Client ID** and **Client secret** into `backend/.env`:

```env
GOOGLE_CLIENT_ID=xxxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-xxxx
```

8. Restart the backend: `./scripts/start-backend.sh`

The **Continue with Google** button appears on `/admin/login` once both values are set.
