export default class Middleware {
  constructor(fifa, database, localDb) {
    // Data
    this.data = [];
    this.games = [];
    this.aggregated = [];
    this.train = [];
    this.teams = [];
    this.users = [];
    this.addedTrain = [];
    this.trainResult = [];
    this.trainGoals = [];
    this.train = [];

    // Objects
    this.fifa = fifa;
    this.database = database;
    this.localDb = localDb;
  }

  async local() {
    this.data = await await this.localDb.getTable('dataSet');
    this.games = await this.localDb.getTable('gamesSet');
    this.aggregated = await this.localDb.getTable('aggregatedSet');
    this.teams = await this.localDb.getTable('teamsSet');
    this.users = await this.localDb.getTable('usersSet');
    this.train = await this.localDb.getTable('trainSet');
    this.addedTrain = await this.localDb.getTable('addedTrainSet');
    this.trainResult = await this.localDb.getTable('trainResultSet');
    this.trainGoals = await this.localDb.getTable('trainGoalsSet');
    this.trains = await this.localDb.getTable('trainSets');

    if (!this.aggregated.length) return false;

    return {
      data: this.data,
      games: this.games,
      aggregated: this.aggregated,
      teams: this.teams,
      users: this.users,
      train: this.train,
      addedTrain: this.addedTrain,
      trainResult: this.trainResult,
      trainGoals: this.trainGoals,
      trainValidation: this.train,
    };
  }

  async cloud() {
    const bundle = this.database.getBundle();
    const lastDayCloud = bundle[bundle.length - 1];
    const lastDayLocal = this.data[this.data.length - 1];

    if (lastDayCloud.date !== lastDayLocal.date || lastDayCloud.length !== lastDayLocal.length) {
      const { data, games, aggregated, teams, users } = await this.fifa.init(bundle);

      this.data = data;
      this.games = games;
      this.aggregated = aggregated;
      this.teams = teams;
      this.users = users;

      return {
        data: this.data,
        games: this.games,
        aggregated: this.aggregated,
        teams: this.teams,
        users: this.users,
        train: this.train,
        addedTrain: this.addedTrain,
        trainResult: this.trainResult,
        trainGoals: this.trainGoals,
        trainValidation: this.train,
      };
    }

    return false;
  }
}
