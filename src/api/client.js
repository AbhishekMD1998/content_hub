import { apiUrl } from './config';

const TOKEN_KEY = 'content-hub-token';

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token) {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  } else {
    localStorage.removeItem(TOKEN_KEY);
  }
}

export async function apiRequest(path, options = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  const token = getToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  let response;
  try {
    response = await fetch(apiUrl(path), {
      ...options,
      headers,
    });
  } catch {
    const base = apiUrl('');
    const hint = base
      ? `Cannot reach API at ${base}.`
      : 'Cannot reach API. Set VITE_API_BASE_URL to your Render URL in Vercel (or use npm run dev locally).';
    throw new Error(hint);
  }

  if (!response.ok) {
    let message = response.statusText;
    try {
      const body = await response.json();
      message = body.message || body.error || message;
    } catch {
      /* ignore */
    }
    throw new Error(message || 'Request failed');
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}
