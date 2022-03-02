'use strict';

const firebase = require('../db.js');


const getRecommendations = async (req, res, next) => {
    try {
        var recommendations = [];
        await firebase.firestore().collection('users').doc(JSON.stringify(req.body.user)).collection('recommendations')
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    let recommendation = {
                        mood: doc.data().mood,
                        time: doc.data().time,
                        tracks: JSON.parse(doc.data().tracks)
                    }
                    recommendations.push(recommendation);
                })
            })
        recommendations.sort((a, b) => b.time - a.time);
        return res.json({ recommendations: recommendations });
    } catch (error) {
        console.log('There was an error getting recommendations, please try again. ' + error);
        return res.json({ status: 400 });
    }
}


module.exports = {
    getRecommendations
}