import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useI18n, type LocaleCode } from "../i18n";
import { SUPPORTED, pathWithoutLocale, urlForLocale } from "../lib/locale";
import { getPost } from "../blog/posts";

const BLOG_INDEX: Record<LocaleCode, { title: string; description: string }> = {
  en: { title: "Caffeine, Sleep & Science — Caffy Blog", description: "Short, source-backed guides on how caffeine really works and how to protect your sleep." },
  tr: { title: "Kafein, Uyku ve Bilim — Caffy Blog", description: "Kafeinin gerçekte nasıl çalıştığına ve uykunu nasıl koruyacağına dair kısa, kaynaklı rehberler." },
  de: { title: "Koffein, Schlaf & Wissenschaft — Caffy-Blog", description: "Kurze, quellenbasierte Guides, wie Koffein wirklich wirkt und wie du deinen Schlaf schützt." },
  es: { title: "Cafeína, Sueño y Ciencia — Blog de Caffy", description: "Guías breves y con fuentes sobre cómo funciona la cafeína y cómo proteger tu sueño." },
  ja: { title: "カフェイン・睡眠・科学 — Caffy ブログ", description: "カフェインの仕組みと睡眠の守り方を、出典付きで手短に。" },
};

const OG_LOCALE: Record<LocaleCode, string> = {
  en: "en_US",
  tr: "tr_TR",
  de: "de_DE",
  es: "es_ES",
  ja: "ja_JP",
};

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertLink(rel: string, href: string, hreflang?: string) {
  const sel = hreflang
    ? `link[rel="${rel}"][hreflang="${hreflang}"]`
    : `link[rel="${rel}"]:not([hreflang])`;
  let el = document.head.querySelector<HTMLLinkElement>(sel);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    if (hreflang) el.setAttribute("hreflang", hreflang);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

/**
 * Sets a localized <head> for the current language + route so Google indexes a
 * localized page per URL and shows a native-language title/snippet. Rendered
 * during prerender too, so each static HTML file carries its own tags.
 */
export function Seo() {
  const { code, t } = useI18n();
  const { pathname } = useLocation();
  const sub = pathWithoutLocale(pathname);

  let title = t.seo.title;
  let description = t.seo.description;
  if (sub === "/blog") {
    title = BLOG_INDEX[code].title;
    description = BLOG_INDEX[code].description;
  } else if (sub.startsWith("/blog/")) {
    const post = getPost(code, sub.slice("/blog/".length).replace(/\/$/, ""));
    if (post) {
      title = `${post.title} · Caffy`;
      description = post.excerpt;
    }
  } else if (sub.startsWith("/privacy")) {
    title = `${t.privacy.title} · Caffy`;
  } else if (sub.startsWith("/support")) {
    title = `${t.support.title} · Caffy`;
  }

  useEffect(() => {
    document.title = title;
    document.documentElement.lang = code;
    upsertMeta("name", "description", description);
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:locale", OG_LOCALE[code]);
    upsertMeta("property", "og:url", urlForLocale(sub, code));
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);
    upsertLink("canonical", urlForLocale(sub, code));
    for (const l of SUPPORTED) upsertLink("alternate", urlForLocale(sub, l), l);
    upsertLink("alternate", urlForLocale(sub, "en"), "x-default");
  }, [title, description, code, sub]);

  return null;
}
