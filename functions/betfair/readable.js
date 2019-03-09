const functions = require('firebase-functions');
const betfair = require('betfair');
const async = require('async');
const security = require('./security');
const session = new betfair.BetfairSession(security.apiKey);

exports = module.exports = functions.https.onRequest((req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    let result;
    let response;
    if (req.query.docId === undefined) {
        result = req.body;
    } else {
        result = req.query;
    }

    async.series([login, keepAlive, () => {
        response = getReadable()
    }, logout], (err) => {
        console.log(err ? "Error " + err : "Done!");
    });

    throw res.send(response)
});


function login(callback) {
    session.login(security.login, security.password, (err, res) => {
        console.log(err ? "Login failed " + err : "Login OK ");
        callback(err, res);
    });
}

function keepAlive(callback) {
    session.keepAlive((err, res) => {
        console.log(err ? "Keep Alive failed " + err : "Keep Alive OK");
        callback(err, res);
    });
}

function logout(callback) {
    session.logout((err, res) => {
        console.log(err ? "Logout failed " + err : "Logout OK");
        callback(err, res);
    });
}

function getReadable() {
    session[result.method]({ filter: {} }, (err, res) => {
        if (err) {
            console.log('listCountries failed');
            return err;

        } else {
            console.log(res)
            return res;
        }
    });
}