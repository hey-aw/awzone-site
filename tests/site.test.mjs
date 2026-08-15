import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

test("opens as a personal BBS with a welcome bulletin and working main menu", async () => {
  const [page, shell] = await Promise.all([
    readFile(new URL("app/page.tsx", root), "utf8"),
    readFile(new URL("app/site-shell.tsx", root), "utf8"),
  ]);

  assert.match(page, /System bulletin/);
  assert.match(page, /Welcome to AWzone\./);
  assert.match(page, /Matt AW&apos;s public bulletin board/);
  assert.match(page, /product development/);
  assert.match(page, /projects in teaching &amp; learning and healthcare/);
  assert.match(page, /fun experiments/);
  assert.match(page, /Read a note, browse the projects, or follow a hyperlink/);
  assert.match(page, /<nav id="menu" className="main-menu panel"/);
  assert.match(page, /Select an area/);
  assert.match(page, /Latest notes/);
  assert.match(page, /label: "Projects"/);
  assert.match(page, /label: "Linked resources"/);
  assert.match(page, /label: "Hyperlinks"/);
  assert.match(page, /About the sysop/);
  assert.match(shell, /AWZONE BBS/);
  assert.match(shell, /Matt AW&apos;s public board \/ Portland, Oregon/);
  assert.match(shell, /\[2\]<\/span> Projects/);
  assert.match(shell, /\[3\]<\/span> Links/);
  assert.match(shell, /<nav aria-label="Page links">/);
  assert.match(shell, /<a href="#files">Hyperlinks<\/a>/);

  assert.doesNotMatch(page, /Project index|Recent file|README\.TXT|directoryEntries/);
  assert.doesNotMatch(shell, /Public directory/);
  assert.doesNotMatch(page, /CONNECTION|PROTOCOL|UPTIME|2400 bps|CALLERS|DOWNLOADS|SYSOP:/i);
  assert.doesNotMatch(page, /filename|file size|message count|download count/i);
  assert.doesNotMatch(page, /Let&apos;s talk|Get in touch|Start a project/);
  assert.doesNotMatch(page, /Message boards|File library|Logoff \/ external links/);
  assert.doesNotMatch(shell, /Logoff \/ external links|does not create an account or session/);
});

test("presents all six real projects as topics across three project areas", async () => {
  const page = await readFile(new URL("app/page.tsx", root), "utf8");

  const boardsBlock = page.match(/const boardAreas: BoardArea\[\] = \[([\s\S]*?)\n\];/)?.[1];
  const topicsBlock = page.match(/const boardTopics: BoardTopic\[\] = \[([\s\S]*?)\n\];/)?.[1];
  assert.equal(boardsBlock?.match(/title:/g)?.length, 3);
  assert.equal(topicsBlock?.match(/title:/g)?.length, 6);

  assert.match(page, /Learning \+ curriculum/);
  assert.match(page, /Classroom media/);
  assert.match(page, /Side projects/);
  assert.match(page, /AI-supported student-work analysis/);
  assert.match(page, /OpenSciEd Educator/);
  assert.match(page, /OpenSciEd Library MCP/);
  assert.match(page, /Pacing Coach/);
  assert.match(page, /Classroom Transcripts/);
  assert.match(page, /That Movie Night Life/);
  assert.match(page, /Project topic/);
  assert.match(page, /function ProjectActions/);
  assert.match(page, /resource\.href !== topic\.noteHref/);
  assert.match(page, /<ResourceAnchor resource=\{resource\}/);
  assert.match(page, /Read note/);
  assert.doesNotMatch(page, /href=\{`#file-\$\{topic\.slug\}`\}/);
  assert.doesNotMatch(page, /View links?/);
});

test("uses only the retained real links in the linked-resources area", async () => {
  const [page, shell] = await Promise.all([
    readFile(new URL("app/page.tsx", root), "utf8"),
    readFile(new URL("app/site-shell.tsx", root), "utf8"),
  ]);

  assert.match(page, /id="files" className="files-panel panel"/);
  assert.match(page, /Linked resources/);
  assert.match(page, /<h2 id="files-title">Hyperlinks<\/h2>/);
  assert.match(page, /Case studies, source code, build notes, and live services linked from the/);
  assert.match(page, /https:\/\/eddolearning\.com\/blog\/analyzing-student-work/);
  assert.match(page, /https:\/\/github\.com\/eddo-ai\/eddo-skills/);
  assert.match(page, /https:\/\/github\.com\/eddo-ai\/classroom-transcripts/);
  assert.match(page, /https:\/\/github\.com\/hey-aw\/that-movie-night-life/);
  assert.match(page, /\/notes\/openscied-from-rag-to-mcp/);
  assert.match(page, /https:\/\/openscied-library-mcp\.vercel\.app\/healthz/);
  assert.match(shell, /mailto:aw@awzone\.com/);
  assert.match(shell, /https:\/\/github\.com\/hey-aw/);
  assert.match(shell, /https:\/\/linkedin\.com\/in\/mattaw/);
  assert.match(shell, /https:\/\/github\.com\/hey-aw\/awzone-site/);
});

