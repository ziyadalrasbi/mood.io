const express = require('express');
const { saveRecentMood, getUserGenres, saveRecommendations, saveUserRating, getRecentMood } = require('../controllers/resultsController.js');

const router = express.Router();

router.post('/saveRecentMood', saveRecentMood);
router.post('/getUserGenres', getUserGenres);
router.post('/saveRecommendations', saveRecommendations);
router.post('/saveUserRating', saveUserRating);
router.post('/getRecentMood', getRecentMood);

module.exports = {
    routes: router
}
