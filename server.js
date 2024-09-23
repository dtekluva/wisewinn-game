/* eslint-disable @typescript-eslint/no-var-requires */
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
// const cors = require('cors');
const initializeSocketServer = require('./socket-server');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = createServer((req, res) => {
      // Set CORS headers
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
      res.setHeader('Access-Control-Allow-Credentials', true);

      // Handle OPTIONS method
      if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
      }

      try {
        const parsedUrl = parse(req.url, true);
        const { pathname } = parsedUrl;

        if (pathname.startsWith('/api/')) {
          app.getRequestHandler()(req, res, parsedUrl);
        } else {
          handle(req, res, parsedUrl);
        }
      } catch (err) {
        console.error('Error occurred handling', req.url, err);
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: 'Internal Server Error' }));
      }
    });

    server.on('error', err => {
      console.error('Server error:', err);
    });

    const io = initializeSocketServer(server);

    // Add CORS settings for Socket.IO
    // io.origins('*:*');
    // io.set('transports', ['websocket', 'polling']);

    io.on('error', err => {
      console.error('Socket.IO error:', err);
    });

    server.listen(process.env.NEXT_PUBLIC_SOCKET_URL || 3000, err => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${process.env.NEXT_PUBLIC_SOCKET_URL || 3000}`);
    });
  })
  .catch(err => {
    console.error('Error occurred starting server:', err);
  });
