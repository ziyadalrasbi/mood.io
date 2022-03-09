const express = require('express');
const { submitQuery } = require('../controllers/contactController.js');

const router = express.Router();

router.post('/submitQuery', submitQuery);

module.exports = {
    routes: router
}
