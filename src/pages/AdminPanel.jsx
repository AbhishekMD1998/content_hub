import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useContent } from '../context/ContentContext';

const emptyForm = {
  title: '',
  excerpt: '',
  author: 'Admin',
  category: 'General',
  content: '',
  sponsored: false,
  affiliateLabel: '',
  affiliateUrl: '',
};

export default function AdminPanel() {
  const { user, isAdmin } = useAuth();
  const { blogs, addBlog, deleteBlog, isJsonBlog } = useContent();
  const displayName = user?.displayName || user?.email?.split('@')[0] || 'Writer';
  const adminBlogs = blogs.filter((b) => !isJsonBlog(b));
  const [form, setForm] = useState(emptyForm);
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.content.trim()) {
      setMessage('Title and content are required.');
      return;
    }
    setSubmitting(true);
    try {
      const blog = await addBlog({
        title: form.title.trim(),
        excerpt: form.excerpt.trim() || `${form.content.trim().slice(0, 120)}…`,
        author: form.author.trim() || 'Admin',
        category: form.category.trim() || 'General',
        content: form.content.trim(),
        sponsored: form.sponsored,
        affiliateLabel: form.affiliateLabel.trim(),
        affiliateUrl: form.affiliateUrl.trim(),
      });
      setForm(emptyForm);
      setMessage(`Published “${blog.title}”.`);
    } catch (err) {
      setMessage(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete “${title}”?`)) return;
    try {
      await deleteBlog(id);
      setMessage(`Deleted “${title}”.`);
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div className="page admin-page">
      <header className="page-header">
        <h1>{displayName}</h1>
        <p className="lead">
          Your corner of the hub — draft stories, hit publish, and watch them go live
          for readers everywhere.
          {isAdmin && (
            <>
              {' '}
              <Link to="/admin/docs">View technical documentation</Link>.
            </>
          )}
        </p>
      </header>

      {message && (
        <p className="toast" role="status">
          {message}
        </p>
      )}

      <div className="admin-grid">
        <section className="admin-form-section">
          <h2>New blog post</h2>
          <form onSubmit={handleSubmit} className="admin-form">
            <label>
              Title
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Excerpt
              <textarea
                name="excerpt"
                value={form.excerpt}
                onChange={handleChange}
                rows={2}
                placeholder="Short summary for cards"
              />
            </label>
            <div className="form-row">
              <label>
                Author
                <input
                  name="author"
                  value={form.author}
                  onChange={handleChange}
                />
              </label>
              <label>
                Category
                <input
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                />
              </label>
            </div>
            <label>
              Content
              <textarea
                name="content"
                value={form.content}
                onChange={handleChange}
                rows={8}
                required
                placeholder="Write your post. Use blank lines between paragraphs."
              />
            </label>
            <label className="admin-checkbox">
              <input
                type="checkbox"
                name="sponsored"
                checked={form.sponsored}
                onChange={handleChange}
              />
              Mark as sponsored (shows disclosure and optional affiliate link)
            </label>
            {form.sponsored && (
              <div className="form-row">
                <label>
                  Affiliate button label
                  <input
                    name="affiliateLabel"
                    value={form.affiliateLabel}
                    onChange={handleChange}
                    placeholder="e.g. Try Notion free"
                  />
                </label>
                <label>
                  Affiliate URL
                  <input
                    name="affiliateUrl"
                    type="url"
                    value={form.affiliateUrl}
                    onChange={handleChange}
                    placeholder="https://…"
                  />
                </label>
              </div>
            )}
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              {submitting ? 'Publishing…' : 'Publish blog'}
            </button>
          </form>
        </section>

        <section className="admin-list-section">
          <h2>Your posts ({adminBlogs.length})</h2>
          <p className="admin-json-note">
            Seeded blogs ({blogs.length - adminBlogs.length}) come from the database seed
            and cannot be deleted here.
          </p>
          {adminBlogs.length === 0 ? (
            <p className="empty-state">No admin posts yet.</p>
          ) : (
            <ul className="admin-blog-list">
              {[...adminBlogs]
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map((blog) => (
                  <li key={blog.id}>
                    <div>
                      <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                      <span className="admin-list-meta">
                        {blog.category} ·{' '}
                        {new Date(blog.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(blog.id, blog.title)}
                    >
                      Delete
                    </button>
                  </li>
                ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
