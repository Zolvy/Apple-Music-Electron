import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import cors from 'cors';

const app = express();
const port = 5500;

const target = 'https://amp-api.music.apple.com';

const proxyMiddleware = createProxyMiddleware({
  target: target,
  changeOrigin: true,
  xfwd: true,
  secure: false,
  router: (req) => {
    req.headers.origin = 'https://music.apple.com';
  },
  on: {
    proxyRes: (proxyRes) => {
      proxyRes.headers['access-control-allow-origin'] = 'http://localhost:9300';
    },
  },
});

app.use(cors({ origin: '*' }));
app.use(proxyMiddleware);

app.listen(port, () => {
  console.log(`Proxy Server is running on port ${port}`);
});
