import React from 'react';
import { Component } from 'react';
import * as SpotifyConstants from '../SpotifyConstants';
var SpotifyWebApi = require('spotify-web-api-node');


class SpotifyHomeFunctions {

    getName = async () => {
        var name;
        var api = new SpotifyWebApi({ 
            clientId: SpotifyConstants.CLIENT_ID, 
            clientSecret: SpotifyConstants.CLIENT_SECRET, 
            redirectUri: SpotifyConstants.REDIRECT_URL });
        await api.setAccessToken(SpotifyConstants.ACCESS_TOKEN);
        await api.getMe()
      .then((data) => {
        let fullName = data.body.display_name;
        let tmp = fullName.split(' ');
        name = tmp[0].toString();
        return name;
      }, function (err) {
        console.log('Something went wrong!', err);
      });
      return name;
    }
}

const spotifyHomeFunctions = new SpotifyHomeFunctions();
export default spotifyHomeFunctions;