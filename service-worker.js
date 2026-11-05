const CACHE_NAME = 'toropass-cache-v2';
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
  // 古い Wallet のページが残り続けないよう、新しい版をすぐに有効にする
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const request = event.request;
  // API など別オリジンへの要求はキャッシュを通さない
  if (request.method !== 'GET' || new URL(request.url).origin !== self.location.origin) return;
  // ページは常に新しいものを取得し、オフラインのときだけキャッシュを使う
  if (request.mode === 'navigate') {
    event.respondWith(fetch(request).catch(() => caches.match('/index.html')));
    return;
  }
  event.respondWith(
    caches.match(request).then(response => {
      return response || fetch(request);
    })
  );
});
