import type { ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Apple } from "./icons";

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
 * Renders children directly — always visible.
 *
 * This used to be a scroll/`whileInView` reveal, but hiding each section with
 * `opacity:0` until JS animated it in fought the prerendered HTML: on mobile,
 * where the bundle parses slowly, the whole page stayed invisible until JS
 * loaded (slow first paint, late phone mockup, empty sections on scroll).
 * Content is now shown immediately from the static HTML. `delay`/`y` are kept
 * for call-site compatibility.
 */
export function Reveal({
  children,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
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