test("derives the latest readable public note from published note data", async () => {
  const [page, content, route] = await Promise.all([
    readFile(new URL("app/page.tsx", root), "utf8"),
    readFile(new URL("app/content.ts", root), "utf8"),
    readFile(new URL("app/notes/[slug]/page.tsx", root), "utf8"),
  ]);

  assert.match(page, /const latestNote = publishedNotes\[0\]/);
  assert.match(page, /<h2 id="latest-title">Note<\/h2>/);
  assert.match(page, /<p className="post-marker">Note<\/p>/);
  assert.match(page, /time dateTime=\{latestNote\.isoDate\}/);
  assert.match(page, /\{latestNote\.lede\}/);
  assert.match(page, /\{latestNote\.summary\}/);
  assert.match(page, /\{latestNote\.readingTime\}/);
  assert.match(page, /Read full note/);

  assert.equal(content.match(/draft: true/g)?.length, 2);
  assert.equal(content.match(/draft: false/g)?.length, 1);
  assert.match(content, /export const publishedNotes = notes\.filter\(\(note\) => !note\.draft\)/);
  assert.match(content, /return publishedNotes\.find/);
  assert.match(content, /3,421 documents and three indexing failures/);

  assert.match(route, /export const dynamicParams = false/);
  assert.match(route, /generateStaticParams/);
  assert.match(route, /canonical: `\/notes\/\$\{note\.slug\}`/);
  assert.match(route, /<main id="note-content" className="note-shell page-shell">/);
  assert.match(route, /← Back to board/);
  assert.match(content, /kind: "Public note"/);
  assert.match(route, /Public note/);
  assert.match(route, /A dated note from the board/);
  assert.match(route, /Email a correction/);
});

test("keeps semantic, keyboard, focus, motion, and narrow-screen safeguards", async () => {
  const [page, shell, styles] = await Promise.all([
    readFile(new URL("app/page.tsx", root), "utf8"),
    readFile(new URL("app/site-shell.tsx", root), "utf8"),
    readFile(new URL("app/globals.css", root), "utf8"),
  ]);

  assert.match(page, /Skip to bulletin board/);
  assert.match(page, /<main id="board-content"/);
  assert.match(page, /<nav id="menu"/);
  assert.match(page, /<section id="latest"/);
  assert.match(page, /<section id="boards"/);
  assert.match(page, /<section id="files"/);
  assert.match(page, /<section id="about"/);
  assert.match(page, /aria-labelledby="main-menu-title"/);
  assert.match(page, /aria-labelledby="latest-title"/);
  assert.match(page, /aria-labelledby="boards-title"/);
  assert.match(page, /aria-labelledby="files-title"/);
  assert.match(page, /Choose a menu item, or press Tab to move through links/);
  assert.match(shell, /aria-label="Board shortcuts"/);
  assert.match(shell, /aria-label="External links and contact"/);
  assert.match(shell, /<header className="site-header" id="top">/);
  assert.match(shell, /<footer id="logoff"/);
  assert.match(styles, /prefers-reduced-motion:\s*reduce/);
  assert.match(styles, /a:focus-visible/);
  assert.match(styles, /outline:\s*3px solid var\(--amber\)/);
  assert.match(styles, /@media \(max-width: 720px\)/);
  assert.match(styles, /min-width:\s*320px/);
  assert.match(styles, /overflow-x:\s*hidden/);
  assert.match(styles, /min-height:\s*2\.75rem/);
});

test("preserves canonical, social, icon, and attribution metadata", async () => {
  const [layout, noteRoute, socialPreview, readme, vercel] = await Promise.all([
    readFile(new URL("app/layout.tsx", root), "utf8"),
    readFile(new URL("app/notes/[slug]/page.tsx", root), "utf8"),
    readFile(new URL("public/og.png", root)),
    readFile(new URL("README.md", root), "utf8"),
    readFile(new URL("vercel.json", root), "utf8"),
  ]);

  assert.match(layout, /metadataBase: new URL\("https:\/\/awzone\.com"\)/);
  assert.match(layout, /AWzone — Notes and working examples/);
  assert.match(layout, /url: "https:\/\/awzone\.com"/);
  assert.match(layout, /card: "summary_large_image"/);
  assert.match(layout, /url: "\/og\.png"/);
  assert.match(layout, /width: 1200/);
  assert.match(layout, /height: 630/);
  assert.match(layout, /alt: "AWzone BBS welcome screen"/);
  assert.match(layout, /images: \["\/og\.png"\]/);
  assert.match(noteRoute, /url: "\/og\.png"/);
  assert.match(layout, /icon: "\/favicon\.svg"/);
  assert.equal(socialPreview.subarray(1, 4).toString(), "PNG");
  assert.equal(socialPreview.readUInt32BE(16), 1200);
  assert.equal(socialPreview.readUInt32BE(20), 630);
  assert.match(readme, /public bulletin board/);
  assert.match(readme, /system bulletin and main menu/);
  assert.match(readme, /project\s+boards/);
  assert.match(readme, /resources area/);
  assert.equal(JSON.parse(vercel).framework, "nextjs");
});
