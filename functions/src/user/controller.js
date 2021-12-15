var SpotifyWebApi = require('spotify-web-api-node');
import * as SpotifyConstants from '../../../backend/spotify/SpotifyConstants'
const spotifyConfig = {
    clientId: SpotifyConstants.CLIENT_ID,
    clientSecret: SpotifyConstants.CLIENT_SECRET,
    redirectUrl: SpotifyConstants.REDIRECT_URL
};

var spotifyApi = new SpotifyWebApi(spotifyConfig);

async function proxySpotifyToken(_req, res){
    //Retrieve code from request
    const code = _req.body.code;
    const refreshToken = _req.body.refresh_token;

    if(!code && !refreshToken){
        return res.status(403).json({success: false, data: "Not authorized"});
    }

    if (refreshToken) { 
        spotifyApi.setRefreshToken(refreshToken);
        spotifyApi.refreshAccessToken()
        .then((data) => {
            data.body.refreshToken = refreshToken;
            console.log(res.json(data.body));
            return res.json(data.body);
        },
        (err) => {
            console.log("Error refreshing access token!", err);
        }
        ).catch((oError) => {
            return res.json(oError);
        });
    }

    if (code) {
        spotifyApi.authorizationCodeGrant(code)
        .then((data) => {
            console.log(res.json(data.body));
            return res.json(data.body);
        },
        (err) => {
            console.log("Error authenticating user!", err);
        }
        ).catch((oError) => {
            return res.json(oError);
        });
    }


}

module.exports = {
    proxySpotifyToken
};