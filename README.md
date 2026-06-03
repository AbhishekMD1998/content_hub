# Content Hub

A React dashboard for **blogs** (uploaded by admins) and **articles** (curated editorial content).

## Run locally

```bash
cd Projects/content-hub
npm install
npm run dev
```

Open the URL shown in the terminal (usually http://localhost:5173).

## Features

- **Dashboard** — stats and recent blogs/articles
- **Blogs** — posts created by admins (stored in `localStorage`)
- **Articles** — static sample content in `src/data/articles.js`
- **Admin panel** — sign in and publish/delete blogs

## Admin login (demo)

| Field    | Value                 |
|----------|-----------------------|
| Email    | `admin@contenthub.com` |
| Password | `admin123`            |

> For production, replace client-side auth with a real backend API.

## Project structure

```
src/
  pages/          # Dashboard, Blogs, Articles, Admin
  components/     # Layout, cards, protected routes
  context/        # Auth + blog storage
  data/           # Seed blogs and static articles
```

## Build

```bash
npm run build
npm run preview
```
