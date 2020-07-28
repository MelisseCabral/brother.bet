export default class Main {
  constructor({
    window,
    tf,
    firebase,
    Typed,
    Environment,
    Api,
    Database,
    FactoryUtil,
    LocalDb,
    Fifa,
    FactoryEffects,
    DashTables,
    DashStatistics,
    Dashboard,
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

    // Objects
    this.window = window;
    this.tf = tf;
    this.firebase = firebase;
    this.Typed = Typed;
    this.Environment = Environment;
    this.Api = Api;
    this.Database = Database;
    this.FactoryUtil = FactoryUtil;
    this.LocalDb = LocalDb;
    this.Fifa = Fifa;
    this.FactoryEffects = FactoryEffects;
    this.FashTables = DashTables;
    this.DashStatistics = DashStatistics;
    this.Dashboard = Dashboard;

    // Globals
    this.window.developerMode = { status: false };
    this.window.passedSeconds = { value: 0 };
    this.window.initTime = { value: 0 };
    this.indexedDb = {};
    this.localStorage = {};

    // Initialize
    this.init();
  }

  init() {
    const { indexedDB, localStorage } = this.window;
    const { origin, developerMode } = new this.Environment();
    const { api } = new this.Api(origin);
    const database = new this.Database(api);
    const {
      hash,
      generateDaysOfYear,
      delay,
      filterRankByTarget,
      getRegisteredDays,
      debugTime,
    } = this.FactoryUtil;
    const localDb = new this.LocalDb({
      hash,
      indexedDB,
      localStorage,
    });
    const fifa = new this.Fifa({
      tf: this.tf,
      localDb,
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
    });
    const dashStatistics = new this.DashStatistics({ getStructure, developerMode });

    // eslint-disable-next-line no-unused-vars
    const dashboard = new this.Dashboard({
      Typed: this.Typed,
      developerMode,
      debugTime,
      filterRankByTarget,
      hash,
      localDb,
      fifa,
      dashTables,
      dashStatistics,
    });

    this.window.developerMode.status = developerMode;

    this.firebase.initializeApp(this.firebaseConfig);
    this.firebase.analytics();
  }
}
