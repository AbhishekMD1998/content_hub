import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useContent } from '../context/ContentContext';

const emptyForm = {
  title: '',
  excerpt: '',
  author: 'Admin',
  category: 'General',
  content: '',
};

export default function AdminPanel() {
  const { blogs, addBlog, deleteBlog } = useContent();
  const [form, setForm] = useState(emptyForm);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.content.trim()) {
      setMessage('Title and content are required.');
      return;
    }
    const blog = addBlog({
      title: form.title.trim(),
      excerpt: form.excerpt.trim() || form.content.slice(0, 120) + '…',
      author: form.author.trim() || 'Admin',
      category: form.category.trim() || 'General',
      content: form.content.trim(),
    });
    setForm(emptyForm);
    setMessage(`Published “${blog.title}”.`);
  };

  const handleDelete = (id, title) => {
    if (window.confirm(`Delete “${title}”?`)) {
      deleteBlog(id);
      setMessage(`Deleted “${title}”.`);
    }
  };

  return (
    <div className="page admin-page">
      <header className="page-header">
        <h1>Admin panel</h1>
        <p className="lead">Upload and manage blog posts.</p>
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
            <button type="submit" className="btn btn-primary">
              Publish blog
            </button>
          </form>
        </section>

        <section className="admin-list-section">
          <h2>Published blogs ({blogs.length})</h2>
          {blogs.length === 0 ? (
            <p className="empty-state">No blogs yet.</p>
          ) : (
            <ul className="admin-blog-list">
              {[...blogs]
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
