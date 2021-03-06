const https = require('https');
const http = require('http');
const fs = require('fs');
const ReactDOMServer = require('react-dom/server');
const functions = require('firebase-functions');
const _ = require('lodash');
const { URL } = require('url');

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

    // TODO: Don't capture css/js/images, etc -- only catch routes
    const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    const urlObj = new URL(fullUrl);
    const urlIdentifier = _.last(_.split(urlObj.pathname, '/'));

    const metaPageDataPromise = getPageFromUrlIdentifier(admin.database(), urlIdentifier);
    const pageDataPromise = metaPageDataPromise
        .then(
            metaPageData => getPageDataForPageId(admin.database(), _.get(metaPageData, 'id'))
        )
    ;

    Promise.all([
        metaPageDataPromise,
        pageDataPromise
    ])
        .then(
            ([metaPageData, pageData]) => {

                const Templates = require('./templates').default;
                const template = _.get(metaPageData, 'template');

                //const Templates = require('./templates').default;
                const Page = Templates[template];
                if (Page) {
                    res.send(
                        ReactDOMServer.renderToStaticMarkup(
                            Page({
                                bodyProps: pageData
                            })
                        )
                    );
                }
                else {
                    res.send(404, new Error(`Template '${template}' not found. Do you have a React Component called '${_.upperFirst(template)}'?`).toString());
                }

            }
        )
    ;

});

// TODO: Handle multiple url identifiers ( at different paths )
function getPageFromUrlIdentifier(database, urlIdentifier) {
    return database
        .ref('/pages')
        .orderByChild('slug')
        .equalTo(urlIdentifier)
        .once('value')
        .then( snapshot => _.first(_.values(snapshot.val())))
    ;
}

function getPageDataForPageId(database, pageId) {
    return database
        .ref(`/pageContent/${pageId}`)
        .once('value')
        .then( snapshot => snapshot.val())
    ;
}
