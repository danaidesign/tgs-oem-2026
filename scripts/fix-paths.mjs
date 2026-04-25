/**
 * Post-build script: rewrite absolute paths in Next.js static export
 * so HTML files work when opened directly from the filesystem (file://)
 * or served from any subdirectory without a base path.
 *
 * Transforms performed on every .html file inside out/:
 *   /_next/         →  relative path to _next/   (assets, fonts, JS, CSS)
 *   /favicon.ico    →  relative path to favicon.ico
 *   /logo-white.png →  relative path to logo-white.png
 *
 * Navigation links (/en/home/, /th/login/, etc.) are left unchanged —
 * Next.js client-side router handles them at runtime.
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from "fs";
import { join, relative, dirname } from "path";

const OUT_DIR = "out";

/* ── helpers ──────────────────────────────────────────────── */

/** Walk a directory and return all files matching a predicate. */
function* walk(dir) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) yield* walk(full);
    else yield full;
  }
}

/** Number of path segments from `out/` to the file's directory. */
function depth(filePath) {
  const rel = relative(OUT_DIR, dirname(filePath));
  return rel === "" ? 0 : rel.split(/[\\/]/).length;
}

/** Build a relative prefix: e.g. depth 2 → "../../" */
function prefix(d) {
  return d === 0 ? "./" : "../".repeat(d);
}

/* ── process each HTML file ───────────────────────────────── */

let fileCount = 0;

for (const file of walk(OUT_DIR)) {
  if (!file.endsWith(".html")) continue;

  const d    = depth(file);
  const pfx  = prefix(d);
  let   html = readFileSync(file, "utf8");

  // /_next/ → relative _next/
  html = html.replaceAll('="/_next/', `="${pfx}_next/`);
  html = html.replaceAll("='/_next/", `='${pfx}_next/`);

  // url(/_next/...) inside inline styles / preload tags
  html = html.replaceAll("url(/_next/", `url(${pfx}_next/`);

  // /favicon.ico, /logo-white.png and other root-level static assets
  // (match only exact root-level public files, not /en/, /th/, etc.)
  const rootAssets = ["favicon.ico", "logo-white.png", "next.svg", "vercel.svg"];
  for (const asset of rootAssets) {
    html = html.replaceAll(`="/${asset}`, `="${pfx}${asset}`);
    html = html.replaceAll(`='/${asset}`, `='${pfx}${asset}`);
  }

  writeFileSync(file, html, "utf8");
  fileCount++;
}

console.log(`✓ Fixed paths in ${fileCount} HTML file${fileCount !== 1 ? "s" : ""} (prefix depth: relative)`);
