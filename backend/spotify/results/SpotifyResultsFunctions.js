var SpotifyWebApi = require('spotify-web-api-node');

class SpotifyResultsFunctions {

    getRecommendations = async (token) => {
        var recommendations = [];
        var api = new SpotifyWebApi({
            clientId: "481af46969f2416e95e9196fa60d808d",
            clientSecret: "830caf99293c4da0a262ce0ea53009b5",
            redirectUri: "moodio://oauthredirect"
        });
        await api.setAccessToken(token);
        await api.getRecommendations({
            min_energy: 0.4,
            seed_genres: ['rap'],
            min_popularity: 50,
            min_valence: 0.7,
            limit: 9
        })
            .then((data) => {
                for (var i = 0; i < 10; i++) {
                    let recommendation = [];
                    recommendation.push(data.body.tracks[i].name);
                    recommendation.push(data.body.tracks[i].artists[0].name);
                    recommendation.push(data.body.tracks[i].images[0].url);
                    recommendation.push(data.body.tracks[i].external_urls.spotify);
                    recommendations.push(recommendation);
                }
                return recommendations;
            }, function (err) {
                console.log('There was an error getting an ID, please try again.', err);
            });
        return recommendations;
    }
}

const spotifyResultsFunctions = new SpotifyResultsFunctions();
export default spotifyResultsFunctions;