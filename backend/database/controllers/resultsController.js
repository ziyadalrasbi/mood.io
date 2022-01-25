'use strict';

const firebase = require('../db.js');

const getUserGenres = async (req, res, next) => {
    try {
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

const saveUserRating = async (req, res, next) => {
    try {
        const response = firebase.firestore().collection('ratings').doc('algorithm');
        response.get()
            .then((doc) => {
                response.set({
                    rating: ((doc.data().rating * doc.data().total) + req.body.rating) / (doc.data().total + 1),
                    total: doc.data().total + 1
                }, { merge: true });
            })
        console.log('Successfully updated rating!');
        res.send('User added successfully!');
    } catch (error) {
        console.log('Error getting user top genres from database, please try again. \n' + error);
        res.status(400).send(error.message);
    }
}

module.exports = {
    getUserGenres,
    saveUserRating
}