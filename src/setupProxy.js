// src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/metapi',
    createProxyMiddleware({
      target: 'https://collectionapi.metmuseum.org',
      changeOrigin: true,
      secure: true,
      pathRewrite: {
        '^/metapi': '/public/collection/v1',
      },
    })
  );
};
