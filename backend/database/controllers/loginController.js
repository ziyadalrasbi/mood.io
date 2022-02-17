'use strict';

const firebase = require('../db.js');

const signIn = async (req, res, next) => {
    try {
        await firebase.auth().signInWithCustomToken(JSON.stringify(req.body.token))
            .then((userCredential) => {
                firebase.auth().currentUser.getIdToken(true)
                    .then((token) => {
                        res.json({ user: token });
                    })
            })
    } catch (error) {
        console.log('Error signing in user, please try again. \n' + error);
        res.json({ status: 400 });
    }
}

const signOut = async (req, res, next) => {
    try {
        await firebase.auth().signOut()
            .then(() => {
                res.json({ status: 200 });
            })
    } catch (error) {
        console.log('There was an error signing out, please try again. \n' + error);
        res.json({ status: 400 });
    }
}

const addUser = async (req, res, next) => {
    try {
        const response = await firebase.firestore().collection('users').doc(JSON.stringify(req.body.user));
        response.set({
            username: JSON.stringify(req.body.user)
        }, { merge: true });
        res.json({ status: 'User added successfully!' });
    } catch (error) {
        console.log('Error initializing the user for the first time, please try again. \n' + error);
        res.json({ status: 400 });
    }
}

const getUserArtists = async (req, res, next) => {
    try {
        const response = await firebase.firestore().collection('users').doc(JSON.stringify(req.body.user));
        response.get()
            .then((doc) => {
                if (doc.data().topArtists != null) {
                    res.json({ code: 200 });
                } else {
                    res.json({ code: 404 });
                }
            })
    } catch (error) {
        console.log('Error getting user top genres from database, please try again. \n' + error);
        res.json({ status: 400 });
    }
}

const saveUserArtists = async (req, res, next) => {
    try {
        const response = await firebase.firestore().collection('users').doc(JSON.stringify(req.body.user));
        response.set({
            topArtists: req.body.artists
        }, { merge: true });
        res.json({ status: 200 });
    } catch (error) {
        console.log('Error saving user genres, please try again. \n' + error);
        res.json({ status: 400 });
    }
}

module.exports = {
    signIn,
    signOut,
    addUser,
    getUserArtists,
    saveUserArtists
}