export default function BlogRenderer({ blocks }) {
  if (!blocks?.length) return null;

  return (
    <div className="blog-blocks">
      {blocks.map((block, index) => (
        <Block key={`${block.type}-${index}`} block={block} />
      ))}
    </div>
  );
}

function Block({ block }) {
  switch (block.type) {
    case 'intro':
      return <p className="blog-intro">{block.text}</p>;

    case 'heading': {
      const Tag = block.level === 3 ? 'h3' : 'h2';
      return (
        <Tag id={block.id} className={`blog-heading blog-h${block.level}`}>
          {block.text}
        </Tag>
      );
    }

    case 'paragraph':
      return <p className="blog-paragraph">{block.text}</p>;

    case 'image':
      return (
        <figure className="blog-figure">
          <div className="blog-figure-frame">
            <img src={block.src} alt={block.alt} loading="lazy" />
          </div>
          {block.caption && <figcaption>{block.caption}</figcaption>}
        </figure>
      );

    case 'list': {
      const ListTag = block.style === 'ordered' ? 'ol' : 'ul';
      return (
        <ListTag className={`blog-list blog-list-${block.style || 'unordered'}`}>
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ListTag>
      );
    }

    case 'callout':
      return (
        <aside className={`blog-callout blog-callout-${block.variant || 'tip'}`}>
          {block.title && <strong className="blog-callout-title">{block.title}</strong>}
          <p>{block.text}</p>
        </aside>
      );

    case 'sticker':
      return (
        <div className="blog-sticker" role="img" aria-label={block.description || block.label}>
          <span className="blog-sticker-emoji" aria-hidden="true">
            {block.emoji}
          </span>
          {block.label && <span className="blog-sticker-label">{block.label}</span>}
        </div>
      );

    case 'divider':
      return <hr className="blog-divider" />;

    default:
      return null;
  }
}
