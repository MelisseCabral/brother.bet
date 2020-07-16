const admin = require('firebase-admin');

// Init firebase.

const db = admin.firestore();

module.exports = {
  async create(req, res) {
    const nameCol = 'neuralNetworks';
    const nameDoc = 'indivualsNN';
    const data = req.body;
    const time = data.timestamp;
    const { nameSet } = req.query;
    try {
      const response = await db.collection(nameCol).doc(nameDoc)
        .collection(nameSet).doc(time.toString())
        .set(data);

      res.send(response);
    } catch (error) {
      res.status(error.code).json(error);
    }
  },

  async index(req, res) {
    const nameCol = 'neuralNetworks';
    const nameDoc = 'indivualsNN';
    const { nameSet } = req.query;
    let result;

    const snapshot = await db
      .collection(nameCol)
      .doc(nameDoc)
      .collection(nameSet)
      .orderBy('loss', 'asc')
      .limit(1)
      .get();

    if (snapshot.empty) {
      return res.send('No matching documents.');
    }

    snapshot.forEach((doc) => {
      result = doc.data();
    });

    return res.send(result);
  },

};
