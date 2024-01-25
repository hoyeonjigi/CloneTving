import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();

app.use(
  ['/user/login', '/signIn'],
  createProxyMiddleware({
    target: 'http://hoyeonjigi.site',
    changeOrigin: true,
  })
);

app.listen(5173);
