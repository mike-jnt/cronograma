const CACHE_NAME = 'agenda-equipo-cache-v2';
const APP_SHELL = [
  './',
  './index.html',
  './manifest.json',
  './icon-180.png',
  './icon-192.png',
  './icon-512.png',
  './404.html'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL)).catch(() => Promise.resolve())
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  event.respondWith((async () => {
    const request = event.request;
    const cached = await caches.match(request, { ignoreSearch: false });
    if (cached) return cached;

    try {
      const response = await fetch(request);
      const isSameOrigin = request.url.startsWith(self.location.origin);
      if (response && response.ok && isSameOrigin) {
        const cache = await caches.open(CACHE_NAME);
        cache.put(request, response.clone());
      }
      return response;
    } catch (error) {
      if (request.mode === 'navigate') {
        return (await caches.match('./index.html')) || (await caches.match('./404.html'));
      }
      throw error;
    }
  })());
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  const targetUrl = './index.html';
  event.waitUntil((async () => {
    const clientList = await clients.matchAll({ type: 'window', includeUncontrolled: true });
    for (const client of clientList) {
      try {
        await client.focus();
        client.postMessage({ type: 'OPEN_SECTION', payload: event.notification.data || {} });
        return;
      } catch (e) {}
    }
    await clients.openWindow(targetUrl);
  })());
});
