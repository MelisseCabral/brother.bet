const admin = require('firebase-admin');
const functions = require('firebase-functions');

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://brother-bet.firebaseio.com"
});

admin.firestore().settings({ timestampsInSnapshots: true });
