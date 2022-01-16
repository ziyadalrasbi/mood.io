const express = require('express');
const { requestAccessToken, refreshAccessToken, getUserId, getUserTopGenres } = require('../controllers/spotifyLoginController.js');

const router = express.Router();

router.post('/requestAccessToken', requestAccessToken);
router.post('/refreshAccessToken', refreshAccessToken);
router.post('/getUserId', getUserId);
router.post('/getUserTopGenres', getUserTopGenres);

module.exports = {
    routes: router
}


