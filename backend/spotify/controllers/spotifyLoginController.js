'use strict';

var SpotifyWebApi = require('spotify-web-api-node');

const getUserId = async (req, res, next) => {
    var id;
    var api = new SpotifyWebApi({
        clientId: "481af46969f2416e95e9196fa60d808d",
        clientSecret: "830caf99293c4da0a262ce0ea53009b5",
        redirectUri: "moodio://oauthredirect"
    });
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