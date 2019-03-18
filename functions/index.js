const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const engine = require('consolidate');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();

// Automatically allow cross-origin requests
app.use(cors());

//Routers requires and calls.
app.use('/testRead', require('./getter/testRead'))
app.use('/birds', require('./getter/birds'))
app.use('/getReadable', require('./getter/getReadable'))

app.engine('html', engine.handlebars);
app.set('views', './views');
app.set('view engine', 'html');
app.use(cookieParser('1lum1n3'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

admin.initializeApp(functions.config().firebase);
admin.firestore().settings({ timestampsInSnapshots: true });


app.post('/home', (req, res) => {
    res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
    res.render('home');
});

app.get('/', (req, res) => {
    res.render('index');
});

exports.getReadable = require('./getter/getReadable');

exports.app = functions.https.onRequest(app);
