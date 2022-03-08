const express = require('express');
const { getRecommendations, getMoodCount } = require('../controllers/homeController.js');

const router = express.Router();

router.post('/getRecommendations', getRecommendations);
router.post('/getMoodCount', getMoodCount);

module.exports = {
    routes: router
}
