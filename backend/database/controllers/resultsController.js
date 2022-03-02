'use strict';

const firebase = require('../db.js');

const saveRecentMood = async (req, res, next) => {
    try {
        const response = await firebase.firestore().collection('users').doc(JSON.stringify(req.body.user));
        response.set({
            recentMood: req.body.mood
        }, { merge: true });
        return res.json({ status: 200 });
    } catch (error) {
        console.log('Error saving user\'s recent mood, please try again. \n' + error);
        return res.json({ status: 400 });
    }
}

const getUserArtists = async (req, res, next) => {
    try {
        const response = await firebase.firestore().collection('users').doc(JSON.stringify(req.body.user));
        response.get()
            .then((doc) => {
                return res.json({ topGenres: doc.data().topArtists });
            })
    } catch (error) {
        console.log('Error getting user top genres from database, please try again. \n' + error);
        res.status(400).send(error.message);
    }
}

const saveRecommendations = async (req, res, next) => {
    try {
        await firebase.firestore()
            .collection('users')
            .doc(JSON.stringify(req.body.user))
            .collection('recommendations')
            .add({
                mood: req.body.mood,
                tracks: req.body.tracks,
                time: Date.now()
            })
        return res.json({ status: 200 });
    } catch (error) {
        console.log('Error getting user top genres from database, please try again. \n' + error);
        return res.json({ status: 400 });
    }
}

const saveUserRating = async (req, res, next) => {
    try {
        const response = await firebase.firestore().collection('ratings').doc('algorithm');
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

const getRecentMood = async (req, res, next) => {
    try {
        const response = await firebase.firestore().collection('users').doc(JSON.stringify(req.body.user));
        response.get()
            .then((doc) => {
                return res.json({ recentMood: doc.data().recentMood });
            })
    } catch (error) {
        console.log('Error getting user top genres from database, please try again. \n' + error);
        res.status(400).send(error.message);
    }
}


module.exports = {
    saveRecentMood,
    getUserArtists,
    saveRecommendations,
    saveUserRating,
    getRecentMood
}