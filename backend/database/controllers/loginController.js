'use strict';

const firebase = require('../db.js');

const signIn = async (req, res, next) => {
    try {
        await firebase.auth().signInWithCustomToken(JSON.stringify(req.body.token))
            .then((userCredential) => {
                firebase.auth().currentUser.getIdToken(true)
                    .then((token) => {
                        return res.json({ status: 200, user: token });
                    })
            })
    } catch (error) {
        const message = 'Error signing in user, please try again. \n' + error;
        return res.json({ status: 400, message: message });
    }
}

const signOut = async (req, res, next) => {
    try {
        await firebase.auth().signOut()
            .then(() => {
                return res.json({ status: 200 });
            })
    } catch (error) {
        const message = 'Error signing out user, please try again. \n' + error;
        return res.json({ status: 400, message: message });
    }
}

const addUser = async (req, res, next) => {
    try {
        const response = await firebase.firestore().collection('users').doc(JSON.stringify(req.body.user));
        response.get()
            .then((doc) => {
                if (!doc.exists) {
                    response.set({
                        username: JSON.stringify(req.body.user),
                        playlists: 0,
                        moods: {
                            happy: 0,
                            neutral: 0,
                            sad: 0,
                            angry: 0,
                            confused: 0,
                            surprised: 0
                        }
                    }, { merge: true });
                }
            })
        return res.json({ status: 200 });
    } catch (error) {
        const message = 'Error initializing the user for the first time, please try again. \n' + error;
        return res.json({ status: 400, message: message });
    }
}

const getUserArtists = async (req, res, next) => {
    try {
        const response = await firebase.firestore().collection('users').doc(JSON.stringify(req.body.user));
        response.get()
            .then((doc) => {
                if (doc.data().topArtists != null) {
                    return res.json({ status: 200 });
                } else {
                    return res.json({ status: 404 });
                }
            })
    } catch (error) {
        const message = 'Error getting user top artists from database, please try again. \n' + error;
        return res.json({ status: 400, message: message });
    }
}

const saveUserArtists = async (req, res, next) => {
    try {
        const response = await firebase.firestore().collection('users').doc(JSON.stringify(req.body.user));
        response.set({
            topArtists: req.body.artists
        }, { merge: true });
        return res.json({ status: 200 });
    } catch (error) {
        const message = 'Error saving user top artists, please try again. \n' + error;
        return res.json({ status: 400, message: message });
    }
}

module.exports = {
    signIn,
    signOut,
    addUser,
    getUserArtists,
    saveUserArtists
}