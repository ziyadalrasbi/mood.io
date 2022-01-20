const express = require('express');
const { getUserGenres } = require('../controllers/resultsController.js');

const router = express.Router();

router.post('/getUserGenres', getUserGenres);

module.exports = {
    routes: router
}
