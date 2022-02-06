const express = require('express');
const { getUserGenres, saveRecommendations, saveUserRating } = require('../controllers/resultsController.js');

const router = express.Router();

router.post('/getUserGenres', getUserGenres);
router.post('/saveRecommendations', saveRecommendations);
router.post('/saveUserRating', saveUserRating);

module.exports = {
    routes: router
}
