/* eslint-disable no-param-reassign */
/* eslint-disable object-curly-newline */
/* eslint-disable no-multi-spaces */
/* eslint-disable no-async-promise-executor */
/* eslint-disable no-unused-vars */
/* eslint-disable guard-for-in */
/* eslint-disable no-extend-native */
/* eslint-disable consistent-return */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-plusplus */
/* eslint-disable no-bitwise */
/* eslint-disable no-loop-func */
/* eslint-disable no-await-in-loop */
/* eslint-disable max-len */
/* eslint-disable vars-on-top */
/* eslint-disable no-var */
/* eslint-disable func-names */
/* eslint-disable no-undef */
/* eslint-disable no-use-before-define */
// eslint-disable-next-line prefer-const
let init = false;

const nameTables = [
  'dataSet',
  'gamesSet',
  'teamsSet',
  'aggregatedSet',
  'usersSet',
  'trainSet',
  'addedTrainSet',
  'trainResultSet',
  'trainGoalsSet',
  'trainValidationSet',
];

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
  const data = await getBundle(year);
  if (data) return data;
  await delay(2);
  return getFifaDatabase(year);
};

const getFifaDatabaseFiles = async (year) => {
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
      console.log(getAllDays[i], data);
      await delay(2);
      i -= 1;
    }
  }
};

// eslint-disable-next-line no-unused-vars
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

const organizeObject = (obj) => Object.keys(obj)
  .sort((a, b) => (obj[a] > obj[b] ? 1 : -1))
  .reduce((a, b) => {
    a[b] = obj[b];
    return a;
  }, {});

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
      const store = db
        .transaction(tableName, 'readwrite')
        .objectStore(tableName);
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
  dbs
    .filter((each) => each.name !== 'firebaseLocalStorageDb')
    .forEach((db) => window.indexedDB.deleteDatabase(db.name));
};

// eslint-disable-next-line no-unused-vars
const downloadDb = async () => {
  const tables = await window.indexedDB.databases();

  tables.forEach(async (each) => {
    const data = await getTable(each.name);
    downloadJSON(data, each.name);
  });
};

const downloadJSON = (data, name) => {
  const dataStr = `data:text/json;charset=utf-8,${encodeURIComponent(
    JSON.stringify(data),
  )}`;
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
      const objectStore = db
        .transaction(tableName, 'readonly')
        .objectStore(tableName);
      const allRecords = objectStore.getAll();
      allRecords.onsuccess = () => {
        if (allRecords.result.length === 1) resolve(allRecords.result[0]);
        db.close();
        resolve(allRecords.result);
      };
    };
  } catch (error) {
    console.error(error.message);
    throw error;
  }
});

