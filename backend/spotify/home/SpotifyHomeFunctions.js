import React from 'react';
import { Component } from 'react';
import * as SpotifyConstants from '../SpotifyConstants';
var SpotifyWebApi = require('spotify-web-api-node');


class SpotifyHomeFunctions {

  getName = async () => {
    var name;
    var api = new SpotifyWebApi({
      clientId: "481af46969f2416e95e9196fa60d808d",
      clientSecret: "830caf99293c4da0a262ce0ea53009b5",
      redirectUri: "moodio://oauthredirect"
    });
    await api.setAccessToken(SpotifyConstants.ACCESS_TOKEN);
    await api.getMe()
      .then((data) => {
        try {
          let fullName = data.body.display_name;
          let tmp = fullName.split(' ');
          name = tmp[0].toString();
          return name;
        } catch (error) {
          return;
        }
      }, function (err) {
        console.log('There was an error getting username, please try again.', err);
      });
    return name;
  }

  getTopArtists = async () => {
    var artistNames = [];
    var api = new SpotifyWebApi({
      clientId: "481af46969f2416e95e9196fa60d808d",
      clientSecret: "830caf99293c4da0a262ce0ea53009b5",
      redirectUri: "moodio://oauthredirect"
    });
    await api.setAccessToken(SpotifyConstants.ACCESS_TOKEN);
    try {
      await api.getMyTopArtists({ limit: 6, time_range: 'medium_term' })
        .then((data) => {
          if (data != null) {
            for (let i = 0; i < 6; i++) {
              let tempArtist = [];
              tempArtist.push(data.body.items[i].name);
              tempArtist.push(data.body.items[i].images[0].url);
              tempArtist.push(data.body.items[i].external_urls.spotify);
              artistNames.push(tempArtist);
            }
          }
          return artistNames;
        }), function (err) {
          console.log('There was an error getting the top artists, please try again.', err);
        }
    } catch (error) {
      console.log('There was an error getting the top artists, please try again.', err);
      return artistNames;
    }
    return artistNames;
  }

  getTopTracks = async () => {
    var topTracks = [];
    var api = new SpotifyWebApi({
      clientId: "481af46969f2416e95e9196fa60d808d",
      clientSecret: "830caf99293c4da0a262ce0ea53009b5",
      redirectUri: "moodio://oauthredirect"
    });
    await api.setAccessToken(SpotifyConstants.ACCESS_TOKEN);
    try {
      await api.getMyTopTracks({ limit: 4, time_range: 'medium_term' })
        .then((data) => {
          if (data != null) {
            for (let i = 0; i < 4; i++) {
              let tempTrack = [];
              tempTrack.push(data.body.items[i].name);
              tempTrack.push(data.body.items[i].artists[0].name);
              tempTrack.push(data.body.items[i].album.images[0].url);
              tempTrack.push(data.body.items[i].external_urls.spotify);
              topTracks.push(tempTrack);
            }
          }
          return topTracks;
        }), function (err) {
          console.log('There was an error getting the top tracks, please try again.', err);
        }
    } catch (error) {
      console.log('There was an error getting the top tracks, please try again.', err);
    }
    return topTracks;
  }


}



const spotifyHomeFunctions = new SpotifyHomeFunctions();
export default spotifyHomeFunctions;