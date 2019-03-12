const functions = require('firebase-functions');
const admin = require('firebase-admin');
const request = require('request');
const cheerio = require('cheerio');
const betfair = require('betfair');
const async = require('async');

admin.initializeApp(functions.config().firebase);
admin.firestore().settings({ timestampsInSnapshots: true });

exports.table = require('./getBigBr/getTable');

exports.turn = require('./getBigBr/getTurn');

exports.updateTable = require('./database/updateTable');

exports.updateTurn = require('./database/updateTurn');

exports.updateTurns = require('./database/updateTurns');

exports.readableBetfair = require('../src/readable');