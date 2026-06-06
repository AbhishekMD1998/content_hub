import { apiRequest } from './client';

export function translateTexts(texts, source = 'en', target = 'kn') {
  if (!texts.length) {
    return Promise.resolve([]);
  }
  return apiRequest('/api/translate', {
    method: 'POST',
    body: JSON.stringify({ texts, source, target }),
  }).then((response) => response.translations);
}
