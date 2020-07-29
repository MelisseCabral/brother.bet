const admin = require('firebase-admin');

// Init firebase.
const db = admin.firestore();

module.exports = {
  async index(req, res) {
    const nameCol = 'fifaChamptionship';

    const result = await db.collection(nameCol).doc('2020').delete();

    res.send(result);
  },

};
