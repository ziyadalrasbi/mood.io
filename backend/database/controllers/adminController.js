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

module.exports = {
    createToken
}