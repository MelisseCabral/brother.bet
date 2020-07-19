/* eslint-disable object-curly-newline */
/* eslint-disable eqeqeq */
/* eslint-disable guard-for-in */
/* eslint-disable no-extend-native */
/* eslint-disable consistent-return */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-plusplus */
/* eslint-disable no-bitwise */
/* eslint-disable no-param-reassign */
/* eslint-disable no-loop-func */
/* eslint-disable no-await-in-loop */
/* eslint-disable max-len */
/* eslint-disable vars-on-top */
/* eslint-disable no-var */
/* eslint-disable func-names */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-use-before-define */
// eslint-disable-next-line prefer-const
let init = false;

const defaultML = {
  nameDataSet: 'trainSet',
  validationSet: '',
  batches: 1000,
  learningRate: 0.001,
  start: 0,
  randomize: true,
  normalization: true,
  validationPercent: 0.3,
  plotPercent: 1,
  saveEvery: 1000,
};

const getFifaDatabase = async (year) => {
  const dataSet = [];
  const getAllDays = await getDays(year);
  for (let i = 0; i < getAllDays.length; i += 1) {
    const data = await getData(year, getAllDays[i]);
    if (data) {
      dataSet.push(data);
      if (i === getAllDays.length - 1) {
        return dataSet;
      }
    } else {
      console.log(getAllDays[i], response);
      await delay(2);
      i -= 1;
    }
  }
};

const getFifaCloud = async () => {
  const key = '1DzPBoZzRx1JraO48IaiRsTCML75XXLFMj0ZItfaI8-A';
  for (let i = 0; i < gidsTables.length; i += 1) {
    const sheetId = gidsTables[i];
    const data = await getSource(key, sheetId);
    if (data) {
      await postData(data);
    } else {
      await delay(2);
      i -= 1;
      console.log(gidsTables[i], response);
    }
  }
};

const organizeObject = (obj) => Object.keys(obj).sort((a, b) => (obj[a] > obj[b] ? 1 : -1)).reduce((a, b) => { a[b] = obj[b]; return a; }, {});

const delay = (timeSeconds) => new Promise((resolve) => {
  setTimeout(resolve, timeSeconds * 1000);
});

const createTableDB = (data, tableName, indexName = '', key = '') => {
  const request = indexedDB.open(tableName, 2);

  request.onupgradeneeded = (event) => {
    const db = event.target.result;

    const configObjectStore = { autoIncrement: true };
    if (key) configObjectStore.keyPath = key;
    const objectStore = db.createObjectStore(tableName, configObjectStore);

    if (indexName) objectStore.createIndex(indexName, indexName, { unique: true });

    objectStore.transaction.oncomplete = () => {
      const store = db.transaction(tableName, 'readwrite').objectStore(tableName);
      data.forEach(async (each) => store.add(each));
    };
  };

  request.onsuccess = (event) => {
    db = event.target.result;
    db.close();
  };

  request.onerror = console.error;
};

const deleteTableDB = async (tableName) => {
  indexedDB.deleteDatabase(tableName);
};

const deleteAllDB = async () => {
  const dbs = await window.indexedDB.databases();
  dbs.filter((each) => each.name !== 'firebaseLocalStorageDb')
    .forEach((db) => window.indexedDB.deleteDatabase(db.name));
};

const downloadDb = async () => {
  const tables = await window.indexedDB.databases();

  tables.forEach(async (each) => {
    const data = await getTable(each.name);
    downloadJSON(data, each.name);
  });
};

