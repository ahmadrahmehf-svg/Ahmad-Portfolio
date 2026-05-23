import { useEffect, useMemo, useState } from 'react';
import { Language, portfolioContent } from './portfolioContent';

const LANGUAGE_STORAGE_KEY = 'portfolio-language';
const LANGUAGE_EVENT = 'portfolio-language-change';

function getStoredLanguage(): Language {
  if (typeof window === 'undefined') return 'en';

  const storedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
  return storedLanguage === 'ar' ? 'ar' : 'en';
}

function applyDocumentLanguage(language: Language) {
  if (typeof document === 'undefined') return;

  document.documentElement.lang = language;
  document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
}

export function setPortfolioLanguage(language: Language) {
  if (typeof window === 'undefined') return;

  window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  applyDocumentLanguage(language);
  window.dispatchEvent(new CustomEvent<Language>(LANGUAGE_EVENT, { detail: language }));
}

export default function usePortfolioLanguage() {
  const [language, setLanguageState] = useState<Language>(getStoredLanguage);

  useEffect(() => {
    applyDocumentLanguage(language);
  }, [language]);

  useEffect(() => {
    const handleLanguageChange = (event: Event) => {
      const customEvent = event as CustomEvent<Language>;
      setLanguageState(customEvent.detail ?? getStoredLanguage());
    };

    const handleStorage = () => {
      setLanguageState(getStoredLanguage());
    };

    window.addEventListener(LANGUAGE_EVENT, handleLanguageChange as EventListener);
    window.addEventListener('storage', handleStorage);

    return () => {
      window.removeEventListener(LANGUAGE_EVENT, handleLanguageChange as EventListener);
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  const setLanguage = (nextLanguage: Language) => {
    setPortfolioLanguage(nextLanguage);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  const content = useMemo(() => portfolioContent[language], [language]);

  return {
    language,
    isArabic: language === 'ar',
    content,
    setLanguage,
    toggleLanguage,
  };
}
