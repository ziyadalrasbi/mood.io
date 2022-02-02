'use strict';

const api = require('../api.js');
const config = require('../config.js');

const getProfile = async (req, res, next) => {
    try {
        var name;
        await api.setAccessToken(req.body.token);
        await api.getMe()
            .then((data) => {
                let userProfile = {
                    name: data.body.display_name,
                    picture: data.body.images[0] && data.body.images[0].url,
                    followers: data.body.followers.total
                }
                res.json({ profile: userProfile });
            }, function (err) {
                console.log('There was an error getting user\'s profile, please try again. \n', err);
            });
    } catch (error) {
        console.log('There was an error getting user\'s profile, please try again. \n' + error);
        res.status(400).send(error.message);
    }
}

const getTopArtists = async (req, res, next) => {
    var artistNames = [];
    await api.setAccessToken(req.body.token);
    try {
        await api.getMyTopArtists({ limit: 15, time_range: req.body.range })
            .then((data) => {
                if (data.body.items[0] != null) {
                    for (let i = 0; i < 15; i++) {
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
        await api.getMyTopTracks({ limit: 15, time_range: req.body.range })
            .then((data) => {
                if (data.body.items[0] != null) {
                    for (let i = 0; i < 15; i++) {
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

module.exports = {
    getProfile,
    getTopArtists,
    getTopTracks
}