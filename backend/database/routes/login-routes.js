const express = require('express');
const { signIn, signOut, addUser, saveUserGenres } = require('../controllers/loginController.js');

const router = express.Router();

router.post('/signIn', signIn);
router.post('/signOut', signOut);
router.post('/addUser', addUser);
router.post('/saveUserGenres', saveUserGenres);

module.exports = {
    routes: router
}
