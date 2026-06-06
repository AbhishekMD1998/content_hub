import { apiRequest, getToken } from './client';
import { apiUrl } from './config';

export function fetchDocList() {
  return apiRequest('/api/admin/docs');
}

export async function fetchDocPdf(id) {
  const token = getToken();
  const response = await fetch(apiUrl(`/api/admin/docs/${id}`), {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  if (!response.ok) {
    let message = response.statusText;
    try {
      const body = await response.json();
      message = body.message || message;
    } catch {
      /* ignore */
    }
    throw new Error(message || 'Failed to load document');
  }
  return response.blob();
}
