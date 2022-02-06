'use strict';

const firebase = require('../db.js');


const getRecommendations = async (req, res, next) => {
    try {
        var recommendations = [];
        firebase.firestore()
            .collection('users')
            .doc(JSON.stringify(req.body.user))
            .collection('recommendations')
            .orderBy('time', 'desc')
            .onSnapshot((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    recommendations.push(...doc.data());
                })
            })
        res.json({ recommendations: recommendations });
    } catch (error) {
        console.log('There was an error getting recommendations, please try again. ' + error);
    }
}


module.exports = {
    getRecommendations
}