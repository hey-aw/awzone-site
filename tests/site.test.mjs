import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

test("presents AWzone as Matt's Portland notebook with selected work", async () => {
  const [page, shell] = await Promise.all([
    readFile(new URL("app/page.tsx", root), "utf8"),
    readFile(new URL("app/site-shell.tsx", root), "utf8"),
  ]);

  assert.match(page, /Hi, I&apos;m Matt AW\./);
  assert.match(shell, /AWzone home/);
  assert.match(page, /A public notebook · Portland, OR/);
  assert.match(page, /decisions, prototypes, failures, and patterns worth reusing/);
  assert.match(page, /Open examples/);
  assert.match(page, /More experiments/);
  assert.match(page, /Things you can study or try/);
  assert.match(page, /An experimental agent-friendly interface/);
  assert.match(page, /Helpful solutions need to be/);
  assert.match(page, /share examples and invite curiosity/);
  assert.doesNotMatch(page, /invite shared curiosity/);
  assert.doesNotMatch(page, /Latest notes/);
  assert.doesNotMatch(page, /id="notes"/);
  assert.doesNotMatch(shell, /href="\/#notes"/);
  assert.doesNotMatch(page, /I build AI products\s*<br/);
  assert.doesNotMatch(page, /Let&apos;s talk/);
  assert.doesNotMatch(page, /Working principles/);

  const primaryBlock = page.match(/const primaryExamples: Example\[\] = \[([\s\S]*?)\n\];/)?.[1];
  assert.equal(primaryBlock?.match(/title:/g)?.length, 4);
  assert.match(page, /AI-supported student-work analysis/);
  assert.match(page, /OpenSciEd Educator/);
  assert.match(page, /Classroom Transcripts/);
  assert.match(page, /That Movie Night Life/);
  assert.match(page, /Read the build note/);
  assert.match(page, /Live health status/);
  assert.doesNotMatch(page, /Check service health/);
  assert.doesNotMatch(page, /github\.com\/hey-aw\/eddo-skills/);
  assert.match(shell, /Source for this site/);
});

test("publishes the MCP build note and keeps the other two notes as drafts", async () => {
  const content = await readFile(new URL("app/content.ts", root), "utf8");

  assert.equal(content.match(/draft: true/g)?.length, 2);
  assert.equal(content.match(/draft: false/g)?.length, 1);
  assert.match(content, /export const publishedNotes = notes\.filter\(\(note\) => !note\.draft\)/);
  assert.match(content, /return publishedNotes\.find/);
  assert.match(content, /openscied-from-rag-to-mcp/);
  assert.match(content, /skill-or-server/);
  assert.match(content, /pacing-starts-with-the-calendar/);
  assert.match(content, /3,421 documents and three indexing failures/);
  assert.match(content, /Pacing Coach should remain available as a mature standalone skill with no MCP dependency/);
  assert.match(content, /https:\/\/openscied-library-mcp\.vercel\.app\/healthz/);
  assert.match(content, /https:\/\/github\.com\/eddo-ai\/eddo-skills/);
  assert.doesNotMatch(content, /https:\/\/github\.com\/hey-aw\/eddo-skills/);
});

test("generates routes only for published notes", async () => {
  const route = await readFile(new URL("app/notes/[slug]/page.tsx", root), "utf8");

  assert.match(route, /export const dynamicParams = false/);
  assert.match(route, /generateStaticParams/);
  assert.match(route, /publishedNotes\.map/);
  assert.match(route, /generateMetadata/);
  assert.match(route, /canonical: `\/notes\/\$\{note\.slug\}`/);
  assert.match(route, /Working note/);
  assert.match(route, /Corrections are welcome/);
});

test("includes core accessibility and responsive safeguards", async () => {
  const [page, shell, styles] = await Promise.all([
    readFile(new URL("app/page.tsx", root), "utf8"),
    readFile(new URL("app/site-shell.tsx", root), "utf8"),
    readFile(new URL("app/globals.css", root), "utf8"),
  ]);

  assert.match(page, /Skip to main content/);
  assert.match(shell, /aria-label="Primary navigation"/);
  assert.match(page, /aria-labelledby="intro-title"/);
  assert.match(styles, /prefers-reduced-motion:\s*reduce/);
  assert.match(styles, /:focus-visible/);
  assert.match(styles, /--display:\s*"Fraunces Variable"/);
  assert.match(styles, /\.site-title\s*\{[^}]*font-family:\s*var\(--display\)/s);
  assert.match(styles, /@media \(max-width: 640px\)/);
  assert.match(styles, /min-height:\s*2\.75rem/);
});

test("keeps Vercel deployment explicit and the custom domain gated", async () => {
  const [vercel, readme] = await Promise.all([
    readFile(new URL("vercel.json", root), "utf8"),
    readFile(new URL("README.md", root), "utf8"),
  ]);

  assert.equal(JSON.parse(vercel).framework, "nextjs");
  assert.match(readme, /Production: https:\/\/awzone-site\.vercel\.app/);
  assert.match(readme, /Preview this editorial direction before merging it to `main`/);
  assert.match(readme, /Connect `awzone\.com` only after/);
});
