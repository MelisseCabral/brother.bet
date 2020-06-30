/* eslint-disable no-unused-vars */
/* eslint-disable no-extend-native */
const admin = require('firebase-admin');
const express = require('express');

const router = express.Router();

module.exports = router.use(async (req, res, next) => {
  if (req.path = '/') res.render('index');

  if (req.body['Header-Autorization']) {
    admin.auth().verifyIdToken(req.body['Header-Autorization'])
      .then(() => next())
      .catch((error) => res.status(403).json({ error, message: 'No credentials sent!' }));
  }
});
