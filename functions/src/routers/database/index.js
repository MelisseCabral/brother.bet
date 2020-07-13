const admin = require('firebase-admin');
const express = require('express');

const router = express.Router();

const db = admin.firestore();

module.exports = router.get('/', (async (req, res) => {
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
}));
