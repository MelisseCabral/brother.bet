const functions = require('firebase-functions');

const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);
admin.firestore().settings({ timestampsInSnapshots: true });

// Init firebase.
const db = admin.firestore();

module.exports = {
  async index(req, res) {
    const nameCol = 'fifaChamptionship';
    const { year } = req.query;
    try {
      const collections = await db.collection(nameCol).doc(year).listCollections();
      const collectionIds = collections.map((col) => col.id);

      res.send(collectionIds);
    } catch (error) {
      res.send(error);
    }
  },

};
