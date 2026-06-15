const CACHE_NAME = 'role-poa-v45';
const ASSETS = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './manifest.json'
];

// Instalação do Service Worker e Caching dos arquivos essenciais
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Arquivos em cache salvos com sucesso!');
        return cache.addAll(ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// Ativação do Service Worker e limpeza de caches antigos
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            console.log('Limpando cache antigo:', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

// Estratégia de Fetch: Network First caindo para Cache se offline
self.addEventListener('fetch', event => {
  const req = event.request;
  // Não interceptar chamadas de API do Supabase (REST/Storage/Realtime) nem métodos != GET
  if (req.method !== 'GET' || req.url.includes('supabase.co')) return;

  event.respondWith(
    fetch(req)
      .then(response => {
        if (response && response.status === 200) {
          const responseCopy = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(req, responseCopy);
          });
        }
        return response;
      })
      .catch(() => caches.match(req))
  );
});
