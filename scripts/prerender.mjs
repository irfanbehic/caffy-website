// Pre-render every route (all languages) to its own static HTML file so crawlers
// and direct deep links get fully-rendered, localized content with a clean 200.
// Language comes from the URL (/, /tr, /de, /es, /ja), so each file carries its
// own localized <title>/<meta>/hreflang. Also writes a hreflang sitemap.
// Runs after `vite build`. The app still boots normally on the client.
import { createServer } from "http";
import { readFile, writeFile, mkdir, copyFile } from "fs/promises";
import { existsSync, statSync } from "fs";
import { join, extname } from "path";

const DIST = "dist";
const PORT = 4317;
const ORIGIN = "https://caffy.app";

const LANGS = ["en", "tr", "de", "es", "ja"];
const PAGES = ["/", "/privacy", "/support"];
// Blog is English-only (single set of URLs). Keep slugs in sync with src/blog/posts.tsx.
const BLOG_SLUGS = [
  "how-long-does-caffeine-stay-in-your-body",
  "what-time-to-stop-drinking-coffee-for-sleep",
  "how-much-caffeine-in-coffee-tea-energy-drinks",
  "safe-daily-caffeine-limit-how-much-is-too-much",
  "how-to-cut-back-on-caffeine-without-headaches",
];
const BLOG_ROUTES = ["/blog", ...BLOG_SLUGS.map((s) => `/blog/${s}`)];
// en is served at the root; the others under a path prefix.
const routePath = (lang, page) =>
  lang === "en" ? page : `/${lang}${page === "/" ? "" : page}`;
const absUrl = (lang, page) => `${ORIGIN}${routePath(lang, page)}/`.replace(/\/+$/, "/");

const TYPES = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".webmanifest": "application/manifest+json",
  ".xml": "application/xml",
  ".txt": "text/plain",
  ".webp": "image/webp",
};

function sitemap() {
  const alt = (page) =>
    [...LANGS.map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${absUrl(l, page)}"/>`),
     `    <xhtml:link rel="alternate" hreflang="x-default" href="${absUrl("en", page)}"/>`].join("\n");
  const urls = PAGES.flatMap((page) =>
    LANGS.map((l) => `  <url>\n    <loc>${absUrl(l, page)}</loc>\n${alt(page)}\n  </url>`)
  ).join("\n");
  const blog = BLOG_ROUTES.map(
    (r) => `  <url>\n    <loc>${ORIGIN}${r}/</loc>\n  </url>`
  ).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls}\n${blog}\n</urlset>\n`;
}

async function main() {
  const puppeteer = (await import("puppeteer")).default;

  const server = createServer(async (req, res) => {
    const p = decodeURIComponent((req.url || "/").split("?")[0]);
    // Asset requests have a file extension; SPA routes don't → serve index.html.
    let file = join(DIST, p);
    const isAsset = !!extname(p);
    if (!isAsset || !existsSync(file) || statSync(file).isDirectory()) {
      file = join(DIST, "index.html");
    }
    try {
      const buf = await readFile(file);
      res.setHeader("Content-Type", TYPES[extname(file)] || "application/octet-stream");
      res.end(buf);
    } catch {
      res.statusCode = 404;
      res.end("404");
    }
  });
  await new Promise((r) => server.listen(PORT, r));

  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });

  const routes = [
    ...LANGS.flatMap((lang) => PAGES.map((pg) => routePath(lang, pg))),
    ...BLOG_ROUTES,
  ];
  for (const route of routes) {
    await page.goto(`http://localhost:${PORT}${route}`, { waitUntil: "networkidle0" });
    await page.waitForSelector("#root > *", { timeout: 20000 });

    // Walk the page so scroll-reveal content is present, then let the SEO
    // effect settle so the captured <head> is localized for this URL.
    await page.evaluate(async () => {
      const h = document.body.scrollHeight;
      for (let y = 0; y <= h; y += 300) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 25));
      }
      window.scrollTo(0, 0);
      await new Promise((r) => setTimeout(r, 400));
    });

    const html = await page.content();
    const outDir = route === "/" ? DIST : join(DIST, route);
    if (outDir !== DIST) await mkdir(outDir, { recursive: true });
    await writeFile(join(outDir, "index.html"), html);
    console.log(`✓ prerendered ${route}`);
  }

  await writeFile(join(DIST, "sitemap.xml"), sitemap());
  console.log("✓ sitemap.xml");

  // 404 fallback → the English home page (router redirects unknown paths).
  await copyFile(join(DIST, "index.html"), join(DIST, "404.html"));

  await browser.close();
  server.close();
}

main().catch((err) => {
  console.warn("⚠ prerender skipped:", err?.message || err);
  process.exit(0);
});
