const CACHE_NAME = "calculator-pwa-v1";
const ASSETS = [
  "./",
  "./index.html",
  "./calculator.js",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png"
  // Removed "./style.css" since you use inline styles
];

self.addEventListener("install", event => {
  self.skipWaiting(); // Force activate
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener("activate", event => {
  // Optional cleanup of old caches
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    )
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(res => res || fetch(event.request))
  );
});
