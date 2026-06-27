import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import en, { type Dict } from "./en";
import tr from "./tr";
import de from "./de";
import es from "./es";
import ja from "./ja";

export const locales = { en, tr, de, es, ja } as const;
export type LocaleCode = keyof typeof locales;
export const localeList = Object.values(locales).map((l) => l.meta);

const STORAGE_KEY = "caffy.lang";

function detectLocale(): LocaleCode {
  if (typeof window === "undefined") return "en";
  const saved = window.localStorage.getItem(STORAGE_KEY) as LocaleCode | null;
  if (saved && saved in locales) return saved;
  const nav = window.navigator.language.slice(0, 2).toLowerCase();
  return (nav in locales ? (nav as LocaleCode) : "en");
}

interface I18nValue {
  code: LocaleCode;
  t: Dict;
  setLocale: (c: LocaleCode) => void;
}

const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [code, setCode] = useState<LocaleCode>(detectLocale);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, code);
    document.documentElement.lang = code;
  }, [code]);

  const value = useMemo<I18nValue>(
    () => ({ code, t: locales[code], setLocale: setCode }),
    [code]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
