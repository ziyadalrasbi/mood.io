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
        console.log('Error creating custom token, please try again. \n' + error);
        res.status(400).send(error.message);
    }
}

const verifyFirebaseToken = async (req, res, next) => {
    try {
        if (req.body.token != null) {
            admin.auth().verifyIdToken(req.body.token)
                .then((decodeToken) => {
                    console.log('Token is valid!');
                    res.json({ code: 200 });
                })
                .catch((error) => {
                    console.log('Token is not valid, must be refreshed.');
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

module.exports = {
    createToken,
    verifyFirebaseToken
}