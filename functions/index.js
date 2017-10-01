const https = require('https');
const http = require('http');
const fs = require('fs');
const ReactDOMServer = require('react-dom/server');
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

// Take the text parameter passed to this HTTP endpoint and insert it into the
// Realtime Database under the path /messages/:pushId/original

exports.addMessage = functions.https.onRequest((req, res) => {
  // Grab the text parameter.
  const original = req.query.text;
  // Push the new message into the Realtime Database using the Firebase Admin SDK.
  admin.database().ref('/messages').push({original: original}).then(snapshot => {
    // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
    res.redirect(303, snapshot.ref);
  });
});


exports.publishPage = functions.database.ref('pages/{id}/lastPublished')
    .onWrite(
        event => {
            console.log(event);
            console.log(event.data.ref.parent);
            return event;
        }
    )
;

exports.render = functions.https.onRequest((req, res) => {
    //http.get( 'http://localhost:5000/node/client.node.js', function( response ){
    https.get( 'https://fbcms.firebaseapp.com/node/client.node.js', function( response ){

        var file = fs.createWriteStream('/tmp/templates.js');

        response.pipe(file)

        file.on('finish', function() {
            file.close(function() {
                const templates = require('/tmp/templates').default;
                const Page = templates.homepage;
                res.send(
                    ReactDOMServer.renderToStaticMarkup(Page({}))
                )
            });
        });

    });
});
