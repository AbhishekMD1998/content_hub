import AdSense from '../components/AdSense';
import PostCard from '../components/PostCard';
import { useArticles } from '../context/ArticlesContext';

export default function Articles() {
  const { articles, loading, error } = useArticles();

  return (
    <div className="page">
      <header className="page-header">
        <h1>Articles</h1>
        <p className="lead">
          Curated long-form pieces loaded from the Spring Boot API and Supabase database.
        </p>
      </header>

      <AdSense className="ad-slot-list" />

      {loading && <p className="empty-state">Loading articles…</p>}
      {error && (
        <p className="empty-state" role="alert">
          Could not load articles. Is the backend running on port 8080? ({error})
        </p>
      )}

      {!loading && !error && (
        <div className="card-grid">
          {articles.map((article) => (
            <PostCard
              key={article.id}
              title={article.title}
              excerpt={article.excerpt}
              author={article.author}
              category={article.category}
              date={article.createdAt}
              to={`/articles/${article.id}`}
              badge="Article"
              readTime={article.readTime}
            />
          ))}
        </div>
      )}
    </div>
  );
}
