import { Link, useParams } from 'react-router-dom';
import { useContent } from '../context/ContentContext';

export default function BlogDetail() {
  const { id } = useParams();
  const { getBlog } = useContent();
  const blog = getBlog(id);

  if (!blog) {
    return (
      <div className="page">
        <p className="empty-state">Blog not found.</p>
        <Link to="/blogs">← Back to blogs</Link>
      </div>
    );
  }

  return (
    <article className="page detail-page">
      <Link to="/blogs" className="back-link">
        ← Back to blogs
      </Link>
      <header className="detail-header">
        <span className="badge">Blog</span>
        <span className="tag">{blog.category}</span>
        <h1>{blog.title}</h1>
        <p className="detail-meta">
          By {blog.author} ·{' '}
          <time dateTime={blog.createdAt}>
            {new Date(blog.createdAt).toLocaleDateString()}
          </time>
        </p>
      </header>
      <div className="detail-body">
        {blog.content.split('\n\n').map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>
    </article>
  );
}