const downloadJSON = (data, name) => {
  const dataStr = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(data))}`;
  const downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute('href', dataStr);
  downloadAnchorNode.setAttribute('download', `${name}.json`);
  document.body.appendChild(downloadAnchorNode);
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
};

const getTable = async (tableName) => new Promise((resolve) => {
  try {
    const request = indexedDB.open(tableName, 2);
    request.onsuccess = (event) => {
      const db = event.target.result;
      const objectStore = db.transaction(tableName, 'readonly').objectStore(tableName);
      const allRecords = objectStore.getAll();
      allRecords.onsuccess = () => {
        if (allRecords.result.length === 1) resolve(allRecords.result[0]);
        db.close();
        resolve(allRecords.result);
      };
    };
  } catch (error) {
    console.log(error);
  }
});

const getIndexed = async (tableName, indexName) => new Promise((resolve) => {
  const request = indexedDB.open(tableName, 2);
  request.onsuccess = (event) => {
    const db = event.target.result;
    const objectStore = db.transaction(tableName, 'readonly').objectStore(tableName);
    const allRecords = objectStore.index(indexName).getAll();
    allRecords.onsuccess = () => {
      db.close();
      resolve(allRecords.result);
    };
  };
});

const getJustData = (data) => {
  let arr = [];
  data.forEach((each) => each.data.forEach((each2) => {
    arr = [...arr, each2];
  }));
  return arr;
};

const getGameOutput = (game) => {
  const goalsTeamA = (parseInt(game.teamA.firstHalf, 10) + parseInt(game.teamA.secondHalf, 10)) || 0;
  const goalsTeamB = (parseInt(game.teamB.firstHalf, 10) + parseInt(game.teamB.secondHalf, 10)) || 0;

  const output = [0, 0, 0, goalsTeamA, goalsTeamB];

  if (goalsTeamA > goalsTeamB) {
    output[0] = 1;
  } else if (goalsTeamA === goalsTeamB) {
    output[1] = 1;
  } else {
    output[2] = 1;
  }
  return output;
};

const getGameInput = (game, teams, usersIn = {}) => {
  const { ranks, rankedA, rankedB } = addAndGetRank(usersIn, game, 'user');

  const input = [
    [...Object.values(teams[game.teamA.team]), ...Object.values(rankedA)],
    [...Object.values(teams[game.teamB.team]), ...Object.values(rankedB)],
  ];

  return { input, ranks };
};

const addAndGetRank = (ranks, game, scope) => {
  const {
    0: winnerIsTeamA,
    1: draw,
    2: winnerIsTeamB,
    3: goalsTeamA,
    4: goalsTeamB,
  } = { ...getGameOutput(game) };

  const teamA = game.teamA[scope];
  const teamB = game.teamB[scope];

  ranks = rank(ranks, teamA, winnerIsTeamA, draw, winnerIsTeamB, goalsTeamA, goalsTeamB);
  ranks = rank(ranks, teamB, winnerIsTeamB, draw, winnerIsTeamA, goalsTeamB, goalsTeamA);

  const rankedA = ranks[teamA][ranks[teamA].length - 1];
  const rankedB = ranks[teamB][ranks[teamB].length - 1];

  return { ranks, rankedA, rankedB };
};

const rank = (ranks, nameScope, win, draw, loss, goalsPro, goalsCon) => {
  let team = {};
  if (ranks[nameScope]) team = ranks[nameScope][ranks[nameScope].length - 1];

  let isUnderHalf = 0;
  let isUnderOneAndHalf = 0;
  let isUnderTwoAndHalf = 0;
  let isUnderThreeAndHalf = 0;
  let isUnderFourAndHalf = 0;
  let isUnderFiveAndHalf = 0;
  let isUnderSixAndHalf = 0;
  let isOverHalf = 0;
  let isOverOneAndHalf = 0;
  let isOverTwoAndHalf = 0;
  let isOverThreeAndHalf = 0;
  let isOverFourAndHalf = 0;
  let isOverFiveAndHalf = 0;
  let isOverSixAndHalf = 0;

  if (goalsPro > 0 && goalsCon > 0) isBothScore = 1;

  if (goalsPro < 0.5) isUnderHalf = 1;
  if (goalsPro < 1.5) isUnderOneAndHalf = 1;
  if (goalsPro < 2.5) isUnderTwoAndHalf = 1;
  if (goalsPro < 3.5) isUnderThreeAndHalf = 1;
  if (goalsPro < 4.5) isUnderFourAndHalf = 1;
  if (goalsPro < 5.5) isUnderFiveAndHalf = 1;
  if (goalsPro < 6.5) isUnderSixAndHalf = 1;

  if (goalsPro > 0.5) isOverHalf = 1;
  if (goalsPro > 1.5) isOverOneAndHalf = 1;
  if (goalsPro > 2.5) isOverTwoAndHalf = 1;
  if (goalsPro > 3.5) isOverThreeAndHalf = 1;
  if (goalsPro > 4.5) isOverFourAndHalf = 1;
  if (goalsPro > 5.5) isOverFiveAndHalf = 1;
  if (goalsPro > 6.5) isOverSixAndHalf = 1;

  team = {
    games: team.games + 1,
    wins: team.wins + win,
    draws: team.draws + draw,
    losses: team.losses + loss,
    goalsPro: (team.goalsPro * team.games + goalsPro) / (team.games + 1),
    goalsCon: (team.goalsCon * team.games + goalsCon) / (team.games + 1),
    bothScore: (team.bothScore * team.games + isBothScore) / (team.games + 1),
    underHalf: (team.underHalf * team.games + isUnderHalf) / (team.games + 1),
    underOneAndHalf: (team.underOneAndHalf * team.games + isUnderOneAndHalf) / (team.games + 1),
    underTwoAndHalf: (team.underTwoAndHalf * team.games + isUnderTwoAndHalf) / (team.games + 1),
    underThreeAndHalf: (team.underThreeAndHalf * team.games + isUnderThreeAndHalf) / (team.games + 1),
    underFourAndHalf: (team.underFourAndHalf * team.games + isUnderFourAndHalf) / (team.games + 1),
    underFiveAndHalf: (team.underFiveAndHalf * team.games + isUnderFiveAndHalf) / (team.games + 1),
    underSixAndHalf: (team.underSixAndHalf * team.games + isUnderSixAndHalf) / (team.games + 1),
    overHalf: (team.overHalf * team.games + isOverHalf) / (team.games + 1),
    overOneAndHalf: (team.overOneAndHalf * team.games + isOverOneAndHalf) / (team.games + 1),
    overTwoAndHalf: (team.overTwoAndHalf * team.games + isOverTwoAndHalf) / (team.games + 1),
    overThreeAndHalf: (team.overThreeAndHalf * team.games + isOverThreeAndHalf) / (team.games + 1),
    overFourAndHalf: (team.overFourAndHalf * team.games + isOverFourAndHalf) / (team.games + 1),
    overFiveAndHalf: (team.overFiveAndHalf * team.games + isOverFiveAndHalf) / (team.games + 1),
    overSixAndHalf: (team.overSixAndHalf * team.games + isOverSixAndHalf) / (team.games + 1),
  };

  ranks[nameScope] = [...ranks[nameScope] || [], ...[team] || []];

  return ranks;
};

const getRankTeams = (games) => {
  let teams = {};
  games.forEach((game) => {
    const { ranks } = addAndGetRank(teams, game, 'team');
    teams = ranks;
  });
  return teams;
};

const getListUsers = (games) => {
  const users = [];
  games.forEach((each) => {
    const game = Object.values(each);
    game.forEach((eachGame) => { if (!users.includes(eachGame.user)) users.push(eachGame.user); });
  });
  return users;
};

const aggregationTrain = (games, teams) => {
  const aggregated = [];
  let users = {};
  games.forEach((game) => {
    const output = getGameOutput(game);
    const { input, ranks } = getGameInput(game, teams, users);
    users = ranks;
    aggregated.push({ input, output });
  });
  return { aggregated, users };
};

const addedTrain = (data) => {
  const inputs = [];
  data.input.forEach((each) => {
    const tensorA = tf.tensor(each[0]);
    const tensorB = tf.tensor(each[1]);
    const tensorInput = tensorA.sub(tensorB);
    const input = Array.from(tensorInput.dataSync());
    inputs.push(input);

    tensorA.dispose();
    tensorB.dispose();
    tensorInput.dispose();

    return input;
  });

  return { input: inputs, output: data.output };
};

const getUsersTeams = async () => {
  const games = await getTable('gamesSet');
  const teamsSet = await getTable('teamsSet');
  const users = getListUsers(games);
  const teams = Object.keys(teamsSet);
  return { users, teams };
};

const splitInputOutput = (data) => {
  const input = [];
  const output = [];
  data.forEach((each) => {
    input.push(each.input);
    output.push(each.output);
  });
  return { input, output };
};

const getTrainValidation = (data, percentTrainSet) => {
  const trainSet = {
    input: [],
    output: [],
  };

  const validationSet = {
    input: [],
    output: [],
  };

  let max = data.input.length;

  const maxTrainSamples = Math.floor(max * percentTrainSet);
  const maxValidationSamples = max - maxTrainSamples;

  for (let i = maxTrainSamples; i > 0; i -= 1) {
    const rand = Math.floor(Math.random() * Math.floor(max));
    trainSet.input.push(data.input[rand]);
    trainSet.output.push(data.output[rand]);
    data.input.splice(rand, 1);
    data.output.splice(rand, 1);
    max -= 1;
  }

  for (let i = maxValidationSamples; i > 0; i -= 1) {
    const rand = Math.floor(Math.random() * Math.floor(max));
    validationSet.input.push(data.input[rand]);
    validationSet.output.push(data.output[rand]);
    max -= 1;
  }

  return { trainSet, validationSet };
};

const spliceResultOutput = (data) => {
  const { input } = data;
  const output = data.output.map((each) => each.slice(0, 3));

  return { input, output };
};

const spliceGoalsOutput = (data) => {
  const { input } = data;
  const output = data.output.map((each) => each.slice(3, 6));

  return { input, output };
};

const dataTooler = async (data) => {
  const datedSet = await saveGetDataSet(data);
  const newDatedSet = await saveGetDatedDataSet(datedSet);
  const gamesSet = await saveGetGamesSet(newDatedSet);
  const teamsSet = await saveGetTeamsSet(gamesSet);
  const { aggregated, users } = aggregationTrain(gamesSet, teamsSet);
  const aggTrainSet = await saveGetTrainAggregatedSet(aggregated);
  const trainSet = await saveGetTrainSet(aggTrainSet);
  const usersSet = await saveGetUsersSet(users);
  const trainAddedSet = await saveGetTrainAddedSet(trainSet);
  const resultSet = await saveGetResultSet(trainSet);
  const goalsSet = await saveGetGoalsSet(trainSet);
  saveGetTrainValidationSet(trainSet);
};

const saveGetDataSet = async (data) => {
  deleteTableDB('dataSet');
  createTableDB(data, 'dataSet', 'date', 'id');
  return getIndexed('dataSet', 'date');
};

const saveGetDatedDataSet = async (data) => {
  deleteTableDB('datedSet');
  createTableDB(data, 'datedSet');
  return getTable('datedSet');
};

const saveGetGamesSet = async (data) => {
  deleteTableDB('gamesSet');
  const gamesSet = getJustData(data);
  createTableDB(gamesSet, 'gamesSet');
  return getTable('gamesSet');
};

const saveGetTeamsSet = async (data) => {
  deleteTableDB('teamsSet');
  const teamsSet = getRankTeams(data);
  createTableDB([teamsSet], 'teamsSet');
  return getTable('teamsSet');
};

const saveGetTrainAggregatedSet = async (data) => {
  deleteTableDB('aggregatedTrainSet');
  createTableDB(data, 'aggregatedTrainSet');
  return getTable('aggregatedTrainSet');
};

const saveGetUsersSet = async (data) => {
  deleteTableDB('usersSet');
  createTableDB([data], 'usersSet');
  return getTable('usersSet');
};

const saveGetTrainSet = async (data) => {
  deleteTableDB('trainSet');
  const trainSet = splitInputOutput(data);
  createTableDB([trainSet], 'trainSet');
  return getTable('trainSet');
};

const saveGetTrainAddedSet = async (v) => {
  deleteTableDB('addedTrainSet');
  const addedTrainSet = addedTrain(data);
  createTableDB([addedTrainSet], 'addedTrainSet');
  return getTable('addedTrainSet');
};

const saveGetResultSet = async (data) => {
  deleteTableDB('trainResultSet');
  const trainResultSet = spliceResultOutput(data);
  createTableDB([trainResultSet], 'trainResultSet');
  return getTable('trainResultSet');
};

const saveGetGoalsSet = async (data) => {
  deleteTableDB('trainGoalsSet');
  const trainGoalsSet = spliceGoalsOutput(data);
  createTableDB([trainGoalsSet], 'trainGoalsSet');
  return getTable('trainGoalsSet');
};

const saveGetTrainValidationSet = async (data) => {
  deleteTableDB('trainValidationSet');
  const trainValidationSets = getTrainValidation(data, 0.7);
  createTableDB([trainValidationSets], 'trainValidationSet');
  return getTable('trainValidationSet');
};

const saveJsonFile = (data) => {
  const a = document.createElement('a');
  a.setAttribute('href', `data:text/plain;charset=utf-8,${encodeURIComponent(JSON.stringify(data))}`);
  a.setAttribute('download', 'filename.json');
  a.click();
};

const isTruncatedDated = async () => {
  const data = await getTable('datedSet');
  return isTruncated(data);
};

const isTruncated = (data) => {
  const truncatedLogs = [];
  const validate = (dataTest, obj, context) => {
    const testValidation = isValid(dataTest);
    if (testValidation) {
      obj.problems[context] = testValidation;
      return obj;
    }
    return obj;
  };

  data.forEach((eachA) => {
    eachA.data.forEach((eachB, indexOf) => {
      let objContext = {
        date: eachA.date,
        id: eachA.id,
        position: indexOf,
        data: eachB,
        problems: {},
      };

      objContext = validate(eachB.teamA.firstHalf, objContext, 'teamA.firstHalf');
      objContext = validate(eachB.teamA.secondHalf, objContext, 'teamA.secondHalf');
      objContext = validate(eachB.teamB.firstHalf, objContext, 'teamB.firstHalf');
      objContext = validate(eachB.teamB.secondHalf, objContext, 'teamB.secondHalf');

      if (Object.keys(objContext.problems).length) truncatedLogs.push(objContext);
    });
  });

  return truncatedLogs;
};

const registerGid = async (sheetId) => {
  const key = '1DzPBoZzRx1JraO48IaiRsTCML75XXLFMj0ZItfaI8-A';
  const data = await getSource(key, sheetId);
  const today = `${new Date().getYear() + 1900}.${new Date().getMonth() + 1}.${new Date().getDate()}`;

  if (data) {
    if (data.date !== today) {
      const maybeTruncated = isTruncated([data]);
      if (!maybeTruncated.length) {
        await postData(data);
        return true;
      } return maybeTruncated;
    } return 'Error: Wait to pass the day to add the gId.';
  } return 'Error: There is no valid dataSet.';
};

const isValid = (data) => {
  if (Number.isNaN(data)) return 'Is NaN!';
  if (data === true) return 'Is true!';
  if (data === false) return 'Is false!';
  if (data === null) return 'Is null!';
  if (data === undefined) return 'Is undefined!';
  if (data === '') return 'Is \'\'!';
  return false;
};

const databaseConsistency = async () => {
  const dbs = await window.indexedDB.databases();
  const hashes = {};
  if (dbs) {
    const tablesIds = [
      'teamsSet',
      'aggregatedTrainSet',
      'trainSet',
      'trainResultSet',
      'trainGoalsSet',
    ];
    const idsTables = dbs.map((value) => value.name);
    for (const each of tablesIds) {
      if (idsTables.includes(each)) {
        const table = await getTable(each);
        hashes[each] = hash(table);
      }
    }
  }
  return hashes;
};

const databaseIsConsistent = async () => {
  const newConsistency = await databaseConsistency();
  const oldConsistency = await getDatabaseConsistency();
  const orgNewConsistency = JSON.stringify(organizeObject(newConsistency));
  const orgOldConsistency = JSON.stringify(organizeObject(oldConsistency));

  if (orgNewConsistency === orgOldConsistency) return true;
  await deleteAllDB();
  return false;
};

const setDatabaseConsistency = async () => {
  const dataSet = await getFifaDatabase();
  await dataTooler(dataSet);
  const newConsistency = await databaseConsistency();
  await postDatabaseConsistency(newConsistency);
};

const setMachineLearning = async () => {
  if (!await databaseIsConsistent()) {
    const dataSet = await getFifaDatabase();
    await dataTooler(dataSet);
    return setMachineLearning();
  }
  const trainSet = await getTable('trainSet');

  defaultML.end = trainSet.input.length;
  defaultML.max = trainSet.input.length;
  defaultML.step = trainSet.input.length;
  return true;
};

const hash = (data) => {
  const s = JSON.stringify(data)  || '';
  let h = 0; const l = s.length; let i = 0;
  if (l > 0) while (i < l) h = (h << 5) - h + s.charCodeAt(i++) | 0;
  return h;
};

const generateDaysofYear = (year) => {
  const allDaysOfYear = [];
  for (let month = 1; month < 13; month += 1) {
    const daysOfMonth = new Date(year, month, 0).getDate();
    for (let day = 1; day < daysOfMonth + 1; day += 1) {
      allDaysOfYear.push(`${year}.${addZeros(month)}.${addZeros(day)}`);
    }
  }
  return allDaysOfYear;
};

const addZeros = (number) => {
  if (number < 10) return `0${number}`;
  return number;
};

const getRegisteredDays = async () => {
  const datedSet = await getTable('datedSet');
  const registeredIds = {};
  datedSet.forEach((each) => { registeredIds[each.date] = each.id; });
  return registeredIds;
};

const getNeuralNetwork = async (assets) => {
  const {
    nameDataSet,
    validationSet,
    batches,
    learningRate,
    start,
    end,
    randomize,
    normalization,
    validationPercent,
    step,
    plotPercent,
  } = assets;

  const trainSet = await getTable(nameDataSet);

  let percentPlot = +plotPercent;

  let index = 10;
  if (+end - +start === +end && +step === +end) index = +end - 1;

  while (index < +end) {
    const result = await machineLearning({
      nameDataSet,
      trainSet,
      validationSet,
      batches: +batches,
      learningRate: +learningRate,
      start: +start,
      randomize,
      normalization,
      validationPercent: +validationPercent,
      end: index,
    });

    if (init) {
      api.post(`/create?nameSet=${nameDataSet}`, result[result.length - 1])
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    if (index > trainSet.input.length * plotPercent) {
      percentPlot += plotPercent;
      downloadJSON(result, new Date());
    }

    if ((index + +step) >= +end && index !== +end - 1) index = +end - 1;
    else index += +step;
  }
};

const getTrain = async (assets) => {
  const {
    nameDataSet,
    batches,
    saveEvery,
  } = assets;

  const trainSet = await getTable(nameDataSet);

  const fakeBatches = (batches / saveEvery).toFixed(0);
  assets.batches = saveEvery;

  for (let i = 0; i < fakeBatches; i += 1) {
    const { data } = await api.get(`/index?nameSet=${nameDataSet}`);

    const result = await mL({ trainSet, neuralNetwork: data.neuralNetwork, ...assets });

    api.post(`/create?nameSet=${nameDataSet}`, result[result.length - 1])
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });

    console.log(result);
  }
};

const predict = async (nameDataSet, game) => {
  const games = await getTable('gamesSet');
  const teams = await getTable('teamsSet');

  const { userA, userB } = getUsersInput(games, teams, game);

  const tensorA = tf.tensor(userA);
  const tensorB = tf.tensor(userB);
  const input = Array(tensorA.sub(tensorB).dataSync());

  const { data } = await api.get(`/index?nameSet=${nameDataSet}`);

  const prediction = mLPrediction(input, data.neuralNetwork);

  return prediction;
};
