const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/conexion'); // Asegúrate de que este archivo exporte una instancia de Sequelize
//const bcrypt = require('bcryptjs');
const crypto = require('crypto');

class Usuario extends Model { }

Usuario.init({
  // Define los atributos del modelo
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  cedula: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone_number: {
    type: DataTypes.STRING,
    allowNull: false
  },
  user_type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {

  // Opciones adicionales del modelo
  sequelize, // La instancia de conexión
  modelName: 'Usuario', // Nombre del modelo
  tableName: 'users', // Nombre de la tabla en la base de datos
  timestamps: false, // Si no quieres que Sequelize maneje los campos `createdAt` y `updatedAt`
  /*hooks: {
    beforeCreate: async (usuario) => {
      // Encriptar la contraseña antes de guardar el usuario
      return crypto.createHash('sha256').update(usuario.password).digest('hex');
      //usuario.password = await bcrypt.hash(usuario.password, 2);
    }
  }*/
});

module.exports = Usuario;
