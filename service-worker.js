const CACHE_NAME = 'tank-v1';
const ASSETS = [
  'index.html',
  'manifest.json',
  'https://cdn.tailwindcss.com'
];

// App-Dateien beim ersten Laden im Handyspeicher sichern
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS);
    })
  );
});

// Bei App-Start die Daten blitzschnell aus dem lokalen Cache holen (Offline-Garantie)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      return cachedResponse || fetch(event.request);
    })
  );
});
