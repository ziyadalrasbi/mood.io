const express = require('express');
const { detectFace } = require('../controllers/detectionController.js');

const router = express.Router();

router.post('/detectFace', detectFace);

module.exports = {
    routes: router
}