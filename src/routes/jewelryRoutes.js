const express = require('express');
const { logRouteAccess } = require('../middlewares/logMiddleware');
const { jewelryView, getJewelsWithFilters } = require('../consultas');
const router = express.Router();

router.use(logRouteAccess);

// Ruta para obtener joyas con parámetros de límite, orden y paginación
router.get('/joyas', async (req, res) => {
  try {
    const queryStrings = {
      limit: parseInt(req.query.limit, 10) || 2, // Valor por defecto de 2
      order_by: req.query.order_by || 'id_ASC', // Valor por defecto de 'id_ASC'
      page: parseInt(req.query.page, 10) || 0,  // Valor por defecto de 0
    };
    const joyas = await jewelryView(queryStrings);
    const HATEOAS = prepararHATEOAS(joyas);
    res.json(HATEOAS);
  } catch (error) {
    console.error('Error al obtener joyas:', error.message);
    res.status(500).json({ error: 'Error al obtener joyas' });
  }
});

// Ruta para obtener joyas con filtros
router.get('/joyas/filtros', async (req, res) => {
  try {
    const queryStrings = req.query;
    const joyas = await getJewelsWithFilters(queryStrings);
    res.json(joyas);
  } catch (error) {
    console.error('Error al obtener joyas con filtros:', error.message);
    res.status(500).json({ error: 'Error al obtener joyas con filtros' });
  }
});

module.exports = {
  router
};
