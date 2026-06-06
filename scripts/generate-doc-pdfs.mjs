#!/usr/bin/env node
/**
 * Generate PDF documentation from HTML sources in docs/pdf/source/.
 * Usage: node scripts/generate-doc-pdfs.mjs
 */
import { chromium } from 'playwright';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const sourceDir = path.join(root, 'docs/pdf/source');
const outDir = path.join(root, 'docs/pdf');
const backendDocsDir = path.join(root, 'backend/src/main/resources/docs');

const docs = [
  { html: 'developer-guide.html', pdf: 'Content-Hub-Developer-Guide.pdf' },
  { html: 'architecture-design.html', pdf: 'Content-Hub-Architecture-Design.pdf' },
];

for (const dir of [outDir, backendDocsDir]) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

const browser = await chromium.launch();
const page = await browser.newPage();

for (const doc of docs) {
  const filePath = path.join(sourceDir, doc.html);
  const outPath = path.join(outDir, doc.pdf);
  const url = `file://${filePath}`;

  console.log(`Rendering ${doc.html} → ${doc.pdf}`);
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForTimeout(2500);
  await page.pdf({
    path: outPath,
    format: 'A4',
    printBackground: true,
    margin: { top: '18mm', right: '16mm', bottom: '18mm', left: '16mm' },
  });
  const backendPath = path.join(backendDocsDir, doc.pdf);
  fs.copyFileSync(outPath, backendPath);
  console.log(`  ✓ ${outPath}`);
  console.log(`  ✓ ${backendPath}`);
}

await browser.close();
console.log('Done.');
