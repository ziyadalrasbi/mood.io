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
                        tracks: JSON.parse(doc.data().tracks),
                        id: doc.data().id,
                        playlisted: doc.data().playlisted
                    }
                    recommendations.push(recommendation);
                })
            })
        recommendations.sort((a, b) => b.time - a.time);
        return res.json({  status: 200, recommendations: recommendations });
    } catch (error) {
        const message = 'Error getting recommendations, please try again. \n' + error;
        return res.json({ status: 400, message: message });
    }
}


module.exports = {
    getRecommendations
}