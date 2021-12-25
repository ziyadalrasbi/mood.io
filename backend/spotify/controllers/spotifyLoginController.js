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

module.exports = {
    getUserId
}