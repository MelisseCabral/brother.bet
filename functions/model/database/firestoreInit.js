const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

class FirestoreInit {
  constructor() {
    this.admin = admin;
    this.serviceAccount = serviceAccount;
    this.databaseURL = 'https://brother-bet.firebaseio.com';

    this.initialize();
    this.configFirestore();
  }

  initialize() {
    this.admin.initializeApp({
      credential: admin.credential.cert(this.serviceAccount),
      databaseURL: this.databaseURL,
    });
  }

  configFirestore() {
    this.admin.firestore().settings({ timestampsInSnapshots: true });
  }
}

module.exports = new FirestoreInit().admin;
