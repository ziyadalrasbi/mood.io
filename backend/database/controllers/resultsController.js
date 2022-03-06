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
        const message = 'Error saving user\'s recent mood, please try again. \n' + error;
        return res.json({ status: 400, message: message });
    }
}

const getUserArtists = async (req, res, next) => {
    try {
        const response = await firebase.firestore().collection('users').doc(JSON.stringify(req.body.user));
        response.get()
            .then((doc) => {
                return res.json({ status: 200, topGenres: doc.data().topArtists });
            })
    } catch (error) {
        const message = 'Error getting user top artists from database for results, please try again. \n' + error;
        return res.json({ status: 400, message: message });
    }
}

const getPlaylistsAmount = async (req, res, next) => {
    try {
        const response = await firebase.firestore().collection('users').doc(JSON.stringify(req.body.user));
        response.get()
            .then((doc) => {
                return res.json({ status: 200, amount: doc.data().playlists });
            })
    } catch (error) {
        const message = 'Error getting playlists amount, please try again. \n' + error;
        return res.json({ status: 400, message: message });
    }
}

const incrementPlaylistsAmount = async (req, res, next) => {
    try {
        var amount = 0;
        const response = await firebase.firestore().collection('users').doc(JSON.stringify(req.body.user));
        response.get()
            .then((doc) => {
                amount = doc.data().playlists + 1;
                response.set({
                    playlists: amount
                }, { merge: true });
            })
        return res.json({ status: 200 });
    } catch (error) {
        const message = 'Error incrementing playlists amount, please try again. \n' + error;
        return res.json({ status: 400, message: message });
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
                time: Date.now(),
                playlisted: false,
                id: req.body.id,
                link: null
            })
        return res.json({ status: 200 });
    } catch (error) {
        const message = 'Error saving recommendations, please try again. \n' + error;
        return res.json({ status: 400, message: message });
    }
}

const setPlaylisted = async (req, res, next) => {
    try {
        await firebase.firestore()
            .collection('users')
            .doc(JSON.stringify(req.body.user))
            .collection('recommendations')
            .where('id', '==', req.body.id)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    doc.ref.set({
                        playlisted: true,
                        link: req.body.link
                    }, { merge: true });
                })
            });
        return res.json({ status: 200 });
    } catch (error) {
        const message = 'Error setting playlisted status, please try again. \n' + error;
        return res.json({ status: 400, message: message });
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
        return res.json({ status: 200 });
    } catch (error) {
        const message = 'Error saving user rating, please try again. \n' + error;
        return res.json({ status: 400, message: message });
    }
}

const getRecentMood = async (req, res, next) => {
    try {
        const response = await firebase.firestore().collection('users').doc(JSON.stringify(req.body.user));
        response.get()
            .then((doc) => {
                return res.json({ status: 200, recentMood: doc.data().recentMood });
            })
    } catch (error) {
        const message = 'Error getting recent mood from database, please try again. \n' + error;
        return res.json({ status: 400, message: message });
    }
}

module.exports = {
    saveRecentMood,
    getUserArtists,
    getPlaylistsAmount,
    incrementPlaylistsAmount,
    saveRecommendations,
    setPlaylisted,
    saveUserRating,
    getRecentMood
}