import { useEffect } from 'react';
import { useArticles } from '../context/ArticlesContext';
import { useContent } from '../context/ContentContext';

const SITE_URL = 'https://content-hub-pi-bay.vercel.app';

const STATIC_ROUTES = [
  { loc: '/', priority: '1.0', changefreq: 'daily' },
  { loc: '/blogs', priority: '0.9', changefreq: 'daily' },
  { loc: '/articles', priority: '0.9', changefreq: 'daily' },
  { loc: '/about', priority: '0.5', changefreq: 'monthly' },
  { loc: '/privacy', priority: '0.3', changefreq: 'yearly' },
];

export default function Sitemap() {
  const { blogs } = useContent();
  const { articles } = useArticles();

  useEffect(() => {
    document.title = 'Sitemap | Content Hub';
  }, []);

  const blogEntries = blogs.map((b) => ({
    loc: `/blogs/${b.id}`,
    priority: '0.8',
    changefreq: 'weekly',
    lastmod: b.createdAt ? new Date(b.createdAt).toISOString().split('T')[0] : undefined,
  }));

  const articleEntries = articles.map((a) => ({
    loc: `/articles/${a.id}`,
    priority: '0.8',
    changefreq: 'weekly',
    lastmod: a.createdAt ? new Date(a.createdAt).toISOString().split('T')[0] : undefined,
  }));

  const all = [...STATIC_ROUTES, ...blogEntries, ...articleEntries];

  return (
    <div className="page legal-page">
      <header className="page-header">
        <h1>Sitemap</h1>
        <p className="lead">All pages on Content Hub</p>
      </header>
      <div className="legal-body">
        <p>
          The XML sitemap is served at{' '}
          <a
            href={`${SITE_URL}/sitemap.xml`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {SITE_URL}/sitemap.xml
          </a>
          . Submit it in{' '}
          <a
            href="https://search.google.com/search-console"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Search Console
          </a>{' '}
          to improve indexing.
        </p>
        <table className="sitemap-table">
          <thead>
            <tr>
              <th>URL</th>
              <th>Priority</th>
              <th>Last modified</th>
            </tr>
          </thead>
          <tbody>
            {all.map((entry) => (
              <tr key={entry.loc}>
                <td>
                  <a
                    href={`${SITE_URL}${entry.loc}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {entry.loc}
                  </a>
                </td>
                <td>{entry.priority}</td>
                <td>{entry.lastmod || '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
