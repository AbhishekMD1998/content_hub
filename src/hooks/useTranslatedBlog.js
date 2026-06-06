import { useMemo } from 'react';
import { useBlogLanguage } from '../context/BlogLanguageContext';
import { getBlogLanguage } from '../lib/blogs';

export function useTranslatedBlog(blog) {
  const { language, isKannada } = useBlogLanguage();

  const matchesLanguage = useMemo(() => {
    if (!blog) return false;
    const blogLang = getBlogLanguage(blog);
    return blogLang === (language === 'kn' ? 'kn' : 'en');
  }, [blog, language]);

  const error = useMemo(() => {
    if (!blog || matchesLanguage) return '';
    return language === 'kn'
      ? 'This post is available in English only. Switch to English to read it.'
      : 'This post is available in Kannada only. Switch to ಕನ್ನಡ to read it.';
  }, [blog, language, matchesLanguage]);

  return {
    blog: matchesLanguage ? blog : null,
    translating: false,
    error,
    isKannada,
    matchesLanguage,
  };
}
