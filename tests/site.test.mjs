import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

test("includes the positioning, case study, and contact details", async () => {
  const page = await readFile(new URL("app/page.tsx", root), "utf8");

  assert.match(page, /I build AI products/);
  assert.match(page, /human understanding/);
  assert.match(page, /Azure Cognitive Search and RAG prototype/);
  assert.match(page, /governed, read-only MCP service/);
  assert.match(page, /instructional skill/);
  assert.match(page, /aw@awzone\.com/);
});

test("applies the reviewed landing-page content", async () => {
  const page = await readFile(new URL("app/page.tsx", root), "utf8");

  assert.match(page, /understanding people&apos;s needs/);
  assert.match(page, /Learn the needs/);
  assert.match(page, /Identify opportunities/);
  assert.match(page, /Build, Measure, Learn/);
  assert.match(page, /insatiable curiosity/);
  assert.doesNotMatch(page, /Thinking in public, carefully/);
  assert.doesNotMatch(page, /Learning products that explain themselves/);
  assert.doesNotMatch(page, /Care workflows with less friction/);
});

test("includes core accessibility and responsive safeguards", async () => {
  const [page, styles] = await Promise.all([
    readFile(new URL("app/page.tsx", root), "utf8"),
    readFile(new URL("app/globals.css", root), "utf8"),
  ]);

  assert.match(page, /Skip to main content/);
  assert.match(page, /aria-label="Primary navigation"/);
  assert.match(page, /aria-labelledby="hero-title"/);
  assert.match(styles, /prefers-reduced-motion:\s*reduce/);
  assert.match(styles, /:focus-visible/);
  assert.match(styles, /@media \(max-width: 640px\)/);
  assert.match(styles, /min-height:\s*2\.75rem/);
});

test("keeps the deployment target explicit and domain changes gated", async () => {
  const [vercel, readme] = await Promise.all([
    readFile(new URL("vercel.json", root), "utf8"),
    readFile(new URL("README.md", root), "utf8"),
  ]);

  assert.equal(JSON.parse(vercel).framework, "nextjs");
  assert.match(readme, /Vercel preview URL/);
  assert.match(readme, /Connect\s+`awzone\.com`\s+only after/);
});
