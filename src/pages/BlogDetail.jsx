import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchBlog } from '../api/blogs';
import { filterBlogsByLanguage, jsonBlogs } from '../lib/blogs';
import { useBlogLanguage } from '../context/BlogLanguageContext';
import BlogArticle from '../components/BlogArticle';
import RelatedPosts from '../components/RelatedPosts';
import ShareButtons from '../components/ShareButtons';
import { useContent } from '../context/ContentContext';
import { useMeta } from '../hooks/useMeta';
import { useTranslatedBlog } from '../hooks/useTranslatedBlog';

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
    const jsonBlog = jsonBlogs.find((b) => b.id === id);
    if (jsonBlog) {
      setBlog(jsonBlog);
      setLoading(false);
      return;
    }

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

  return <BlogDetailContent blog={blog} />;
}

function BlogDetailContent({ blog }) {
  const { blog: displayBlog, error: languageError } = useTranslatedBlog(blog);
  const { blogs } = useContent();
  const { language } = useBlogLanguage();
  const relatedPosts = filterBlogsByLanguage(blogs, language);

  useMeta({
    title: displayBlog?.title || 'Blog',
    description: displayBlog?.excerpt || 'Read on Content Hub',
    image: displayBlog?.coverImage,
    url: displayBlog ? `/blogs/${displayBlog.id}` : '/blogs',
    type: 'article',
  });

  if (!displayBlog) {
    return (
      <div className="page">
        <p className="empty-state">{languageError}</p>
        <Link to="/blogs">← Back to blogs</Link>
      </div>
    );
  }

  return (
    <div className="page page-blog-detail">
      <BlogArticle blog={displayBlog} />
      <ShareButtons
        title={displayBlog.title}
        url={`https://content-hub-pi-bay.vercel.app/blogs/${displayBlog.id}`}
      />
      <RelatedPosts
        current={displayBlog}
        allPosts={relatedPosts}
        basePath="/blogs"
        label="Blog"
      />
    </div>
  );
}
