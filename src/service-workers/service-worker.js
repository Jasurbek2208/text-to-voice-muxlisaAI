const CACHE_VERSION = 'v1';
const CACHE_NAME = `app-cache-${CACHE_VERSION}`;

const ASSETS_TO_CACHE = [
  '/',
  '../../index.html',
  '../main.tsx',
  '../App.tsx',
  '../variables.ts',
  '../types/index.ts',
  '../../public/manifest.json',
  '../store/index.ts',
  '../store/store.tsx',
  '../index.css',
  '../assets/styles/audio.css',
  '../assets/react.svg',
  '../router/Router.tsx',
  '../router/routerLinks.tsx',
  '../pages/auth/Login.tsx',
  '../pages/auth/Register.tsx',
  '../pages/auth/TermsConditions.tsx',
  '../pages/AIChats/TextToVoice.tsx',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return Promise.all(
        ASSETS_TO_CACHE.map((resource) => {
          return fetch(resource)
            .then((response) => {
              if (!response.ok) {
                throw new Error(`Failed to fetch: ${resource}`);
              }
              return cache.put(resource, response);
            })
            .catch((error) => {
              console.error(error);
            });
        })
      );
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request).then((response) => {
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        const responseToCache = response.clone();

        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return response;
      });
    })
  );
});
