/* eslint-disable no-use-before-define */
const admin = require('firebase-admin');
const express = require('express');

const router = express.Router();

const db = admin.firestore();

module.exports = router.post('/', (async (req, res) => {
  const name = 'neuralNetworks';
  const data = req.body;
  const time = data.timestamp;

  const response = await db.collection(name).doc(time.toString()).set(data);
  res.send(response);
}));
