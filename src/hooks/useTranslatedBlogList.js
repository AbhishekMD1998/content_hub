import { useMemo } from 'react';
import { useBlogLanguage } from '../context/BlogLanguageContext';
import { filterBlogsByLanguage } from '../lib/blogs';

export function useTranslatedBlogList(blogs) {
  const { language, isKannada } = useBlogLanguage();

  const displayBlogs = useMemo(
    () => filterBlogsByLanguage(blogs, language),
    [blogs, language],
  );

  return { blogs: displayBlogs, translating: false, error: '', isKannada };
}
