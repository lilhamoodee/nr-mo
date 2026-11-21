'use strict';

var CACHE_NAME = 'nara-v4';
var CORE_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-192.png',
  './icons/icon-maskable-512.png',
  './assets/logo/logo-icon.svg',
  './assets/logo/logo-full-light.svg',
  './assets/logo/logo-full-dark.svg',
  './assets/logo/logo-mono-dark.svg',
  './assets/logo/logo-mono-light.svg'
];

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(CORE_ASSETS);
    }).then(function () {
      return self.skipWaiting();
    })
  );
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys.filter(function (k) { return k !== CACHE_NAME; }).map(function (k) { return caches.delete(k); })
      );
    }).then(function () {
      return self.clients.claim();
    })
  );
});

self.addEventListener('fetch', function (event) {
  var req = event.request;
  if (req.method !== 'GET') return;

  var url = new URL(req.url);
  var isSameOrigin = url.origin === self.location.origin;
  var isFont = url.origin === 'https://fonts.googleapis.com' || url.origin === 'https://fonts.gstatic.com';

  if (!isSameOrigin && !isFont) return;

  event.respondWith(
    caches.match(req).then(function (cached) {
      if (cached) {
        if (isSameOrigin) {
          event.waitUntil(
            fetch(req).then(function (res) {
              if (res && res.ok) {
                var copy = res.clone();
                caches.open(CACHE_NAME).then(function (cache) { cache.put(req, copy); });
              }
            }).catch(function () {})
          );
        }
        return cached;
      }
      return fetch(req).then(function (res) {
        if (res && (res.ok || res.type === 'opaque')) {
          var copy = res.clone();
          caches.open(CACHE_NAME).then(function (cache) { cache.put(req, copy); });
        }
        return res;
      }).catch(function () {
        if (req.mode === 'navigate') {
          return caches.match('./index.html');
        }
        return new Response('', { status: 503, statusText: 'Offline' });
      });
    })
  );
});
