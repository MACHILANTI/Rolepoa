#!/usr/bin/env python3
import http.server
import socketserver
import os
import urllib.request
import urllib.error
from pathlib import Path
from urllib.parse import unquote
import base64

PORT = 5000
ROOT = Path(__file__).parent.parent / "public"

class ProxyHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def send_cors_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Range")

    def do_GET(self):
        path = unquote(self.path)

        # Proxy para URLs diretas do Supabase
        if path.startswith("/proxy?url="):
            encoded_url = path[11:]  # Remove "/proxy?url="
            try:
                # Decodificar URL base64
                full_url = base64.b64decode(encoded_url).decode('utf-8')
                print(f"📸 Proxy: {full_url[:50]}...")

                req = urllib.request.Request(full_url)
                req.add_header('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)')

                with urllib.request.urlopen(req, timeout=10) as response:
                    content = response.read()
                    content_type = response.headers.get('content-type', 'image/jpeg')

                    self.send_response(200)
                    self.send_header("Content-Type", content_type)
                    self.send_cors_headers()
                    self.send_header("Content-Length", len(content))
                    self.send_header("Cache-Control", "public, max-age=604800")
                    self.end_headers()
                    self.wfile.write(content)
                    return
            except Exception as e:
                print(f"❌ Erro ao fazer proxy: {e}")
                self.send_response(404)
                self.send_header("Content-Type", "text/plain")
                self.send_cors_headers()
                self.end_headers()
                self.wfile.write(b"Imagem nao encontrada")
                return

        # Proxy para Supabase direto
        if path.startswith("/supabase/"):
            full_path = path[10:]  # Remove "/supabase/"
            url = f"https://papakiwailmirguubanf.supabase.co/{full_path}"

            try:
                print(f"📸 Proxy Supabase: {full_path[:60]}...")
                req = urllib.request.Request(url)
                req.add_header('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)')

                with urllib.request.urlopen(req, timeout=10) as response:
                    content = response.read()
                    content_type = response.headers.get('content-type', 'image/jpeg')

                    self.send_response(200)
                    self.send_header("Content-Type", content_type)
                    self.send_cors_headers()
                    self.send_header("Content-Length", len(content))
                    self.send_header("Cache-Control", "public, max-age=604800")
                    self.end_headers()
                    self.wfile.write(content)
                    return
            except Exception as e:
                print(f"❌ Erro ao fazer proxy: {e}")
                self.send_response(404)
                self.send_header("Content-Type", "text/plain")
                self.send_cors_headers()
                self.end_headers()
                self.wfile.write(b"Imagem nao encontrada")
                return

        # Arquivo local
        if path == "/":
            path = "/index.html"

        filepath = ROOT / path.lstrip("/")

        if filepath.exists() and filepath.is_file():
            self.send_response(200)
            content_type = self.guess_type(str(filepath))
            self.send_header("Content-Type", content_type if content_type else "application/octet-stream")
            self.send_cors_headers()
            self.send_header("Cache-Control", "no-cache")
            self.end_headers()

            with open(filepath, 'rb') as f:
                self.wfile.write(f.read())
        else:
            self.send_response(404)
            self.send_header("Content-Type", "text/html")
            self.send_cors_headers()
            self.end_headers()
            self.wfile.write(b"<h1>404 - Arquivo nao encontrado</h1>")

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_cors_headers()
        self.end_headers()

    def log_message(self, format, *args):
        if "proxy" in str(args).lower() or "📸" in format:
            print(f"[{self.log_date_time_string()}] {format % args}")

if __name__ == "__main__":
    import os
    port = int(os.environ.get("PORT", PORT))
    with socketserver.TCPServer(("0.0.0.0", port), ProxyHandler) as httpd:
        print(f"\nRolepoa server running on port {port}")
        print(f"Access: http://localhost:{port}\n")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n⏹️  Servidor parado")
