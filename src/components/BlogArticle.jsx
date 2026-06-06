import { Link } from 'react-router-dom';
import { useBlogLanguage } from '../context/BlogLanguageContext';
import { getTableOfContents } from '../lib/blogs';
import BlogLanguageToggle from './BlogLanguageToggle';
import BlogRenderer from './BlogRenderer';

export default function BlogArticle({ blog }) {
  const { isKannada } = useBlogLanguage();
  const toc = getTableOfContents(blog.blocks);
  const hasBlocks = Boolean(blog.blocks?.length);

  return (
    <article className={`blog-article${isKannada ? ' blog-article-kn' : ''}`}>
      <div className="blog-progress" aria-hidden="true">
        <div className="blog-progress-bar" id="blog-progress-bar" />
      </div>

      {blog.coverImage && (
        <div className="blog-cover">
          <img src={blog.coverImage} alt="" className="blog-cover-img" />
          <div className="blog-cover-overlay" />
        </div>
      )}

      <div className="blog-article-inner">
        <Link to="/blogs" className="back-link blog-back">
          ← All blogs
        </Link>

        <header className="blog-article-header">
          <div className="blog-article-header-top">
            <BlogLanguageToggle compact />
          </div>
          <div className="blog-article-labels">
            <span className="badge">Blog</span>
            {blog.category && <span className="tag">{blog.category}</span>}
            {blog.tags?.map((tag) => (
              <span key={tag} className="blog-tag-pill">
                {tag}
              </span>
            ))}
          </div>
          <h1 className="blog-article-title">{blog.title}</h1>
          <p className="blog-article-meta">
            <span>By {blog.author}</span>
            <span aria-hidden="true">·</span>
            <time dateTime={blog.createdAt}>
              {new Date(blog.createdAt).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            {blog.readTime && (
              <>
                <span aria-hidden="true">·</span>
                <span>{blog.readTime} read</span>
              </>
            )}
          </p>
        </header>

        <div className={`blog-layout ${toc.length ? 'blog-layout-with-toc' : ''}`}>
          {toc.length > 0 && (
            <aside className="blog-toc" aria-label="Table of contents">
              <p className="blog-toc-label">On this page</p>
              <nav>
                <ol>
                  {toc.map((item) => (
                    <li key={item.id}>
                      <a href={`#${item.id}`}>{item.text}</a>
                    </li>
                  ))}
                </ol>
              </nav>
            </aside>
          )}

          <div className="blog-body">
            {hasBlocks ? (
              <BlogRenderer blocks={blog.blocks} />
            ) : (
              <div className="blog-blocks">
                {blog.content?.split('\n\n').map((para, i) => (
                  <p key={i} className="blog-paragraph">
                    {para}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
