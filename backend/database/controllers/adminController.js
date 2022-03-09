'use strict';

const firebase = require('../db.js');
const admin = require('firebase-admin');
const serviceAccount = require('../service-account.json');

admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });

const additionalClaims = {
    normalUser: true
};

const createToken = async (req, res, next) => {
    try {
        await admin.auth().createCustomToken(req.body.id, additionalClaims)
            .then((customToken) => {
                return res.json({ status: 200, token: customToken });
            })
    } catch (error) {
        const message = 'Error creating custom token, please try again. \n' + error;
        return res.json({ status: 400, message: message });
    }
}

const deleteUser = async (req, res, next) => {
    try {
        const id = JSON.stringify(req.body.uid);
        await firebase.firebase().collection('users').doc(id).collection('recommendations')
            .get()
            .then((snapShot) => {
                snapShot.forEach((doc) => {
                    doc.ref.delete();
                })
            });
        await firebase.firestore().collection('users').doc(id).delete()
            .then(() => {
                admin.auth().deleteUser(req.body.uid)
                    .then(() => {
                        return res.json({ status: 200 });
                    })
            });
    } catch (error) {
        const message = 'Error deleting user, please try again. \n' + error;
        return res.json({ status: 400, message: message });
    }
}

module.exports = {
    createToken,
    deleteUser
}