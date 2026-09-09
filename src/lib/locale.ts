import type { LocaleCode } from "../i18n";

// English is the default (served at "/", the hreflang x-default). The other
// languages live under a path prefix: /tr, /de, /es, /ja.
export const SUPPORTED: LocaleCode[] = ["en", "tr", "de", "es", "ja"];
const PREFIXED = new Set<string>(SUPPORTED.filter((l) => l !== "en"));

export const SITE_ORIGIN = "https://caffy.app";

/** Locale implied by a pathname's first segment ("en" when there's no prefix). */
export function localeFromPath(pathname: string): LocaleCode {
  const seg = pathname.split("/")[1]?.toLowerCase() ?? "";
  return PREFIXED.has(seg) ? (seg as LocaleCode) : "en";
}

/**
 * The sub-path after any locale prefix, always starting with "/" and never
 * ending in one. This is the canonical *internal* shape ("/blog", "/blog/x");
 * the trailing slash is added back by the URL builders below, so a link and a
 * canonical always agree and Googlebot never has to follow a redirect.
 */
export function pathWithoutLocale(pathname: string): string {
  const loc = localeFromPath(pathname);
  const rest = loc === "en" ? pathname : pathname.slice(`/${loc}`.length);
  const trimmed = rest.replace(/\/+$/, "");
  return trimmed === "" ? "/" : trimmed;
}

/** Build the path for a locale, preserving the current sub-path. */
export function pathForLocale(pathname: string, locale: LocaleCode): string {
  return localePath(pathWithoutLocale(pathname), locale);
}

/**
 * Locale-prefixed path for a known sub-path (for in-app links). Always ends in
 * a slash: the server 301s "/blog" → "/blog/", so a slash-less href makes every
 * crawl of an internal link an extra redirect hop, which is what filled Search
 * Console's "Page with redirect" bucket.
 */
export function localePath(subPath: string, locale: LocaleCode): string {
  const clean = subPath === "/" ? "" : subPath.replace(/\/+$/, "");
  const path = locale === "en" ? clean : `/${locale}${clean}`;
  return `${path}/`.replace(/\/+$/, "/");
}

/** Absolute URL for a locale + sub-path (used for canonical / hreflang). */
export function urlForLocale(subPath: string, locale: LocaleCode): string {
  return `${SITE_ORIGIN}${localePath(subPath, locale)}`;
}
