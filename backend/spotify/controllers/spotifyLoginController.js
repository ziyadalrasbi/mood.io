'use strict';

const api = require('../api.js');
const config = require('../config.js');

const getUserId = async (req, res, next) => {
    var id;
    await api.setAccessToken(req.body.token);
    await api.getMe()
        .then((data) => {
            id = data.body.id;
            res.json({ id: id });
        }, function (error) {
            console.log('There was an error getting ID, please try again. \n' + error);
        });
}

const getUserTopGenres = async (req, res, next) => {
    var topGenres = [];
    await api.setAccessToken(req.body.token);

        await api.getMyTopArtists({ limit: 10, time_range: 'medium_term' })
            .then((data) => {
                if (data.body.items[0] != null) {
                    for (let i = 0; i < 10; i++) {
                        for (let j = 0; j < data.body.items[i].genres.length; j++) {
                            topGenres.push(data.body.items[i].genres[j]);
                        }
                    }
                    const genresCount = topGenres.reduce(function (obj, item) {
                        obj[item] = (obj[item] || 0) + 1;
                        return obj;
                    }, {});
                    res.json({ topGenres: genresCount });
                } else {
                    res.json({ topGenres: topGenres });
                }

            }), function (err) {
                console.log('There was an error getting the top genres, please try again.', err);
            }
}

module.exports = {
    getUserId,
    getUserTopGenres
}