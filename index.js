const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { createTable } = require('./src/db/config');
const { getJewelsWithFilters, jewelryView } = require('./src/consultas');
const { prepararHATEOAS } = require('./src/helpers/helpers');
const { router } = require('./src/routes/jewelryRoutes');

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use('/', router);

// Crea la tabla al iniciar el servidor
createTable().catch(err => {
  console.error('Error al crear la tabla:', err);
});

// Ruta para obtener joyas con parámetros de límite, orden y paginación
app.get('/joyas', async (req, res) => {
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
app.get('/joyas/filtros', async (req, res) => {
  try {
    const queryStrings = req.query;
    const joyas = await getJewelsWithFilters(queryStrings);
    res.json(joyas);
  } catch (error) {
    console.error('Error al obtener joyas con filtros:', error.message);
    res.status(500).json({ error: 'Error al obtener joyas con filtros' });
  }
});

// Ruta para manejar rutas no encontradas
app.use((req, res) => {
  res.status(404).send("Esta ruta no existe");
});

// Inicia el servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
