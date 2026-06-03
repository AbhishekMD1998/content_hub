import { apiRequest } from './client';

export function fetchArticles() {
  return apiRequest('/api/articles');
}

export function fetchArticle(slug) {
  return apiRequest(`/api/articles/${slug}`);
}
