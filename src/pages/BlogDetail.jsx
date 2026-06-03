import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import BlogArticle from '../components/BlogArticle';
import { useContent } from '../context/ContentContext';

export default function BlogDetail() {
  const { id } = useParams();
  const { getBlog } = useContent();
  const blog = getBlog(id);

  useEffect(() => {
    const bar = document.getElementById('blog-progress-bar');
    if (!bar) return undefined;

    const onScroll = () => {
      const doc = document.documentElement;
      const scrollTop = doc.scrollTop || document.body.scrollTop;
      const height = doc.scrollHeight - doc.clientHeight;
      const progress = height > 0 ? (scrollTop / height) * 100 : 0;
      bar.style.width = `${progress}%`;
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!blog) {
    return (
      <div className="page">
        <p className="empty-state">Blog not found.</p>
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
