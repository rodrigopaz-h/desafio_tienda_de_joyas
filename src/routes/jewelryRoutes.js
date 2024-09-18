// src/routes/jewelryRoutes.js

const express = require('express');
const { logRouteAccess } = require('../middlewares/logMiddleware');
const { jewelryView, getJewelsWithFilters } = require('../consultas');
const router = express.Router();


router.use(logRouteAccess);
router.get('/joyas',jewelryView );
router.get('/joyas/filtros', getJewelsWithFilters);
 

module.exports = {
  router
};
