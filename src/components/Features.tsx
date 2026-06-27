import { useI18n } from "../i18n";
import { Reveal } from "./ui";
import { Activity, Bed, Leaf, Sparkle, Widget } from "./icons";
import {
  RealtimeVisual,
  SleepVisual,
  DetoxVisual,
  InsightsVisual,
  WidgetsVisual,
} from "./FeatureVisuals";

export function Features() {
  const { t } = useI18n();
  const f = t.features.items;

  const rows = [
    { key: "realtime", icon: Activity, title: f.realtime.title, body: f.realtime.body, visual: <RealtimeVisual />, id: undefined },
    { key: "sleep", icon: Bed, title: f.sleep.title, body: f.sleep.body, visual: <SleepVisual />, id: "sleep" },
    { key: "detox", icon: Leaf, title: f.detox.title, body: f.detox.body, visual: <DetoxVisual />, id: undefined },
    { key: "insights", icon: Sparkle, title: f.insights.title, body: f.insights.body, visual: <InsightsVisual />, id: undefined },
    { key: "widgets", icon: Widget, title: f.widgets.title, body: f.widgets.body, visual: <WidgetsVisual />, id: undefined },
  ];

  return (
    <section id="features" className="scroll-mt-20 py-20 sm:py-28">
      <div className="container-x">
        <div className="max-w-2xl">
          <Reveal>
            <span className="eyebrow">{t.features.eyebrow}</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 text-3xl font-bold leading-[1.08] tracking-tighter sm:text-4xl md:text-[44px]">
              {t.features.title}
            </h2>
          </Reveal>
        </div>

        <div className="mt-16 space-y-20 sm:space-y-28">
          {rows.map((row, i) => {
            const Icon = row.icon;
            const flip = i % 2 === 1;
            return (
              <div
                key={row.key}
                id={row.id}
                className="grid items-center gap-8 scroll-mt-24 lg:grid-cols-2 lg:gap-16"
              >
                <Reveal
                  className={flip ? "lg:order-2" : ""}
                  y={24}
                >
                  <div className="max-w-md">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                      <Icon className="h-[22px] w-[22px]" />
                    </span>
                    <h3 className="mt-5 text-[26px] font-bold leading-tight tracking-tight sm:text-[30px]">
                      {row.title}
                    </h3>
                    <p className="mt-4 text-[16.5px] leading-relaxed text-muted">
                      {row.body}
                    </p>
                  </div>
                </Reveal>

                <Reveal
                  className={flip ? "lg:order-1" : ""}
                  delay={0.08}
                  y={28}
                >
                  {row.visual}
                </Reveal>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
