import { readFileSync, writeFileSync } from "fs";
import { marked } from "marked";
import sanitizeHtml from "sanitize-html";

const md = readFileSync("README.md", "utf8");

// Configure marked (optional tweaks)
marked.setOptions({
  mangle: false,
  headerIds: true
});

const rawHtml = marked.parse(md);
const safeHtml = sanitizeHtml(rawHtml, {
  allowedTags: false, // allow default + GitHub style HTML already in README
  allowedAttributes: false
});

// Basic HTML shell
const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>Hyphonic</title>
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="preconnect" href="https://cdn.simpleicons.org">
<link rel="stylesheet" href="https://unpkg.com/github-markdown-css@5.5.1/github-markdown-light.css">
<style>
  body { display:flex; justify-content:center; padding:20px; background:#f6f8fa; }
  .markdown-body { max-width: 900px; width:100%; }
  img { max-width:100%; }
</style>
</head>
<body>
  <article class="markdown-body">
  ${safeHtml}
  </article>
</body>
</html>`;

writeFileSync("index.html", html);
console.log("Generated index.html");