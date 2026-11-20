const CACHE_NAME = "quiz-otaku-2026-v1";
const STATIC_ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
  "./Champion.PNG",
  "./finale.JPG",
  "./calendrier.JPG",
  "./regles1.JPG",
  "./regles2.JPG",
  "./regles3.JPG"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS).catch(() => {});
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // Toujours laisser passer les appels JSONBin en réseau direct
  if (url.hostname.includes("jsonbin.io")) {
    return;
  }

  if (event.request.method !== "GET") {
    return;
  }

  // Réseau d'abord pour index.html afin de récupérer vite les mises à jour, repli sur le cache si besoin
  if (event.request.mode === "navigate" || url.pathname.endsWith("/index.html")) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          return response;
        })
        .catch(() => caches.match(event.request).then((cached) => cached || caches.match("./index.html")))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).then((response) => {
        if (response && response.status === 200 && url.origin === self.location.origin) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        }
        return response;
      });
    })
  );
});
