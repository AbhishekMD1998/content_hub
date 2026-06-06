import { Link } from 'react-router-dom';

function score(post, current) {
  let s = 0;
  if (post.id === current.id) return -1;
  if (post.category && post.category === current.category) s += 3;
  const currentTags = new Set(current.tags || []);
  (post.tags || []).forEach((t) => {
    if (currentTags.has(t)) s += 2;
  });
  return s;
}

export default function RelatedPosts({ current, allPosts, basePath = '/blogs', label = 'Blog' }) {
  if (!current || !allPosts?.length) return null;

  const related = allPosts
    .map((p) => ({ post: p, score: score(p, current) }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((x) => x.post);

  if (!related.length) return null;

  return (
    <aside className="related-posts" aria-label="Related posts">
      <h2 className="related-posts-title">You might also like</h2>
      <ul className="related-posts-list">
        {related.map((post) => (
          <li key={post.id}>
            <Link to={`${basePath}/${post.id}`} className="related-post-card">
              {post.coverImage && (
                <img
                  src={post.coverImage}
                  alt=""
                  className="related-post-img"
                  loading="lazy"
                />
              )}
              <div className="related-post-body">
                <div className="related-post-meta">
                  <span className="badge badge-sm">{label}</span>
                  {post.category && <span className="tag">{post.category}</span>}
                </div>
                <p className="related-post-title">{post.title}</p>
                {post.readTime && (
                  <span className="related-post-read">{post.readTime} read</span>
                )}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
