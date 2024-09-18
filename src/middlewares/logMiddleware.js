// En middlewares/logMiddleware.js
const fs = require('fs');
const path = require('path');

const logRouteAccess = (req, res, next) => {
  console.log(`Acceso a la ruta: ${req.method} ${req.originalUrl}`);
  fs.appendFile(path.join(__dirname, 'logs.txt'), log, (err) => {
    if (err) console.error('Error al escribir en el archivo de log:', err);
    next();
  });
};

module.exports = { logRouteAccess };
