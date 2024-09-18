const { pool } = require('./db/config');
const format = require('pg-format');

// Función para obtener joyas
const jewelryView = async ({ limit = 2, order_by = "id_ASC", page = 0 }) => {
    try {
        // Validar los parámetros
        limit = Math.max(parseInt(limit, 10), 1);
        page = Math.max(parseInt(page, 10), 0);

        const [field, order] = order_by.split("_");
        const validFields = ['id', 'nombre', 'categoria', 'metal', 'precio', 'stock'];
        const validOrders = ['ASC', 'DESC'];
        
        if (!validFields.includes(field)) {
            throw new Error('Campo de orden inválido');
        }
        if (!validOrders.includes(order)) {
            throw new Error('Orden de clasificación inválido');
        }

        const offset = page * limit;
        const SQLrequest = 'SELECT * FROM inventario ORDER BY %s %s LIMIT %s OFFSET %s';
        const formattedQuery = format(SQLrequest, field, order, limit, offset);

        const { rows: inventario } = await pool.query(formattedQuery);
        return inventario;

    } catch (error) {
        console.error('Error en jewelryView:', error.message);
        throw error;
    }
};

// Función para obtener joyas con filtros
const getJewelsWithFilters = async ({ precio_max, precio_min, categoria, metal }) => {
    try {
        let filtros = [];
        const queryParams = [];

        if (precio_max) {
            filtros.push(`precio <= $${queryParams.length + 1}`);
            queryParams.push(precio_max);
        }
        if (precio_min) {
            filtros.push(`precio >= $${queryParams.length + 1}`);
            queryParams.push(precio_min);
        }
        if (categoria) {
            filtros.push(`categoria = $${queryParams.length + 1}`);
            queryParams.push(categoria);
        }
        if (metal) {
            filtros.push(`metal = $${queryParams.length + 1}`);
            queryParams.push(metal);
        }

        let consulta = "SELECT * FROM inventario";
        if (filtros.length > 0) {
            filtros = filtros.join(" AND ");
            consulta += ` WHERE ${filtros}`;
        }

        const { rows: joyas } = await pool.query(consulta, queryParams);
        return joyas;
    } catch (error) {
        console.error('Error en getJewelsWithFilters:', error.message);
        throw error;
    }
};

module.exports = {
    getJewelsWithFilters,
    jewelryView
};
