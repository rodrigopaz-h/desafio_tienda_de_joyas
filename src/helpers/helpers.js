const prepararHATEOAS = (inventario) => {
  const results = inventario.map((i) => {
    return {
      name: i.nombre,
      href: `/inventario/joyas/${i.id}`,
    };
  }).slice(0, 4);

  const total = inventario.length;
  const HATEOAS = {
    total,
    results
  };

  return HATEOAS;
};

module.exports = { prepararHATEOAS };
