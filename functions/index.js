const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const { errors } = require('celebrate');

const routes = require('./src/routes');

const app = express();

// Init firebase.

// Automatically allow cross-origin requests
app.use(cors(
  // origin: ''
));

// Routers requires and calls.
app.use(express.json());
app.use(routes);
app.use(errors());

exports.app = functions
  .runWith({
    timeoutSeconds: 300,
    memory: '1GB',
  })
  .https.onRequest(app);

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
