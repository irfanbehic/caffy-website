import type { ReactNode } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { useI18n, type LocaleCode } from "../i18n";
import { localePath } from "../lib/locale";
import { Reveal, AppStoreBadge } from "../components/ui";
import { ArrowRight } from "../components/icons";
import { getPosts, getPost, BlogArt, type Block } from "../blog/posts";

const CHROME: Record<LocaleCode, { eyebrow: string; title: string; sub: string; min: string; blog: string; sources: string; related: string }> = {
  en: { eyebrow: "The Caffy Blog", title: "Caffeine, sleep & science", sub: "Short, source-backed guides on how caffeine really works, and how to get its upside without wrecking your sleep.", min: "min read", blog: "Blog", sources: "Sources", related: "Related reading" },
  tr: { eyebrow: "Caffy Blog", title: "Kafein, uyku ve bilim", sub: "Kafeinin gerçekte nasıl çalıştığına dair kısa, kaynaklı rehberler; uykunu bozmadan faydasını almanın yolları.", min: "dk okuma", blog: "Blog", sources: "Kaynaklar", related: "İlgili yazılar" },
  de: { eyebrow: "Der Caffy-Blog", title: "Koffein, Schlaf & Wissenschaft", sub: "Kurze, quellenbasierte Guides, wie Koffein wirklich wirkt und wie du seinen Vorteil ohne Schlafverlust nutzt.", min: "Min. Lesezeit", blog: "Blog", sources: "Quellen", related: "Ähnliche Artikel" },
  es: { eyebrow: "El blog de Caffy", title: "Cafeína, sueño y ciencia", sub: "Guías breves y con fuentes sobre cómo funciona la cafeína y cómo aprovecharla sin arruinar tu sueño.", min: "min de lectura", blog: "Blog", sources: "Fuentes", related: "Lecturas relacionadas" },
  ja: { eyebrow: "Caffy ブログ", title: "カフェイン・睡眠・科学", sub: "カフェインの仕組みを出典付きで手短に。睡眠を犠牲にせず良さを活かすために。", min: "分で読める", blog: "ブログ", sources: "出典", related: "関連記事" },
};

const LOCALE_TAG: Record<LocaleCode, string> = { en: "en-US", tr: "tr-TR", de: "de-DE", es: "es-ES", ja: "ja-JP" };

const fmtDate = (iso: string, code: LocaleCode) =>
  new Date(iso).toLocaleDateString(LOCALE_TAG[code], { year: "numeric", month: "long", day: "numeric" });

/** Renders **bold** markup within a plain string. */
function fmt(s: string): ReactNode {
  return s.split(/\*\*(.+?)\*\*/g).map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="font-semibold text-ink dark:text-white">{part}</strong>
    ) : (
      part
    )
  );
}

// ── Blog index ──────────────────────────────────────────────────────────────
export function BlogIndex() {
  const { code } = useI18n();
  const c = CHROME[code];
  const posts = getPosts(code);
  return (
    <main className="pt-28 sm:pt-32">
      <div className="container-x pb-24">
        <Reveal>
          <p className="eyebrow">{c.eyebrow}</p>
          <h1 className="mt-3 text-4xl font-extrabold leading-[1.05] tracking-tightest sm:text-5xl">
            {c.title}
          </h1>
          <p className="mt-4 max-w-xl text-[17px] leading-relaxed text-muted">{c.sub}</p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {posts.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.04}>
              <Link
                to={localePath(`/blog/${p.slug}`, code)}
                className="group block h-full overflow-hidden rounded-3xl border border-paper-line bg-paper-surface transition-all hover:-translate-y-1 hover:border-accent/40 dark:border-night-line dark:bg-night-surface"
              >
                <BlogArt kind={p.cover} className="aspect-[2/1] rounded-none border-0" />
                <div className="p-6">
                  <p className="text-[12.5px] font-medium text-faint">
                    {fmtDate(p.date, code)} · {p.readMins} {c.min}
                  </p>
                  <h2 className="mt-2 text-[20px] font-bold leading-snug tracking-tight group-hover:text-accent">
                    {p.title}
                  </h2>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-muted">{p.excerpt}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </main>
  );
}

