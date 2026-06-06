# Content Hub PDF Documentation

| Document | PDF | Source |
|----------|-----|--------|
| Developer Guide | [Content-Hub-Developer-Guide.pdf](./Content-Hub-Developer-Guide.pdf) | [source/developer-guide.html](./source/developer-guide.html) |
| Architecture & Design | [Content-Hub-Architecture-Design.pdf](./Content-Hub-Architecture-Design.pdf) | [source/architecture-design.html](./source/architecture-design.html) |

## Regenerate PDFs

```bash
npm install
npx playwright install chromium
npm run docs:pdf
```

PDFs are written to this folder (`docs/pdf/`). HTML sources include Mermaid flowcharts rendered at build time.
