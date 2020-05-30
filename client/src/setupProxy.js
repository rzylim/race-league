const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    ["/auth/discord", "/api/current_user", "/api/uiData", "/api/item"],
    createProxyMiddleware({
      target: "http://localhost:5000/",
      changeOrigin: true,
    })
  );
};
