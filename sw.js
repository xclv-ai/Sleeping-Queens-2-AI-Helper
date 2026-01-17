
const CACHE_NAME = 'sq2-ai-helper-v3'; // Increment cache version to force update
const URLS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  'https://cdn.tailwindcss.com',
  'https://fonts.googleapis.com/css2?family=IM+Fell+English+SC&family=Inter:wght@400;500;700&display=swap'
];

self.addEventListener('install', (event) => {
  // Skip waiting to ensure the new service worker activates immediately.
  self.skipWaiting(); 
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(URLS_TO_CACHE);
      })
  );
});

self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  // Take control of all clients immediately.
  return self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const requestUrl = new URL(event.request.url);

  // --- STRATEGY: Always go to network for dynamic content ---
  // This is crucial for a no-build setup with Babel.
  // 1. Bypass cache for all .ts/.tsx files.
  // 2. Bypass cache for API calls.
  if (requestUrl.pathname.endsWith('.ts') || requestUrl.pathname.endsWith('.tsx') || requestUrl.pathname.startsWith('/api/')) {
    event.respondWith(fetch(event.request));
    return;
  }

  // --- STRATEGY: Cache-first for static assets ---
  // For everything else (HTML, CSS, fonts, images), serve from cache if available.
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        // If not in cache, fetch from network and cache it for next time.
        return fetch(event.request).then(networkResponse => {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then(cache => {
                cache.put(event.request, responseToCache);
            });
            return networkResponse;
        });
      })
  );
});
