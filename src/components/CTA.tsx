import { useI18n } from "../i18n";
import { AppStoreBadge, Reveal } from "./ui";

export function CTA() {
  const { t } = useI18n();
  return (
    <section className="pb-24 pt-4 sm:pb-32">
      <div className="container-x">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-b from-[#171719] to-[#0b0b0d] px-8 py-16 text-center text-white sm:px-12 sm:py-20">
            {/* soft warm brand glow — identical in light & dark */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(60% 80% at 50% 0%, rgba(255,102,0,0.22), transparent 60%)",
              }}
            />

            <img
              src="./icons/owl.png"
              alt="Caffy"
              className="mx-auto mb-7 h-20 w-20 rounded-3xl shadow-lift"
            />
            <h2 className="mx-auto max-w-2xl text-balance text-[32px] font-extrabold leading-[1.08] tracking-tighter sm:text-[46px]">
              {t.cta.title}
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-[17px] leading-relaxed text-white/70">
              {t.cta.sub}
            </p>
            <div className="mt-9 flex justify-center">
              <AppStoreBadge label={t.cta.button} onDark />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
