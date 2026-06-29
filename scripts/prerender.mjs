// Pre-render each route to its own static HTML file so crawlers (and direct
// deep links like /privacy) get fully-rendered content with a clean 200 — no
// hash, no JS-only routing. Runs after `vite build`. The app still boots
// normally on the client (createRoot re-renders over it).
import { createServer } from "http";
import { readFile, writeFile, mkdir, copyFile } from "fs/promises";
import { existsSync } from "fs";
import { join, extname } from "path";

const DIST = "dist";
const PORT = 4317;
const ROUTES = ["/", "/privacy", "/support"];
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
};

async function main() {
  const puppeteer = (await import("puppeteer")).default;

  const server = createServer(async (req, res) => {
    let p = decodeURIComponent((req.url || "/").split("?")[0]);
    if (p === "/") p = "/index.html";
    let file = join(DIST, p);
    if (!existsSync(file)) file = join(DIST, "index.html"); // SPA fallback
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
  // Render the English default so the static HTML matches the English <head>
  // meta/canonical (the client still switches to the visitor's language).
  await page.setExtraHTTPHeaders({ "Accept-Language": "en-US,en;q=0.9" });
  await page.evaluateOnNewDocument(() => {
    Object.defineProperty(navigator, "language", { get: () => "en-US" });
    Object.defineProperty(navigator, "languages", { get: () => ["en-US", "en"] });
  });
  await page.setViewport({ width: 1280, height: 900 });

  for (const route of ROUTES) {
    await page.goto(`http://localhost:${PORT}${route}`, { waitUntil: "networkidle0" });
    await page.waitForSelector("#root > *", { timeout: 20000 });

    // Walk the page so every scroll-reveal animation completes — the captured
    // HTML then shows content instead of opacity:0 placeholders.
    await page.evaluate(async () => {
      const h = document.body.scrollHeight;
      for (let y = 0; y <= h; y += 300) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 30));
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

  // 404 fallback for any unknown path → serve the home page (router redirects).
  await copyFile(join(DIST, "index.html"), join(DIST, "404.html"));

  await browser.close();
  server.close();
}

main().catch((err) => {
  // Never fail the build over prerendering — ship the SPA index.html as-is.
  console.warn("⚠ prerender skipped:", err?.message || err);
  process.exit(0);
});
