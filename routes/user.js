const express = require('express');
const Usuario = require('../models/usuario');
const Course = require('../models/carrera');
const { verificarToken, buscarDatos, buscarUsuario } = require('../middlewares/authMiddlewares');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Rutas de login y logout
router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/login/success', (req, res) => {
    res.render('alerts/loginSucces.ejs', { token: req.session.token });
});

// Ruta de la pagina principal
router.get('/home', verificarToken, async (req, res) => {

    const datosHome = async (req) => {
        const courses = await Course.findAll();
        return { courses };
    };

    await buscarDatos(req, res, 'home', datosHome);
});

// Rutas del perfil
router.get('/viewProfile', verificarToken, async (req, res) => {
    const datosProfile = async (req) => {
        const usuario = await buscarUsuario(req);
        return { usuario };
    };
    
    await buscarDatos(req, res, 'viewProfile', datosProfile);
});

router.get('/editProfile', verificarToken, async (req, res) => {
    const datosProfile = async (req) => {
        const usuario = await buscarUsuario(req);
        return { usuario };
    };
    
    await buscarDatos(req, res, 'editProfile', datosProfile);
});

// Rutas de las carreras
router.get('/courses', verificarToken, async (req, res) => {
    const obtenerCarreras = async (req) => {
        const courses = await Course.findAll();
        return { courses };
    };

    await buscarDatos(req, res, 'courses', obtenerCarreras);
});

router.get('/courses/course/:courseId', verificarToken, async (req, res) => {
    const id = req.params.courseId;

    // Función para obtener la carrera
    const obtenerCarrera = async (req) => {
        const course = await Course.findByPk(id);
        return { course };
    };

    await buscarDatos(req, res, 'course', obtenerCarrera);
});

// Rutas de los libros

module.exports = router;