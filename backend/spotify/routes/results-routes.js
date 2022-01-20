const express = require('express');
const { getRecommendations } = require('../controllers/spotifyResultsController.js');

const router = express.Router();

router.post('/getRecommendations', getRecommendations);

module.exports = {
    routes: router
}