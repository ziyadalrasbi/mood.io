import React from 'react';
import { Component } from 'react';
import * as SpotifyConstants from '../SpotifyConstants';
var SpotifyWebApi = require('spotify-web-api-node');


class SpotifyLoginFunctions {

  getUserId = async (token) => {
    var name;
    var api = new SpotifyWebApi({
      clientId: "481af46969f2416e95e9196fa60d808d",
      clientSecret: "830caf99293c4da0a262ce0ea53009b5",
      redirectUri: "moodio://oauthredirect"
    });
    await api.setAccessToken(token);
    await api.getMe()
      .then((data) => {
        let id = data.body.id;
        return id;
      }, function (err) {
        console.log('There was an error getting ID, please try again.', err);
      });
    return name;
  }
}

const spotifyLoginFunctions = new SpotifyLoginFunctions();
export default spotifyLoginFunctions;