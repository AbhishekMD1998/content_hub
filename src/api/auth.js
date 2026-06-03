import { apiRequest } from './client';

export function signup({ email, password, displayName }) {
  return apiRequest('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ email, password, displayName }),
  });
}

export function login({ email, password }) {
  return apiRequest('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

export function fetchMe() {
  return apiRequest('/api/auth/me');
}
