/* eslint-disable import/no-unresolved */
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const app = require('express')();
const cors = require('cors');

// Init firebase.
admin.initializeApp(functions.config().firebase);
admin.firestore().settings({ timestampsInSnapshots: true });

// Automatically allow cross-origin requests
app.use(cors());

// Routers requires and calls.
app.use('/getCsv', require('./src/routers/fifa/getCSV'));
app.use('/create', require('./src/routers/database/create'));
app.use('/index', require('./src/routers/database/index'));

exports.app = functions.https.onRequest(app);

// const engine = require('consolidate');
// const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');

// // Define of browser request.
// app.engine('html', engine.handlebars);
// app.set('views', './views');
// app.set('view engine', 'html');
// app.use(cookieParser('br0th3r'));
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// // Middleware Firebase Auth Validation.
// // app.use(require('./src/routers/auth/authValidation'));

// exports.app = functions.https.onRequest(app);

// // Render the htmls.
// app.get('/', (req, res) => {
//   res.render('home');
// });
