const functions = require('firebase-functions');
const admin = require('firebase-admin');
const request = require('request');
const cheerio = require('cheerio');
var db = admin.firestore();

exports = module.exports = functions.https.onRequest((req, res) => {
    let serie = req.query.serie;
    const urlBase = 'https://us-central1-brother-bet.cloudfunctions.net/table?serie=';
    const userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/601.3.9 (KHTML, like Gecko) Version/9.0.2 Safari/601.3.9';
    var table;
    var options = {
        url: urlBase + serie,
        headers: {
            'User-Agent': userAgent
        }
    };
    request(options, (error, response, html) => {
        serie = serie.toUpperCase();
        var page = cheerio.load(html);
        table = JSON.parse(page.text());
        year = new Date().getFullYear().toString();
        var teamsPoints = [];
        for (i = 0; i < table.length; i++) {
            teamsPoints[i] = db.collection("futebol/br" + serie + "/" + year + "/table/teams")
                .doc((i + 1).toString())
                .set(table[i], { merge: true })
        }
        Promise.all(teamsPoints)
            .then(() => {
                throw res.send(table);
            }).catch(error => {
                console.log("Got an error", error);
            });
    });
});