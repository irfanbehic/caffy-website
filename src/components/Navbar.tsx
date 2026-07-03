import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useI18n, localeList, type LocaleCode } from "../i18n";
import { useTheme } from "../lib/theme";
import { Sun, Moon, Globe, Menu, Close, ChevronDown } from "./icons";
import { APP_STORE_URL, useSectionNav } from "./ui";

function useScrolled(threshold = 12) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}

function LanguageMenu() {
  const { code, setLocale, t } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);
  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 rounded-full p-2 text-ink-soft transition-colors hover:bg-black/5 dark:text-white/70 dark:hover:bg-white/10"
        aria-label="Change language"
      >
        <Globe className="h-[18px] w-[18px]" />
        <span className="text-[13px] font-semibold uppercase">{code}</span>
        <ChevronDown className="h-3.5 w-3.5" />
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: 6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.97 }}
            transition={{ duration: 0.16 }}
            className="surface-card absolute right-0 z-50 mt-2 w-44 overflow-hidden p-1.5"
          >
            {localeList.map((l) => (
              <li key={l.code}>
                <button
                  onClick={() => {
                    setLocale(l.code as LocaleCode);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-[14px] transition-colors hover:bg-black/5 dark:hover:bg-white/10 ${
                    code === l.code ? "font-semibold text-accent" : ""
                  }`}
                >
                  <span className="text-base">{l.flag}</span>
                  {l.name}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
      <span className="sr-only">{t.nav.download}</span>
    </div>
  );
}

function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="relative h-9 w-9 overflow-hidden rounded-full text-ink-soft transition-colors hover:bg-black/5 dark:text-white/70 dark:hover:bg-white/10"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ y: 14, opacity: 0, rotate: -30 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: -14, opacity: 0, rotate: 30 }}
          transition={{ duration: 0.22 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {theme === "dark" ? (
            <Sun className="h-[18px] w-[18px]" />
          ) : (
            <Moon className="h-[18px] w-[18px]" />
          )}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

export function Navbar() {
  const { t } = useI18n();
  const scrolled = useScrolled();
  const [mobile, setMobile] = useState(false);
  const goTo = useSectionNav();

  const links = [
    { id: "features", label: t.nav.features },
    { id: "calculator", label: t.nav.calculator },
    { id: "sleep", label: t.nav.sleep },
    { id: "faq", label: t.nav.faq },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "border-b border-paper-line/80 bg-paper/95 dark:border-night-line/80 dark:bg-night/90 lg:bg-paper/80 lg:dark:bg-night/70 lg:backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="container-x flex h-16 items-center justify-between">
        <button onClick={() => goTo("top")} className="flex items-center gap-2.5">
          <img src="/icons/owl.png" alt="Caffy" className="h-9 w-9 rounded-[10px]" />
          <span className="text-[19px] font-bold tracking-tight">Caffy</span>
        </button>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => goTo(l.id)}
              className="rounded-full px-3.5 py-2 text-[14px] font-medium text-ink-soft transition-colors hover:text-ink dark:text-white/65 dark:hover:text-white"
            >
              {l.label}
            </button>
          ))}
          <Link
            to="/blog"
            className="rounded-full px-3.5 py-2 text-[14px] font-medium text-ink-soft transition-colors hover:text-ink dark:text-white/65 dark:hover:text-white"
          >
            Blog
          </Link>
        </div>

        <div className="flex items-center gap-1.5">
          <LanguageMenu />
          <ThemeToggle />
          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noreferrer"
            className="btn-primary ml-1 hidden !h-10 !rounded-xl !px-4 text-[14px] sm:inline-flex"
          >
            {t.nav.download}
          </a>
          <button
            className="ml-1 rounded-full p-2 md:hidden"
            onClick={() => setMobile((m) => !m)}
            aria-label="Menu"
          >
            {mobile ? <Close /> : <Menu />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobile && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-paper-line bg-paper md:hidden dark:border-night-line dark:bg-night"
          >
            <div className="container-x flex flex-col gap-1 py-4">
              {links.map((l) => (
                <button
                  key={l.id}
                  onClick={() => {
                    setMobile(false);
                    goTo(l.id);
                  }}
                  className="rounded-xl px-3 py-3 text-left text-[15px] font-medium hover:bg-black/5 dark:hover:bg-white/5"
                >
                  {l.label}
                </button>
              ))}
              <Link
                to="/blog"
                onClick={() => setMobile(false)}
                className="rounded-xl px-3 py-3 text-left text-[15px] font-medium hover:bg-black/5 dark:hover:bg-white/5"
              >
                Blog
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
