const express = require('express');
const { getName, getTopArtists, getTopTracks, getListeningHabits } = require('../controllers/spotifyHomeController.js');

const router = express.Router();

router.post('/getName', getName);
router.post('/getTopArtists', getTopArtists);
router.post('/getTopTracks', getTopTracks);
router.post('/getListeningHabits', getListeningHabits);

module.exports = {
    routes: router
}