const express = require('express');
const { createToken, deleteUser } = require('../controllers/adminController.js');

const router = express.Router();

router.post('/createToken', createToken);
router.post('/deleteUser', deleteUser);

module.exports = {
    routes: router
}
