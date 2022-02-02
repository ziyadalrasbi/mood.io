const express = require('express');
const { getProfile, getTopArtists, getTopTracks } = require('../controllers/spotifyStatsController.js');

const router = express.Router();

router.post('/getProfile', getProfile);
router.post('/getTopArtists', getTopArtists);
router.post('/getTopTracks', getTopTracks);

module.exports = {
    routes: router
}