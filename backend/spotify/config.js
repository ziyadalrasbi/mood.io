'use strict';

const dotenv = require('dotenv');
const assert = require('assert');

dotenv.config();

const {
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
} = process.env;

module.exports = {
    spotifyConfig: {
        clientId: "481af46969f2416e95e9196fa60d808d",
        clientSecret: "830caf99293c4da0a262ce0ea53009b5",
        redirectUri: "https://mood-io-app.herokuapp.com"
    }
}