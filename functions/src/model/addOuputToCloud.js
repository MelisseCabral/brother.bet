/* eslint-disable no-use-before-define */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
const admin = require('firebase-admin');
const fs = require('fs');

// Init firebase.
const db = admin.firestore();

const main = async () => {
  const nameCol = 'fifaChamptionship';
  const data = await readDebugPage();
  const year = data.date.split('.')[0];

  await db
    .collection(nameCol)
    .doc(year)
    .collection(data.date)
    .doc(data.id)
    .set(data);
};

const readDebugPage = async () => new Promise((resolve, reject) => {
  fs.readFile('./debug/output.json', 'utf8', (err, data) => {
    if (!err) {
      resolve(data);
    } else {
      reject(err);
    }
  });
});

main();
