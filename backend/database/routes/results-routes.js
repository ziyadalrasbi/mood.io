const express = require('express');
const { 
    saveRecentMood, 
    getUserArtists, 
    getPlaylistsAmount,
    incrementPlaylistsAmount,
    saveRecommendations,
    setPlaylisted,
    saveUserRating, 
    getRecentMood 
} = require('../controllers/resultsController.js');

const router = express.Router();

router.post('/saveRecentMood', saveRecentMood);
router.post('/getUserArtists', getUserArtists);
router.post('/getPlaylistsAmount', getPlaylistsAmount);
router.post('/incrementPlaylistsAmount', incrementPlaylistsAmount);
router.post('/saveRecommendations', saveRecommendations);
router.post('/setPlaylisted', setPlaylisted);
router.post('/saveUserRating', saveUserRating);
router.post('/getRecentMood', getRecentMood);

module.exports = {
    routes: router
}
