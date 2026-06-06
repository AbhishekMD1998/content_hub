import { Link } from 'react-router-dom';
import SponsoredBadge from './SponsoredBadge';

export default function PostCard({
  title,
  excerpt,
  author,
  category,
  date,
  to,
  badge,
  coverImage,
  readTime,
  sponsored = false,
}) {
  return (
    <article className={`post-card ${coverImage ? 'post-card-featured' : ''}`}>
      {coverImage && (
        <Link to={to} className="post-card-cover" tabIndex={-1} aria-hidden="true">
          <img src={coverImage} alt="" loading="lazy" />
        </Link>
      )}
      <div className="post-card-body">
        <div className="post-card-meta">
          {badge && <span className="badge">{badge}</span>}
          {sponsored && <SponsoredBadge />}
          {category && <span className="tag">{category}</span>}
          {readTime && <span className="post-card-read">{readTime}</span>}
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
      </div>
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
