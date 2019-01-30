"use strict"

//Dependencias del servidor
const app = require('./app')            //Importa el servidor app
const path = require('path')            //Importa la libreria de rutas
const config = require('./config')      //Importa el modulo de configuraciones globales
const mongoose = require('mongoose');

//Conexion Base de datos y lanzamiento del servidor
mongoose.connect(`mongodb://${config.MONGODB_USER}:${config.MONGODB_PASSWORD}@${config.MONGODB_CONNSTR}:${process.env.MONGODB_PORT}/${config.MONGODB_DB}`,
{
  useNewUrlParser:true
})
  .then(() => {
        console.log('Connection to MLab MongoDb successful OK')
        //Ejecución del servidor
        app.listen(config.port,(err)=>{
            console.log(`Servidor ejecutandose en http://${app.address().address}:${config.port}`)
        });        
    })
  .catch((err) => {
    console.error(err);
});