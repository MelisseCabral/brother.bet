/* eslint-disable no-plusplus */
/* eslint-disable no-bitwise */
/* eslint-disable no-param-reassign */
/* eslint-disable no-loop-func */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-shadow */
/* eslint-disable max-len */
/* eslint-disable vars-on-top */
/* eslint-disable no-var */
/* eslint-disable func-names */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-use-before-define */

const dataSet = [];
const truncatedLogs = [];

// let logs = [];

const vHash = 1619170660;

let defaultML;

const getFifaCloud = async () => {
  const data = {
    key: '1DzPBoZzRx1JraO48IaiRsTCML75XXLFMj0ZItfaI8-A',
    sheetId: '',
  };

  try {
    for (let i = 0; i < idsTabelas.length; i += 1) {
      data.sheetId = idsTabelas[i];
      const response = await api('/getCSV', data);
      if (response.data) {
        dataSet.push(response);
        if (i === idsTabelas.length - 1) {
          await dataTooler(dataSet);
        }
      } else {
        await delay(2);
        i -= 1;
        console.log(idsTabelas[i], response);
      }
    }
  } catch (error) {
    console.log('dataError', JSON.stringify({ error }));
  }
};

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
  const goalsTeamA = parseInt(game.teamA.firstHalf, 10) + parseInt(game.teamA.secondHalf, 10);
  const goalsTeamB = parseInt(game.teamB.firstHalf, 10) + parseInt(game.teamB.secondHalf, 10);

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

const getGameInput = (games, teams, lastIndex) => {
  const game = games[lastIndex];
  let teamA = {};
  let teamB = {};

  const teamIsPresent = (eachGame, user, team) => {
    if (user === eachGame.teamA.user) {
      const res = getGameOutput(eachGame);
      return {
        games: (team.games || 0) + 1,
        wins: (team.wins || 0) + res[0],
        ties: (team.ties || 0) + res[1],
        loses: (team.loses || 0) + res[2],
        goalsPro: (team.goalsPro || 0) + res[3],
        goalsCon: (team.goalsCon || 0) + res[4],
      };
    }
    if (user === eachGame.teamB.user) {
      const res = getGameOutput(eachGame);
      return {
        games: (team.games || 0) + 1,
        wins: (team.games || 0) + res[2],
        ties: (team.games || 0) + res[1],
        loses: (team.games || 0) + res[0],
        goalsPro: (team.games || 0) + res[3],
        goalsCon: (team.games || 0) + res[4],
      };
    }
    return team;
  };

  for (let i = 0; i < lastIndex + 1; i += 1) {
    teamA = teamIsPresent(games[i], game.teamA.user, teamA);
    teamB = teamIsPresent(games[i], game.teamB.user, teamB);
  }

  arrTeamA = [...Object.values(teams[game.teamA.team]), ...Object.values(teamA)];
  arrTeamB = [...Object.values(teams[game.teamB.team]), ...Object.values(teamB)];

  const tensorA = tf.tensor(arrTeamA);
  const tensorB = tf.tensor(arrTeamB);
  const tensorInput = tensorA.sub(tensorB);
  const input = Array.from(tensorInput.dataSync());

  tensorA.dispose();
  tensorB.dispose();
  tensorInput.dispose();

  return input;
};

const getRankTeams = (games) => {
  const teams = {};
  games.forEach((each) => {
    const goalsTeamA = (parseInt(each.teamA.firstHalf, 10) + parseInt(each.teamA.secondHalf, 10)) || 0;
    const goalsTeamB = (parseInt(each.teamB.firstHalf, 10) + parseInt(each.teamB.secondHalf, 10)) || 0;
    let prevGoalsProTeamA = 0;
    let prevGoalsConTeamA = 0;
    let prevGamesCountTeamA = 0;
    let prevGoalsProTeamB = 0;
    let prevGoalsConTeamB = 0;
    let prevGamesCountTeamB = 0;

    if (teams[each.teamA.team]) {
      prevGoalsProTeamA = teams[each.teamA.team].goalsPro;
      prevGoalsConTeamA = teams[each.teamA.team].goalsCon;
      prevGamesCountTeamA = teams[each.teamA.team].gamesCount;
    }

    if (teams[each.teamB.team]) {
      prevGoalsProTeamB = teams[each.teamB.team].goalsPro;
      prevGoalsConTeamB = teams[each.teamB.team].goalsCon;
      prevGamesCountTeamB = teams[each.teamB.team].gamesCount;
    }

    teams[each.teamA.team] = {
      goalsPro: prevGoalsProTeamA + goalsTeamA,
      goalsCon: prevGoalsConTeamA + goalsTeamB,
      gamesCount: prevGamesCountTeamA + 1,
    };

    teams[each.teamB.team] = {
      goalsPro: prevGoalsConTeamB + goalsTeamB,
      goalsCon: prevGoalsConTeamB + goalsTeamA,
      gamesCount: prevGamesCountTeamB + 1,
    };
  });
  return teams;
};

