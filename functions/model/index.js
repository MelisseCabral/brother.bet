const functions = require('firebase-functions');

const App = require('./App');

const app = new App().server;

exports.app = functions
  .runWith({
    timeoutSeconds: 540,
    memory: '1GB',
  })
  .https.onRequest(app);
