'use strict';

const firebase = require('../db.js');

const signIn = async (req, res, next) => {
    try {
        firebase.auth().signInWithCustomToken(JSON.stringify(req.body.token))
            .then((userCredential) => {
                firebase.auth().currentUser.getIdToken(true)
                    .then((token) => {
                        res.json({ user: token });
                    })
            })
    } catch (error) {
        console.log('Error signing in user, please try again. \n' + error);
        res.status(400).send(error.message);
    }
}

const signOut = async (req, res, next) => {
    try {
        firebase.auth().signOut()
            .then(() => {
                console.log('User signed out!');
                res.json({ code: 200 });
            })
    } catch (error) {
        console.log('There was an error signing out, please try again. \n' + error);
    }
}

const addUser = async (req, res, next) => {
    try {
        const response = firebase.firestore().collection('users').doc(JSON.stringify(req.body.user));
        response.set({
            username: JSON.stringify(req.body.user),
            refreshToken: JSON.stringify(req.body.refreshToken),
        }, { merge: true });
        res.send('User added successfully!');
    } catch (error) {
        console.log('Error initializing the user for the first time, please try again. \n' + error);
        res.status(400).send(error.message);
    }
}

const getUserGenres = async (req, res, next) => {
    try {
        const response = firebase.firestore().collection('users').doc(JSON.stringify(req.body.user));
        response.get()
            .then((doc) => {
                if (doc.data().topGenres != null) {
                    res.json({ code: 200 });
                } else {
                    console.log('hello')
                    res.json({ code: 404 });
                }
            })
    } catch (error) {
        console.log('Error getting user top genres from database, please try again. \n' + error);
        res.status(400).send(error.message);
    }
}

const saveUserGenres = async (req, res, next) => {
    try {
        const response = firebase.firestore().collection('users').doc(JSON.stringify(req.body.user));
        response.set({
            topArtists: req.body.artists
        }, { merge: true });
        res.send('User added successfully!');
    } catch (error) {
        console.log('Error saving user genres, please try again. \n' + error);
        res.status(400).send(error.message);
    }
}

module.exports = {
    signIn,
    signOut,
    addUser,
    getUserGenres,
    saveUserGenres
}