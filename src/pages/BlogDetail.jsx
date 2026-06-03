import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchBlog } from '../api/blogs';
import BlogArticle from '../components/BlogArticle';

export default function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const bar = document.getElementById('blog-progress-bar');
    const onScroll = () => {
      if (!bar) return;
      const doc = document.documentElement;
      const scrollTop = doc.scrollTop || document.body.scrollTop;
      const height = doc.scrollHeight - doc.clientHeight;
      bar.style.width = `${height > 0 ? (scrollTop / height) * 100 : 0}%`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    setError(null);
    fetchBlog(id)
      .then(setBlog)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="page">
        <p className="empty-state">Loading blog…</p>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="page">
        <p className="empty-state">{error || 'Blog not found.'}</p>
        <Link to="/blogs">← Back to blogs</Link>
      </div>
    );
  }

  return (
    <div className="page page-blog-detail">
      <BlogArticle blog={blog} />
    </div>
  );
}
