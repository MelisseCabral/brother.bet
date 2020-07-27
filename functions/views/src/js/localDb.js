/* eslint-disable no-new */
class LocalDb {
  static createTableDB(incomeData, indexName = '', key = '') {
    const tableName = Object.key(incomeData)[0];
    let data = incomeData[tableName];
    if (!Array.isArray(data)) data = [data];

    const request = indexedDB.open(tableName, 2);

    request.onupgradeneeded = (event) => {
      const database = event.target.result;

      const configObjectStore = { autoIncrement: true };
      if (key) configObjectStore.keyPath = key;
      const objectStore = database.createObjectStore(tableName, configObjectStore);

      if (indexName) objectStore.createIndex(indexName, indexName, { unique: true });

      objectStore.transaction.oncomplete = () => {
        const store = database
          .transaction(tableName, 'readwrite')
          .objectStore(tableName);
        data.forEach(async (each) => store.add(each));
      };
    };

    request.onsuccess = (event) => {
      const localDb = event.target.result;
      localDb.close();
    };

    request.onerror = console.error;
  }

  static async getTable(tableName) {
    new Promise((resolve) => {
      try {
        const request = indexedDB.open(tableName, 2);
        request.onsuccess = (event) => {
          const database = event.target.result;
          const objectStore = database
            .transaction(tableName, 'readonly')
            .objectStore(tableName);
          const allRecords = objectStore.getAll();
          allRecords.onsuccess = () => {
            if (allRecords.result.length === 1) resolve(allRecords.result[0]);
            database.close();
            resolve(allRecords.result);
          };
        };
      } catch (error) {
        console.error(error.message);
        throw error;
      }
    });
  }

  static getIndexed(tableName, indexName) {
    return new Promise((resolve) => {
      const request = indexedDB.open(tableName, 2);
      request.onsuccess = (event) => {
        const database = event.target.result;
        const objectStore = database
          .transaction(tableName, 'readonly')
          .objectStore(tableName);
        const allRecords = objectStore.index(indexName).getAll();
        allRecords.onsuccess = () => {
          database.close();
          resolve(allRecords.result);
        };
      };
    });
  }

  static async deleteTableDb(tableName) {
    return indexedDB.deleteDatabase(tableName);
  }

  static async getAllDbNames() {
    return window.indexedDB.databases();
  }

  async deleteAllDb() {
    const databases = this.getAlDbNames();
    databases
      .filter((each) => each.name !== 'firebaseLocalStorageDb')
      .forEach((database) => window.indexedDB.deleteDatabase(database.name));
  }

  async downloadDb() {
    const tables = this.getAlDbNames();

    tables.forEach(async (each) => {
      const data = await this.getTable(each.name);
      this.util.downloadJSON(data, each.name);
    });
  }
}

const { localDb } = new LocalDb();

export default { localDb };
