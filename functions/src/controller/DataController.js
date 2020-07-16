const admin = require('firebase-admin');

// Init firebase.
const db = admin.firestore();

module.exports = {
  async create(req, res) {
    const nameCol = 'fifaChamptionship';
    const data = req.body;
    const year = data.date.split('.')[0];

    const response = await db.collection(nameCol).doc(year)
      .collection(data.date).doc(data.id)
      .set(data);

    res.send(response);
  },

  async index(req, res) {
    const nameCol = 'fifaChamptionship';
    const { year, date } = req.query;
    const files = [];

    const snapshot = await db.collection(nameCol).doc(year).collection(date).get();
    snapshot.forEach((doc) => {
      files.push(doc.data());
    });

    res.send(files[0]);
  },

};
