const express = require('express');
const { getUserId, getUserTopGenres } = require('../controllers/spotifyLoginController.js');

const router = express.Router();

router.post('/getUserId', getUserId);
router.post('/getUserTopGenres', getUserTopGenres);

module.exports = {
    routes: router
}


