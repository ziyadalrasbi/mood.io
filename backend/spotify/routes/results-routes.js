const express = require('express');
const { getRecommendations, getAudioFeatures } = require('../controllers/spotifyResultsController.js');

const router = express.Router();

router.post('/getRecommendations', getRecommendations);
router.post('/getAudioFeatures', getAudioFeatures);

module.exports = {
    routes: router
}