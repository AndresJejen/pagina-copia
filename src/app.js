'use strict'

//declaracion de las dependencias
const express = require('express');
const ejs = require('ejs');
const app = express();
const server = require('http').Server(app);
const path = require('path');

//Motor de plantillas
app.set('views', path.join(__dirname,'views'));
app.set('view engine','ejs');

//archivos estaticos
app.use(express.static(path.join(__dirname,'public')));

//rutas
app.use('/Demos/',require('./routes/demos.routes'));
app.use('/',require('./routes/general.routes'));

module.exports = server;

