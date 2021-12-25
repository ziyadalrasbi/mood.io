const express = require('express');
const { addUser, createToken, signIn } = require('../controllers/adminController.js');

const router = express.Router();

router.post('/initUser', addUser);
router.post('/createToken', createToken);
router.post('/signIn', signIn);

module.exports = {
    routes: router
}
