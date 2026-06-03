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
- **Blogs** — developer JSON posts (`src/data/blogs.json`) plus admin uploads (`localStorage`)
- **Articles** — static sample content in `src/data/articles.js`
- **Admin panel** — sign in and publish/delete admin blogs

## Adding blogs as a developer

Edit **`src/data/blogs.json`**. Each entry in the `blogs` array supports structured `blocks` (headings, paragraphs, images, lists, callouts). See **`src/data/blogs.schema.json`** for the full shape.

```json
{
  "id": "my-new-post",
  "source": "json",
  "title": "Post title",
  "excerpt": "Short summary for cards",
  "author": "Your Name",
  "category": "Productivity",
  "readTime": "8 min",
  "createdAt": "2026-06-03T08:00:00.000Z",
  "coverImage": "/blog/cover.jpg",
  "tags": ["habits"],
  "blocks": [
    { "type": "intro", "text": "Opening hook…" },
    { "type": "heading", "level": 2, "id": "section-one", "text": "Section title" },
    { "type": "paragraph", "text": "Body copy…" },
    { "type": "image", "src": "/blog/photo.jpg", "alt": "Description", "caption": "Optional caption" },
    { "type": "callout", "variant": "insight", "title": "Quick takeaway", "text": "…" }
  ]
}
```

After saving, restart `npm run dev` if hot reload does not pick up JSON changes.

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
