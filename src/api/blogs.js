import { apiRequest } from './client';

export function fetchBlogs() {
  return apiRequest('/api/blogs');
}

export function fetchBlog(slug) {
  return apiRequest(`/api/blogs/${slug}`);
}

export function createBlog(payload) {
  return apiRequest('/api/blogs', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function deleteBlog(slug) {
  return apiRequest(`/api/blogs/${slug}`, { method: 'DELETE' });
}
