import { createContext, useContext, useMemo, useState } from 'react';
import { seedBlogs } from '../data/seedBlogs';
import { isJsonBlog, mergeBlogs } from '../lib/blogs';

const STORAGE_KEY = 'content-hub-admin-blogs';

function loadAdminBlogs() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
    const legacy = localStorage.getItem('content-hub-blogs');
    if (legacy) {
      const parsed = JSON.parse(legacy);
      const adminOnly = parsed.filter((b) => !isJsonBlog(b));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(adminOnly));
      return adminOnly;
    }
  } catch {
    /* ignore corrupt storage */
  }
  return seedBlogs;
}

function persistAdminBlogs(blogs) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(blogs));
}

const ContentContext = createContext(null);

export function ContentProvider({ children }) {
  const [adminBlogs, setAdminBlogs] = useState(loadAdminBlogs);

  const blogs = useMemo(() => mergeBlogs(adminBlogs), [adminBlogs]);

  const addBlog = (blog) => {
    const entry = {
      ...blog,
      source: 'admin',
      id: `blog-${crypto.randomUUID()}`,
      createdAt: new Date().toISOString(),
    };
    setAdminBlogs((prev) => {
      const next = [entry, ...prev];
      persistAdminBlogs(next);
      return next;
    });
    return entry;
  };

  const updateBlog = (id, updates) => {
    if (isJsonBlog({ id })) return;
    setAdminBlogs((prev) => {
      const next = prev.map((b) => (b.id === id ? { ...b, ...updates } : b));
      persistAdminBlogs(next);
      return next;
    });
  };

  const deleteBlog = (id) => {
    const target = blogs.find((b) => b.id === id);
    if (isJsonBlog(target)) return;
    setAdminBlogs((prev) => {
      const next = prev.filter((b) => b.id !== id);
      persistAdminBlogs(next);
      return next;
    });
  };

  const getBlog = (id) => blogs.find((b) => b.id === id);

  const value = useMemo(
    () => ({ blogs, addBlog, updateBlog, deleteBlog, getBlog, isJsonBlog }),
    [blogs, adminBlogs],
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
