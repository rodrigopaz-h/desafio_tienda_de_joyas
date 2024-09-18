const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: '2232',
    database: 'joyas',
    port: 5432,
    allowExitOnIdle: true
});

const createTable = async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS inventario (
                id SERIAL,
                nombre VARCHAR(50),
                categoria VARCHAR(50),
                metal VARCHAR(50),
                precio INT,
                stock INT
            );
        `);
        console.log('Tabla creada o ya existe.');
    } catch (error) {
        console.error('Error al crear la tabla:', error);
    }
};


module.exports = {
    pool,
    createTable
};
