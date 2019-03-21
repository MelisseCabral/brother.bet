const functions = require('firebase-functions');
const admin = require('firebase-admin');
var request = require("request")
var requestPromise = require("request-promise")

exports = module.exports = functions.https.onRequest((req, res) => {
    let serie = req.query.serie;
    var promises = []
    for (i = 0; i < 38; i++) {
        urlBase = "https://us-central1-brother-bet.cloudfunctions.net/updateTurn?serieTurn=a-"
        url = urlBase + serie + '+' + (i+1).toString();
        promises[i] = requestPromise(url)
    }
    Promise.all(promises)
        .then(() => {
            throw res.send("All done!");
        }).catch(error => {
            console.log("Got an error", error);
        });
});