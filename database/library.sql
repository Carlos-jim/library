CREATE DATABASE library;

USE library;

CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    cedula VARCHAR(20) NOT NULL,
    name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone_number VARCHAR(100) UNIQUE NOT NULL,
    user_type ENUM('Estudiante', 'Profesor', 'Administrador') NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    registration_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    logged_in BOOLEAN DEFAULT 0,
    deleted BOOLEAN DEFAULT 0
);

CREATE TABLE courses (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    image_path VARCHAR(255)
);

CREATE TABLE proposal_courses (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    image_path VARCHAR(255)
);

CREATE TABLE projects (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL, 
    project_path VARCHAR(255) NOT NULL
);

CREATE TABLE proposal_projects (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL, 
    project_path VARCHAR(255) NOT NULL
);

CREATE TABLE books (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    book_path VARCHAR(255) NOT NULL,
    image_path VARCHAR(255) NOT NULL,
    id_course INT NOT NULL,
    FOREIGN KEY (id_course) REFERENCES courses(id)
);

CREATE TABLE proposal_books (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    book_path VARCHAR(255) NOT NULL,
    image_path VARCHAR(255) NOT NULL,
    id_course INT NOT NULL,
    FOREIGN KEY (id_course) REFERENCES courses(id)
);

-- Insertando datos a la tabla users
INSERT INTO users (cedula, name, last_name, phone_number, user_type, email, password) VALUES
('12345678', 'Juan', 'Estudiante', '04121234567', 'Estudiante', 'juan@gmail.com', '12345'),
('87654321', 'Maria', 'Profesor', '04127654321', 'Profesor', 'maria@gmail.com', '12345'),
('12348765', 'Carlos', 'Administrador', '04129876543', 'Administrador', 'carlos@gmail.com', '12345');

-- Insertando datos a la tabla courses
INSERT INTO courses (title, description, image_path) VALUES
('Administracion',
' Administración prepara líderes con visión estratégica para optimizar recursos y alcanzar objetivos organizacionales en un entorno globalizado.',
'/uploads/1714482186985-administracion.jpg'),

('Contabilidad',
'La contabilidad es esencial para la gestión financiera, enfocada en el análisis y reporte de transacciones económicas para informar decisiones de negocio.',
'/uploads/1714483033190-contabilidad.jpg'),

('Informatica', 
'Informática se centra en el desarrollo y aplicación de tecnologías para el procesamiento y gestión de información en diversos campos.',
'/uploads/1714709639511-informatica.jpg'),

('Medicina',
'La medicina es una disciplina que combina ciencia y compasión, enfocada en el cuidado integral de la salud. Forma expertos en diagnóstico y tratamiento de enfermedades.',
'/uploads/1714592864479-enfermeria.jpg');



