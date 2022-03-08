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
                var total = 0;
                const moods = doc.data().moods;

                for (var mood in moods) {
                    total += moods[mood];
                }
                const averageMoods = {
                    happy: (moods.happy / total),
                    sad: (moods.sad / total),
                    neutral: (moods.neutral / total),
                    angry: (moods.angry / total),
                    confused: (moods.confused / total),
                    surprised: (moods.surprised / total)
                };

                var keys = [];
                var values = [];

                Object.keys(averageMoods).forEach((key) => {
                    keys.push(key);
                })

                Object.values(averageMoods).forEach((value) => {
                    values.push(value);
                })

                var finalMoods = {
                    keys: keys,
                    values: values
                };
                return res.json({ status: 200, moods: finalMoods, total: total });
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