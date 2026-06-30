import { motion, useReducedMotion, useInView } from "framer-motion";
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Apple } from "./icons";

// useLayoutEffect warns without a DOM; the site is prerendered in a real
// browser, so fall back to useEffect only when window is unavailable.
const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export const APP_STORE_URL =
  "https://apps.apple.com/tr/app/caffy-caffeine-sleep/id6763036774";

/**
 * Smooth in-page scrolling that also works from the /privacy and /support
 * routes (navigate home first, then scroll). Fixes the broken `#anchor` links
 * that a HashRouter would otherwise swallow.
 */
export function useSectionNav() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  return (id: string) => {
    const go = () => {
      document
        .getElementById(id)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    if (pathname !== "/") {
      navigate("/");
      window.setTimeout(go, 80);
    } else {
      go();
    }
  };
}

/**
 * Flash-free scroll reveal (subtle fade + rise).
 *
 * Starts VISIBLE so the prerendered HTML is never hidden on hydration (no
 * first-load flash / stuck content). Before paint we hide ONLY the sections that
 * are below the fold, so they fade in on scroll while anything already on screen
 * stays put. Cheap GPU opacity/transform — the earlier mobile jank was caused by
 * backdrop-blur, not this.
 */
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
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  const [shown, setShown] = useState(true);

  useIsoLayoutEffect(() => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    if (el.getBoundingClientRect().top > window.innerHeight * 0.9) {
      setShown(false);
    }
  }, [reduce]);

  useEffect(() => {
    if (inView) setShown(true);
  }, [inView]);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={false}
      animate={{ opacity: shown ? 1 : 0, y: shown ? 0 : y }}
      transition={{
        duration: shown ? 0.6 : 0,
        delay: shown ? delay : 0,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

export function AppStoreBadge({
  label,
  className = "",
  onDark = false,
}: {
  label: string;
  className?: string;
  /** force the white badge regardless of theme (for use on dark cards) */
  onDark?: boolean;
}) {
  const colors = onDark
    ? "bg-white text-ink"
    : "bg-ink text-white dark:bg-white dark:text-ink";
  return (
    <a
      href={APP_STORE_URL}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className={`group inline-flex h-[52px] items-center gap-2.5 rounded-2xl px-5 transition-transform duration-300 hover:-translate-y-0.5 ${colors} ${className}`}
    >
      <Apple className="h-6 w-6" />
      <span className="flex flex-col leading-none">
        <span className="text-[10px] font-medium opacity-70">
          Download on the
        </span>
        <span className="mt-0.5 text-[16px] font-semibold tracking-tight">
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
