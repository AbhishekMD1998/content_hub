import { Link } from 'react-router-dom';

export default function PostCard({ title, excerpt, author, category, date, to, badge }) {
  return (
    <article className="post-card">
      <div className="post-card-meta">
        {badge && <span className="badge">{badge}</span>}
        {category && <span className="tag">{category}</span>}
        {date && <time dateTime={date}>{formatDate(date)}</time>}
      </div>
      <h2>
        <Link to={to}>{title}</Link>
      </h2>
      <p>{excerpt}</p>
      {author && <p className="post-card-author">By {author}</p>}
      <Link to={to} className="read-more">
        Read more →
      </Link>
    </article>
  );
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}
