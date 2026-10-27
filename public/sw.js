const CACHE_NAME = 'sundawa-pwa-v2';
const STATIC_ASSETS = [
    '/',
    '/manifest.json',
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
    );
    self.skipWaiting();
});

// Activate event - clean old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) =>
            Promise.all(
                cacheNames
                    .filter((cacheName) => cacheName !== CACHE_NAME)
                    .map((cacheName) => caches.delete(cacheName))
            )
        )
    );
    self.clients.claim();
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // Cache-first for static assets (images, fonts, assets)
    if (url.pathname.startsWith('/assets/') || url.pathname.startsWith('/fonts/') || url.pathname.startsWith('/icons/')) {
        event.respondWith(
            caches.match(request).then((cached) =>
                cached || fetch(request).then((response) => {
                    const responseToCache = response.clone();
                    caches.open(CACHE_NAME).then((cache) => cache.put(request, responseToCache));
                    return response;
                })
            ).catch(() => caches.match('/offline'))
        );
        return;
    }

    // Cache Sanity images and SimpleIcons
    if (url.hostname.includes('cdn.sanity.io') || url.hostname.includes('cdn.simpleicons.org')) {
        event.respondWith(
            caches.match(request).then((cached) =>
                cached || fetch(request).then((response) => {
                    const responseToCache = response.clone();
                    caches.open(CACHE_NAME).then((cache) => cache.put(request, responseToCache));
                    return response;
                })
            )
        );
        return;
    }

    // Network-only for API mutation routes (POST/PUT/DELETE) — Cache API doesn't support non-GET
    if (url.pathname.startsWith('/api/') && !request.method.match(/^(GET|HEAD)$/)) {
        event.respondWith(fetch(request));
        return;
    }

    // Network-first for API routes that return dynamic data (portfolio, blog posts)
    // This ensures fresh data is always fetched first, with cache as fallback
    if (url.pathname.startsWith('/api/blog/') || url.pathname.startsWith('/api/admin/')) {
        event.respondWith(
            fetch(request).then((response) => {
                const responseToCache = response.clone();
                caches.open(CACHE_NAME).then((cache) => cache.put(request, responseToCache));
                return response;
            }).catch(() => caches.match(request))
        );
        return;
    }

    // Cache-first for API GET routes
    if (url.pathname.startsWith('/api/')) {
        event.respondWith(
            caches.match(request).then((cached) =>
                cached || fetch(request).then((response) => {
                    const responseToCache = response.clone();
                    caches.open(CACHE_NAME).then((cache) => cache.put(request, responseToCache));
                    return response;
                })
            )
        );
        return;
    }

    // Network-first for navigation requests
    if (request.mode === 'navigate') {
        event.respondWith(
            fetch(request).then((response) => {
                const responseToCache = response.clone();
                caches.open(CACHE_NAME).then((cache) => cache.put(request, responseToCache));
                return response;
            }).catch(() => caches.match('/offline') || caches.match(request))
        );
        return;
    }

    // Default: cache-first
    event.respondWith(
        caches.match(request).then((cached) => cached || fetch(request))
    );
});

// Handle messages for skip waiting
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});
