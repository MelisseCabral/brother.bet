const admin = require('firebase-admin');

const db = admin.firestore();

const nameCollection = 'databaseConsistency';

module.exports = class DatabaseConsistencyController {
  async create(req, res) {
    const { type } = req.query;
    const data = req.body;

    const response = await db.collection(nameCollection).doc(type).set(data);

    res.send(response);
  }

  async index(req, res) {
    const { type } = req.query;

    const doc = await db.collection(nameCollection).doc(type).get();
    res.send(doc.data());
  }
};
