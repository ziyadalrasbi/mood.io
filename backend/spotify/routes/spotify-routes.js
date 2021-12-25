const express = require('express');
const { getName, getTopArtists, getTopTracks } = require('../controllers/spotifyHomeController.js');
const { getUserId } = require('../controllers/spotifyLoginController.js');

const router = express.Router();

router.post('/getName', getName);
router.post('/getTopArtists', getTopArtists);
router.post('/getTopTracks', getTopTracks);
router.post('/getUserId', getUserId);

module.exports = {
    routes: router
}