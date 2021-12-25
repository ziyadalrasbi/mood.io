const firebase = require('firebase/compat/app');
require('firebase/compat/auth');
require('firebase/compat/firestore');
require('firebase/compat/storage');
const config = require('./config');

const db = firebase.initializeApp(config.firebaseConfig);

module.exports = db;