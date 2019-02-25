"use strict"

//Dependencias del servidor
const app = require('./app')            //Importa el servidor app
const path = require('path')            //Importa la libreria de rutas
const config = require('./config')      //Importa el modulo de configuraciones globales
const Firestore = require('@google-cloud/firestore');

const firestore = new Firestore({
  projectId: 'beitlabpage-229801',
  keyFilename: 'BeitLabPage-4adcdc3684ca.json',
});

//const document = firestore.doc('post/intro-to-firestore');
const document = firestore.collection('Demos');
// document.get()
//     .then((snapshot) => {
//       snapshot.forEach((doc) => {
//         console.log(doc.id, '=>', doc.data());
//       });
//     })
//     .catch((err) => {
//       console.log('Error getting documents', err);
//     });

    document.get().then((snapshot)=>{
      snapshot.forEach((doc)=>{
        console.log(doc.data().Creado_Por);
      });
    })
    .catch((err) => {
      console.log('Error getting documents', err);
    });

app.listen(config.port,(err)=>{
    console.log(`Servidor ejecutandose en http://${app.address().address}:${config.port}`)
});        