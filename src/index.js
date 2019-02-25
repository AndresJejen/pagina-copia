"use strict"

//Dependencias del servidor
const app = require('./app')            //Importa el servidor app
const path = require('path')            //Importa la libreria de rutas
const config = require('./config')      //Importa el modulo de configuraciones globales

app.listen(config.port,(err)=>{
    console.log(`Servidor ejecutandose en http://${app.address().address}:${config.port}`)
});        