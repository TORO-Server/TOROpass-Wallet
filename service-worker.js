const CACHE_NAME = 'toropass-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
  '/image/toropass.png',
  '/image/minupass.png',
  '/image/shakechanrupica.png',
  '/image/rupica.png',
  '/image/tohoca.png',
  '/image/settings.png',
  '/image/logout.png',
  '/image/Train.png',
  '/image/Charge.png',
  '/image/SetBalance.png',
  '/image/Shop.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
