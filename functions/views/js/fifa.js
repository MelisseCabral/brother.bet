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

const getFifaCloud = async () => {
  const data = {
    key: '1DzPBoZzRx1JraO48IaiRsTCML75XXLFMj0ZItfaI8-A',
    sheetId: '',
  };

  try {
    idsTabelas.forEach(async (each, indexOf) => {
      data.sheetId = each;
      const response = await getCSV(data);
      if (response.data) {
        dataSet.push(response);
        if (indexOf === idsTabelas.length - 1) {
          dataTooler(dataSet);
        }
      } else {
        console.log(each, response);
      }
    });
  } catch (error) {
    localStorage.setItem('dataError', JSON.stringify({ error }));
  }
};

function getCSV(data) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: 'https://brother-bet.web.app/getCsv',
      dataType: 'json',
      method: 'get',
      cache: false,
      crossDomain: true,
      headers: {
        Accept: 'application/json',
      },
      data,
    }).done((response) => {
      resolve(response);
    }).fail((error) => {
      console.log(error);
      reject(error);
    });
  });
}

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

const getNeuralNetwork = async () => {
  const dataTrain = getTable('trainSet');

  for (let index = 10; index < data.input.length; index += 1) {
    console.log(index);
    const response = await machineLearning({
      trainSet: dataTrain,
      validationSet: '',
      batches: index,
      learningRate: 0.1,
      start: 0,
      end: index,
      randomize: false,
      validationPercent: 0.3,
    });

    console.log(response);
  }
};
