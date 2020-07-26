/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
const admin = require('firebase-admin');

// Init firebase.
const db = admin.firestore();

module.exports = {
  async create(req, res) {
    const nameCol = 'fifaChamptionship';
    const data = req.body;
    const year = data.date.split('.')[0];

    const response = await db
      .collection(nameCol)
      .doc(year)
      .collection(data.date)
      .doc(data.id)
      .set(data);

    res.send(response);
  },

  async bundle(req, res) {
    const nameCol = 'fifaChamptionship';
    const { year } = req.query;
    const files = [];
    const snapshots = [];

    const collections = await db
      .collection(nameCol)
      .doc(year)
      .listCollections();
    const dates = collections.map((col) => col.id);

    for (const date of dates) {
      snapshots.push(db.collection(nameCol).doc(year).collection(date).get());
    }

    Promise.all(snapshots)
      .then((results) => {
        results.forEach((snapshot) => {
          snapshot.forEach((doc) => files.push(doc.data()));
        });
        res.send(files);
      })
      .catch((error) => console.log('Got an error', error));
  },

  async index(req, res) {
    const nameCol = 'fifaChamptionship';
    const { year, date } = req.query;
    const files = [];

    const snapshot = await db
      .collection(nameCol)
      .doc(year)
      .collection(date)
      .get();

    if (snapshot.empty) return res.send('No matching document.');

    snapshot.forEach((doc) => {
      files.push(doc.data());
    });

    return res.send(files[0]);
  },
};
