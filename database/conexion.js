const { Sequelize } = require('sequelize');

// Crear una nueva instancia de Sequelize
const sequelize = new Sequelize('library', 'root', 'admin123', {
  host: 'localhost',
  dialect: 'mysql'
});

// Conectar a la base de datos
sequelize.authenticate()
  .then(() => {
    console.log('Conectado a la base de datos MySQL con Sequelize');
  })
  .catch(err => {
    console.error('Error al conectar con la base de datos:', err);
  });

module.exports = sequelize;
