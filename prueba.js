const Firestore = require('@google-cloud/firestore');

const firestore = new Firestore({
  projectId: 'beitlabpage-229801',
  keyFilename: 'BeitLabPage-4adcdc3684ca.json',
});

async function main() {

    const document = firestore.doc('post/intro-to-firestore');
    console.log('Document created');

    // // Enter new data into the document.
    // await document.set({
    //   title: 'Welcome to Firestore',
    //   body: 'Hello World',
    // });
    // console.log('Entered new data into the document');

    // // Update an existing document.
    // await document.update({
    //   body: 'My first Firestore app',
    // });
    // console.log('Updated an existing document');

    // Read the document.
    // let doc = await document.get();
    // console.log('Read the document');

    // console.log(doc);
    // Delete the document.
    await document.delete();
    console.log('Deleted the document');

};

main().catch(console.error);