const betfair = require('betfair');
const async = require('async');
const session = new betfair.BetfairSession('WlyzyQfAXOW76Xr5');

const name = 'juloko';
const password = 'h1dr4t4nt3';

var haha = 'getAccountFunds'
var response;

async.series([login, keepAlive, () => {
    response = getReadable()
}, logout], function (err) {
    console.log(err ? "Error " + err : "Done!");
    process.exit(0);
});

function login(callback) {
    session.login(name, password, function (err, res) {
        console.log(err ? "Login failed " + err : "Login OK ");
        callback(err, res);
    });
}

function keepAlive(callback) {
    session.keepAlive(function (err, res) {
        console.log(err ? "Keep Alive failed " + err : "Keep Alive OK");
        callback(err, res);
    });
}

function logout(callback) {
    session.logout(function (err, res) {
        console.log(err ? "Logout failed " + err : "Logout OK");
        console.log(response);
        callback(err, res);
    });
}

function getReadable() {
    session[haha]({ filter: {} }, function (err, res) {
        if (err) {
            console.log('listCountries failed');
        } else {
            console.log(res)
            return res;
        }
    });
}

