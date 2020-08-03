/* eslint-disable no-param-reassign */
export default class Fifa {
  constructor({
    developerMode, tf, localDB, database, debugTime, delay, hash,
  }) {
    // Constants
    this.developerMode = developerMode;
    this.nameTables = [
      'dataSet',
      'gamesSet',
      'teamsSet',
      'aggregatedSet',
      'usersSet',
      'trainSet',
      'addedTrainSet',
      'trainResultSet',
      'trainGoalsSet',
      'trainValidationSets',
    ];

    // Variables
    this.defaultML = {
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

    // Functions
    this.debugTime = debugTime;
    this.delay = delay;
    this.hash = hash;

    // Object
    this.tf = tf;
    this.localDB = localDB;
    this.database = database;
  }

  async getFifaDatabase(year) {
    const data = await this.database.getBundle(year);
    if (data) return data;
    await this.delay(2);
    return this.getFifaDatabase(year);
  }

  static getJustData(data) {
    let arr = [];
    data.forEach((each) => each.data.forEach((each2) => {
      arr = [...arr, each2];
    }));
    return arr;
  }

  static getGameOutput(game) {
    const goalsA = parseInt(game.teamA.firstHalf, 10) + parseInt(game.teamA.secondHalf, 10) || 0;
    const goalsB = parseInt(game.teamB.firstHalf, 10) + parseInt(game.teamB.secondHalf, 10) || 0;

    const output = [0, 0, 0, goalsA, goalsB];

    if (goalsA > goalsB) {
      output[0] = 1;
    } else if (goalsA === goalsB) {
      output[1] = 1;
    } else {
      output[2] = 1;
    }
    return output;
  }

  static getGameInput(game, teams, usersIn = {}) {
    const { ranks, rankedA, rankedB } = Fifa.addAndGetRank(usersIn, game, 'user');

    const teamA = teams[game.teamA.team][teams[game.teamA.team].length - 1];
    const teamB = teams[game.teamB.team][teams[game.teamB.team].length - 1];

    const input = [
      [...Object.values(teamA), ...Object.values(rankedA)],
      [...Object.values(teamB), ...Object.values(rankedB)],
    ];

    return { input, ranks };
  }

  static addAndGetRank(ranks, game, scope) {
    const {
      0: winnerIsTeamA, 1: draw, 2: winnerIsTeamB, 3: goalsTeamA, 4: goalsTeamB,
    } = {
      ...Fifa.getGameOutput(game),
    };

    const teamA = game.teamA[scope];
    const teamB = game.teamB[scope];

    ranks = Fifa.rank(ranks, teamA, winnerIsTeamA, draw, winnerIsTeamB, goalsTeamA, goalsTeamB);
    // eslint-disable-next-line no-param-reassign
    ranks = Fifa.rank(ranks, teamB, winnerIsTeamB, draw, winnerIsTeamA, goalsTeamB, goalsTeamA);

    const rankedA = ranks[teamA][ranks[teamA].length - 1];
    const rankedB = ranks[teamB][ranks[teamB].length - 1];

    return { ranks, rankedA, rankedB };
  }

  static rank(ranks, nameScope, win, draw, loss, goalsPro, goalsCon) {
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
      underOneAndHalf: ((team.underOneAndHalf || 0) * gamesCount + isUnderOneAndHalf) / rise,
      underTwoAndHalf: ((team.underTwoAndHalf || 0) * gamesCount + isUnderTwoAndHalf) / rise,
      underThreeAndHalf: ((team.underThreeAndHalf || 0) * gamesCount + isUnderThreeAndHalf) / rise,
      underFourAndHalf: ((team.underFourAndHalf || 0) * gamesCount + isUnderFourAndHalf) / rise,
      overHalf: ((team.overHalf || 0) * gamesCount + isOverHalf) / rise,
      overOneAndHalf: ((team.overOneAndHalf || 0) * gamesCount + isOverOneAndHalf) / rise,
      overTwoAndHalf: ((team.overTwoAndHalf || 0) * gamesCount + isOverTwoAndHalf) / rise,
      overThreeAndHalf: ((team.overThreeAndHalf || 0) * gamesCount + isOverThreeAndHalf) / rise,
      overFourAndHalf: ((team.overFourAndHalf || 0) * gamesCount + isOverFourAndHalf) / rise,
    };

    ranks[nameScope] = [...(ranks[nameScope] || []), ...([team] || [])];

    return ranks;
  }

