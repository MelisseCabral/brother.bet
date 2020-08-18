const admin = require('firebase-admin');

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
