import { createContext, useContext, useMemo, useState } from 'react';
import { seedBlogs } from '../data/seedBlogs';

const STORAGE_KEY = 'content-hub-blogs';

function loadBlogs() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    /* ignore corrupt storage */
  }
  return seedBlogs;
}

function persistBlogs(blogs) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(blogs));
}

const ContentContext = createContext(null);

export function ContentProvider({ children }) {
  const [blogs, setBlogs] = useState(loadBlogs);

  const addBlog = (blog) => {
    const entry = {
      ...blog,
      id: `blog-${crypto.randomUUID()}`,
      createdAt: new Date().toISOString(),
    };
    setBlogs((prev) => {
      const next = [entry, ...prev];
      persistBlogs(next);
      return next;
    });
    return entry;
  };

  const updateBlog = (id, updates) => {
    setBlogs((prev) => {
      const next = prev.map((b) => (b.id === id ? { ...b, ...updates } : b));
      persistBlogs(next);
      return next;
    });
  };

  const deleteBlog = (id) => {
    setBlogs((prev) => {
      const next = prev.filter((b) => b.id !== id);
      persistBlogs(next);
      return next;
    });
  };

  const getBlog = (id) => blogs.find((b) => b.id === id);

  const value = useMemo(
    () => ({ blogs, addBlog, updateBlog, deleteBlog, getBlog }),
    [blogs],
  );

  return (
    <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
  );
}

export function useContent() {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error('useContent must be used within ContentProvider');
  return ctx;
}