  static getRankTeams(games) {
    let teams = {};
    games.forEach((game) => {
      const { ranks } = Fifa.addAndGetRank(teams, game, 'team');
      teams = ranks;
    });
    return teams;
  }

  static getRankUsers(games, teams) {
    let users = {};
    games.forEach((game) => {
      const { ranks } = Fifa.getGameInput(game, teams, users);
      users = ranks;
    });
    return users;
  }

  static aggTrain(games, teams) {
    const agg = [];
    let users = {};
    games.forEach((game) => {
      const output = Fifa.getGameOutput(game);
      const { input, ranks } = Fifa.getGameInput(game, teams, users);
      users = ranks;
      agg.push({ input, output });
    });
    return { agg, users };
  }

  addedTrain(data) {
    const inputs = [];
    data.input.forEach((each) => {
      const tensorA = this.tf.tensor(each[0]);
      const tensorB = this.tf.tensor(each[1]);
      const tensorInput = tensorA.sub(tensorB);
      const input = Array.from(tensorInput.dataSync());
      inputs.push(input);

      tensorA.dispose();
      tensorB.dispose();
      tensorInput.dispose();

      return input;
    });

    return { input: inputs, output: data.output };
  }

  static splitInputOutput(data) {
    const input = [];
    const output = [];
    data.forEach((each) => {
      input.push(each.input);
      output.push(each.output);
    });
    return { input, output };
  }

  static getTrainValidation(data, percentTrainSet) {
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
  }

  static spliceResultOutput(data) {
    const { input } = data;
    const output = data.output.map((each) => each.slice(0, 3));
    return { input, output };
  }

  static spliceGoalsOutput(data) {
    const { input } = data;
    const output = data.output.map((each) => each.slice(3, 6));
    return { input, output };
  }

