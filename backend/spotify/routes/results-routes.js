const express = require('express');
const { createLibrary, getRecommendations, createPlaylist, addTracksToPlaylist } = require('../controllers/spotifyResultsController.js');

const router = express.Router();

router.post('/createLibrary', createLibrary);
router.post('/getRecommendations', getRecommendations);
router.post('/createPlaylist', createPlaylist);
router.post('/addTracksToPlaylist', addTracksToPlaylist);

module.exports = {
    routes: router
}