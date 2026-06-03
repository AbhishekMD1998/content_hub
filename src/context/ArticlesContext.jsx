import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { fetchArticles } from '../api/articles';

const ArticlesContext = createContext(null);

export function ArticlesProvider({ children }) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadArticles = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchArticles();
      setArticles(data);
    } catch (err) {
      setError(err.message);
      setArticles([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadArticles();
  }, [loadArticles]);

  const value = useMemo(
    () => ({ articles, loading, error, reloadArticles: loadArticles }),
    [articles, loading, error, loadArticles],
  );

  return (
    <ArticlesContext.Provider value={value}>{children}</ArticlesContext.Provider>
  );
}

export function useArticles() {
  const ctx = useContext(ArticlesContext);
  if (!ctx) throw new Error('useArticles must be used within ArticlesProvider');
  return ctx;
}
