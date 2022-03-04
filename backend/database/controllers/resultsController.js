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
        return res.json({ status: 400 });
    }
}

const getPlaylistsAmount = async (req, res, next) => {
    try {
        const response = await firebase.firestore().collection('users').doc(JSON.stringify(req.body.user));
        response.get()
            .then((doc) => {
                return res.json({ amount: doc.data().playlists });
            })
    } catch (error) {
        console.log('Error getting playlists amount, please try again. \n' + error);
        return res.json({ status: 400 });
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
        console.log('Error incrementing playlists amount, please try again. \n' + error);
        return res.json({ status: 400 });
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
                id: req.body.id
            })
        return res.json({ status: 200 });
    } catch (error) {
        console.log('Error getting user top genres from database, please try again. \n' + error);
        return res.json({ status: 400 });
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
                        playlisted: true
                    }, { merge: true });
                })
            })
    } catch (error) {
        console.log('Error setting playlisted status, please try again. \n' + error);
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
        return res.json({ status: 400 });
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
        return res.json({ status: 400 });
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