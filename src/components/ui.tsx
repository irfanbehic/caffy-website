import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { Apple } from "./icons";

export const APP_STORE_URL =
  "https://apps.apple.com/tr/app/caffy-caffeine-sleep/id6763036774";

/** Scroll-triggered reveal: subtle fade + rise, respects reduced motion. */
export function Reveal({
  children,
  delay = 0,
  y = 18,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function AppStoreBadge({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  return (
    <a
      href={APP_STORE_URL}
      target="_blank"
      rel="noreferrer"
      className={`group inline-flex items-center gap-3 rounded-2xl bg-ink px-5 py-3 text-white transition-transform duration-300 hover:-translate-y-0.5 dark:bg-white dark:text-ink ${className}`}
    >
      <Apple className="h-7 w-7" />
      <span className="flex flex-col leading-tight">
        <span className="text-[10px] font-medium opacity-70">
          Download on the
        </span>
        <span className="-mt-0.5 text-[17px] font-semibold tracking-tight">
          App Store
        </span>
      </span>
    </a>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  className = "",
}: {
  eyebrow: string;
  title: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <Reveal>
        <span className="eyebrow">{eyebrow}</span>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="mt-4 max-w-3xl text-balance text-3xl font-bold leading-[1.08] tracking-tighter sm:text-4xl md:text-[44px]">
          {title}
        </h2>
      </Reveal>
    </div>
  );
}
