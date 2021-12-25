'use strict';

const firebase = require('../db.js');
const admin = require('firebase-admin');
const serviceAccount = require('../service-account.json');

admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });

const createToken = async (req, res, next) => {
    try {
        admin.auth().createCustomToken(req.body.id)
            .then((customToken) => {
                res.json({ token: customToken });
            })
    } catch (error) {
        console.log('Error creating the token, please try again. \n' + error);
        res.status(400).send(error.message);
    }
}

const signIn = async (req, res, next) => {
    try {
        firebase.auth().signInWithCustomToken(JSON.stringify(req.body.token))
        .then((userCredential) => {
            var user = userCredential.user;
            res.json({ user: user });
        })
    } catch (error) {
        console.log('Error signing in user, please try again. \n' + error);
        res.status(400).send(error.message);
    }
}

const addUser = async (req, res, next) => {
    try {
        const response = firebase.firestore().collection('users').doc(JSON.stringify(req.body.user));
        response.set({
            username: JSON.stringify(req.body.user),
            refreshToken: JSON.stringify(req.body.refreshToken)
        })
        res.send('User added successfully!');
    } catch (error) {
        console.log('Error initializing the user for the first time, please try again. \n' + error);
        res.status(400).send(error.message);
    }
}

module.exports = {
    addUser,
    createToken,
    signIn
}