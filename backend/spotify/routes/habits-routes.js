const express = require('express');
const { getListeningHabits } = require('../controllers/spotifyHabitsController.js');

const router = express.Router();

router.post('/getListeningHabits', getListeningHabits);


module.exports = {
    routes: router
}