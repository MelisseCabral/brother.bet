/* eslint-disable import/no-unresolved */
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const app = require('express')();
const engine = require('consolidate');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// Init firebase.
admin.initializeApp(functions.config().firebase);
admin.firestore().settings({ timestampsInSnapshots: true });

// Automatically allow cross-origin requests
app.use(cors());

// Define of browser request.
app.engine('hbs', engine.handlebars);
app.set('views', './views');
app.set('view engine', 'hbs');
app.use(cookieParser('1lum1n3'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Middleware Firebase Auth Validation.
app.use(require('./src/routers/auth/authValidation'));

// Routers requires and calls.
app.use('/getCsv', require('./src/routers/fifa/getCsv'));

// Render the htmls.
app.post('/home', (req, res) => {
  res.render('home');
});

exports.app = functions.https.onRequest(app);