const aggregationTrain = (games) => {
  const agg = [];
  const teams = getRankTeams(games);
  games.forEach((each, indexof) => {
    const output = getGameOutput(each);
    const input = getGameInput(games, teams, indexof);
    agg.push({ input, output });
  });
  return agg;
};

const splitInputOutput = (dataSet) => {
  const input = [];
  const output = [];
  dataSet.forEach((each) => {
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

let dataTooler = async (dataSet) => {
  const datedSet = await saveGetDataSet(dataSet);
  const newDatedSet = await saveGetDatedDataSet(datedSet);
  const gamesSet = await saveGetGamesSet(newDatedSet);
  const aggTrainSet = await saveGetTrainAggregatedSet(gamesSet);
  const trainSet = await saveGetTrainSet(aggTrainSet);
  const trainValidationSet = await saveGetTrainValidationSet(trainSet);
  return trainValidationSet;
};

const saveGetDataSet = async (dataSet) => {
  deleteTableDB('dataSet');
  createTableDB(dataSet, 'dataSet', 'date', 'id');
  return getIndexed('dataSet', 'date');
};

const saveGetDatedDataSet = async (dataSet) => {
  deleteTableDB('datedSet');
  createTableDB(dataSet, 'datedSet');
  return getTable('datedSet');
};

const saveGetGamesSet = async (dataSet) => {
  deleteTableDB('gamesSet');
  const gamesSet = getJustData(dataSet);
  createTableDB(gamesSet, 'gamesSet');
  return getTable('gamesSet');
};

const saveGetTrainAggregatedSet = async (dataSet) => {
  deleteTableDB('aggregatedTrainSet');
  const aggSet = aggregationTrain(dataSet);
  createTableDB(aggSet, 'aggregatedTrainSet');
  return getTable('aggregatedTrainSet');
};

const saveGetTrainSet = async (dataSet) => {
  deleteTableDB('trainSet');
  const trainSet = splitInputOutput(dataSet);
  createTableDB([trainSet], 'trainSet');
  return getTable('trainSet');
};

const saveGetTrainValidationSet = async (dataSet) => {
  deleteTableDB('trainValidationSet');
  const trainValidationSets = getTrainValidation(dataSet, 0.7);
  createTableDB([trainValidationSets], 'trainValidationSet');
  return getTable('trainValidationSet');
};

const saveJsonFile = (data) => {
  const a = document.createElement('a');
  a.setAttribute('href', `data:text/plain;charset=utf-8,${encodeURIComponent(JSON.stringify(data))}`);
  a.setAttribute('download', 'filename.json');
  a.click();
};

const isTruncated = () => {
  getTable('datedSet').then((data) => {
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
  });

  const validate = (data, obj, context) => {
    const testValidation = isValid(data);
    if (isValid(data)) {
      obj.problems[context] = testValidation;
      return obj;
    }
    return obj;
  };

  return truncatedLogs;
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

const trainSetAvailable = async () => {
  const dbs = await window.indexedDB.databases();
  if (dbs) {
    if (dbs.map((each) => each.name).includes('trainSet')) {
      const trainSet = await getTable('trainSet');
      const newHash = hash(JSON.stringify(trainSet));
      if (newHash === vHash) return trainSet;
    }
  }
  return false;
};

const setMachineLearning = async () => {
  const trainSet = await trainSetAvailable();
  if (trainSet) {
    defaultML = {
      nameDataSet: 'trainSet',
      validationSet: '',
      batches: 1000,
      learningRate: 0.001,
      start: 0,
      end: trainSet.input.length,
      max: trainSet.input.length,
      randomize: true,
      normalization: true,
      validationPercent: 0.3,
      step: trainSet.input.length,
      plotPercent: 1,
    };
    if (!localStorage.getItem('machineLearning') || localStorage.getItem('machineLearning')) {
      localStorage.setItem('machineLearning', JSON.stringify(defaultML));
    }
    return true;
  }
  await getFifaCloud();
  return setMachineLearning();
};

const hash = (s) => {
  let h = 0; const l = s.length; let i = 0;
  if (l > 0) while (i < l) h = (h << 5) - h + s.charCodeAt(i++) | 0;
  return h;
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

    if (index > trainSet.input.length * plotPercent) {
      percentPlot += plotPercent;
      downloadJSON(result, new Date());
    }

    if ((index + +step) >= +end && index !== +end - 1) index = +end - 1;
    else index += +step;
  }
};

const getTrain = async (assets) => {
  const trainSet = await getTable(assets.nameDataSet);

  const { data } = await axios.get('/index');

  const result = await mL({ trainSet, neuralNetwork: data.neuralNetwork, ...assets });

  axios.post('/create', result[result.length - 1])
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });

  console.log(result);
};
