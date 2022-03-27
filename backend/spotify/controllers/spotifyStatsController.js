'use strict';

const api = require('../api.js');
const config = require('../config.js');

const getProfile = async (req, res, next) => {
    try {
        await api.setAccessToken(req.body.token);
        await api.getMe()
            .then((data) => {
                let userProfile = {
                    name: data.body.display_name,
                    picture: data.body.images[0] && data.body.images[0].url,
                    followers: data.body.followers.total
                }
                return res.json({ status: 200, profile: userProfile });
            });
    } catch (error) {
        const message = 'Error getting user\'s profile for stats, please try again. \n' + error;
        return res.json({ status: 400, message: message });
    }
}

const getTopArtists = async (req, res, next) => {
    var artistNames = [];
    await api.setAccessToken(req.body.token);
    try {
        await api.getMyTopArtists({ limit: 15, time_range: req.body.range })
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
        const message = 'Error getting user\'s top artists for stats, please try again. \n' + error;
        return res.json({ status: 400, message: message });
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
        const message = 'Error getting user\'s top tracks for stats, please try again. \n' + error;
        return res.json({ status: 400, message: message });
    }
}

module.exports = {
    getProfile,
    getTopArtists,
    getTopTracks
}