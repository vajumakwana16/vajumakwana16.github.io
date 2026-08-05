/*
 * Optional Workbox layer for the PWA build.
 *
 * Flutter generates its own `flutter_service_worker.js` that precaches the app
 * shell. To add the runtime caching strategies from section 5.1 of the design
 * spec, build with:
 *
 *     flutter build web --pwa-strategy=none
 *
 * and register THIS file instead, importing the generated manifest.
 */
importScripts('https://storage.googleapis.com/workbox-cdn/releases/7.1.0/workbox-sw.js');

const { registerRoute, setDefaultHandler } = workbox.routing;
const { StaleWhileRevalidate, CacheFirst, NetworkOnly } = workbox.strategies;
const { ExpirationPlugin } = workbox.expiration;
const { CacheableResponsePlugin } = workbox.cacheableResponse;

// App shell - precached by the Flutter build manifest.
workbox.precaching.precacheAndRoute(self.__WB_MANIFEST || []);

// WordPress REST: fast render from cache, refresh in the background.
registerRoute(
  ({ url }) => url.pathname.startsWith('/wp-json/wp/v2/'),
  new StaleWhileRevalidate({
    cacheName: 'ala-wp-api',
    plugins: [
      new CacheableResponsePlugin({ statuses: [0, 200] }),
      new ExpirationPlugin({ maxEntries: 60, maxAgeSeconds: 24 * 60 * 60 }),
    ],
  }),
);

// YouTube playlist JSON.
registerRoute(
  ({ url }) => url.hostname === 'www.googleapis.com',
  new StaleWhileRevalidate({
    cacheName: 'ala-youtube',
    plugins: [new ExpirationPlugin({ maxAgeSeconds: 12 * 60 * 60 })],
  }),
);

// Images and thumbnails.
registerRoute(
  ({ request }) => request.destination === 'image',
  new CacheFirst({
    cacheName: 'ala-images',
    plugins: [
      new CacheableResponsePlugin({ statuses: [0, 200] }),
      new ExpirationPlugin({ maxEntries: 60, maxAgeSeconds: 30 * 24 * 60 * 60 }),
    ],
  }),
);

// NEVER cache certificate verification. A stale result is a safety and
// liability problem.
registerRoute(
  ({ url }) => url.hostname === 'universalcertification.org',
  new NetworkOnly(),
);

setDefaultHandler(new StaleWhileRevalidate());
