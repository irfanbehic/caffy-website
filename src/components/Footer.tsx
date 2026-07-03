import { Link } from "react-router-dom";
import { useI18n } from "../i18n";
import { localePath } from "../lib/locale";
import { APP_STORE_URL, useSectionNav } from "./ui";

export function Footer() {
  const { t, code } = useI18n();
  const goTo = useSectionNav();
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-paper-line dark:border-night-line">
      <div className="container-x py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <img
                src="/icons/owl.png"
                alt="Caffy"
                className="h-9 w-9 rounded-[10px]"
              />
              <span className="text-[19px] font-bold tracking-tight">Caffy</span>
            </div>
            <p className="mt-4 max-w-xs text-[14px] leading-relaxed text-muted">
              {t.footer.tagline}
            </p>
          </div>

          <div>
            <p className="text-[13px] font-semibold uppercase tracking-wider text-faint">
              {t.footer.product}
            </p>
            <ul className="mt-4 space-y-2.5 text-[14px]">
              <li>
                <button onClick={() => goTo("features")} className="text-muted hover:text-accent">
                  {t.nav.features}
                </button>
              </li>
              <li>
                <button onClick={() => goTo("calculator")} className="text-muted hover:text-accent">
                  {t.nav.calculator}
                </button>
              </li>
              <li>
                <a
                  href={APP_STORE_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted hover:text-accent"
                >
                  {t.nav.download}
                </a>
              </li>
              <li>
                <Link to={localePath("/blog", code)} className="text-muted hover:text-accent">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-[13px] font-semibold uppercase tracking-wider text-faint">
              {t.footer.legal}
            </p>
            <ul className="mt-4 space-y-2.5 text-[14px]">
              <li>
                <Link to={localePath("/privacy", code)} className="text-muted hover:text-accent">
                  {t.footer.privacy}
                </Link>
              </li>
              <li>
                <Link to={localePath("/support", code)} className="text-muted hover:text-accent">
                  {t.footer.support}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-paper-line pt-6 text-[13px] text-faint sm:flex-row sm:items-center dark:border-night-line">
          <p>
            © {year} Caffy. {t.footer.rights}
          </p>
          <p>{t.footer.madeWith}</p>
        </div>
      </div>
    </footer>
  );
}
