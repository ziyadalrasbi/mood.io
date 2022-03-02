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
                        danceability: getHabits.danceability + data.body.audio_features[i].danceability,
                        energy: getHabits.energy + data.body.audio_features[i].energy,
                        valence: getHabits.valence + data.body.audio_features[i].valence,
                        instrumentalness: getHabits.instrumentalness + data.body.audio_features[i].instrumentalness
                    };
                    getCardHabits = {
                        loudness: getHabits.loudness + data.body.audio_features[i].loudness,
                        tempo: getHabits.tempo + data.body.audio_features[i].tempo,
                        speechiness: getHabits.speechiness + data.body.audio_features[i].speechiness,
                        acousticness: getHabits.acousticness + data.body.audio_features[i].acousticness
                    };
                }
                getGraphHabits = {
                    danceability: getHabits.danceability / req.body.amount,
                    energy: getHabits.energy / req.body.amount,
                    valence: getHabits.valence / req.body.amount,
                    instrumentalness: getHabits.instrumentalness / req.body.amount
                }
                getCardHabits = {
                    loudness: getHabits.loudness / req.body.amount,
                    tempo: getHabits.tempo / req.body.amount,
                    speechiness: getHabits.speechiness / req.body.amount,
                    acousticness: getHabits.acousticness / req.body.amount
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