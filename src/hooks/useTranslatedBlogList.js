import { useEffect, useState } from 'react';
import { useBlogLanguage } from '../context/BlogLanguageContext';
import { translateBlogList } from '../lib/translateBlog';

export function useTranslatedBlogList(blogs) {
  const { language, isKannada } = useBlogLanguage();
  const [displayBlogs, setDisplayBlogs] = useState(blogs);
  const [translating, setTranslating] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isKannada) {
      setDisplayBlogs(blogs);
      setError('');
      return;
    }

    if (!blogs.length) {
      setDisplayBlogs(blogs);
      return;
    }

    let cancelled = false;
    setTranslating(true);
    setError('');

    translateBlogList(blogs)
      .then((result) => {
        if (!cancelled) {
          setDisplayBlogs(result);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setDisplayBlogs(blogs);
          setError(err.message || 'Could not translate blogs.');
        }
      })
      .finally(() => {
        if (!cancelled) {
          setTranslating(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [blogs, isKannada, language]);

  return { blogs: displayBlogs, translating, error, isKannada };
}
