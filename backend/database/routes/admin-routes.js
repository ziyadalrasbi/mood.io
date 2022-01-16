const express = require('express');
const { createToken, verifyFirebaseToken } = require('../controllers/adminController.js');

const router = express.Router();

router.post('/createToken', createToken);
router.post('/verifyFirebaseToken', verifyFirebaseToken);

module.exports = {
    routes: router
}
