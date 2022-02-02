'use strict';

const api = require('../api.js');
const config = require('../config.js');

const getName = async (req, res, next) => {
    try {
        var name;
        await api.setAccessToken(req.body.token);
        await api.getMe()
            .then((data) => {
                let fullName = data.body.display_name;
                let tmp = fullName.split(' ');
                name = tmp[0].toString();
                res.json({ name: name });
            }, function (err) {
                console.log('There was an error getting username, please try again.', err);
            });
    } catch (error) {
        console.log('Error getting user\'s Spotify name, please try again. \n' + error);
        res.status(400).send(error.message);
    }
}

const getTopArtists = async (req, res, next) => {
    var artistNames = [];
    await api.setAccessToken(req.body.token);
    try {
        await api.getMyTopArtists({ limit: 8, time_range: 'medium_term' })
            .then((data) => {
                if (data.body.items[0] != null) {
                    for (let i = 0; i < 8; i++) {
                        let tempArtist = [];
                        tempArtist.push(data.body.items[i].name);
                        tempArtist.push(data.body.items[i].images[0].url);
                        tempArtist.push(data.body.items[i].external_urls.spotify);
                        artistNames.push(tempArtist);
                    }
                }
                res.json({ artistNames: artistNames });
            }), function (err) {
                console.log('There was an error getting the top artists, please try again.', err);
            }
    } catch (error) {
        console.log('There was an error getting the top artists, please try again.', err);
    }
}

const getTopTracks = async (req, res, next) => {
    var topTracks = [];
    var trackIds = [];
    await api.setAccessToken(req.body.token);
    try {
        await api.getMyTopTracks({ limit: 6, time_range: 'short_term' })
            .then((data) => {
                if (data.body.items[0] != null) {
                    for (let i = 0; i < 6; i++) {
                        let tempTrack = [];
                        tempTrack.push(data.body.items[i].name);
                        tempTrack.push(data.body.items[i].artists[0].name);
                        tempTrack.push(data.body.items[i].album.images[0].url);
                        tempTrack.push(data.body.items[i].external_urls.spotify);
                        trackIds.push(data.body.items[i].id);
                        topTracks.push(tempTrack);
                    }
                }
                res.json({ topTracks: topTracks, trackIds: trackIds });
            }), function (err) {
                console.log('There was an error getting the top tracks, please try again.', err);
            }
    } catch (error) {
        console.log('There was an error getting the top tracks, please try again.', err);
    }
}

const getListeningHabits = async (req, res, next) => {
    await api.setAccessToken(req.body.token);
    try {
        await api.getAudioFeaturesForTracks(req.body.tracks)
            .then((data) => {
                var getHabits = { danceability: 0, energy: 0, loudness: 0, liveness: 0, valence: 0 };
                for (var i = 0; i < data.body.audio_features.length; i++) {
                    getHabits = {
                        danceability: getHabits.danceability + data.body.audio_features[i].danceability,
                        energy: getHabits.energy + data.body.audio_features[i].energy,
                        loudness: getHabits.loudness + data.body.audio_features[i].loudness,
                        liveness: getHabits.liveness + data.body.audio_features[i].liveness,
                        valence: getHabits.valence + data.body.audio_features[i].valence
                    };
                }
                getHabits = {
                    danceability: getHabits.danceability / 4,
                    energy: getHabits.energy / 4,
                    loudness: getHabits.loudness / 4,
                    liveness: getHabits.liveness / 4,
                    valence: getHabits.valence / 4
                }
                res.json({ habits: getHabits });
            })

    } catch (error) {
        console.log('There was an error getting user\'s listening habits, please try again. \n' + error);
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
                            title: data.body.artists.items[i].name
                        };
                        artists.push(artist);
                    }
                    res.json({ artists: artists });
                })
        } catch (error) {
            console.log('There was an error searching for artists, please try again. \n' + JSON.stringify(error));
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