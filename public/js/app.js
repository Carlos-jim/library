const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');

const app = express();

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(express.static('public'))
app.use(express.static('node_modules'))
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    const pageTitle = "Iniciar sesión biblioteca UBV";
    res.render('login', { pageTitle });
})  

app.get('/login', (req, res) => {
    const pageTitle = "Iniciar sesión biblioteca UBV";
    res.render('login', { pageTitle });
})  

app.get('/register', (req, res) => {
    const pageTitle = "Registrarse biblioteca UBV";
    res.render('register', { pageTitle });
})  

app.get('/home', (req, res) => {
    const pageTitle = "Inicio";
    res.render('home', { pageTitle });
})  

app.get('/profile', (req, res) => {
    const pageTitle = "Perfil";
    res.render('profile', { pageTitle });
})  

app.get('/courses', (req, res) => {
    const pageTitle = "Carreras";
    res.render('courses', { pageTitle });
})

app.get('/editar', (req, res) => {
    const pageTitle = "Editar";
    res.render('editProfile', { pageTitle });
})

app.get('/datos', (req, res) => {
    const pageTitle = "Datos";
    res.render('viewProfile', { pageTitle });
})

app.get('/usuarios', (req, res) => {
    const pageTitle = "Usuarios";
    res.render('users', { pageTitle });
})


app.get('/degree_projects', (req, res) => {
    const pageTitle = "Trabajos de grado";
    res.render('degree_projects', { pageTitle });
})

app.get('/propuestas', (req, res) => {
    const pageTitle = "Propuestas";
    res.render('propuesta', { pageTitle });
})

app.get('/registro-contenido', (req, res) => {
    const pageTitle = "Registro contenido";
    res.render('registrocont', { pageTitle });
})

puerto=3000
app.listen(puerto)
