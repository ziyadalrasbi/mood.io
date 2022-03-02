'use strict';

const api = require('../api.js');

const getListeningHabits = async (req, res, next) => {
    await api.setAccessToken(req.body.token);
    try {
        await api.getAudioFeaturesForTracks(req.body.tracks)
            .then((data) => {
                var getGraphHabits = {
                    danceability: 0,
                    energy: 0,
                    valence: 0,
                    instrumentalness: 0
                };
                var getCardHabits = {
                    loudness: 0,
                    tempo: 0,
                    speechiness: 0,
                    acousticness: 0
                }
                for (var i = 0; i < data.body.audio_features.length; i++) {
                    getGraphHabits = {
                        danceability: getGraphHabits.danceability + data.body.audio_features[i].danceability,
                        energy: getGraphHabits.energy + data.body.audio_features[i].energy,
                        valence: getGraphHabits.valence + data.body.audio_features[i].valence,
                        instrumentalness: getGraphHabits.instrumentalness + data.body.audio_features[i].instrumentalness
                    };
                    getCardHabits = {
                        loudness: getCardHabits.loudness + data.body.audio_features[i].loudness,
                        tempo: getCardHabits.tempo + data.body.audio_features[i].tempo,
                        speechiness: getCardHabits.speechiness + data.body.audio_features[i].speechiness,
                        acousticness: getCardHabits.acousticness + data.body.audio_features[i].acousticness
                    };
                }
                getGraphHabits = {
                    danceability: (getGraphHabits.danceability / req.body.amount).toFixed(2),
                    energy: (getGraphHabits.energy / req.body.amount).toFixed(2),
                    valence: (getGraphHabits.valence / req.body.amount).toFixed(2),
                    instrumentalness: (getGraphHabits.instrumentalness / req.body.amount).toFixed(2)
                }
                getCardHabits = {
                    loudness: (getCardHabits.loudness / req.body.amount).toFixed(2),
                    tempo: (getCardHabits.tempo / req.body.amount).toFixed(2),
                    speechiness: (getCardHabits.speechiness / req.body.amount).toFixed(2),
                    acousticness: (getCardHabits.acousticness / req.body.amount).toFixed(2)
                }

                var keys = [];
                var values = [];

                Object.keys(getGraphHabits).forEach((key) => {
                    keys.push(key);
                })

                Object.values(getGraphHabits).forEach((value) => {
                    values.push(value);
                })

                var finalGraphHabits = {
                    keys: keys,
                    values: values
                };
                return res.json({ graphHabits: finalGraphHabits, cardHabits: getCardHabits });
            })

    } catch (error) {
        console.log('There was an error getting user\'s listening habits, please try again. \n' + error);
        return res.json({ status: 400 });
    }
}

module.exports = {
    getListeningHabits
}