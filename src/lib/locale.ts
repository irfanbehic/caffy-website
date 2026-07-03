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

/** The sub-path after any locale prefix, always starting with "/". */
export function pathWithoutLocale(pathname: string): string {
  const loc = localeFromPath(pathname);
  if (loc === "en") return pathname || "/";
  const rest = pathname.slice(`/${loc}`.length);
  return rest === "" ? "/" : rest;
}

/** Build the path for a locale, preserving the current sub-path. */
export function pathForLocale(pathname: string, locale: LocaleCode): string {
  const sub = pathWithoutLocale(pathname);
  const clean = sub === "/" ? "" : sub;
  return locale === "en" ? clean || "/" : `/${locale}${clean}`;
}

/** Locale-prefixed path for a known sub-path (for in-app links). */
export function localePath(subPath: string, locale: LocaleCode): string {
  const clean = subPath === "/" ? "" : subPath;
  return locale === "en" ? clean || "/" : `/${locale}${clean}`;
}

/** Absolute URL for a locale + sub-path (used for canonical / hreflang). */
export function urlForLocale(subPath: string, locale: LocaleCode): string {
  const clean = subPath === "/" ? "" : subPath;
  const path = locale === "en" ? clean : `/${locale}${clean}`;
  return `${SITE_ORIGIN}${path}/`.replace(/\/+$/, "/");
}
