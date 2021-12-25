'use strict';

const dotenv = require('dotenv');
const assert = require('assert');

dotenv.config();

const {
    API_KEY,
    AUTH_DOMAIN,
    PROJECT_ID,
    STORAGE_BUCKET,
    MESSAGING_SENDER_ID,
    APP_ID,
    MEASUREMENT_ID
} = process.env;


module.exports = {
    firebaseConfig: {
        apiKey: "AIzaSyD2bHyYmGh6PtM76lj-4FZu-EwWNRHtUTI",
        authDomain: "mood-io-be1cc.firebaseapp.com",
        projectId: "mood-io-be1cc",
        storageBucket: "mood-io-be1cc.appspot.com",
        messagingSenderId: "159561548589",
        appId: "1:159561548589:web:9148d9531100bcc6d609a4",
        measurementId: "G-R0QQ53XLDE"
      }
}