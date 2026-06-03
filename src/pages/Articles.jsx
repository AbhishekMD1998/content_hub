import { articles } from '../data/articles';
import PostCard from '../components/PostCard';

export default function Articles() {
  const sorted = [...articles].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  );

  return (
    <div className="page">
      <header className="page-header">
        <h1>Articles</h1>
        <p className="lead">
          Curated long-form pieces from the editorial team.
        </p>
      </header>

      <div className="card-grid">
        {sorted.map((article) => (
          <PostCard
            key={article.id}
            title={article.title}
            excerpt={article.excerpt}
            author={article.author}
            category={article.category}
            date={article.createdAt}
            to={`/articles/${article.id}`}
            badge="Article"
          />
        ))}
      </div>
    </div>
  );
}
