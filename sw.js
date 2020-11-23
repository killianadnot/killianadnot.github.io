var cacheName = "ginko-v1";

var images = ["icon-32", "icon-64", "icon-96", "icon-128", "icon-168", "icon-180", "icon-192", "icon-256", "icon-512"];

var contentCache = [];

for(var i=0; i<images.length; i++) {
  contentCache.push('/icons/'+images[i]+'.png');
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

/*self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((r) => {
            console.log('[Service Worker] Fetching resource: '+e.request.url);
            return r || fetch(e.request).then((response) => {
                return caches.open(cacheName).then((cache) => {
                    console.log('[Service Worker] Caching new resource: '+e.request.url);
                    cache.put(e.request, response.clone());
                    return response;
                });
            });
        })
    );
});*/

self.addEventListener('fetch', function (event) {
    event.respondWith(
      caches.open('mysite-dynamic').then(function (cache) {
        return cache.match(event.request).then(function (response) {
          return (
            response ||
            fetch(event.request).then(function (response) {
              cache.put(event.request, response.clone());
              return response;
            })
          );
        });
      }),
    );
  });