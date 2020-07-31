// Calling Modules JS
import * as tf from '@tensorflow/tfjs';
// import $ from 'jquery';
import * as firebase from 'firebase/app';
import Typed from 'typed.js';
import axios from 'axios';

// Defining Modules JS
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/analytics';

// Library CSS
import 'animate.css';

// My Css
import '../css/styles.css';
import '../css/loader.css';

// My Modules
import Environment from './environment';
import Api from './api';
import Database from './database';
import FactoryUtil from './factoryUtil';
import LocalDB from './localDB';
import Fifa from './fifa';
import FactoryEffects from './factoryEffects';
import DashTables from './dashTables';
import DashStatistics from './dashStatistics';
import Dashboard from './dashboard';
import Main from './main';

// Static Components
import tableRanking from '../components/tableRanking.hbs';
import statistics from '../components/statistics.hbs';

// eslint-disable-next-line no-unused-vars
const main = new Main({
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
});

// window,            OK
// tf,                OK
// firebase,          OK
// Typed,             OK
// Environment,       OK
// Api,               OK
// Database,          OK
// FactoryUtil,       OK
// LocalDB,           OK
// Fifa,              OK
// FactoryEffects,    OK
// DashTables,        OK
// DashStatistics,    OK
// Dashboard,         NOT
