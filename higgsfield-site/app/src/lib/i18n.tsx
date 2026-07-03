/**
 * Lightweight i18n for the Rio site. Catalan is the source language; Spanish,
 * French and English are full translations. The active language lives in React
 * context, persists to localStorage and is reflected on <html lang>.
 * SSR always renders Catalan; the stored preference is applied after mount.
 */
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Lang = "ca" | "es" | "fr" | "en";

export const LANGS: Lang[] = ["ca", "es", "fr", "en"];

export type Localized = Record<Lang, string>;

const STORAGE_KEY = "rio_lang";

type LangContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
};

const LangContext = createContext<LangContextValue>({
  lang: "ca",
  setLang: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ca");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored && LANGS.includes(stored as Lang)) {
      setLangState(stored as Lang);
      document.documentElement.lang = stored;
    }
  }, []);

  const setLang = (next: Lang) => {
    setLangState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
    document.documentElement.lang = next;
  };

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}

/** Resolve a localized string for the active language. */
export function useT() {
  const { lang } = useLang();
  return (value: Localized) => value[lang];
}
