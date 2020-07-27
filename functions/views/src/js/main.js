/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

import '../css/styles.css';
import '../css/loader.css';

import 'animate.css';

import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyCkYehF5D_TWlTEDNnbHNJt0EVKqLO9NUo',
  authDomain: 'brother-bet.firebaseapp.com',
  databaseURL: 'https://brother-bet.firebaseio.com',
  projectId: 'brother-bet',
  storageBucket: 'brother-bet.appspot.com',
  messagingSenderId: '1004176095521',
  appId: '1:1004176095521:web:5e0d2d7f43d7140a5ee660',
  measurementId: 'G-JP3CLKKFHR',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
