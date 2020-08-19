const admin = require('firebase-admin');

const db = admin.firestore();

const RobotFifaArena = require('../model/resource/RobotFifaArena');

module.exports = {
  async index(req, res) {
    while (true) await mainUpdate(req.query);
  },
};

const mainUpdate = async ({ year }) => {
  try {
    const nameCollection = 'fifaChamptionship';

    const daysToFilter = await getDaysToFilter(nameCollection, year);

    const robot = new RobotFifaArena();
    const database = await robot.main(daysToFilter, year, '2020-01-01');

    await updateCloud(nameCollection, year, database);

    const bundle = await getBundleCloud(nameCollection, year);
    const hashNumber = robot.hash(bundle);
    await updateConsistency({ aggregatedSet: hashNumber });

    await delay(600);
  } catch (error) {
    console.log(error);
  }
};

const getDaysToFilter = async (nameCollection, year) => {
  try {
    const collections = await db.collection(nameCollection).doc(year).listCollections();
    const daysToFilter = collections.map((col) => col.id);

    return daysToFilter;
  } catch (error) {
    throw error;
  }
};

const updateData = async (nameCollection, year, data) => {
  try {
    const response = await db
      .collection(nameCollection)
      .doc(year)
      .collection(data.date)
      .doc(data.id)
      .set(data);

    return response;
  } catch (error) {
    throw error;
  }
};

const delay = (timeSeconds) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeSeconds * 1000);
  });
};

const deleteDocument = async (nameCollection, year, nameDoc) => {
  try {
    const response = await db
      .collection(nameCollection)
      .doc(year)
      .collection(data.date)
      .doc(danameDocta.id)
      .delete();
    return response;
  } catch (error) {
    throw error;
  }
};

const deleteCollection = async (db, collectionPath, batchSize) => {
  const deleteQueryBatch = async (db, query, resolve) => {
    const snapshot = await query.get();

    const batchSize = snapshot.size;
    if (batchSize === 0) {
      // When there are no documents left, we are done
      resolve();
      return;
    }

    // Delete documents in a batch
    const batch = db.batch();
    snapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });
    await batch.commit();

    // Recurse on the next process tick, to avoid
    // exploding the stack.
    process.nextTick(() => {
      deleteQueryBatch(db, query, resolve);
    });
  };

  const collectionRef = db.collection(collectionPath);
  const query = collectionRef.orderBy('__name__').limit(batchSize);

  return new Promise((resolve, reject) => {
    deleteQueryBatch(db, query, resolve).catch(reject);
  });
};

const updateCloud = async (nameCollection, year, database) => {
  try {
    database.forEach(async (data) => {
      await updateData(nameCollection, year, data);
    });
  } catch (error) {
    throw error;
  }
};

const getBundleCloud = async (nameCollection, year) => {
  try {
    const files = [];
    const snapshots = [];

    const collections = await db.collection(nameCollection).doc(year).listCollections();
    const dates = collections.map((col) => col.id);

    for (const date of dates) {
      snapshots.push(db.collection(nameCollection).doc(year).collection(date).get());
    }

    return new Promise((resolve) => {
      Promise.all(snapshots)
        .then((results) => {
          results.forEach((snapshot) => {
            snapshot.forEach((doc) => files.push(doc.data()));
          });
          resolve(files);
        })
        .catch((error) => console.log('Got an error', error));
    });
  } catch (error) {
    throw error;
  }
};

const updateConsistency = async (data) => {
  try {
    const nameCollection = 'databaseConsistency';

    const response = await db.collection(nameCollection).doc('whole').set(data);

    return response;
  } catch (error) {
    throw error;
  }
};
