'use strict'

//dependencias
const Firestore = require('@google-cloud/firestore');

//config database
const firestore = new Firestore({
    projectId: 'beitlabpage-229801',
    keyFilename: 'BeitLabPage-4adcdc3684ca.json',
  });

//métodos
function getDemos(req,res){
      
    const document = firestore.collection('Demos');
      
    document.get().then((snapshot)=>{
    snapshot.forEach((doc)=>{
        console.log(doc.data());
        res.json(doc.data());
    });
    })
    .catch((err) => {
    console.log('Error getting documents', err);
    });   
}


module.exports = {
    getDemos
}