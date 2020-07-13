/* eslint-disable no-use-before-define */
const admin = require('firebase-admin');
const express = require('express');

const router = express.Router();

const db = admin.firestore();

module.exports = router.post('/', (async (req, res) => {
  const nameCol = 'neuralNetworks';
  const nameDoc = 'indivualsNN';
  const data = req.body;
  const time = data.timestamp;
  const { nameSet } = req.query;

  const response = await db.collection(nameCol).doc(nameDoc)
    .collection(nameSet).doc(time.toString())
    .set(data);

  res.send(response);
}));
