'use strict';

const api = require('../api.js');

const getRecommendations = async (req, res, next) => {
    var recommendations = [];
    var trackIds = [];
    const features = req.body.features;
    await api.setAccessToken(req.body.token);
    await api.getRecommendations({
        features,
        seed_artists: req.body.artists,
        limit: 100
    })
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
                    for (let j = 0; j < 5 && j < data.body.artists.length; j++) {
                        similarArtists.push(data.body.artists[j].id);
                    }
                }
            })

        await api.getRecommendations({
            features,
            seed_artists: similarArtists,
            limit: 100
        })
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
                            if (!trackIds.includes(data.body.tracks[i].id)) {
                                trackIds.push(data.body.tracks[i].id);
                            }
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
    var recommendations = [];
    var cosineSimTracks = [];
    var requestedFeatures = req.body.features;
    await api.setAccessToken(req.body.token);
    try {
        await api.getAudioFeaturesForTracks(req.body.tracks)
            .then((data) => {
                if (data != null) {
                    for (var i = 0; i < data.body.audio_features.length; i++) {
                        var currentFeatures = [
                            data.body.audio_features[i].mode,
                            data.body.audio_features[i].valence,
                            data.body.audio_features[i].energy,
                            data.body.audio_features[i].danceability,
                            data.body.audio_features[i].loudness,
                            data.body.audio_features[i].tempo
                        ];
                        var dotproduct = 0;
                        var mA = 0;
                        var mB = 0;
                        for (var j = 0; j < currentFeatures.length; j++) {
                            dotproduct += (currentFeatures[j] * requestedFeatures[j]);
                            mA += (currentFeatures[j] * currentFeatures[j]);
                            mB += (requestedFeatures[j] * requestedFeatures[j]);
                        }
                        mA = Math.sqrt(mA);
                        mB = Math.sqrt(mB);
                        var similarity = (dotproduct) / ((mA) * (mB));
                        const currentSimilarity = {
                            id: data.body.audio_features[i].id,
                            uri: data.body.audio_features[i].uri,
                            similarity: similarity
                        }
                        cosineSimTracks.push(currentSimilarity);
                    }
                }
            }, function (err) {
                console.log('There was an error getting audio features, please try again.', err);
            });
    } catch (error) {
        console.log(error);
    }
    cosineSimTracks.sort((a, b) => b.similarity - a.similarity);
    var tracksOnly = cosineSimTracks.map(track => track.id);
    var urisOnly = cosineSimTracks.map(track => track.uri);
    var uniqueTracks = tracksOnly.filter(onlyUnique);
    var uniqueUris = urisOnly.filter(onlyUnique);
    uniqueTracks = uniqueTracks.length > 20 ? uniqueTracks.slice(0, 20) : uniqueTracks;
    uniqueUris = uniqueUris.length > 20 ? uniqueUris.slice(0, 20) : uniqueUris;
    await api.getTracks(uniqueTracks)
        .then((data) => {
            for (var i = 0; i < data.body.tracks.length; i++) {
                if (data.body.tracks[i]['album'].images[0]) {
                    let recommendation = [];
                    recommendation.push(data.body.tracks[i].name);
                    recommendation.push(data.body.tracks[i].artists[0].name);
                    recommendation.push(data.body.tracks[i]['album'].images[0].url);
                    recommendation.push(data.body.tracks[i].external_urls.spotify);
                    recommendations.push(recommendation);
                } else {
                    console.log('broken recommendation found: ' + JSON.stringify(data.body.tracks[i]));
                }
            }
            res.json({ similarity: cosineSimTracks, recommendations: recommendations, uris: uniqueUris });
        }, function (err) {
            console.log('There was an error getting audio features2, please try again.', err);
        })
}

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

const createPlaylist = async (req, res, next) => {
    await api.setAccessToken(req.body.token);
    try {
        await api.createPlaylist(req.body.name, {
            description: req.body.description,
            collaborative: false,
            public: true
        })
            .then((data) => {
                var playlist = {
                    id: data.body.id,
                    link: data.body.external_urls.spotify
                };
                res.json({ playlist: playlist });
            })
    } catch (error) {
        console.log('There was an error creating playlist for user, please try again.', err);
    }
}

const addTracksToPlaylist = async (req, res, next) => {
    await api.setAccessToken(req.body.token);
    try {
        await api.addTracksToPlaylist(req.body.id, req.body.uris)
        .then(() => {
            res.json({ status: 200 });
        })
    } catch (error) {
        console.log('There was an error adding tracks to playlist, please try again.', err);
        res.json({ status: 400 });
    }
}

module.exports = {
    getRecommendations,
    getAudioFeatures,
    createPlaylist,
    addTracksToPlaylist
}
