import { useEffect, useState } from 'react';
import { useBlogLanguage } from '../context/BlogLanguageContext';
import { translateBlog } from '../lib/translateBlog';

export function useTranslatedBlog(blog) {
  const { language, isKannada } = useBlogLanguage();
  const [displayBlog, setDisplayBlog] = useState(blog);
  const [translating, setTranslating] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!blog) {
      setDisplayBlog(null);
      return;
    }

    if (!isKannada) {
      setDisplayBlog(blog);
      setError('');
      return;
    }

    let cancelled = false;
    setTranslating(true);
    setError('');

    translateBlog(blog)
      .then((result) => {
        if (!cancelled) {
          setDisplayBlog(result);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setDisplayBlog(blog);
          setError(err.message || 'Could not translate this blog.');
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
  }, [blog, isKannada, language]);

  return { blog: displayBlog, translating, error, isKannada };
}
