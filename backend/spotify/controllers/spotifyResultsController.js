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
    console.log(req.body.tracks);
    try {
        await api.getAudioFeaturesForTracks(req.body.tracks)
            .then((data) => {
                console.log(data);
                if (data != null) {
                    for (var i = 0; i < data.body.audio_features.length; i++) {
                        var currentFeatures = [
                            data.body.audio_features[i].mode,
                            data.body.audio_features[i].valence,
                            data.body.audio_features[i].energy,
                            data.body.audio_features[i].danceability,
                            data.body.audio_features[i].loudness
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
                            similarity: similarity
                        }
                        cosineSimTracks.push(currentSimilarity);
                        console.log(similarity);
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
    var uniqueTracks = tracksOnly.filter(onlyUnique);
    uniqueTracks = uniqueTracks.length > 20 ? uniqueTracks.slice(0, 20) : uniqueTracks;
    await api.getTracks(uniqueTracks)
        .then((data) => {
            for (var i = 0; i < data.body.tracks.length; i++) {
                console.log(data.body.tracks[i]);
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
            res.json({ similarity: cosineSimTracks, recommendations: recommendations });
        }, function (err) {
            console.log('There was an error getting audio features2, please try again.', err);
        })
}

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

module.exports = {
    getRecommendations,
    getAudioFeatures
}

// '7pDdE5FLqcNCvjxzRzm80r', '4lgEtC1W3xZSRFoJuPLmkk', '1NtFAgFqmk3HrxzwAzUcAD',
// 2022-02-07T15:51:07.824033+00:00 app[web.1]: '5Q2lulGI9ZQbwf18skmtqw', '6TR0FGw4zhlGbQALN065AI', '0qy1xNhQvnRhEpvKxdXYUR',
// 2022-02-07T15:51:07.824033+00:00 app[web.1]: '3iINQZKpmSMY2mkjLtlzYO', '6ixjgNCGvFTXTO1fGqltw1', '0kUz4NuENHYVUChlthlNaB',
// 2022-02-07T15:51:07.824034+00:00 app[web.1]: '5naYe7rLMZcLfO1DKg48MK', '5MZtSCAvjvCoUbJ0a9ljum', '4Z2RT2ODLF7AZSKLdg8jVe',
// 2022-02-07T15:51:07.824034+00:00 app[web.1]: '79Vz5MNH7Qe4F7hPKT8tPz', '1YCgGjyv17S9ll8bH2u4gQ', '57Zcl7oKKr29qHp38dzzWi',
// 2022-02-07T15:51:07.824034+00:00 app[web.1]: '4L2OSJR4kegcxlt87huva1', '3SXRZuCEGbbxsPiHyqwWuG', '0mSxHkAKB6JR8Y3IX20H3n',
// 2022-02-07T15:51:07.824034+00:00 app[web.1]: '5IiCTrv2CVarZaaCAz74yO', '3vF1Bk53lUz287NAu5RCpS', '2Q8fFORnsDE6I3RNvSLXSf',
// 2022-02-07T15:51:07.824034+00:00 app[web.1]: '3B5yl01KF06NkYG39BdTBa', '5acSb48zFAcXTdL5Wsk8xx', '73AA7MGpI602u0T9SyL6uu',
// 2022-02-07T15:51:07.824034+00:00 app[web.1]: '6DKVZIGunsstjifYDYa5lT', '6uzwiQa5FkiiHLyt7ENYc6', '2dd3VTFfbTNJXpvhNGnFzQ',
// 2022-02-07T15:51:07.824035+00:00 app[web.1]: '1rWoVZYprb19V7qDTXhpJL', '6iC7vapdKp0XlKhxOkp8QJ', '4OY3LbPQOaKeYsrDXw7zFD',
// 2022-02-07T15:51:07.824035+00:00 app[web.1]: '0ib3Pdvgp2ZDk6nO1DC3sJ', '6KQYQ5ycUHmDYFjL2jLXYC', '4vnPji7QI3Bt3XDZxfDAXr',
// 2022-02-07T15:51:07.824035+00:00 app[web.1]: '0IDU2CjK6ayag6xjarO3kh', '7p4tetW3qNwSCz92PLGJg5', '3Xup2MfX2tkMo1HlkpiPes',
// 2022-02-07T15:51:07.824035+00:00 app[web.1]: '1pRShUtGOG6ZP5fsnw9G4h', '18asYwWugKjjsihZ0YvRxO', '0c5nqQNIH07Lh16AOjqEPQ',
// 2022-02-07T15:51:07.824035+00:00 app[web.1]: '6BwN05qKw4Q8bNoq3rYuz7', '4fp5ICMxsl5kq9qWWpYBjN', '1xvh5ujI8fogjmadcLmLBZ',
// 2022-02-07T15:51:07.824036+00:00 app[web.1]: '1IJ9Ksezp1W3fzhE0FK0gs', '2eomAcNgNQTogi2Y4apBKh', '2WrlysXGhULyfprVfW20UT',
// 2022-02-07T15:51:07.824036+00:00 app[web.1]: '4GmxAkE4CBTHHxXPHjYkp7', '5PAr8JS5KtQrWzDixaD1Wl', '6tLPcgsXGFcXtnVCetRp4A',
// 2022-02-07T15:51:07.824036+00:00 app[web.1]: '3itVWAvURMugCEceJy1Eo2', '67ZJbNoYqvCTeEpVY90Goc', '2Nc1v8I86FUGorwjXKo0in',
// 2022-02-07T15:51:07.824037+00:00 app[web.1]: '3enGXmn9bnb7ltrpmbwtjM', '4zp8noasnK5XNuNojkVhiy', '7ETxvXQ5oWFRfAfaIEimAG',
// 2022-02-07T15:51:07.824037+00:00 app[web.1]: '3zOj4iZqK4qU1OfcCGGk8i', '0rkVQ8MzzfX40xtNkC6hjA', '5KWwD9LzZa6ruNYGNqAqoN',
// 2022-02-07T15:51:07.824037+00:00 app[web.1]: '64vBCC1lpjEnF10CkDiDhv', '4paNNGZD8qM134qqdiCEeI', '2aOK6TRYn4DneIBHJOAQ4r',
// 2022-02-07T15:51:07.824038+00:00 app[web.1]: '6lvXCTiPKfgrvUjxKjd7Ds', '5D8sJEbM2zIAZkWn9wSDXl', '5ZDv6cSFtX1j0ZvULDCAGV',
// 2022-02-07T15:51:07.824038+00:00 app[web.1]: '4DERbz1e89YD9VZt7or9GB', '5ECuiTw53JiKAI9JPrr22x', '7DgkSYT6vh3UAYQlFbsj6z',
// 2022-02-07T15:51:07.824038+00:00 app[web.1]: '1LyTeIRYMHPA13p4b02NvV', '4GNpppEamtcqG6QkxfI9f9', '1S1bkqImhTErVkifCITLUg',
// 2022-02-07T15:51:07.824038+00:00 app[web.1]: '5V661n1cACWE2O9gKlm5JW', '3jbAzLVcHiI5hYSkcKe1Ty', '1Mu0qs9DQ8OfhiPvHxZMMM',
// 2022-02-07T15:51:07.824038+00:00 app[web.1]: '3EtXo9cEurLpblcdWHuBjT', '1tZC1ktebdhQSlhnFSetLk', '0eFZFjjWpc3UCyNJCIDUIz',
// 2022-02-07T15:51:07.824039+00:00 app[web.1]: '0eFZFjjWpc3UCyNJCIDUIz', '0eFZFjjWpc3UCyNJCIDUIz', '0eFZFjjWpc3UCyNJCIDUIz',
// 2022-02-07T15:51:07.824039+00:00 app[web.1]: '0eFZFjjWpc3UCyNJCIDUIz', '5wr3CiNDw7KUlR0yoIKeNu', '5wr3CiNDw7KUlR0yoIKeNu',
// 2022-02-07T15:51:07.824039+00:00 app[web.1]: '5wr3CiNDw7KUlR0yoIKeNu', '5wr3CiNDw7KUlR0yoIKeNu', '1qRgEKIeSrMcS62Ji4g8VT',
// 2022-02-07T15:51:07.824039+00:00 app[web.1]: '1qRgEKIeSrMcS62Ji4g8VT', '1qRgEKIeSrMcS62Ji4g8VT', '1qRgEKIeSrMcS62Ji4g8VT',
// 2022-02-07T15:51:07.824039+00:00 app[web.1]: '7uM7YZwNZqdDMG0NfGhmux', '7uM7YZwNZqdDMG0NfGhmux', '7uM7YZwNZqdDMG0NfGhmux',
// 2022-02-07T15:51:07.824040+00:00 app[web.1]: '7uM7YZwNZqdDMG0NfGhmux',