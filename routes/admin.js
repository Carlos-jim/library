const express = require('express');
const Usuario = require('../models/usuario');
const Course = require('../models/carrera');
const multer = require('multer');
const path = require('path');
const jwt = require('jsonwebtoken');
const { verificarToken, buscarDatos, buscarUsuario } = require('../middlewares/authMiddlewares');
const router = express.Router();

// Configuración de Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/uploads'));
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });



// Rutas
router.get('/login/success', (req, res) => {
    res.render('alerts/loginAdmin.ejs', { token: req.session.token });
});

router.get('/dashboard', verificarToken, async (req, res) => {
    const datosDashboard = async (req) => {
        const usuario = await buscarUsuario(req);
        return { usuario };
    };

    await buscarDatos(req, res, 'admin/dashboard', datosDashboard);
});

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


router.get('/users', verificarToken, async (req, res) => {
    const obtenerUsuarios = async (req) => {
        const users = await Usuario.findAll();
        return { users };
    };

    await buscarDatos(req, res, 'admin/usersTable', obtenerUsuarios);
});

router.get('/courses', verificarToken, async (req, res) => {
    const obtenerCursos = async (req) => {
        const courses = await Course.findAll();
        return { courses };
    };

    await buscarDatos(req, res, 'admin/coursesTable', obtenerCursos);
});

router.get('/degreeProjects', verificarToken, async (req, res) => {
    await buscarUsuario(req, res, 'admin/degreeProjectsTable');
});

router.get('/registerCourse', verificarToken, async (req, res) => {
    const datos = async (req) => {
        const usuario = await buscarUsuario(req);
        return { usuario };
    };

    await buscarDatos(req, res, 'admin/registerCourse', datos);
});

// Ruta POST para procesar el formulario y la imagen
router.post('/registerCourse', upload.single('file-1'), async (req, res) => {
    try {
        const imageUrl = `/uploads/${req.file.filename}`; // Construye la URL relativa de la imagen

        // Crear una nueva instancia del modelo Course
        const course = await Course.create({
            title: req.body.tituloCarrera,
            description: req.body.descripcion,
            image_path: imageUrl // Guarda la URL de la imagen
        });

        // Guardar el curso en la base de datos
        await course.save();

        res.status(201).send('Curso registrado con éxito');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al registrar el curso');
    }
});


module.exports = router;