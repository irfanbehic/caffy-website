import { useI18n } from "../i18n";
import { Reveal } from "./ui";
import { PhoneMock, DashboardFallback } from "./PhoneMock";

export function Gallery() {
  const { t } = useI18n();
  const c = t.gallery.shots;

  const shots = [
    { src: "./screens/metabolism.jpg", caption: c[0] },
    { src: "./screens/sleep.jpg", caption: c[1] },
    { src: "./screens/insights-detox.jpg", caption: c[2] },
    { src: "./screens/insights.jpg", caption: c[3] },
    { src: "./screens/log-week.jpg", caption: c[4] },
  ];

  return (
    <section className="py-20 sm:py-28">
      <div className="container-x">
        <div className="max-w-2xl">
          <Reveal>
            <span className="eyebrow">{t.gallery.eyebrow}</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 text-3xl font-bold leading-[1.08] tracking-tighter sm:text-4xl md:text-[44px]">
              {t.gallery.title}
            </h2>
          </Reveal>
        </div>

        {/* scroll rail aligned with the heading (starts at the container's left) */}
        <div className="mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 sm:gap-7 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {shots.map((s, i) => (
            <Reveal key={s.src} delay={i * 0.06} className="shrink-0 snap-start">
              <div className="w-[265px] sm:w-[300px]">
                <PhoneMock src={s.src} alt={s.caption}>
                  <DashboardFallback />
                </PhoneMock>
                <p className="mt-4 px-1 text-center text-[14px] font-medium text-muted">
                  {s.caption}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
