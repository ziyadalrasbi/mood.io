'use strict';

const api = require('../api.js');

const getName = async (req, res, next) => {
    try {
        var name;
        await api.setAccessToken(req.body.token);
        await api.getMe()
            .then((data) => {
                let fullName = data.body.display_name;
                let tmp = fullName.split(' ');
                name = tmp[0].toString();
                return res.json({ status: 200, name: name });
            });
    } catch (error) {
        const message = 'Error getting user\'s spotify name, please try again. \n' + error;
        return res.json({ status: 400, message: message });
    }
}

const getTopArtists = async (req, res, next) => {
    var artistNames = [];
    api.setAccessToken(req.body.token);
    try {
        await api.getMyTopArtists({ limit: 6, time_range: 'medium_term' })
            .then((data) => {
                if (data.body.items[0] != null) {
                    for (let i = 0; i < data.body.items.length; i++) {
                        let tempArtist = [];
                        tempArtist.push(data.body.items[i].name);
                        if (data.body.items[i].images[0]) {
                            tempArtist.push(data.body.items[i].images[0].url);
                        } else {
                            tempArtist.push(404);
                        }
                        tempArtist.push(data.body.items[i].external_urls.spotify);
                        artistNames.push(tempArtist);
                    }
                }
                return res.json({ status: 200, artistNames: artistNames });
            });
    } catch (error) {
        const message = 'Error getting user\'s top artists for home, please try again. \n' + error;
        return res.json({ status: 400, message: message });
    }
}

const getTopTracks = async (req, res, next) => {
    var topTracks = [];
    var trackIds = [];
    await api.setAccessToken(req.body.token);
    try {
        await api.getMyTopTracks({ limit: 6, time_range: 'medium_term' })
            .then((data) => {
                if (data.body.items[0] != null) {
                    for (let i = 0; i < data.body.items.length; i++) {
                        let tempTrack = [];
                        tempTrack.push(data.body.items[i].name);
                        tempTrack.push(data.body.items[i].artists[0].name);
                        if (data.body.items[i].images[0]) {
                            tempTrack.push(data.body.items[i].images[0].url);
                        } else {
                            tempTrack.push(404);
                        }
                        tempTrack.push(data.body.items[i].external_urls.spotify);
                        trackIds.push(data.body.items[i].id);
                        topTracks.push(tempTrack);
                    }
                }
                return res.json({ status: 200, topTracks: topTracks, trackIds: trackIds });
            });
    } catch (error) {
        const message = 'Error getting user\'s top tracks for home, please try again. \n' + error;
        return res.json({ status: 400, message: message });
    }
}

const getListeningHabits = async (req, res, next) => {
    await api.setAccessToken(req.body.token);
    try {
        await api.getAudioFeaturesForTracks(req.body.tracks)
            .then((data) => {
                var getHabits = { danceability: 0, energy: 0, valence: 0, instrumentalness: 0 };
                for (var i = 0; i < data.body.audio_features.length; i++) {
                    getHabits = {
                        danceability: getHabits.danceability + data.body.audio_features[i].danceability,
                        energy: getHabits.energy + data.body.audio_features[i].energy,
                        valence: getHabits.valence + data.body.audio_features[i].valence,
                        instrumentalness: getHabits.instrumentalness + data.body.audio_features[i].instrumentalness
                    };
                }
                getHabits = {
                    danceability: getHabits.danceability / req.body.amount,
                    energy: getHabits.energy / req.body.amount,
                    valence: getHabits.valence / req.body.amount,
                    instrumentalness: getHabits.instrumentalness / req.body.amount
                }

                var keys = [];
                var values = [];

                Object.keys(getHabits).forEach((key) => {
                    keys.push(key);
                })

                Object.values(getHabits).forEach((value) => {
                    values.push(value);
                })

                var habits = {
                    keys: keys,
                    values: values
                };
                return res.json({ status: 200, habits: habits });
            });
    } catch (error) {
        const message = 'Error getting user\'s listening habits for home, please try again. \n' + error;
        return res.json({ status: 400, message: message });
    }
}

const searchForArtists = async (req, res, next) => {
    var artists = [];
    await api.setAccessToken(req.body.token);
    if (req.body.search.length > 0) {
        try {
            await api.searchArtists(req.body.search, { limit: 5 })
                .then((data) => {
                    for (var i = 0; i < data.body.artists.items.length; i++) {
                        var artist = {
                            id: data.body.artists.items[i].id,
                            title: data.body.artists.items[i].name,
                            picture: data.body.artists.items[i].images[0] != null && data.body.artists.items[i].images[0].url
                        };
                        artists.push(artist);
                    }
                    return res.json({ status: 200, artists: artists });
                });
        } catch (error) {
            const message = 'Error searching for artists, please try again. \n' + error;
            return res.json({ status: 400, message: message });
        }
    }
}

module.exports = {
    getName,
    getTopArtists,
    getTopTracks,
    getListeningHabits,
    searchForArtists
}