// ── Single article ──────────────────────────────────────────────────────────
function renderBlock(block: Block, i: number) {
  switch (block.t) {
    case "h2":
      return <h2 key={i} className="mt-10 text-[23px] font-bold tracking-tight sm:text-[26px]">{block.s}</h2>;
    case "p":
      return <p key={i} className="mt-4 text-[16.5px] leading-relaxed text-muted">{fmt(block.s)}</p>;
    case "ul":
      return (
        <ul key={i} className="mt-4 space-y-2.5">
          {block.items.map((it, j) => (
            <li key={j} className="flex gap-3 text-[16px] leading-relaxed text-muted">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              <span>{fmt(it)}</span>
            </li>
          ))}
        </ul>
      );
    case "art":
      return (
        <figure key={i} className="my-8">
          <BlogArt kind={block.kind} className="aspect-[2/1]" />
          {block.caption && <figcaption className="mt-2 text-center text-[13px] text-faint">{block.caption}</figcaption>}
        </figure>
      );
    case "callout":
      return (
        <div key={i} className="my-8 rounded-2xl border border-accent/25 bg-accent/[0.06] p-5 text-[16px] leading-relaxed text-ink dark:text-white">
          {fmt(block.s)}
        </div>
      );
  }
}

export function BlogPost() {
  const { slug } = useParams();
  const { t, code } = useI18n();
  const c = CHROME[code];
  const post = slug ? getPost(code, slug) : undefined;
  if (!post) return <Navigate to={localePath("/blog", code)} replace />;

  // Related posts by shared tag (most overlap first, then newest). Interlinks the
  // blog into a topical graph so crawlers discover new posts and topical authority flows.
  const related = getPosts(code)
    .filter((p) => p.slug !== post.slug && p.tags.some((t) => post.tags.includes(t)))
    .map((p) => ({ p, shared: p.tags.filter((t) => post.tags.includes(t)).length }))
    .sort((a, b) => b.shared - a.shared || b.p.date.localeCompare(a.p.date))
    .slice(0, 3)
    .map((x) => x.p);

  const url = `https://caffy.app${localePath(`/blog/${post.slug}`, code)}/`.replace(/\/+$/, "/");
  const ld = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: code,
    author: { "@type": "Organization", name: "Caffy" },
    publisher: { "@type": "Organization", name: "Caffy", logo: { "@type": "ImageObject", url: "https://caffy.app/icons/owl.png" } },
    mainEntityOfPage: url,
  };

  return (
    <main className="pt-28 sm:pt-32">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <div className="container-x max-w-2xl pb-24">
        <Reveal>
          <Link
            to={localePath("/blog", code)}
            className="inline-flex items-center gap-1.5 text-[14px] font-medium text-faint hover:text-accent"
          >
            <ArrowRight className="h-4 w-4 rotate-180" /> {c.blog}
          </Link>
          <p className="mt-6 text-[13px] font-medium text-faint">
            {fmtDate(post.date, code)} · {post.readMins} {c.min}
          </p>
          <h1 className="mt-2 text-[32px] font-extrabold leading-[1.1] tracking-tightest sm:text-[40px]">
            {post.title}
          </h1>
        </Reveal>

        <Reveal delay={0.05}>
          <BlogArt kind={post.cover} className="mt-8 aspect-[2/1]" />
        </Reveal>

        <article className="mt-2">{post.body.map(renderBlock)}</article>

        <div className="mt-12 border-t border-paper-line pt-6 dark:border-night-line">
          <p className="text-[12px] font-semibold uppercase tracking-wider text-faint">{c.sources}</p>
          <ul className="mt-3 space-y-1.5">
            {post.sources.map((s) => (
              <li key={s.url}>
                <a href={s.url} target="_blank" rel="noreferrer" className="text-[14px] text-muted underline decoration-paper-line underline-offset-4 hover:text-accent">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {related.length > 0 && (
          <div className="mt-12">
            <p className="text-[12px] font-semibold uppercase tracking-wider text-faint">{c.related}</p>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  to={localePath(`/blog/${r.slug}`, code)}
                  className="group block overflow-hidden rounded-2xl border border-paper-line bg-paper-surface transition-all hover:-translate-y-0.5 hover:border-accent/40 dark:border-night-line dark:bg-night-surface"
                >
                  <BlogArt kind={r.cover} className="aspect-[2/1] rounded-none border-0" />
                  <div className="p-4">
                    <h3 className="text-[15px] font-bold leading-snug tracking-tight group-hover:text-accent">{r.title}</h3>
                    <p className="mt-1.5 text-[12px] font-medium text-faint">{r.readMins} {c.min}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="mt-12 rounded-3xl border border-paper-line bg-paper-surface p-7 text-center dark:border-night-line dark:bg-night-surface">
          <h3 className="text-[20px] font-bold tracking-tight">{t.cta.title}</h3>
          <p className="mx-auto mt-2 max-w-md text-[15px] text-muted">{t.cta.sub}</p>
          <div className="mt-5 flex justify-center">
            <AppStoreBadge label={t.hero.primary} />
          </div>
        </div>
      </div>
    </main>
  );
}
