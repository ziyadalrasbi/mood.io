'use strict';

const firebase = require('../db.js');
const admin = require('firebase-admin');
const serviceAccount = require('../service-account.json');

admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });

const createToken = async (req, res, next) => {
    try {
        await admin.auth().createCustomToken(req.body.id)
            .then((customToken) => {
                res.json({ token: customToken });
            })
    } catch (error) {
        console.log('Error creating custom token, please try again. \n' + error);
        res.status(400).send(error.message);
    }
}

const verifyFirebaseToken = async (req, res, next) => {
    try {
        if (req.body.token != null) {
            await admin.auth().verifyIdToken(req.body.token)
                .then((decodeToken) => {
                    res.json({ code: 200 });
                })
                .catch((error) => {
                    console.log('Token is not valid, must be refreshed. \n' + error);
                    res.json({ code: 400 });
                })
        } else {
            console.log('Token could not be found in AsyncStorage.');
            res.json({ code: 404 });
        }
    } catch (error) {
        console.log('Error verifying custom token, please try again. \n' + error);
        res.status(403).send(error.message);
    }
}

const getRefreshToken = async (req, res, next) => {
    try {
        const response = firebase.firestore().collection('users').doc(JSON.stringify(req.body.user));
        response.get()
            .then((doc) => {
                if (doc.exists) {
                    res.json({ refreshToken: doc.data().refreshToken });
                } else {
                    res.json({ refreshToken: 'None' });
                }
            })
    } catch (error) {
        console.log('Error getting refresh token, please try again. \n' + error);
        res.status(400).send(error.message);
    }
}

const setRefreshToken = async (req, res, next) => {
    try {
        const response = firebase.firestore().collection('users').doc(JSON.stringify(req.body.user));
        response.set({
            refreshToken: JSON.stringify(req.body.refreshToken)
        }, { merge: true });
        res.json({ status: 'User added successfully!' });
    } catch (error) {
        console.log('Error setting refresh token, please try again. \n' + error);
        res.status(400).send(error.message);
    }
}

module.exports = {
    createToken,
    verifyFirebaseToken,
    getRefreshToken,
    setRefreshToken
}