export default class Main {
  constructor({
    window,
    tf,
    firebase,
    Typed,
    axios,
    Environment,
    Api,
    Database,
    FactoryUtil,
    LocalDB,
    Fifa,
    FactoryEffects,
    DashTables,
    DashStatistics,
    Dashboard,
    tableRanking,
    statistics,
  }) {
    // Constants
    this.firebaseConfig = {
      apiKey: 'AIzaSyCkYehF5D_TWlTEDNnbHNJt0EVKqLO9NUo',
      authDomain: 'brother-bet.firebaseapp.com',
      databaseURL: 'https://brother-bet.firebaseio.com',
      projectId: 'brother-bet',
      storageBucket: 'brother-bet.appspot.com',
      messagingSenderId: '1004176095521',
      appId: '1:1004176095521:web:5e0d2d7f43d7140a5ee660',
      measurementId: 'G-JP3CLKKFHR',
    };

    // Variables
    this.origin = '';

    // Static Components;
    this.tableRanking = tableRanking;
    this.statistics = statistics;

    // Objects
    this.window = window;
    this.tf = tf;
    this.firebase = firebase;
    this.Typed = Typed;
    this.axios = axios;
    this.Environment = Environment;
    this.Api = Api;
    this.Database = Database;
    this.FactoryUtil = FactoryUtil;
    this.LocalDB = LocalDB;
    this.Fifa = Fifa;
    this.FactoryEffects = FactoryEffects;
    this.DashTables = DashTables;
    this.DashStatistics = DashStatistics;
    this.Dashboard = Dashboard;

    // Globals
    this.window.developerMode = { status: false };
    this.window.passedSeconds = { value: 0 };
    this.window.initTime = { value: 0 };
    this.indexedDb = {};
    this.localStorage = {};

    // Initialize
    this.layout = this.init();
  }

  init() {
    const {
      indexedDB,
      localStorage,
      origin,
      document,
    } = this.window;
    const { newOrigin, developerMode } = new this.Environment(origin);
    const { api } = new this.Api(this.axios, newOrigin);
    const database = new this.Database(api);
    const {
      hash,
      generateDaysOfYear,
      delay,
      filterRankByTarget,
      getRegisteredDays,
      debugTime,
    } = this.FactoryUtil;
    const localDB = new this.LocalDB({
      hash,
      indexedDB,
      localStorage,
    });
    const fifa = new this.Fifa({
      developerMode,
      tf: this.tf,
      localDB,
      database,
      debugTime,
      delay,
      hash,
    });
    const { getStructure } = this.FactoryEffects;
    const dashTables = new this.DashTables({
      hash,
      generateDaysOfYear,
      getRegisteredDays,
      getStructure,
      tableRanking: this.tableRanking,
    });
    const dashStatistics = new this.DashStatistics({
      getStructure,
      developerMode,
      statistics: this.statistics,
    });

    const dashboard = new this.Dashboard({
      document,
      Typed: this.Typed,
      developerMode,
      debugTime,
      filterRankByTarget,
      hash,
      localDB,
      fifa,
      dashTables,
      dashStatistics,
    });

    this.window.developerMode.status = developerMode;

    this.firebase.initializeApp(this.firebaseConfig);
    this.firebase.analytics();

    return dashboard;
  }
}
