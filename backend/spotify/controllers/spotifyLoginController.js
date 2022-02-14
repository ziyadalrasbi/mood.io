'use strict';

const api = require('../api.js');
var SpotifyWebApi = require('spotify-web-api-node');

const requestAccessToken = async (req, res, next) => {
    let spotifyApi = new SpotifyWebApi({
        clientId: "481af46969f2416e95e9196fa60d808d",
        clientSecret: "830caf99293c4da0a262ce0ea53009b5",
        redirectUri: "moodio://oauthredirect"
    })
    await spotifyApi.authorizationCodeGrant(req.body.code)
        .then((data) => {
            res.json({ accessToken: data.body.access_token, refreshToken: data.body.refresh_token });
        }, function (error) {
            console.log('Error requesting access token, please try again. ' + error);
        })
}

const refreshAccessToken = async (req, res, next) => {
    let spotifyApi = new SpotifyWebApi({
        clientId: "481af46969f2416e95e9196fa60d808d",
        clientSecret: "830caf99293c4da0a262ce0ea53009b5",
        redirectUri: "moodio://oauthredirect"
    })
    if (req.body.refreshToken != null) {
        spotifyApi.setAccessToken(req.body.accessToken);
        spotifyApi.setRefreshToken(req.body.refreshToken);
        spotifyApi.refreshAccessToken()
            .then((data) => {
                res.json({ token: data.body.access_token });
            })
    } else {
        res.json({ token: 'Null' });
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
        });
}

const getUserTopGenres = async (req, res, next) => {
    var topGenres = [];
    var topArtists = [];
    await api.setAccessToken(req.body.token);
    await api.getMyTopArtists({ limit: 10, time_range: 'medium_term' })
        .then((data) => {
            if (data.body.items[0] != null) {
                for (let i = 0; i < 10; i++) {
                    for (let j = 0; j < data.body.items[i].genres.length; j++) {
                        topGenres.push(data.body.items[i].genres[j]);
                    }
                }
                for (let i = 0; i < 5; i++) {
                    topArtists.push(data.body.items[i].id);
                }
                const genresCount = topGenres.reduce(function (obj, item) {
                    obj[item] = (obj[item] || 0) + 1;
                    return obj;
                }, {});
                res.json({ topGenres: genresCount, topArtists: topArtists });
            } else {
                res.json({ topGenres: topGenres });
            }

        }), function (err) {
            console.log('There was an error getting the top genres, please try again. \n', err);
        }
}

const getGenreSeeds = async (req, res, next) => {
    var genreSeeds = [];
    await api.setAccessToken(req.body.token);
    await api.getAvailableGenreSeeds()
        .then((data) => {
            for (let i = 0; i < data.body.genres.length; i++) {
                var tempGenre = {
                    id: i,
                    title: data.body.genres[i]
                }
                genreSeeds.push(tempGenre);
            }
            res.json({ genreSeeds: genreSeeds });
        }), function (err) {
            console.log('There was an error getting the available genre seeds, please try again. \n', err);
        }
}

module.exports = {
    requestAccessToken,
    refreshAccessToken,
    getUserId,
    getUserTopGenres,
    getGenreSeeds
}