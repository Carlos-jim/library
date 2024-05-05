const express = require('express');
const Usuario = require('../models/usuario');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Buscar el usuario por email
        const usuario = await Usuario.findOne({ where: { email } });

        // Si no se encuentra el usuario, enviar error
        if (!usuario) {
            return res.status(401).json({ error: 'Correo o contraseña incorrectos' });
        }

        // Si la contraseña no es válida, enviar error
        if (password !== usuario.password) {
            return res.status(401).json({ error: 'Correo o contraseña incorrectos' });
        }

        // Crear el token con el id del usuario
        const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET);

        // Guardar el token en la sesión
        req.session.token = token;

        // Redirigir al usuario a la ruta que manejará la alerta de SweetAlert
        if (usuario.user_type == 'Estudiante' || usuario.user_type == 'Profesor') {
            res.redirect('/user/login/success');
        };

        if (usuario.user_type == 'Administrador') {
            res.redirect('/admin/login/success');
        };
        

    } catch (error) {
        console.error('Error durante el inicio de sesión:', error);
        res.status(500).json({ error: 'Algo salió mal en el proceso de inicio de sesión' });
    }
});

router.get('/logout/success', (req, res) => {
    res.render('alerts/logout.ejs');
});

router.get('/logout', (req, res) => {
    // Eliminar el token de la sesión
    delete req.session.token;

    // Redirigir al usuario a la página de inicio de sesión o a la página principal
    res.redirect('/auth/logout/success');
});


module.exports = router;
