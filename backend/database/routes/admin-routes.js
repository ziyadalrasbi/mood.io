const express = require('express');
const { createToken } = require('../controllers/adminController.js');

const router = express.Router();

router.post('/createToken', createToken);

module.exports = {
    routes: router
}
