var cacheName = "ginko-PWA"

var images = ['icon-32', 'icon-64', 'icon-96', 'icon-128', 'icon-168', 'icon-180', 'icon-192', 'icon-256', 'icon-512'];

var contentCache;

for(var i=0; i<images.length; i++) {
  contentCache.push('icons/'+games[i]+'.png');
}

contentCache.push('index.html');

self.addEventListener('install', (e) => {
    console.log('[Service Worker] Install');
    e.waitUntil(
      caches.open(cacheName).then((cache) => {
            console.log('[Service Worker] Caching all: app shell and content');
        return cache.addAll(contentCache);
      })
    );
  });