const express = require('express');
const Usuario = require('../models/usuario'); // Asegúrate de que este modelo esté definido con Sequelize
const router = express.Router();

router.get('/register', (req, res) => {
    res.render('register');
});

// En tu archivo de rutas de Express
router.get('/register/success', (req, res) => {
  res.render('alerts/registerSuccess.ejs');
});


router.post('/register', async (req, res) => {
  const { cedula, name, last_name, phone_number, user_type, email, password } = req.body;
  console.log(req.body);
  try {
    // Encriptar la contraseña antes de guardarla en la base de datos
    //const passwordHash = await bcrypt.hash(password, 10);

    // Crear un nuevo usuario con el modelo Usuario de Sequelize
    const nuevoUsuario = await Usuario.create({
      cedula,
      name,
      last_name,
      phone_number,
      user_type,
      email,
      password
    });

    // Si todo sale bien, enviar una respuesta de éxito
    //res.status(201).send('Usuario registrado exitosamente');

    if (nuevoUsuario) {
      // Redirigir al usuario a una página con la alerta de SweetAlert
      res.redirect('/new/register/success');
    }
  } catch (err) {
    console.error(err);
    // Enviar una respuesta de error si algo sale mal
    res.status(500).send('Error al registrar usuario');
  }
});

module.exports = router;
