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

// const verifyFirebaseToken = async (req, res, next) => {
//     try {
//         if (req.body.token != null) {
//             await admin.auth().verifyIdToken(req.body.token)
//                 .then((decodeToken) => {
//                     res.json({ code: 200 });
//                 })
//                 .catch((error) => {
//                     console.log('Token is not valid, must be refreshed. \n' + error);
//                     res.json({ code: 400 });
//                 })
//         } else {
//             console.log('Token could not be found in AsyncStorage.');
//             res.json({ code: 404 });
//         }
//     } catch (error) {
//         console.log('Error verifying custom token, please try again. \n' + error);
//         res.status(403).send(error.message);
//     }
// }

module.exports = {
    createToken,
    // verifyFirebaseToken,
}