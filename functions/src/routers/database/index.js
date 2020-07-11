const admin = require('firebase-admin');
const express = require('express');

const router = express.Router();

const db = admin.firestore();

module.exports = router.get('/', (async (req, res) => {
  // const data = req.body;
  let result;

  const snapshot = await db
    .collection('neuralNetworks')
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
