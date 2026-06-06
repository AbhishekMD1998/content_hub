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

  const postCount = displayBlogs.length;

  return (
    <div className="page blogs-page">
      <header className="blogs-hero">
        <div className="blogs-hero-text">
          <span className="blogs-eyebrow">Read &amp; learn</span>
          <h1>Blogs</h1>
          <p className="blogs-lead">
            Long-form posts on productivity, life, and work — in English and Kannada.
          </p>
          {!loading && !error && postCount > 0 && (
            <p className="blogs-count">
              {postCount} {postCount === 1 ? 'post' : 'posts'}
              {isKannada ? ' · ಕನ್ನಡ' : ' · English'}
            </p>
          )}
        </div>
        <BlogLanguageToggle />
      </header>

      {loading && <p className="empty-state blogs-empty">Loading blogs…</p>}
      {error && (
        <p className="empty-state blogs-empty" role="alert">
          Could not load blogs. Is the backend running on port 8080? ({error})
        </p>
      )}

      {!loading && !error && postCount === 0 && (
        <p className="empty-state blogs-empty">
          {isKannada ? 'No Kannada blogs published yet.' : 'No English blogs published yet.'}
        </p>
      )}

      {!loading && !error && postCount > 0 && (
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

      <AdSense className="ad-slot-list ad-slot-bottom" collapseWhenEmpty />
    </div>
  );
}
