import { useI18n } from "../i18n";
import { Reveal } from "./ui";

export function Science() {
  const { t } = useI18n();
  const s = t.science;
  const stats = [
    { label: s.stats.halflife, value: s.stats.halflifeVal },
    { label: s.stats.absorption, value: s.stats.absorptionVal },
    { label: s.stats.safe, value: s.stats.safeVal },
  ];

  return (
    <section className="py-20 sm:py-28">
      <div className="container-x">
        <div className="surface-card relative overflow-hidden p-8 sm:p-12">
          {/* faint formula watermark */}
          <div className="pointer-events-none absolute right-6 top-6 hidden select-none font-mono text-[13px] text-faint/50 sm:block">
            {s.formula}
          </div>

          <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
            <div>
              <Reveal>
                <span className="eyebrow">{s.eyebrow}</span>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-4 max-w-md text-3xl font-bold leading-[1.1] tracking-tighter sm:text-[38px]">
                  {s.title}
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-5 max-w-lg text-[16.5px] leading-relaxed text-muted">
                  {s.body}
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <div className="mt-6 inline-flex items-center gap-2 rounded-xl border border-paper-line bg-paper-card px-4 py-2.5 font-mono text-[14px] dark:border-night-line dark:bg-night-card">
                  <span className="h-2 w-2 rounded-full bg-accent" />
                  {s.formula}
                </div>
              </Reveal>
            </div>

            <div className="flex flex-col justify-center gap-4">
              {stats.map((st, i) => (
                <Reveal key={st.label} delay={0.1 + i * 0.07}>
                  <div className="flex items-baseline justify-between border-b border-paper-line pb-4 dark:border-night-line">
                    <span className="text-[14px] text-muted">{st.label}</span>
                    <span className="text-[22px] font-bold tracking-tight">{st.value}</span>
                  </div>
                </Reveal>
              ))}
              <Reveal delay={0.32}>
                <p className="text-[12.5px] text-faint">{s.sources}</p>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
