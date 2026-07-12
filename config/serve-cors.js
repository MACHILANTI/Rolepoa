const http = require("http");
const fs = require("fs");
const path = require("path");
const https = require("https");
const { URL } = require("url");

const root = path.join(__dirname, "..", "public");
const types = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "text/javascript",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".webmanifest": "application/manifest+json",
  ".ico": "image/x-icon",
  ".gif": "image/gif",
  ".mp4": "video/mp4",
  ".webp": "image/webp"
};

const server = http.createServer((req, res) => {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Range");

  if (req.method === "OPTIONS") {
    res.writeHead(200);
    res.end();
    return;
  }

  let p = decodeURIComponent(req.url.split("?")[0]);

  // Proxy para imagens do Supabase
  if (p.startsWith("/supabase/")) {
    const urlPath = p.substring(10); // Remove "/supabase/"
    const imageUrl = `https://papakiwailmirguubanf.supabase.co/${urlPath}`;

    console.log("📸 Proxy Supabase:", urlPath);

    https.get(imageUrl, { timeout: 5000 }, (proxyRes) => {
      res.writeHead(proxyRes.statusCode, {
        "Content-Type": proxyRes.headers["content-type"] || "image/jpeg",
        "Content-Length": proxyRes.headers["content-length"],
        "Cache-Control": "public, max-age=86400"
      });
      proxyRes.pipe(res);
    }).on("error", (err) => {
      console.error("❌ Erro ao carregar imagem:", err.message);
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Imagem não encontrada");
    });
    return;
  }

  // Arquivos locais
  if (p === "/") p = "/index.html";
  const fp = path.join(root, p);

  fs.readFile(fp, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end("404");
      return;
    }
    res.writeHead(200, {
      "Content-Type": types[path.extname(fp).toLowerCase()] || "application/octet-stream",
      "Cache-Control": "no-cache"
    });
    res.end(data);
  });
});

server.listen(5000, "0.0.0.0", () => {
  console.log("\n🚀 Servidor RolêPOA com proxy de imagens");
  console.log("📍 Acesse: http://localhost:5000");
  console.log("📸 Proxy Supabase: http://localhost:5000/supabase/*");
  console.log("");
