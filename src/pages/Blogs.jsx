import AdSense from '../components/AdSense';
import { useMeta } from '../hooks/useMeta';
import BlogLanguageToggle from '../components/BlogLanguageToggle';
import PostCard from '../components/PostCard';
import { useContent } from '../context/ContentContext';
import { useTranslatedBlogList } from '../hooks/useTranslatedBlogList';

export default function Blogs() {
  useMeta({
    title: 'Blogs',
    description: 'Long-form blog posts on productivity, design, and everyday work. Available in English and Kannada.',
    url: '/blogs',
  });
  const { blogs, loading, error } = useContent();
  const { blogs: displayBlogs, isKannada } = useTranslatedBlogList(blogs);

  return (
    <div className="page">
      <header className="page-header page-header-with-actions">
        <div>
          <h1>Blogs</h1>
          <p className="lead">
            Long-form posts from the database—seeded JSON content and admin-published posts.
          </p>
        </div>
        <BlogLanguageToggle />
      </header>

      <AdSense className="ad-slot-list" />

      {loading && <p className="empty-state">Loading blogs…</p>}
      {error && (
        <p className="empty-state" role="alert">
          Could not load blogs. Is the backend running on port 8080? ({error})
        </p>
      )}

      {!loading && !error && displayBlogs.length === 0 && (
        <p className="empty-state">
          {isKannada ? 'No Kannada blogs published yet.' : 'No English blogs published yet.'}
        </p>
      )}

      {!loading && !error && displayBlogs.length > 0 && (
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
              sponsored={blog.sponsored}
            />
          ))}
        </div>
      )}
    </div>
  );
}
