import { Link } from "react-router-dom";
import { useI18n } from "../i18n";
import { Reveal } from "../components/ui";
import { ArrowRight } from "../components/icons";

/** Shared layout for the Privacy and Support pages. */
export function Privacy() {
  const { t } = useI18n();
  const p = t.privacy;
  return (
    <Article title={p.title} sub={p.updated} backHome={p.backHome} intro={p.intro}>
      {p.sections.map((s) => (
        <section key={s.h}>
          <h2 className="text-[19px] font-bold tracking-tight">{s.h}</h2>
          <p className="mt-2 text-[15.5px] leading-relaxed text-muted">{s.p}</p>
        </section>
      ))}
    </Article>
  );
}

export function Support() {
  const { t } = useI18n();
  const s = t.support;
  const mailto = `mailto:${s.email}`;
  return (
    <Article title={s.title} backHome={s.backHome} intro={s.intro}>
      <div className="surface-card flex flex-col items-start gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-[18px] font-bold tracking-tight">{s.contactTitle}</h2>
          <p className="mt-1.5 text-[15px] text-muted">{s.contactBody}</p>
        </div>
        <a href={mailto} className="btn-primary shrink-0">
          {s.emailButton}
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>

      <div>
        <h2 className="text-[19px] font-bold tracking-tight">{s.topicsTitle}</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {s.topics.map((topic) => (
            <div
              key={topic.h}
              className="rounded-2xl border border-paper-line p-5 dark:border-night-line"
            >
              <h3 className="text-[15.5px] font-semibold">{topic.h}</h3>
              <p className="mt-2 text-[14.5px] leading-relaxed text-muted">{topic.p}</p>
            </div>
          ))}
        </div>
      </div>
    </Article>
  );
}

function Article({
  title,
  sub,
  intro,
  backHome,
  children,
}: {
  title: string;
  sub?: string;
  intro: string;
  backHome: string;
  children: React.ReactNode;
}) {
  return (
    <main className="pt-28 sm:pt-32">
      <div className="container-x max-w-3xl pb-24">
        <Reveal>
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-[14px] font-medium text-faint hover:text-accent"
          >
            <ArrowRight className="h-4 w-4 rotate-180" />
            {backHome}
          </Link>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="mt-6 text-4xl font-extrabold tracking-tighter sm:text-5xl">
            {title}
          </h1>
        </Reveal>
        {sub && (
          <Reveal delay={0.08}>
            <p className="mt-3 text-[14px] text-faint">{sub}</p>
          </Reveal>
        )}
        <Reveal delay={0.1}>
          <p className="mt-6 text-[17px] leading-relaxed text-muted">{intro}</p>
        </Reveal>
        <Reveal delay={0.12}>
          <div className="mt-10 space-y-8">{children}</div>
        </Reveal>
      </div>
    </main>
  );
}
