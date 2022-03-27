const express = require('express');
const { createLibrary, createPlaylist, addTracksToPlaylist } = require('../controllers/spotifyResultsController.js');

const router = express.Router();

router.post('/createLibrary', createLibrary);
router.post('/createPlaylist', createPlaylist);
router.post('/addTracksToPlaylist', addTracksToPlaylist);

module.exports = {
    routes: router
}