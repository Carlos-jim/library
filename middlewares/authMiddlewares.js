const Usuario = require('../models/usuario');
const jwt = require('jsonwebtoken');

async function verificarToken(req, res, next) {
    const token = req.session.token; // Obtén el token de la sesión

    if (!token) {
        return res.redirect('/user/login'); // Redirige al usuario al inicio de sesión
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.usuarioId = decoded.id; // Agrega el ID del usuario al objeto de solicitud
        next(); // Continúa con la siguiente función de middleware o ruta
    } catch (error) {
        return res.redirect('/user/login'); // Redirige al usuario al inicio de sesión si el token es inválido
    }

};

// Función para buscar datos del usuario y otros datos según la necesidad
async function buscarDatos(req, res, nombrePagina, obtenerDatos) {
    try {
        // Asegúrate de que req.usuarioId esté definido
        if (!req.usuarioId) {
            throw new Error('ID de usuario no proporcionado');
        }

        // Obtén los datos del usuario desde la base de datos
        const usuario = await Usuario.findByPk(req.usuarioId);
        if (!usuario) {
            return res.status(404).send('Usuario no encontrado');
        }

        // Obtén los datos específicos según la función obtenerDatos
        const datosEspecificos = await obtenerDatos(req);

        // Renderiza la vista con los datos del usuario y los datos específicos
        res.render(nombrePagina, { usuario: usuario.dataValues, ...datosEspecificos });
    } catch (error) {
        console.error('Error al obtener los datos:', error);
        res.status(500).send('Error al procesar la solicitud');
    }
}

async function buscarUsuario(req) {
    try {
        // Asegúrate de que req.usuarioId esté definido
        if (!req.usuarioId) {
            throw new Error('ID de usuario no proporcionado');
        }

        // Buscar los datos del usuario en la base de datos
        const usuario = await Usuario.findByPk(req.usuarioId);
        if (!usuario) {
            throw new Error('Usuario no encontrado');
        }

        // Retorna los datos del usuario
        return usuario.dataValues;
    } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
        throw error; // O manejar el error según la lógica de tu aplicación
    }
}

/*
async function buscarUsuario(req, res, nombrePagina) {
    try {
        // Asegúrate de que req.usuarioId esté definido
        if (!req.usuarioId) {
            throw new Error('ID de usuario no proporcionado');
        }

        // Buscar los datos del usuario en la base de datos
        const usuario = await Usuario.findByPk(req.usuarioId);
        if (!usuario) {
            return res.status(404).send('Usuario no encontrado');
        }

        // Renderizar la vista especificada con los datos del usuario
        res.render(nombrePagina, { usuario: usuario.dataValues });
    } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
        res.status(500).send('Error al procesar la solicitud');
    }
}*/

module.exports = { verificarToken, buscarDatos, buscarUsuario };