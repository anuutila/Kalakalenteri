// eslint-disable-next-line no-restricted-globals
const ignored = self.__WB_MANIFEST;

// Files to cache
const cacheName = 'kalapaivakirja-v3';
const contentToCache = [
  '/',
  '/index.html'
];

// Installing Service Worker
// eslint-disable-next-line no-restricted-globals
self.addEventListener('install', (e) => {
  console.log('[Service Worker] Install');
  e.waitUntil((async () => {
    const cache = await caches.open(cacheName);
    console.log('[Service Worker] Caching all: app shell and content');
    await cache.addAll(contentToCache);
  })());
});

// Clearing old caches when new Service Worker is activated
// eslint-disable-next-line no-restricted-globals
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((keyList) => {
    return Promise.all(keyList.map((key) => {
      if (key === cacheName) { 
        return; 
      }
      return caches.delete(key);
    }));
  }));
});

// Fetching content using Service Worker
// eslint-disable-next-line no-restricted-globals
self.addEventListener('fetch', (e) => {
  // check if request is made by chrome extensions or web page
  // if request is made for web page url must contains http.
  if (!(e.request.url.indexOf('http') === 0)) return; // skip the request. if request is not made with http protocol
  if (e.request.url.includes('entries')) return;

  e.respondWith((async () => {
    const r = await caches.match(e.request);
    console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
    if (r) return r;
    const response = await fetch(e.request);
    const cache = await caches.open(cacheName);
    console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
    cache.put(e.request.url, response.clone());
    return response;
  })());
});