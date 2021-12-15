import * as React from 'react';
import { makeRedirectUri, useAuthRequest, ResponseType } from 'expo-auth-session';
import { View, Button } from 'react-native';
import LoginStyles from './LoginStyles';
import { connect } from 'react-redux';
import * as SpotifyConstants from '../../backend/spotify/SpotifyConstants';
var SpotifyWebApi = require('spotify-web-api-node');

import {
    setAccessToken,
    setRefreshToken,
    setSigingIn,
} from '../../redux/features/authentication/authenticationSlice';

// Endpoint
const discovery = {
    authorizationEndpoint: 'https://accounts.spotify.com/authorize',
};

var test = null;
var test2 = null;

function Login({ navigation }) {
    var api;
    const [request, response, promptAsync] = useAuthRequest(
        {
            responseType: ResponseType.Token,
            clientId: SpotifyConstants.CLIENT_ID,
            scopes: ['user-read-email', 'playlist-modify-public'],
            redirectUri: makeRedirectUri({
                native: SpotifyConstants.REDIRECT_URL
            }),
        },
        discovery
    );

    const onPressLogin = async () => {
        await promptAsync();
        if (response && response.type === 'success') {
            const token = response.params.access_token;
            
            SpotifyConstants.ACCESS_TOKEN = token;
            setRefreshToken({ refreshToken: token });
            navigation.navigate('Home', {navigation: navigation })
        }
    }

    const mapStateToProps = state => {
        return {
            authentication: state.authentication,
        };
    };

    test = mapStateToProps;

    const mapDispatchToProps = { setAccessToken, setRefreshToken, setSigingIn };

    test2 = mapDispatchToProps;

    return (
        <View style={LoginStyles.topContainer}>
            <Button onPress={SpotifyConstants.ACCESS_TOKEN != null ? navigation.navigate('Home')  : onPressLogin} title="Login" />
        </View>

    );
}
export default connect(test, test2)(Login);