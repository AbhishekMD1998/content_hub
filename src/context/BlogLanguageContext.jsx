import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'content-hub-blog-language';
const BlogLanguageContext = createContext(null);

export function BlogLanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved === 'kn' ? 'kn' : 'en';
  });

  const setLanguage = (next) => {
    setLanguageState(next === 'kn' ? 'kn' : 'en');
  };

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, language);
    document.documentElement.lang = language === 'kn' ? 'kn' : 'en';
    document.body.classList.toggle('blog-lang-kn', language === 'kn');
  }, [language]);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      isKannada: language === 'kn',
    }),
    [language],
  );

  return (
    <BlogLanguageContext.Provider value={value}>{children}</BlogLanguageContext.Provider>
  );
}

export function useBlogLanguage() {
  const ctx = useContext(BlogLanguageContext);
  if (!ctx) {
    throw new Error('useBlogLanguage must be used within BlogLanguageProvider');
  }
  return ctx;
}
