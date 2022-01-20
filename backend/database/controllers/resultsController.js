'use strict';

const firebase = require('../db.js');

const getUserGenres = async (req, res, next) => {
    try {
        console.log(req.body.user);
        const response = firebase.firestore().collection('users').doc(JSON.stringify(req.body.user));
        response.get()
            .then((doc) => {
                res.json({ topGenres: doc.data().topArtists });
            })
    } catch (error) {
        console.log('Error getting user top genres from database, please try again. \n' + error);
        res.status(400).send(error.message);
    }
}

module.exports = {
    getUserGenres
}