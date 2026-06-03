import { Link, useParams } from 'react-router-dom';
import { articles } from '../data/articles';

export default function ArticleDetail() {
  const { id } = useParams();
  const article = articles.find((a) => a.id === id);

  if (!article) {
    return (
      <div className="page">
        <p className="empty-state">Article not found.</p>
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
      <div className="detail-body">
        {article.content.split('\n\n').map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>
    </article>
  );
}
