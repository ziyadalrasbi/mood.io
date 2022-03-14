'use strict';

const api = require('../api.js');

const createLibrary = async (req, res, next) => {
    var recommendations = [];
    var trackIds = [];
    const features = req.body.features;
    try {
        await api.setAccessToken(req.body.token);
        await api.getRecommendations({
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
                        }
                    }
                }
            });

        for (let i = 0; i < req.body.artists.length; i++) {
            let similarArtists = [];
            await api.getArtistRelatedArtists(req.body.artists[i])
                .then((data) => {
                    if (data.body.artists.length > 0) {
                        for (let j = 0; j < 5 && j < data.body.artists.length; j++) {
                            similarArtists.push(data.body.artists[j].id);
                        }
                    }
                });

            await api.getRecommendations({
                seed_artists: similarArtists,
                limit: 100
            })
                .then((data) => {
                    for (var k = 0; k < data.body.tracks.length; k++) {
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
                                if (!trackIds.includes(data.body.tracks[k].id)) {
                                    trackIds.push(data.body.tracks[k].id);
                                }
                            }
                        }
                    }
                });
        }
        if (recommendations.length > 0) {
            console.log(recommendations.length);
            return res.json({ status: 200, recommendations: recommendations, trackIds: trackIds });
        }
    } catch (error) {
        const message = 'Error creating the library, please try again. \n' + error;
        return res.json({ status: 400, message: message });
    }
}

const getRecommendations = async (req, res, next) => {
    var recommendations = [];
    var cosineSimTracks = [];
    var requestedFeatures = req.body.features;
    await api.setAccessToken(req.body.token);
    if (req.body.tracks != null) {
        try {
            await api.getAudioFeaturesForTracks(req.body.tracks)
                .then((data) => {
                    if (data != null) {
                        for (var i = 0; i < data.body.audio_features.length; i++) {
                            var currentFeatures = [
                                data.body.audio_features[i].key,
                                data.body.audio_features[i].valence,
                                data.body.audio_features[i].energy,
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
                });
        } catch (error) {
            const message = 'Error generating recommendations from audio features, please try again. \n' + error;
            return res.json({ status: 400, message: message });
        }
        if (cosineSimTracks.length > 0) {
            cosineSimTracks.sort((a, b) => b.similarity - a.similarity);
            var tracksOnly = cosineSimTracks.map(track => track.id);
            var urisOnly = cosineSimTracks.map(track => track.uri);
            var uniqueTracks = tracksOnly.filter(onlyUnique);
            var uniqueUris = urisOnly.filter(onlyUnique);
            uniqueTracks = uniqueTracks.length > 20 ? uniqueTracks.slice(0, 20) : uniqueTracks;
            uniqueUris = uniqueUris.length > 20 ? uniqueUris.slice(0, 20) : uniqueUris;
            try {
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
                            }
                        }
                        return res.json({ status: 200, similarity: cosineSimTracks, recommendations: recommendations, uris: uniqueUris });
                    });
            } catch (error) {
                const message = 'Error getting cosine similarity tracks, please try again. \n' + error;
                return res.json({ status: 400, message: message });
            }
        }
    }
}

// Helper function
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
                return res.json({ status: 200, playlist: playlist });
            })
    } catch (error) {
        const message = 'Error creating playlist, please try again. \n' + error;
        return res.json({ status: 400, message: message });
    }
}

const addTracksToPlaylist = async (req, res, next) => {
    await api.setAccessToken(req.body.token);
    try {
        await api.addTracksToPlaylist(req.body.id, req.body.uris)
            .then(() => {
                return res.json({ status: 200 });
            })
    } catch (error) {
        const message = 'Error adding tracks to playlist, please try again. \n' + error;
        return res.json({ status: 400, message: message });
    }
}

module.exports = {
    createLibrary,
    getRecommendations,
    createPlaylist,
    addTracksToPlaylist
}
