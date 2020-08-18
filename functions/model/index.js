const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const { errors } = require('celebrate');

const routes = require('./routes');

const app = express();

// Init firebase.

// Automatically allow cross-origin requests.
app.use(cors(
  // origin: ''
));

// Routers requires and calls.
app.use(express.json());
app.use(routes);
app.use(errors());

exports.app = functions
  .runWith({
    timeoutSeconds: 540,
    memory: '1GB',
  })
  .https.onRequest(app);
