const admin = require('firebase-admin');

// Init firebase.

const db = admin.firestore();

module.exports = {
  async create(req, res) {
    const nameCol = 'databaseConsistency';
    const { type } = req.query;
    const data = req.body;

    const response = await db.collection(nameCol).doc(type).set(data);

    res.send(response);
  },

  async index(req, res) {
    const nameCol = 'databaseConsistency';
    const { type } = req.query;

    const doc = await db.collection(nameCol).doc(type).get();
    res.send(doc.data());
  },

};
