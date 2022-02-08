const express = require('express');
const { getRecommendations, getAudioFeatures, createPlaylist, addTracksToPlaylist } = require('../controllers/spotifyResultsController.js');

const router = express.Router();

router.post('/getRecommendations', getRecommendations);
router.post('/getAudioFeatures', getAudioFeatures);
router.post('/createPlaylist', createPlaylist);
router.post('/addTracksToPlaylist', addTracksToPlaylist);

module.exports = {
    routes: router
}