/* eslint-disable no-param-reassign */
/* eslint-disable no-new */
/* eslint-disable class-methods-use-this */

import db from './database';
import util from './util';
import debugTime from './debugTime';

class Fifa {
  constructor() {
    this.db = db;
    this.util = util;

    this.init = false;

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
      'trainValidationSet',
    ];

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

    this.debugTime = debugTime;
  }

  async getFifaDatabase(year) {
    const data = await this.db.getBundle(year);
    if (data) return data;
    await this.util.delay(2);
    return this.getFifaDatabase(year);
  }

  async getFifaDatabaseFiles(year) {
    const dataSet = [];
    const getAllDays = await this.db.getDays(year);
    for (let i = 0; i < getAllDays.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const data = await this.db.getData(year, getAllDays[i]);
      if (data) {
        dataSet.push(data);
      } else {
        console.log(getAllDays[i], data);
        // eslint-disable-next-line no-await-in-loop
        await this.util.delay(2);
        i -= 1;
      }
    }
    return dataSet;
  }

  async getFifaCloud(gidsTables) {
    const key = '1DzPBoZzRx1JraO48IaiRsTCML75XXLFMj0ZItfaI8-A';
    for (let i = 0; i < gidsTables.length; i += 1) {
      const sheetId = gidsTables[i];
      // eslint-disable-next-line no-await-in-loop
      const data = await this.db.getSource(key, sheetId);
      if (data) {
        // eslint-disable-next-line no-await-in-loop
        await this.db.postData(data);
      } else {
        // eslint-disable-next-line no-await-in-loop
        await this.util.delay(2);
        i -= 1;
        console.log(gidsTables[i], data);
      }
    }
  }

  getJustData(data) {
    let arr = [];
    data.forEach((each) => each.data.forEach((each2) => {
      arr = [...arr, each2];
    }));
    return arr;
  }

  getGameOutput(game) {
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
  }

  getGameInput(game, teams, usersIn = {}) {
    const { ranks, rankedA, rankedB } = this.addAndGetRank(usersIn, game, 'user');

    const teamA = teams[game.teamA.team][teams[game.teamA.team].length - 1];
    const teamB = teams[game.teamB.team][teams[game.teamB.team].length - 1];

    const input = [
      [...Object.values(teamA), ...Object.values(rankedA)],
      [...Object.values(teamB), ...Object.values(rankedB)],
    ];

    return { input, ranks };
  }

  addAndGetRank(ranks, game, scope) {
    const {
      0: winnerIsTeamA,
      1: draw,
      2: winnerIsTeamB,
      3: goalsTeamA,
      4: goalsTeamB,
    } = { ...this.getGameOutput(game) };

    const teamA = game.teamA[scope];
    const teamB = game.teamB[scope];

    ranks = this.rank(
      ranks,
      teamA,
      winnerIsTeamA,
      draw,
      winnerIsTeamB,
      goalsTeamA,
      goalsTeamB,
    );
    // eslint-disable-next-line no-param-reassign
    ranks = this.rank(
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
  }

  rank(ranks, nameScope, win, draw, loss, goalsPro, goalsCon) {
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
  }

  getRankTeams(games) {
    let teams = {};
    games.forEach((game) => {
      const { ranks } = this.addAndGetRank(teams, game, 'team');
      teams = ranks;
    });
    return teams;
  }

  getListUsers(games) {
    const users = [];
    games.forEach((each) => {
      const game = Object.values(each);
      game.forEach((eachGame) => {
        if (!users.includes(eachGame.user)) users.push(eachGame.user);
      });
    });
    return users;
  }

  aggregationTrain(games, teams) {
    const aggregated = [];
    let users = {};
    games.forEach((game) => {
      const output = this.getGameOutput(game);
      const { input, ranks } = this.getGameInput(game, teams, users);
      users = ranks;
      aggregated.push({ input, output });
    });
    return { aggregated, users };
  }

  splitInputOutput(data) {
    const input = [];
    const output = [];
    data.forEach((each) => {
      input.push(each.input);
      output.push(each.output);
    });
    return { input, output };
  }

  getTrainValidation(data, percentTrainSet) {
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

  spliceResultOutput(data) {
    const { input } = data;
    const output = data.output.map((each) => each.slice(0, 3));

    return { input, output };
  }

  spliceGoalsOutput(data) {
    const { input } = data;
    const output = data.output.map((each) => each.slice(3, 6));

    return { input, output };
  }

  dataTooler(data) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve) => {
      const datedSet = await this.saveGetDataSet(data);
      const gamesSet = this.getJustData(datedSet);
      const teamsSet = this.getRankTeams(gamesSet);
      const {
        aggregated: aggregatedSet,
        users: usersSet,
      } = this.aggregationTrain(gamesSet, teamsSet);

      resolve({ aggregated: aggregatedSet, users: usersSet, teams: teamsSet });

      const trainSet = this.splitInputOutput(aggregatedSet);
      this.localDb.createTableDB(gamesSet);
      this.localDb.this.localDb.createTableDB(aggregatedSet);
      this.localDb.createTableDB(trainSet);
      this.localDb.createTableDB(teamsSet);
      this.localDb.createTableDB(usersSet);
      this.saveTrainAddedSet(trainSet);
      this.saveResultSet(trainSet);
      this.saveGoalsSet(trainSet);
      this.saveTrainValidationSet(trainSet);
    });
  }

  saveGetDataSet(data) {
    this.localDb.createTableDB(data, 'dataSet', 'date', 'id');
    return this.localDb.getIndexed('dataSet', 'date');
  }

  saveTrainAddedSet(data) {
    const addedTrainSet = this.aggregationTrainaddedTrain(data);
    this.localDb.createTableDB(addedTrainSet);
  }

  saveResultSet(data) {
    const trainResultSet = this.aggregationTrainspliceResultOutput(data);
    this.localDb.createTableDB(trainResultSet);
  }

  saveGoalsSet(data) {
    const trainGoalsSet = this.aggregationTrainspliceGoalsOutput(data);
    this.localDb.createTableDB(trainGoalsSet);
  }

  saveTrainValidationSet(data) {
    const trainValidationSets = this.aggregationTraingetTrainValidation(data, 0.7);
    this.localDb.createTableDB(trainValidationSets);
  }

  async isTruncate() {
    const data = await this.localDb.getTable('datedSet');
    return this.isTruncated(data);
  }

  isTruncated(data) {
    const truncatedLogs = [];
    const validate = (dataTest, obj, context) => {
      const testValidation = this.isValid(dataTest);
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
  }

  async registerGid(sheetId) {
    const key = '1DzPBoZzRx1JraO48IaiRsTCML75XXLFMj0ZItfaI8-A';
    const data = await this.db.getSource(key, sheetId);
    const today = `${new Date().getYear() + 1900}.${new Date().getMonth() + 1}.${new Date().getDate()}`;

    if (data) {
      if (data.date !== today) {
        const maybeTruncated = this.isTruncated([data]);
        if (!maybeTruncated.length) {
          await this.db.postData(data);
          return true;
        }
        return maybeTruncated;
      }
      return 'Error: Wait to pass the day to add the gId.';
    }
    return 'Error: There is no valid dataSet.';
  }

  filterRankByTarget(data, target, inverse) {
    data.sort((a, b) => {
      if (a[target] < b[target]) return -1;
      if (a[target] > b[target]) return 1;
      return 0;
    });
    if ((target === 'name' && !inverse) || (target !== 'name' && inverse)) return data;
    return data.reverse();
  }

  async databaseIsConsistent() {
    const dbs = await this.localDb.getAllDbNames();
    const names = dbs.map((each) => each.name);
    if (this.nameTables.filter((table) => !names.includes(table)).length) return false;
    const nowConsistency = this.getConsistency();
    if (this.developerMode) return nowConsistency;
    const oldConsistency = await this.getDatabaseConsistency();
    if (oldConsistency.aggregatedSet === nowConsistency) return nowConsistency;

    return false;
  }

  async setDatabaseConsistency() {
    const dataSet = await this.getFifaDatabase();
    const { aggregated } = await this.dataTooler(dataSet);
    const newConsistency = this.util.hash(aggregated);
    await this.postDatabaseConsistency({ aggregatedSet: newConsistency });
  }

  async forceDatabaseConsistency() {
    const newConsistency = await this.getConsistency();
    await this.postDatabaseConsistency({ aggregatedSet: newConsistency });
  }

  async initLocalDatabase(aggregated, users, teams, data) {
    if (!aggregated) {
      const status = await this.databaseIsConsistent();
      this.debugTime('databaseIsConsistent');
      if (!status) {
        await this.localDb.deleteAllDB();
        this.debugTime('deleteAllDB');
        const datedSet = await this.getFifaDatabase();
        this.debugTime('getFifaDatabase');
        const tooler = await this.dataTooler(datedSet);
        this.debugTime('dataTooler');
        return this.initLocalDatabase(
          tooler.aggregated,
          tooler.users,
          tooler.teams,
          datedSet,
        );
      }
      try {
        const aggregatedSet = await this.localDb.getTable('aggregatedSet');
        const usersSet = await this.localDb.getTable('usersSet');
        const teamsSet = await this.localDb.getTable('teamsSet');
        const dataSet = await this.localDb.getIndexed('dataSet', 'date');
        this.debugTime('indexedDb');
        return this.initLocalDatabase(aggregatedSet, usersSet, teamsSet, dataSet);
      } catch (error) {
        this.debugTime(`Catch error${JSON.stringify(error)}`);
        this.util.setConsistency(new Date());
        return this.initLocalDatabase();
      }
    }
    this.defaultML.end = aggregated.length;
    this.defaultML.max = aggregated.length;
    this.defaultML.step = aggregated.length;
    return {
      aggregated, users, teams, data,
    };
  }

  async getRegisteredDays(datedSet) {
    const registeredIds = {};
    datedSet.forEach((each) => {
      registeredIds[each.date] = each.id;
    });
    return registeredIds;
  }
}

const { filterRankByTarget } = new Fifa();

export { filterRankByTarget };
