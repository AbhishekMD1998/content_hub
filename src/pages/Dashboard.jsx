import { Link } from 'react-router-dom';
import { articles } from '../data/articles';
import { useContent } from '../context/ContentContext';
import PostCard from '../components/PostCard';

export default function Dashboard() {
  const { blogs } = useContent();
  const recentBlogs = [...blogs]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);
  const recentArticles = [...articles]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);

  return (
    <div className="page">
      <section className="hero">
        <div className="hero-blob" aria-hidden="true" />
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Content &amp; insights platform</p>
            <h1 className="hero-title">
              Make work
              <br />
              <em>worth reading</em>
            </h1>
            <p className="lead hero-lead">
              Overview of blogs published by admins and curated articles for your
              team.
            </p>
            <div className="hero-actions">
              <Link to="/blogs" className="btn btn-primary btn-pill">
                Browse blogs
              </Link>
              <Link to="/articles" className="btn btn-outline btn-pill">
                View articles
              </Link>
            </div>
          </div>

          <aside className="hero-card" aria-label="Quick stats">
            <p className="hero-card-label">Growing with</p>
            <p className="hero-card-stat">{blogs.length + articles.length}</p>
            <p className="hero-card-desc">Total published pieces</p>
            <Link to="/admin" className="hero-card-link">
              Publish a blog →
            </Link>
          </aside>
        </div>
      </section>

      <section className="stats-grid" aria-label="Content statistics">
        <div className="stat-card">
          <span className="stat-value">{blogs.length}</span>
          <span className="stat-label">Blogs</span>
          <Link to="/blogs" className="stat-link">
            View all
          </Link>
        </div>
        <div className="stat-card">
          <span className="stat-value">{articles.length}</span>
          <span className="stat-label">Articles</span>
          <Link to="/articles" className="stat-link">
            View all
          </Link>
        </div>
        <div className="stat-card stat-card-accent">
          <span className="stat-value">Admin</span>
          <span className="stat-label">Publish blogs</span>
          <Link to="/admin" className="stat-link">
            Go to admin →
          </Link>
        </div>
      </section>

      <section className="section-block">
        <div className="section-head">
          <h2>Recent blogs</h2>
          <Link to="/blogs">See all blogs</Link>
        </div>
        {recentBlogs.length === 0 ? (
          <p className="empty-state">No blogs yet. Admins can add the first post.</p>
        ) : (
          <div className="card-grid">
            {recentBlogs.map((blog) => (
              <PostCard
                key={blog.id}
                title={blog.title}
                excerpt={blog.excerpt}
                author={blog.author}
                category={blog.category}
                date={blog.createdAt}
                to={`/blogs/${blog.id}`}
                badge="Blog"
              />
            ))}
          </div>
        )}
      </section>

      <section className="section-block">
        <div className="section-head">
          <h2>Recent articles</h2>
          <Link to="/articles">See all articles</Link>
        </div>
        <div className="card-grid">
          {recentArticles.map((article) => (
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
      </section>
    </div>
  );
}
