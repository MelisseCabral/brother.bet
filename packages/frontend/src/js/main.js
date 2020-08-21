// Calling Modules JS
import * as tf from '@tensorflow/tfjs';
// import $ from 'jquery';
import * as firebase from 'firebase/app';
import Typed from 'typed.js';
import $ from 'jquery';

// Defining Modules JS
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/analytics';

// Library CSS
import 'animate.css';

// My Css
import '../css/timeline.css';
import '../css/loader.css';
import '../css/styles.css';

// My Modules
import Environment from './environment';
import Api from '@brother.bet';
import Database from './database';
import FactoryUtil from './factoryUtil';
import LocalDB from './localDB';
import Fifa from './fifa';
import DashTables from './dashTables';
import DashStatistics from './dashStatistics';
import DashTimelines from './dashTimelines';
import Dashboard from './dashboard';

// Static Components
import tableRanking from '../components/tableRanking.hbs';
import statistics from '../components/statistics.hbs';
import timeline from '../components/timeline.hbs';
import tableLastGames from '../components/tableLastGames.hbs';

class Main {
  constructor({
    window,
    tf,
    firebase,
    Typed,
    axios,
    $,
    Environment,
    Api,
    Database,
    FactoryUtil,
    LocalDB,
    Fifa,
    DashTables,
    DashStatistics,
    DashTimelines,
    Dashboard,
    tableRanking,
    statistics,
    timeline,
    tableLastGames,
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
    this.timeline = timeline;
    this.tableLastGames = tableLastGames;

    // Objects
    this.window = window;
    this.tf = tf;
    this.firebase = firebase;
    this.Typed = Typed;
    this.axios = axios;
    this.$ = $;
    this.Environment = Environment;
    this.Api = Api;
    this.Database = Database;
    this.FactoryUtil = FactoryUtil;
    this.LocalDB = LocalDB;
    this.Fifa = Fifa;
    this.DashTables = DashTables;
    this.DashStatistics = DashStatistics;
    this.DashTimelines = DashTimelines;
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
    const { indexedDB, localStorage, origin } = this.window;
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
    const dashTables = new this.DashTables({
      $: this.$,
      hash,
      generateDaysOfYear,
      getRegisteredDays,
      tableRanking: this.tableRanking,
      tableLastGames: this.tableLastGames,
    });
    const dashStatistics = new this.DashStatistics({
      $: this.$,
      developerMode,
      statistics: this.statistics,
    });
    const dashboard = new this.Dashboard({
      Typed: this.Typed,
      $: this.$,
      developerMode,
      debugTime,
      filterRankByTarget,
      hash,
      localDB,
      fifa,
      dashTables,
      dashStatistics,
      DashTimelines: this.DashTimelines,
      timeline: this.timeline,
    });

    this.window.developerMode.status = developerMode;

    this.firebase.initializeApp(this.firebaseConfig);
    if (!developerMode) this.firebase.analytics();

    return dashboard;
  }
}

new Main({
  window,
  tf,
  firebase,
  Typed,
  axios,
  $,
  Environment,
  Api,
  Database,
  FactoryUtil,
  LocalDB,
  Fifa,
  DashTables,
  DashStatistics,
  DashTimelines,
  Dashboard,
  tableRanking,
  statistics,
  timeline,
  tableLastGames,
});
