const admin = require('firebase-admin');

const db = admin.firestore();

const nameDocument = 'indivualsNN';
const nameCollection = 'neuralNetworks';

module.exports = class NeuralNetworkController {
  async index(req, res) {
    const { nameSet } = req.query;
    let result;

    const snapshot = await db
      .collection(nameCollection)
      .doc(nameDocument)
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
  }

  async create(req, res) {
    const data = req.body;
    const time = data.timestamp;
    const { nameSet } = req.query;
    try {
      const response = await db
        .collection(nameCollection)
        .doc(nameDocument)
        .collection(nameSet)
        .doc(time.toString())
        .set(data);

      res.send(response);
    } catch (error) {
      res.status(error.code).json(error);
    }
  }
};
