import { Link, useParams, Navigate } from "react-router-dom";
import { useI18n } from "../i18n";
import { Reveal, AppStoreBadge } from "../components/ui";
import { ArrowRight } from "../components/icons";
import { posts, postBySlug, BlogArt, type Block } from "../blog/posts";

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

// ── Blog index ──────────────────────────────────────────────────────────────
export function BlogIndex() {
  return (
    <main className="pt-28 sm:pt-32">
      <div className="container-x pb-24">
        <Reveal>
          <p className="eyebrow">The Caffy Blog</p>
          <h1 className="mt-3 text-4xl font-extrabold leading-[1.05] tracking-tightest sm:text-5xl">
            Caffeine, sleep & science
          </h1>
          <p className="mt-4 max-w-xl text-[17px] leading-relaxed text-muted">
            Short, source-backed guides on how caffeine really works — and how to
            get its upside without wrecking your sleep.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {posts.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.04}>
              <Link
                to={`/blog/${p.slug}`}
                className="group block h-full overflow-hidden rounded-3xl border border-paper-line bg-paper-surface transition-all hover:-translate-y-1 hover:border-accent/40 dark:border-night-line dark:bg-night-surface"
              >
                <BlogArt kind={p.cover} className="aspect-[2/1] rounded-none border-0" />
                <div className="p-6">
                  <p className="text-[12.5px] font-medium text-faint">
                    {fmtDate(p.date)} · {p.readMins} min read
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
      return (
        <h2 key={i} className="mt-10 text-[23px] font-bold tracking-tight sm:text-[26px]">
          {block.s}
        </h2>
      );
    case "p":
      return (
        <p key={i} className="mt-4 text-[16.5px] leading-relaxed text-muted">
          {block.s}
        </p>
      );
    case "ul":
      return (
        <ul key={i} className="mt-4 space-y-2.5">
          {block.items.map((it, j) => (
            <li key={j} className="flex gap-3 text-[16px] leading-relaxed text-muted">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              <span>{it}</span>
            </li>
          ))}
        </ul>
      );
    case "art":
      return (
        <figure key={i} className="my-8">
          <BlogArt kind={block.kind} className="aspect-[2/1]" />
          {block.caption && (
            <figcaption className="mt-2 text-center text-[13px] text-faint">{block.caption}</figcaption>
          )}
        </figure>
      );
    case "callout":
      return (
        <div key={i} className="my-8 rounded-2xl border border-accent/25 bg-accent/[0.06] p-5 text-[16px] leading-relaxed text-ink dark:text-white">
          {block.s}
        </div>
      );
  }
}

export function BlogPost() {
  const { slug } = useParams();
  const { t } = useI18n();
  const post = slug ? postBySlug(slug) : undefined;
  if (!post) return <Navigate to="/blog" replace />;

  const ld = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Organization", name: "Caffy" },
    publisher: { "@type": "Organization", name: "Caffy", logo: { "@type": "ImageObject", url: "https://caffy.app/icons/owl.png" } },
    mainEntityOfPage: `https://caffy.app/blog/${post.slug}/`,
  };

  return (
    <main className="pt-28 sm:pt-32">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <div className="container-x max-w-2xl pb-24">
        <Reveal>
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-[14px] font-medium text-faint hover:text-accent"
          >
            <ArrowRight className="h-4 w-4 rotate-180" /> Blog
          </Link>
          <p className="mt-6 text-[13px] font-medium text-faint">
            {fmtDate(post.date)} · {post.readMins} min read
          </p>
          <h1 className="mt-2 text-[32px] font-extrabold leading-[1.1] tracking-tightest sm:text-[40px]">
            {post.title}
          </h1>
        </Reveal>

        <Reveal delay={0.05}>
          <BlogArt kind={post.cover} className="mt-8 aspect-[2/1]" />
        </Reveal>

        <article className="mt-2">{post.body.map(renderBlock)}</article>

        {/* Sources */}
        <div className="mt-12 border-t border-paper-line pt-6 dark:border-night-line">
          <p className="text-[12px] font-semibold uppercase tracking-wider text-faint">Sources</p>
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

        {/* CTA */}
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
