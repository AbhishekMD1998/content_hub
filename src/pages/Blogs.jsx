import BlogLanguageToggle from '../components/BlogLanguageToggle';
import PostCard from '../components/PostCard';
import { useContent } from '../context/ContentContext';
import { useTranslatedBlogList } from '../hooks/useTranslatedBlogList';

export default function Blogs() {
  const { blogs, loading, error } = useContent();
  const {
    blogs: displayBlogs,
    translating,
    error: translateError,
    isKannada,
  } = useTranslatedBlogList(blogs);

  return (
    <div className="page">
      <header className="page-header page-header-with-actions">
        <div>
          <h1>Blogs</h1>
          <p className="lead">
            Long-form posts from the database—seeded JSON content and admin-published posts.
            {isKannada && ' Reading in Kannada.'}
          </p>
        </div>
        <BlogLanguageToggle />
      </header>

      {loading && <p className="empty-state">Loading blogs…</p>}
      {translating && !loading && (
        <p className="empty-state" role="status">
          Translating blogs to Kannada…
        </p>
      )}
      {translateError && (
        <p className="form-error" role="alert">
          {translateError}
        </p>
      )}
      {error && (
        <p className="empty-state" role="alert">
          Could not load blogs. Is the backend running on port 8080? ({error})
        </p>
      )}

      {!loading && !error && !translating && displayBlogs.length === 0 && (
        <p className="empty-state">No blogs published yet.</p>
      )}

      {!loading && !error && !translating && displayBlogs.length > 0 && (
        <div className="card-grid blogs-grid">
          {displayBlogs.map((blog) => (
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
