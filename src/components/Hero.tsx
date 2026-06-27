import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useI18n } from "../i18n";
import { AppStoreBadge, Reveal } from "./ui";
import { PhoneMock, DashboardFallback } from "./PhoneMock";
import { ArrowRight, Heart } from "./icons";

export function Hero() {
  const { t } = useI18n();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const phoneY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -50]);

  return (
    <section id="top" ref={ref} className="relative overflow-hidden pt-28 sm:pt-32">
      <div className="bg-grid pointer-events-none absolute inset-0 -z-10" />
      {/* soft warm glow, not a gradient blob hero */}
      <div className="pointer-events-none absolute -top-24 right-[-10%] -z-10 h-[520px] w-[520px] rounded-full bg-accent/10 blur-[120px]" />

      <div className="container-x grid items-center gap-12 pb-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6 lg:pb-24">
        {/* Copy */}
        <div className="max-w-xl">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-paper-line bg-paper-surface px-3.5 py-1.5 text-[12.5px] font-semibold text-ink-soft dark:border-night-line dark:bg-night-surface dark:text-white/70">
              <span className="h-2 w-2 rounded-full bg-caffeine-green" />
              {t.hero.badge}
            </span>
          </Reveal>

          <h1 className="mt-6 text-balance text-[40px] font-extrabold leading-[1.02] tracking-tightest sm:text-[56px] lg:text-[64px]">
            <Reveal y={24}>
              <span className="block">{t.hero.titleA}</span>
            </Reveal>
            <Reveal y={24} delay={0.08}>
              <span className="block">
                <span className="relative whitespace-nowrap text-accent">
                  {t.hero.titleAccent}
                  <svg
                    className="absolute -bottom-1 left-0 h-[0.5em] w-full text-accent/30"
                    viewBox="0 0 200 12"
                    preserveAspectRatio="none"
                    fill="none"
                  >
                    <path
                      d="M2 9C40 3 160 3 198 7"
                      stroke="currentColor"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>{" "}
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
              <a href="#calculator" className="btn-ghost">
                {t.hero.secondary}
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.34}>
            <div className="mt-7 flex items-center gap-2 text-[13.5px] text-faint">
              <Heart className="h-4 w-4 text-caffeine-red" />
              {t.hero.rating}
            </div>
          </Reveal>
        </div>

        {/* Phone */}
        <div className="relative mx-auto w-full max-w-[300px] sm:max-w-[340px] lg:max-w-none lg:justify-self-end lg:[max-width:380px]">
          <motion.div
            style={{ y: phoneY }}
            initial={reduce ? false : { opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="relative"
          >
            {/* soft floor shadow */}
            <div className="pointer-events-none absolute -bottom-6 left-1/2 h-10 w-3/4 -translate-x-1/2 rounded-[50%] bg-black/20 blur-2xl" />
            <PhoneMock src="./screens/dashboard.jpg" alt="Caffy dashboard">
              <DashboardFallback />
            </PhoneMock>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
