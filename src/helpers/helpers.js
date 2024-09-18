/**
 * Prepara los datos para incluir la estructura HATEOAS.
 * @param {Array} inventario - Array de objetos de inventario.
 * @returns {Object} - Objeto HATEOAS que incluye el total y los resultados.
 */
const prepararHATEOAS = (inventario) => {
  // Mapear el inventario para incluir la URL HATEOAS
  const results = inventario.map((i) => {
    return {
      name: i.nombre, // Cambiar m.nombre a i.nombre
      href: `/inventario/joyas/${i.id}`,
    };
  }).slice(0, 4); // Limitar a los primeros 4 elementos

  // Crear el objeto HATEOAS
  const total = inventario.length;
  const HATEOAS = {
    total,
    results
  };

  return HATEOAS;
};

module.exports = { prepararHATEOAS };
