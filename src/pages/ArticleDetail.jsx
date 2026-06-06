import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchArticle } from '../api/articles';
import AdSense from '../components/AdSense';
import RelatedPosts from '../components/RelatedPosts';
import ShareButtons from '../components/ShareButtons';
import { useArticles } from '../context/ArticlesContext';
import { useMeta } from '../hooks/useMeta';

export default function ArticleDetail() {
  const { id } = useParams();
  const { articles } = useArticles();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useMeta({
    title: article?.title,
    description: article?.excerpt || (article ? `Read "${article.title}" on Content Hub` : undefined),
    url: `/articles/${id}`,
    type: 'article',
  });

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchArticle(id)
      .then(setArticle)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="page">
        <p className="empty-state">Loading article…</p>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="page">
        <p className="empty-state">{error || 'Article not found.'}</p>
        <Link to="/articles">← Back to articles</Link>
      </div>
    );
  }

  return (
    <article className="page detail-page">
      <Link to="/articles" className="back-link">
        ← Back to articles
      </Link>
      <header className="detail-header">
        <span className="badge badge-article">Article</span>
        <span className="tag">{article.category}</span>
        <h1>{article.title}</h1>
        <p className="detail-meta">
          By {article.author} · {article.readTime} ·{' '}
          <time dateTime={article.createdAt}>
            {new Date(article.createdAt).toLocaleDateString()}
          </time>
        </p>
      </header>
      <AdSense className="ad-slot-inline" />
      <div className="detail-body">
        {article.content.split('\n\n').map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>
      <ShareButtons
        title={article.title}
        url={`https://content-hub-pi-bay.vercel.app/articles/${id}`}
      />
      <RelatedPosts current={article} allPosts={articles} basePath="/articles" label="Article" />
    </article>
  );
}
