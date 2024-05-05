const { DataTypes } = require('sequelize');
const sequelize = require('../database/conexion'); // Asegúrate de importar tu instancia de Sequelize

const Course = sequelize.define('Course', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    image_path: {
        type: DataTypes.STRING(255),
    },
}, {
    // Deshabilita la creación automática de las columnas 'createdAt' y 'updatedAt'
    timestamps: false,
});

module.exports = Course;
