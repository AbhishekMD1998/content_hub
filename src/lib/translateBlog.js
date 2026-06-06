import { translateTexts } from '../api/translate';

function setDeep(obj, path, value) {
  let current = obj;
  for (let i = 0; i < path.length - 1; i++) {
    current = current[path[i]];
  }
  current[path[path.length - 1]] = value;
}

function collectBlogStrings(blog, previewOnly = false) {
  const paths = [];
  const texts = [];

  const add = (path, value) => {
    if (typeof value === 'string' && value.trim()) {
      paths.push(path);
      texts.push(value);
    }
  };

  add(['title'], blog.title);
  add(['excerpt'], blog.excerpt);
  add(['category'], blog.category);

  if (previewOnly) {
    return { paths, texts };
  }

  blog.tags?.forEach((tag, index) => add(['tags', index], tag));

  blog.blocks?.forEach((block, blockIndex) => {
    const base = ['blocks', blockIndex];
    add([...base, 'text'], block.text);
    add([...base, 'title'], block.title);
    block.items?.forEach((item, itemIndex) => add([...base, 'items', itemIndex], item));
    add([...base, 'alt'], block.alt);
    add([...base, 'caption'], block.caption);
    add([...base, 'label'], block.label);
    add([...base, 'description'], block.description);
  });

  if (!blog.blocks?.length && blog.content) {
    add(['content'], blog.content);
  }

  return { paths, texts };
}

async function applyTranslation(blog, previewOnly) {
  const { paths, texts } = collectBlogStrings(blog, previewOnly);
  if (!texts.length) {
    return blog;
  }

  const translations = await translateTexts(texts);
  const result = structuredClone(blog);
  paths.forEach((path, index) => {
    setDeep(result, path, translations[index] ?? texts[index]);
  });
  return result;
}

export function translateBlog(blog) {
  return applyTranslation(blog, false);
}

export function translateBlogPreview(blog) {
  return applyTranslation(blog, true);
}

export async function translateBlogList(blogs) {
  if (!blogs.length) {
    return blogs;
  }

  const blogMeta = blogs.map((blog) => collectBlogStrings(blog, true));
  const allTexts = blogMeta.flatMap((meta) => meta.texts);
  const uniqueTexts = [...new Set(allTexts)];

  if (!uniqueTexts.length) {
    return blogs;
  }

  const translations = await translateTexts(uniqueTexts);
  const translationMap = new Map(uniqueTexts.map((text, index) => [text, translations[index]]));

  return blogs.map((blog, blogIndex) => {
    const { paths, texts } = blogMeta[blogIndex];
    const result = structuredClone(blog);
    paths.forEach((path, index) => {
      setDeep(result, path, translationMap.get(texts[index]) ?? texts[index]);
    });
    return result;
  });
}
