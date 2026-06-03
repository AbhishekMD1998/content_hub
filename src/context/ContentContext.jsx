import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import * as blogsApi from '../api/blogs';

const ContentContext = createContext(null);

export function ContentProvider({ children }) {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadBlogs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await blogsApi.fetchBlogs();
      setBlogs(data);
    } catch (err) {
      setError(err.message);
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadBlogs();
  }, [loadBlogs]);

  const addBlog = async (blog) => {
    const created = await blogsApi.createBlog({
      title: blog.title,
      excerpt: blog.excerpt,
      author: blog.author,
      category: blog.category,
      content: blog.content,
    });
    setBlogs((prev) => [created, ...prev]);
    return created;
  };

  const deleteBlog = async (id) => {
    await blogsApi.deleteBlog(id);
    setBlogs((prev) => prev.filter((b) => b.id !== id));
  };

  const getBlog = (id) => blogs.find((b) => b.id === id);

  const isJsonBlog = (blog) => blog?.source === 'json';

  const value = useMemo(
    () => ({
      blogs,
      loading,
      error,
      addBlog,
      deleteBlog,
      getBlog,
      isJsonBlog,
      reloadBlogs: loadBlogs,
    }),
    [blogs, loading, error, loadBlogs],
  );

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

export function useContent() {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error('useContent must be used within ContentProvider');
  return ctx;
}