  dataTooler(data) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve) => {
      const datedSet = await this.saveGetDataSet(data);
      const gamesSet = Fifa.getJustData(datedSet);
      const teamsSet = Fifa.getRankTeams(gamesSet);
      const { agg: aggregatedSet, users: usersSet } = await Fifa.aggTrain(gamesSet, teamsSet);

      resolve({ aggregated: aggregatedSet, users: usersSet, teams: teamsSet });

      const trainSet = Fifa.splitInputOutput(aggregatedSet);
      this.localDB.createTableDB({ gamesSet });
      this.localDB.createTableDB({ aggregatedSet });
      this.localDB.createTableDB({ trainSet });
      this.localDB.createTableDB({ teamsSet });
      this.localDB.createTableDB({ usersSet });
      this.saveTrainAddedSet(trainSet);
      this.saveResultSet(trainSet);
      this.saveGoalsSet(trainSet);
      this.saveTrainValidationSet(trainSet);
    });
  }

  async timeFilterRank(context, date) {
    const set = await this.localDB.getIndexed('dataSet', 'date');
    const initDate = new Date(date).getTime();
    const timedSet = set.filter((s) => new Date(s.date.split('.').join('-')).getTime() > initDate);
    const gamesSet = Fifa.getJustData(timedSet);
    const teamsSet = Fifa.getRankTeams(gamesSet);
    if (context === 'teams') return teamsSet;
    return Fifa.getRankUsers(gamesSet, teamsSet);
  }

  saveGetDataSet(dataSet) {
    this.localDB.createTableDB({ dataSet }, 'date', 'id');
    return this.localDB.getIndexed('dataSet', 'date');
  }

  saveTrainAddedSet(data) {
    const addedTrainSet = this.addedTrain(data);
    this.localDB.createTableDB({ addedTrainSet });
  }

  saveResultSet(data) {
    const trainResultSet = Fifa.spliceResultOutput(data);
    this.localDB.createTableDB({ trainResultSet });
  }

  saveGoalsSet(data) {
    const trainGoalsSet = Fifa.spliceGoalsOutput(data);
    this.localDB.createTableDB({ trainGoalsSet });
  }

  saveTrainValidationSet(data) {
    const trainValidationSets = Fifa.getTrainValidation(data, 0.7);
    this.localDB.createTableDB({ trainValidationSets });
  }

  static isTruncated(data) {
    const truncatedLogs = [];

    const isValid = (inData) => {
      if (Number.isNaN(inData)) return 'Is NaN!';
      if (inData === true) return 'Is true!';
      if (inData === false) return 'Is false!';
      if (inData === null) return 'Is null!';
      if (inData === undefined) return 'Is undefined!';
      if (inData === '') return "Is ''!";
      return false;
    };

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
  }

  async registerGid(sheetId) {
    const key = '1DzPBoZzRx1JraO48IaiRsTCML75XXLFMj0ZItfaI8-A';
    const data = await this.database.getSource(key, sheetId);
    const today = `${new Date().getYear() + 1900}.${
      new Date().getMonth() + 1
    }.${new Date().getDate()}`;

    if (data) {
      if (data.date !== today) {
        const maybeTruncated = Fifa.isTruncated([data]);
        if (!maybeTruncated.length) {
          await this.database.postData(data);
          return true;
        }
        return maybeTruncated;
      }
      return 'Error: Wait to pass the day to add the gId.';
    }
    return 'Error: There is no valid dataSet.';
  }

  async databaseIsConsistent() {
    const dbs = await this.localDB.getAllDBNames();
    const names = dbs.map((each) => each.name);
    if (this.nameTables.filter((table) => !names.includes(table)).length) return false;
    const nowConsistency = this.localDB.getConsistency();
    if (this.developerMode) return nowConsistency;
    const oldConsistency = await this.database.getConsistency();
    if (oldConsistency.aggregatedSet === nowConsistency) return nowConsistency;

    return false;
  }

  async setDatabaseConsistency() {
    const dataSet = await this.getFifaDatabase();
    const { aggregated } = await this.dataTooler(dataSet);
    const newConsistency = this.hash(aggregated);
    await this.database.postConsistency({ aggregatedSet: newConsistency });
  }

  async forceDatabaseConsistency() {
    const newConsistency = await this.localDB.getConsistency();
    await this.database.postConsistency({ aggregatedSet: newConsistency });
  }

  async initLocalDatabase(aggregated, users, teams, data) {
    if (!aggregated) {
      const status = await this.databaseIsConsistent();
      this.debugTime('databaseIsConsistent');
      if (!status) {
        await this.localDB.deleteAllDB();
        this.debugTime('deleteAllDB');
        const datedSet = await this.getFifaDatabase();
        this.debugTime('getFifaDatabase');
        const tooler = await this.dataTooler(datedSet);
        this.debugTime('dataTooler');
        return this.initLocalDatabase(tooler.aggregated, tooler.users, tooler.teams, datedSet);
      }
      try {
        const aggregatedSet = await this.localDB.getTable('aggregatedSet');
        const usersSet = await this.localDB.getTable('usersSet');
        const teamsSet = await this.localDB.getTable('teamsSet');
        const dataSet = await this.localDB.getIndexed('dataSet', 'date');
        this.debugTime('indexedDB');
        return this.initLocalDatabase(aggregatedSet, usersSet, teamsSet, dataSet);
      } catch (error) {
        this.debugTime(`Catch error${JSON.stringify(error)}`);
        this.localDB.setConsistency(new Date());
        return this.initLocalDatabase();
      }
    }
    this.defaultML.end = aggregated.length;
    this.defaultML.max = aggregated.length;
    this.defaultML.step = aggregated.length;
    return {
      aggregated,
      users,
      teams,
      data,
    };
  }
}
