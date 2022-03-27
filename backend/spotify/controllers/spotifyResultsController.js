'use strict';

const api = require('../api.js');

const createLibrary = async (req, res, next) => {
    var recommendations = [];
    var trackIds = [];
    var cosineSimTracks = [];
    const requestedFeatures = req.body.requestedFeatures;
    const valence = req.body.valence;
    const tempo = req.body.tempo;
    const energy = req.body.energy;
    const danceability = req.body.danceability;
    try {
        await api.setAccessToken(req.body.token);
        await api.getRecommendations({
            seed_artists: req.body.artists,
            target_valence: valence,
            target_tempo: tempo,
            target_energy: energy,
            target_danceability: danceability,
            limit: 100
        })
            .then((data) => {
                for (var i = 0; i < data.body.tracks.length; i++) {
                    let currentDate = new Date(Date.now());
                    let trackDate = new Date(data.body.tracks[i]['album'].release_date);
                    let yearsDiff = currentDate.getFullYear() - trackDate.getFullYear();
                    if (yearsDiff <= 4) {
                        trackIds.push(data.body.tracks[i].id);
                    }
                }
            });
        await api.getAudioFeaturesForTracks(trackIds)
            .then((data) => {
                if (data != null) {
                    for (var i = 0; i < data.body.audio_features.length; i++) {
                        var currentFeatures = [
                            data.body.audio_features[i].valence,
                            data.body.audio_features[i].energy,
                            data.body.audio_features[i].tempo,
                            data.body.audio_features[i].danceability
                        ];
                        const currentSimilarity = {
                            id: data.body.audio_features[i].id,
                            uri: data.body.audio_features[i].uri,
                            similarity: cosineSimilarity(currentFeatures, requestedFeatures)
                        }
                        cosineSimTracks.push(currentSimilarity);
                    }
                }
            });

        for (let i = 0; i < req.body.artists.length; i++) {
            var similarArtists = [];
            var currentTrackIds = [];
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
                target_valence: valence,
                target_tempo: tempo,
                target_energy: energy,
                target_danceability: danceability,
                limit: 100
            })
                .then((data) => {
                    for (var k = 0; k < data.body.tracks.length; k++) {
                        let currentDate = new Date(Date.now());
                        let trackDate = new Date(data.body.tracks[k]['album'].release_date);
                        let yearsDiff = currentDate.getFullYear() - trackDate.getFullYear();
                        if (yearsDiff <= 4) {
                            currentTrackIds.push(data.body.tracks[k].id);
                        }
                    }
                });
            await api.getAudioFeaturesForTracks(currentTrackIds)
                .then((data) => {
                    if (data != null) {
                        for (var i = 0; i < data.body.audio_features.length; i++) {
                            var currentFeatures = [
                                data.body.audio_features[i].valence,
                                data.body.audio_features[i].energy,
                                data.body.audio_features[i].tempo,
                                data.body.audio_features[i].danceability
                            ];
                            const currentSimilarity = {
                                id: data.body.audio_features[i].id,
                                uri: data.body.audio_features[i].uri,
                                similarity: cosineSimilarity(currentFeatures, requestedFeatures)
                            }
                            cosineSimTracks.push(currentSimilarity);
                        }
                    }
                });
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
                            let recommendation = [];
                            recommendation.push(data.body.tracks[i].name);
                            recommendation.push(data.body.tracks[i].artists[0].name);
                            if (data.body.items[i].images[0]) {
                                recommendation.push(data.body.items[i].images[0].url);
                            } else {
                                recommendation.push(404);
                            }
                            recommendation.push(data.body.tracks[i].external_urls.spotify);
                        }
                    });
            } catch (error) {
                const message = 'Error getting cosine similarity tracks, please try again. \n' + error;
                return res.json({ status: 400, message: message });
            }
            return res.json({ status: 200, recommendations: recommendations, uris: uniqueUris, similarity: cosineSimTracks });
        }
    } catch (error) {
        const message = 'Error creating the library, please try again. \n' + error;
        return res.json({ status: 400, message: message });
    }
}

function cosineSimilarity(a, b) {
    var product = 0;
    var sumA = 0;
    var sumB = 0;
    for (var i = 0; i < a.length; i++) {
        product += (a[i] * b[i]);
        sumA += (a[i] * a[i]);
        sumB += (b[i] * b[i]);
    }
    sumA = Math.sqrt(sumA);
    sumB = Math.sqrt(sumB);
    var similarity = (product) / ((sumA) * (sumB));
    return similarity;
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
