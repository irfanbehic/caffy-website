import { useI18n } from "../i18n";
import { AppStoreBadge, Reveal, useSectionNav } from "./ui";
import { PhoneMock, DashboardFallback } from "./PhoneMock";
import { ArrowRight } from "./icons";

export function Hero() {
  const { t } = useI18n();
  const goTo = useSectionNav();

  return (
    <section
      id="top"
      className="relative flex flex-col overflow-hidden pb-14 pt-24 sm:pt-28 lg:min-h-[100svh] lg:justify-center lg:pb-16 lg:pt-20"
    >
      <div className="bg-grid pointer-events-none absolute inset-0 -z-10" />
      {/* soft warm glow, not a gradient blob hero */}
      <div className="pointer-events-none absolute -top-24 right-[-10%] -z-10 h-[520px] w-[520px] rounded-full bg-accent/10 blur-[120px]" />

      <div className="container-x grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6">
        {/* Copy */}
        <div className="max-w-xl">
          <h1 className="text-balance text-[40px] font-extrabold leading-[1.02] tracking-tightest sm:text-[56px] lg:text-[64px]">
            <Reveal y={24}>
              <span className="block">{t.hero.titleA}</span>
            </Reveal>
            <Reveal y={24} delay={0.08}>
              <span className="block">
                <span className="text-accent">{t.hero.titleAccent}</span>{" "}
                {t.hero.titleB}
              </span>
            </Reveal>
          </h1>

          <Reveal delay={0.18}>
            <p className="mt-6 max-w-lg text-[17px] leading-relaxed text-muted sm:text-[18px]">
              {t.hero.sub}
            </p>
          </Reveal>

          <Reveal delay={0.26}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <AppStoreBadge label={t.hero.primary} />
              <button
                onClick={() => goTo("calculator")}
                className="btn-ghost h-[52px]"
              >
                {t.hero.secondary}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </Reveal>
        </div>

        {/* Phone — width capped by viewport height on desktop so the whole
            mockup is visible above the fold without scrolling */}
        <div className="relative mx-auto w-full max-w-[260px] sm:max-w-[300px] lg:max-w-none lg:w-[min(330px,37svh)] lg:justify-self-end">
          <div className="relative">
            {/* soft floor shadow */}
            <div className="pointer-events-none absolute -bottom-6 left-1/2 h-10 w-3/4 -translate-x-1/2 rounded-[50%] bg-black/20 blur-2xl" />
            <PhoneMock src="/screens/dashboard.jpg" alt="Caffy dashboard" priority>
              <DashboardFallback />
            </PhoneMock>
          </div>
        </div>
      </div>
    </section>
  );
}
