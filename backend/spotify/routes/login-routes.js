const express = require('express');
const { requestAccessToken, refreshAccessToken, getUserId, getUserTopArtists } = require('../controllers/spotifyLoginController.js');

const router = express.Router();

router.post('/requestAccessToken', requestAccessToken);
router.post('/refreshAccessToken', refreshAccessToken);
router.post('/getUserId', getUserId);
router.post('/getUserTopArtists', getUserTopArtists);

module.exports = {
    routes: router
}