const getIndexed = async (tableName, indexName) => new Promise((resolve) => {
  const request = indexedDB.open(tableName, 2);
  request.onsuccess = (event) => {
    const db = event.target.result;
    const objectStore = db
      .transaction(tableName, 'readonly')
      .objectStore(tableName);
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
  const goalsTeamA = parseInt(game.teamA.firstHalf, 10) + parseInt(game.teamA.secondHalf, 10)
    || 0;
  const goalsTeamB = parseInt(game.teamB.firstHalf, 10) + parseInt(game.teamB.secondHalf, 10)
    || 0;

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

  const teamA = teams[game.teamA.team][teams[game.teamA.team].length - 1];
  const teamB = teams[game.teamB.team][teams[game.teamB.team].length - 1];

  const input = [
    [...Object.values(teamA), ...Object.values(rankedA)],
    [...Object.values(teamB), ...Object.values(rankedB)],
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

  ranks = rank(
    ranks,
    teamA,
    winnerIsTeamA,
    draw,
    winnerIsTeamB,
    goalsTeamA,
    goalsTeamB,
  );
  ranks = rank(
    ranks,
    teamB,
    winnerIsTeamB,
    draw,
    winnerIsTeamA,
    goalsTeamB,
    goalsTeamA,
  );

  const rankedA = ranks[teamA][ranks[teamA].length - 1];
  const rankedB = ranks[teamB][ranks[teamB].length - 1];

  return { ranks, rankedA, rankedB };
};

const rank = (ranks, nameScope, win, draw, loss, goalsPro, goalsCon) => {
  let team = {};
  if (ranks[nameScope]) team = ranks[nameScope][ranks[nameScope].length - 1];

  let isBothScore = 0;
  let isUnderHalf = 0;
  let isUnderOneAndHalf = 0;
  let isUnderTwoAndHalf = 0;
  let isUnderThreeAndHalf = 0;
  let isUnderFourAndHalf = 0;
  let isOverHalf = 0;
  let isOverOneAndHalf = 0;
  let isOverTwoAndHalf = 0;
  let isOverThreeAndHalf = 0;
  let isOverFourAndHalf = 0;

  if (goalsPro > 0 && goalsCon > 0) isBothScore = 1;

  if (goalsPro < 0.5) isUnderHalf = 1;
  if (goalsPro < 1.5) isUnderOneAndHalf = 1;
  if (goalsPro < 2.5) isUnderTwoAndHalf = 1;
  if (goalsPro < 3.5) isUnderThreeAndHalf = 1;
  if (goalsPro < 4.5) isUnderFourAndHalf = 1;

  if (goalsPro > 0.5) isOverHalf = 1;
  if (goalsPro > 1.5) isOverOneAndHalf = 1;
  if (goalsPro > 2.5) isOverTwoAndHalf = 1;
  if (goalsPro > 3.5) isOverThreeAndHalf = 1;
  if (goalsPro > 4.5) isOverFourAndHalf = 1;

  const gamesCount = team.games || 0;
  const rise = gamesCount + 1;

  team = {
    games: gamesCount + 1,
    wins: ((team.wins || 0) * gamesCount + win) / rise,
    draws: ((team.draws || 0) * gamesCount + draw) / rise,
    losses: ((team.losses || 0) * gamesCount + loss) / rise,
    goalsPro: ((team.goalsPro || 0) * gamesCount + goalsPro) / rise,
    goalsCon: ((team.goalsCon || 0) * gamesCount + goalsCon) / rise,
    bothScore: ((team.bothScore || 0) * gamesCount + isBothScore) / rise,
    underHalf: ((team.underHalf || 0) * gamesCount + isUnderHalf) / rise,
    underOneAndHalf:
      ((team.underOneAndHalf || 0) * gamesCount + isUnderOneAndHalf) / rise,
    underTwoAndHalf:
      ((team.underTwoAndHalf || 0) * gamesCount + isUnderTwoAndHalf) / rise,
    underThreeAndHalf:
      ((team.underThreeAndHalf || 0) * gamesCount + isUnderThreeAndHalf) / rise,
    underFourAndHalf:
      ((team.underFourAndHalf || 0) * gamesCount + isUnderFourAndHalf) / rise,
    overHalf: ((team.overHalf || 0) * gamesCount + isOverHalf) / rise,
    overOneAndHalf:
      ((team.overOneAndHalf || 0) * gamesCount + isOverOneAndHalf) / rise,
    overTwoAndHalf:
      ((team.overTwoAndHalf || 0) * gamesCount + isOverTwoAndHalf) / rise,
    overThreeAndHalf:
      ((team.overThreeAndHalf || 0) * gamesCount + isOverThreeAndHalf) / rise,
    overFourAndHalf:
      ((team.overFourAndHalf || 0) * gamesCount + isOverFourAndHalf) / rise,
  };

  ranks[nameScope] = [...(ranks[nameScope] || []), ...([team] || [])];

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
    game.forEach((eachGame) => {
      if (!users.includes(eachGame.user)) users.push(eachGame.user);
    });
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

const dataTooler = (data) => new Promise(async (resolve) => {
  const datedSet = await saveGetDataSet(data);
  const gamesSet = getJustData(datedSet);
  const teamsSet = getRankTeams(gamesSet);
  const { aggregated, users } = aggregationTrain(gamesSet, teamsSet);
  resolve({ aggregated, users, teams: teamsSet });
  const trainSet = splitInputOutput(aggregated);
  saveGamesSet(gamesSet);
  saveTeamsSet(teamsSet);
  saveTrainAggregatedSet(aggregated);
  saveTrainSet(trainSet);
  saveUsersSet(users);
  saveTrainAddedSet(trainSet);
  saveResultSet(trainSet);
  saveGoalsSet(trainSet);
  saveTrainValidationSet(trainSet);
});

const saveGetDataSet = async (data) => {
  createTableDB(data, 'dataSet', 'date', 'id');
  return getIndexed('dataSet', 'date');
};

const saveGetDatedDataSet = async (data) => {
  createTableDB(data, 'datedSet');
  return getTable('datedSet');
};

const saveGamesSet = async (data) => {
  createTableDB(data, 'gamesSet');
};

const saveTeamsSet = async (data) => {
  createTableDB([data], 'teamsSet');
};

const saveTrainAggregatedSet = async (data) => {
  createTableDB(data, 'aggregatedSet');
};

const saveUsersSet = async (data) => {
  createTableDB([data], 'usersSet');
};

const saveTrainSet = async (data) => {
  createTableDB([data], 'trainSet');
};

const saveTrainAddedSet = async (data) => {
  const addedTrainSet = addedTrain(data);
  createTableDB([addedTrainSet], 'addedTrainSet');
};

const saveResultSet = async (data) => {
  const trainResultSet = spliceResultOutput(data);
  createTableDB([trainResultSet], 'trainResultSet');
};

const saveGoalsSet = async (data) => {
  const trainGoalsSet = spliceGoalsOutput(data);
  createTableDB([trainGoalsSet], 'trainGoalsSet');
};

const saveTrainValidationSet = async (data) => {
  const trainValidationSets = getTrainValidation(data, 0.7);
  createTableDB([trainValidationSets], 'trainValidationSet');
};

const saveJsonFile = (data) => {
  const a = document.createElement('a');
  a.setAttribute(
    'href',
    `data:text/plain;charset=utf-8,${encodeURIComponent(JSON.stringify(data))}`,
  );
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

      objContext = validate(
        eachB.teamA.firstHalf,
        objContext,
        'teamA.firstHalf',
      );
      objContext = validate(
        eachB.teamA.secondHalf,
        objContext,
        'teamA.secondHalf',
      );
      objContext = validate(
        eachB.teamB.firstHalf,
        objContext,
        'teamB.firstHalf',
      );
      objContext = validate(
        eachB.teamB.secondHalf,
        objContext,
        'teamB.secondHalf',
      );

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
      }
      return maybeTruncated;
    }
    return 'Error: Wait to pass the day to add the gId.';
  }
  return 'Error: There is no valid dataSet.';
};

const isValid = (data) => {
  if (Number.isNaN(data)) return 'Is NaN!';
  if (data === true) return 'Is true!';
  if (data === false) return 'Is false!';
  if (data === null) return 'Is null!';
  if (data === undefined) return 'Is undefined!';
  if (data === '') return "Is ''!";
  return false;
};

const filterRankByTarget = (data, target, inverse) => {
  data.sort((a, b) => {
    if (a[target] < b[target]) return -1;
    if (a[target] > b[target]) return 1;
    return 0;
  });
  if ((target === 'name' && !inverse) || (target !== 'name' && inverse)) return data;
  return data.reverse();
};

const databaseIsConsistent = async () => {
  const dbs = await window.indexedDB.databases();
  const names = dbs.map((each) => each.name);
  if (nameTables.filter((table) => !names.includes(table)).length) return false;
  const nowConsistency = getConsistency();
  if (developerMode) return nowConsistency;
  const oldConsistency = await getDatabaseConsistency();
  if (oldConsistency.aggregatedSet === nowConsistency) return nowConsistency;

  return false;
};

const setDatabaseConsistency = async () => {
  const dataSet = await getFifaDatabase();
  const { aggregated } = await dataTooler(dataSet);
  const newConsistency = hash(aggregated);
  await postDatabaseConsistency({ aggregatedSet: newConsistency });
};

const forceDatabaseConsistency = async () => {
  const newConsistency = await getConsistency();
  await postDatabaseConsistency({ aggregatedSet: newConsistency });
};

const initLocalDatabase = async (aggregated, users, teams, data) => {
  if (!aggregated) {
    const status = await databaseIsConsistent();
    debugTime('databaseIsConsistent');
    if (!status) {
      await deleteAllDB();
      debugTime('deleteAllDB');
      const datedSet = await getFifaDatabase();
      debugTime('getFifaDatabase');
      const tooler = await dataTooler(datedSet);
      debugTime('dataTooler');
      return initLocalDatabase(
        tooler.aggregated,
        tooler.users,
        tooler.teams,
        datedSet,
      );
    }
    try {
      const dbs = await window.indexedDB.databases();

      const aggregatedSet = await getTable('aggregatedSet');
      const usersSet = await getTable('usersSet');
      const teamsSet = await getTable('teamsSet');
      const dataSet = await getIndexed('dataSet', 'date');
      debugTime('indexedDb');
      return initLocalDatabase(aggregatedSet, usersSet, teamsSet, dataSet);
    } catch (error) {
      debugTime(`Catch error${JSON.stringify(error)}`);
      setConsistency(new Date());
      return initLocalDatabase();
    }
  }
  defaultML.end = aggregated.length;
  defaultML.max = defaultML.end;
  defaultML.step = defaultML.end;
  return { aggregated, users, teams, data };
};

const hash = (data) => {
  const s = JSON.stringify(data) || '';
  let h = 0;
  const l = s.length;
  let i = 0;
  if (l > 0) while (i < l) h = ((h << 5) - h + s.charCodeAt(i++)) | 0;
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

const getRegisteredDays = async (datedSet) => {
  const registeredIds = {};
  datedSet.forEach((each) => {
    registeredIds[each.date] = each.id;
  });
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
      api
        .post(`/create?nameSet=${nameDataSet}`, result[result.length - 1])
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

    if (index + +step >= +end && index !== +end - 1) index = +end - 1;
    else index += +step;
  }
};

const getTrain = async (assets) => {
  const { nameDataSet, batches, saveEvery } = assets;

  const trainSet = await getTable(nameDataSet);

  const fakeBatches = (batches / saveEvery).toFixed(0);
  assets.batches = saveEvery;

  for (let i = 0; i < fakeBatches; i += 1) {
    const { data } = await api.get(`/index?nameSet=${nameDataSet}`);

    const result = await mL({
      trainSet,
      neuralNetwork: data.neuralNetwork,
      ...assets,
    });

    api
      .post(`/create?nameSet=${nameDataSet}`, result[result.length - 1])
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
