const functions = require('firebase-functions');
const admin = require('firebase-admin');
const request = require('request');
const cheerio = require('cheerio');
var db = admin.firestore();

exports = module.exports = functions.https.onRequest((req, res) => {
    console.log(req.query.serieTurn);
    let serieTurn = req.query.serieTurn.split('-');
    let serie = serieTurn[0];
    var n_turns = serieTurn[1];
    const urlBase = 'https://us-central1-brother-bet.cloudfunctions.net/turn?serieTurn=';
    const userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/601.3.9 (KHTML, like Gecko) Version/9.0.2 Safari/601.3.9';
    var options = {
        url: urlBase + serie + '-' + n_turns,
        headers: {
            'User-Agent': userAgent
        }
    };
    request(options, (error, response, html) => {
        serie = serie.toUpperCase();
        var page = cheerio.load(html);
        turns = JSON.parse(page.text());
        year = new Date().getFullYear().toString();
        var turnsResult = [];
        for (i = 0; i < turns.length; i++) {
            turnsResult[i] = db.doc("futebol/br" + serie + "/" + year + "/turns/")
                .collection(n_turns.toString()).doc((i + 1).toString()).set(turns[i], { merge: true });
        }
        Promise.all(turnsResult)
            .then(() => {
                throw res.send(turns);
            }).catch(error => {
                console.log("Got an error", error);
            });
    });
});

