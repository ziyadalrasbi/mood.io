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
                        uris: doc.data().uris,
                        id: doc.data().id,
                        playlisted: doc.data().playlisted,
                        link: doc.data().link
                    }
                    recommendations.push(recommendation);
                })
            })
        recommendations.sort((a, b) => b.time - a.time);
        return res.json({ status: 200, recommendations: recommendations });
    } catch (error) {
        const message = 'Error getting recommendations, please try again. \n' + error;
        return res.json({ status: 400, message: message });
    }
}

const getMoodCount = async (req, res, next) => {
    try {
        const response = await firebase.firestore().collection('users').doc(JSON.stringify(req.body.user));
        response.get()
            .then((doc) => {
                return res.json({ status: 200, moods: doc.data().moods });
            })
    } catch (error) {
        const message = 'Error getting mood count, please try again. \n' + error;
        return res.json({ status: 400, message: message });
    }
}

module.exports = {
    getRecommendations,
    getMoodCount
}