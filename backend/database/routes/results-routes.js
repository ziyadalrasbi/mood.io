const express = require('express');
const { getUserGenres, saveUserRating } = require('../controllers/resultsController.js');

const router = express.Router();

router.post('/getUserGenres', getUserGenres);
router.post('/saveUserRating', saveUserRating);

module.exports = {
    routes: router
}
