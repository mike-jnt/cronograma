const CACHE_NAME = 'agenda-equipo-cache-v1';
const APP_SHELL = [
  './cronograma-equipo-app-movil-responsive-notificaciones-pwa.html',
  './cronograma-equipo-manifest.json',
  './cronograma-icon-180.png',
  './cronograma-icon-192.png',
  './cronograma-icon-512.png'
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
  if(event.request.method !== 'GET') return;
  event.respondWith((async () => {
    const cached = await caches.match(event.request);
    if(cached) return cached;
    try{
      const response = await fetch(event.request);
      if(response && response.status === 200 && event.request.url.startsWith(self.location.origin)){
        const cache = await caches.open(CACHE_NAME);
        cache.put(event.request, response.clone());
      }
      return response;
    }catch(error){
      const fallback = await caches.match('./cronograma-equipo-app-movil-responsive-notificaciones-pwa.html');
      if(fallback && event.request.mode === 'navigate') return fallback;
      throw error;
    }
  })());
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  const targetUrl = './cronograma-equipo-app-movil-responsive-notificaciones-pwa.html';
  event.waitUntil((async () => {
    const clientList = await clients.matchAll({ type:'window', includeUncontrolled:true });
    for(const client of clientList){
      try{
        await client.focus();
        client.postMessage({ type:'OPEN_SECTION', payload:event.notification.data || {} });
        return;
      }catch{}
    }
    await clients.openWindow(targetUrl);
  })());
});
