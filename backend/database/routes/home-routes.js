const express = require('express');
const { getRecommendations } = require('../controllers/homeController.js');

const router = express.Router();

router.post('/getRecommendations', getRecommendations);

module.exports = {
    routes: router
}
