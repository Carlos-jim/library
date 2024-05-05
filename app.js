require('dotenv').config(); 

const express = require('express');
const session = require('express-session');
const ejs = require('ejs');
const fs = require('fs');
const https = require('https');
const db = require('./database/conexion'); 

const app = express();

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); 

app.set('view engine', 'ejs');

// Configuración de la sesión
app.use(session({
  secret: process.env.SESSION_SECRET, 
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true } // Habilitar cookies seguras (requiere HTTPS)
}));

// Montado de rutas
app.get('/', (req, res) => {
    res.render('login'); 
});

// Rutas de autenticación
app.use('/auth', require('./routes/auth'));
app.use('/new', require('./routes/registro'));
app.use('/user', require('./routes/user'));
app.use('/admin', require('./routes/admin'));



// Configuración de HTTPS
const opcionesHttps = {
  key: fs.readFileSync(process.env.PATH_TO_KEY), // Ruta al archivo de clave privada
  cert: fs.readFileSync(process.env.PATH_TO_CERT), // Ruta al archivo de certificado
  //ca: fs.readFileSync(process.env.PATH_TO_CA_BUNDLE) //Ruta al archivo del bundle CA (si es necesario)
};

// Inicio del servidor
const PORT = process.env.PORT || 3000;
https.createServer(opcionesHttps, app).listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT} con HTTPS`);
  console.log(`Haz clic aquí para abrir en el navegador: https://localhost:${PORT}`);
});


