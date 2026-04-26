// Servidor local para o funil (Vue Router history mode)
// Uso: node serve.js
// Acesse: http://localhost:3000/v2

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const ROOT = __dirname;

const MIME = {
  '.html': 'text/html',
  '.js':   'application/javascript',
  '.css':  'text/css',
  '.json': 'application/json',
  '.vtt':  'text/vtt',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif':  'image/gif',
  '.svg':  'image/svg+xml',
  '.webp': 'image/webp',
  '.mp3':  'audio/mpeg',
  '.mp4':  'video/mp4',
  '.ico':  'image/x-icon',
  '.woff': 'font/woff',
  '.woff2':'font/woff2',
  '.ttf':  'font/ttf',
};

http.createServer((req, res) => {
  let url = req.url.split('?')[0];

  // Strip trailing slash (except root)
  if (url.length > 1 && url.endsWith('/')) url = url.slice(0, -1);

  const filePath = path.join(ROOT, url);
  const ext = path.extname(filePath);

  // Serve static files if they exist and have an extension
  if (ext && fs.existsSync(filePath)) {
    const mime = MIME[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': mime });
    fs.createReadStream(filePath).pipe(res);
    return;
  }

  // SPA fallback — always serve index.html for unknown paths
  const index = path.join(ROOT, 'index.html');
  res.writeHead(200, { 'Content-Type': 'text/html' });
  fs.createReadStream(index).pipe(res);

}).listen(PORT, () => {
  console.log(`Funil rodando em http://localhost:${PORT}/v2`);
  console.log('Rotas disponíveis:');
  console.log('  http://localhost:' + PORT + '/');
  console.log('  http://localhost:' + PORT + '/v2');
  console.log('  http://localhost:' + PORT + '/enviodosdados');
  console.log('  http://localhost:' + PORT + '/obrigado-correio');
  console.log('  http://localhost:' + PORT + '/assinatura-poder');
  console.log('  http://localhost:' + PORT + '/g-ass');
});
