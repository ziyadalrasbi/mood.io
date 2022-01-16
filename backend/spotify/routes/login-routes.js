const express = require('express');
const { requestAccessToken, getUserId, getUserTopGenres } = require('../controllers/spotifyLoginController.js');

const router = express.Router();

router.post('/requestAccessToken', requestAccessToken);
router.post('/getUserId', getUserId);
router.post('/getUserTopGenres', getUserTopGenres);

module.exports = {
    routes: router
}


