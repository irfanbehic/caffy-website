import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  type ReactNode,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import en, { type Dict } from "./en";
import tr from "./tr";
import de from "./de";
import es from "./es";
import ja from "./ja";
import { localeFromPath, pathForLocale } from "../lib/locale";

export const locales = { en, tr, de, es, ja } as const;
export type LocaleCode = keyof typeof locales;
export const localeList = Object.values(locales).map((l) => l.meta);

interface I18nValue {
  code: LocaleCode;
  t: Dict;
  setLocale: (c: LocaleCode) => void;
}

const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  // The URL is the single source of truth for language (/, /tr, /de, /es, /ja).
  // This matches the prerendered HTML per URL exactly, so there's no hydration
  // mismatch, and it lets Google index a localized page per language.
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const code = localeFromPath(pathname);

  useEffect(() => {
    document.documentElement.lang = code;
  }, [code]);

  const value = useMemo<I18nValue>(
    () => ({
      code,
      t: locales[code],
      setLocale: (c: LocaleCode) => navigate(pathForLocale(pathname, c)),
    }),
    [code, pathname, navigate]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
