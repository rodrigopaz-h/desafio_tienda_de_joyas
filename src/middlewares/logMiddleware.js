// En middlewares/logMiddleware.js

const logRouteAccess = (req, res, next) => {
  console.log(`Acceso a la ruta: ${req.method} ${req.originalUrl}`);
  next();
};

module.exports = { logRouteAccess };
