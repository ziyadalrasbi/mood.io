var SpotifyWebApi = require('spotify-web-api-node');
const spotifyConfig = require('./config');

const spotifyApi = new SpotifyWebApi(spotifyConfig);

module.exports = spotifyApi;