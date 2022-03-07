'use strict';

const api = require('../api.js');
var SpotifyWebApi = require('spotify-web-api-node');

const requestAccessToken = async (req, res, next) => {
    var spotifyApi = new SpotifyWebApi({
        clientId: "481af46969f2416e95e9196fa60d808d",
        clientSecret: "830caf99293c4da0a262ce0ea53009b5",
        redirectUri: req.body.redirect
    });
    try {
        await spotifyApi.authorizationCodeGrant(req.body.code)
            .then((data) => {
                return res.json({ status: 200, accessToken: data.body.access_token, refreshToken: data.body.refresh_token, time: data.body.expires_in });
            });
    } catch (error) {
        const message = 'Error requesting access token, please try again. \n' + error;
        return res.json({ status: 400, message: message });
    }

}

const refreshAccessToken = async (req, res, next) => {
    var spotifyApi = new SpotifyWebApi({
        clientId: "481af46969f2416e95e9196fa60d808d",
        clientSecret: "830caf99293c4da0a262ce0ea53009b5",
        redirectUri: "https://mood-io-app.herokuapp.com"
    });
    try {
        if (req.body.refreshToken != null) {
            spotifyApi.setAccessToken(req.body.accessToken);
            spotifyApi.setRefreshToken(req.body.refreshToken);
            spotifyApi.refreshAccessToken()
                .then((data) => {
                    return res.json({ status: 200, token: data.body.access_token, time: data.body.expires_in });
                });
        }
    } catch (error) {
        const message = 'Error refreshing access token, please try again. \n' + error;
        return res.json({ status: 400, message: message });
    }

}

const getUserId = async (req, res, next) => {
    try {
        await api.setAccessToken(req.body.token);
        await api.getMe()
            .then((data) => {
                const id = data.body.id;
                return res.json({ status: 200, id: id });
            });
    } catch (error) {
        const message = 'Error getting user\'s ID for login, please try again. \n' + error;
        return res.json({ status: 400, message: message });
    }
}

const getUserTopArtists = async (req, res, next) => {
    var topArtists = [];
    try {
        await api.setAccessToken(req.body.token);
        await api.getMyTopArtists({ limit: 5, time_range: 'medium_term' })
            .then((data) => {
                if (data.body.items[0] != null) {
                    for (let i = 0; i < data.body.items.length; i++) {
                        topArtists.push(data.body.items[i].id);
                    }
                    return res.json({ status: 200, topArtists: topArtists });
                } else {
                    return res.json({ status: 200, topArtists: topArtists });
                }
            });
    } catch (error) {
        const message = 'Error getting user\'s top artists for login, please try again. \n' + error;
        return res.json({ status: 400, message: message });
    }
}

module.exports = {
    requestAccessToken,
    refreshAccessToken,
    getUserId,
    getUserTopArtists
}