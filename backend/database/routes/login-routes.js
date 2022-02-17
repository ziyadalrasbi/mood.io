const express = require('express');
const { signIn, signOut, addUser, getUserArtists, saveUserArtists } = require('../controllers/loginController.js');

const router = express.Router();

router.post('/signIn', signIn);
router.post('/signOut', signOut);
router.post('/addUser', addUser);
router.post('/getUserArtists', getUserArtists);
router.post('/saveUserArtists', saveUserArtists);

module.exports = {
    routes: router
}
