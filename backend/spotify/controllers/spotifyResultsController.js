'use strict';

const api = require('../api.js');

const getRecommendations = async (req, res, next) => {
    var recommendations = [];
    var trackIds = [];
    await api.setAccessToken(req.body.token);
    await api.getRecommendations([req.body.features, {
        seed_artists: req.body.artists,
        min_popularity: 50,
        limit: 100
    }])
        .then((data) => {
            for (var i = 0; i < data.body.tracks.length; i++) {
                let currentDate = new Date(Date.now());
                let trackDate = new Date(data.body.tracks[i]['album'].release_date);
                let yearsDiff = currentDate.getFullYear() - trackDate.getFullYear();
                if (yearsDiff <= 4) {
                    if (data.body.tracks[i]['album'].images[0]) {
                        let recommendation = [];
                        recommendation.push(data.body.tracks[i].name);
                        recommendation.push(data.body.tracks[i].artists[0].name);
                        recommendation.push(data.body.tracks[i]['album'].images[0].url);
                        recommendation.push(data.body.tracks[i].external_urls.spotify);
                        recommendations.push(recommendation);
                        trackIds.push(data.body.tracks[i].id);
                    } else {
                        console.log('broken recommendation found: ' + JSON.stringify(data.body.tracks[i]));
                    }
                }
            }
        }, function (err) {
            console.log('There was an error getting recommendations, please try again.', err);
        })

    for (let i = 0; i < req.body.artists.length; i++) {
        let similarArtists = [];
        await api.getArtistRelatedArtists(req.body.artists[i])
            .then((data) => {
                if (data.body.artists.length > 0) {
                    for (let j = 0; j < 5; j++) {
                        similarArtists.push(data.body.artists[j].id);
                    }
                }
            })

        await api.getRecommendations([req.body.features, {
            seed_artists: similarArtists,
            min_popularity: 50,
            limit: 100
        }])
            .then((data) => {
                for (var k = 0; k < similarArtists.length; k++) {
                    let currentDate = new Date(Date.now());
                    let trackDate = new Date(data.body.tracks[k]['album'].release_date);
                    let yearsDiff = currentDate.getFullYear() - trackDate.getFullYear();
                    if (yearsDiff <= 4) {
                        if (data.body.tracks[k]['album'].images[0]) {
                            let recommendation = [];
                            recommendation.push(data.body.tracks[k].name);
                            recommendation.push(data.body.tracks[k].artists[0].name);
                            recommendation.push(data.body.tracks[k]['album'].images[0].url);
                            recommendation.push(data.body.tracks[k].external_urls.spotify);
                            recommendations.push(recommendation);
                            trackIds.push(data.body.tracks[i].id);
                        } else {
                            console.log('broken recommendation found: ' + JSON.stringify(data.body.tracks[k]));
                        }
                    }
                }
            }, function (err) {
                console.log('There was an error getting recommendations, please try again.', err);
            })
    }
    res.json({ recommendations: recommendations, trackIds: trackIds });
}

const getAudioFeatures = async (req, res, next) => {
    var audioFeatures = [];
    await api.setAccessToken(req.body.token);
    await api.getAudioFeaturesForTracks(req.body.tracks)
        .then((data) => {
            if (data != null) {
                audioFeatures.push(data.body.audio_features);
                res.json({ audioFeatures: audioFeatures });
            }
        }, function (err) {
            console.log('There was an error getting audio features, please try again.', err);
        });
}

module.exports = {
    getRecommendations,
    getAudioFeatures
}