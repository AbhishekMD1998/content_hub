import { useContent } from '../context/ContentContext';
import PostCard from '../components/PostCard';

export default function Blogs() {
  const { blogs } = useContent();
  const sorted = [...blogs].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  );

  return (
    <div className="page">
      <header className="page-header">
        <h1>Blogs</h1>
        <p className="lead">
          Long-form stories from JSON content and admin uploads—crafted for focused reading.
        </p>
      </header>

      {sorted.length === 0 ? (
        <p className="empty-state">No blogs published yet.</p>
      ) : (
        <div className="card-grid blogs-grid">
          {sorted.map((blog) => (
            <PostCard
              key={blog.id}
              title={blog.title}
              excerpt={blog.excerpt}
              author={blog.author}
              category={blog.category}
              date={blog.createdAt}
              to={`/blogs/${blog.id}`}
              badge="Blog"
              coverImage={blog.coverImage}
              readTime={blog.readTime}
            />
          ))}
        </div>
      )}
    </div>
  );
}
