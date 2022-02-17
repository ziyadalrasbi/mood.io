'use strict';

const api = require('../api.js');
var SpotifyWebApi = require('spotify-web-api-node');

const requestAccessToken = async (req, res, next) => {
    let spotifyApi = new SpotifyWebApi({
        clientId: "481af46969f2416e95e9196fa60d808d",
        clientSecret: "830caf99293c4da0a262ce0ea53009b5",
        redirectUri: req.body.redirect
    })
    await spotifyApi.authorizationCodeGrant(req.body.code)
        .then((data) => {
            res.json({ accessToken: data.body.access_token, refreshToken: data.body.refresh_token });
        }, function (error) {
            console.log('Error requesting access token, please try again. ' + error);
            res.json({ status: 400 });
        })
}

const refreshAccessToken = async (req, res, next) => {
    let spotifyApi = new SpotifyWebApi({
        clientId: "481af46969f2416e95e9196fa60d808d",
        clientSecret: "830caf99293c4da0a262ce0ea53009b5",
        redirectUri: "https://mood-io-app.herokuapp.com"
    })
    if (req.body.refreshToken != null) {
        spotifyApi.setAccessToken(req.body.accessToken);
        spotifyApi.setRefreshToken(req.body.refreshToken);
        spotifyApi.refreshAccessToken()
            .then((data) => {
                res.json({ token: data.body.access_token });
            })
    }
}

const getUserId = async (req, res, next) => {
    var id;
    await api.setAccessToken(req.body.token);
    await api.getMe()
        .then((data) => {
            id = data.body.id;
            res.json({ id: id });
        }, function (error) {
            console.log('There was an error getting ID, please try again. \n' + JSON.stringify(error));
            res.json({ status: 400 });
        });
}

const getUserTopArtists = async (req, res, next) => {
    var topArtists = [];
    await api.setAccessToken(req.body.token);
    await api.getMyTopArtists({ limit: 5, time_range: 'medium_term' })
        .then((data) => {
            if (data.body.items[0] != null) {
                for (let i = 0; i < data.body.items.length; i++) {
                    topArtists.push(data.body.items[i].id);
                }
                res.json({ topArtists: topArtists });
            } else {
                res.json({ topArtists: topArtists });
            }
        }), function (err) {
            console.log('There was an error getting the top genres, please try again. \n', err);
            res.json({ status: 400 });
        }
}

module.exports = {
    requestAccessToken,
    refreshAccessToken,
    getUserId,
    getUserTopArtists
}