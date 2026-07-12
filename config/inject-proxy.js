// Script para injetar proxy de imagens em localhost
// Esse script modifica as requisições de imagens para usar um proxy local

if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
  const originalFetch = window.fetch;
  const supabaseStoragePattern = /papakiwailmirguubanf\.supabase\.co/;

  // Intercepta fetch de imagens do Supabase
  window.fetch = function(...args) {
    let url = args[0];

    if (typeof url === "string" && supabaseStoragePattern.test(url)) {
      // Converte URL do Supabase para usar o proxy local
      const encodedUrl = Buffer.from(url).toString("base64");
      url = `/proxy/${encodedUrl}`;
      args[0] = url;
      console.log("🔄 Proxy: usando imagem local para", url);
    }

    return originalFetch.apply(this, args);
  };

  // Também intercepta XMLHttpRequest para imagens
  const originalXHROpen = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function(method, url, ...rest) {
    if (typeof url === "string" && supabaseStoragePattern.test(url)) {
      const encodedUrl = Buffer.from(url).toString("base64");
      url = `/proxy/${encodedUrl}`;
      console.log("🔄 Proxy XHR: usando imagem local");
    }
    return originalXHROpen.call(this, method, url, ...rest);
  };
}
