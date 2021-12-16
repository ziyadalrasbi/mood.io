import * as React from 'react';
import { makeRedirectUri, useAuthRequest, ResponseType } from 'expo-auth-session';
import { View, Button } from 'react-native';
import LoginStyles from './LoginStyles';
import * as SpotifyConstants from '../../../backend/spotify/SpotifyConstants';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/functions';
import AsyncStorage from '@react-native-async-storage/async-storage';

var SpotifyWebApi = require('spotify-web-api-node');

function Login({ navigation }) {
    // Endpoint
    const discovery = {
        authorizationEndpoint: 'https://accounts.spotify.com/authorize',
    };

    var api = new SpotifyWebApi({
        clientId: "481af46969f2416e95e9196fa60d808d",
        clientSecret: "830caf99293c4da0a262ce0ea53009b5",
        redirectUri: "moodio://oauthredirect"
    });

    const [request, response, promptAsync] = useAuthRequest(
        {
            responseType: ResponseType.Token,
            clientId: "481af46969f2416e95e9196fa60d808d",
            scopes: ['user-read-email', 'playlist-modify-public'],
            redirectUri: makeRedirectUri({
                native: "moodio://oauthredirect"
            }),
        },
        discovery
    );

    const loginUser = async (id) => {
        try {
            await fetch("http://192.168.0.65:19001/createToken", {
                method: 'post',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: id
                })
            })
                .then((res) => res.json())
                .then(data => {
                    const tempToken = data.token;
                    return fetch("http://192.168.0.65:19001/signIn", {
                        method: 'post',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            token: tempToken
                        }),
                    });
                })
                .then((res) => res.json())
                .then(data => {
                    return data.user;
                })
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }

    function getUserData(token) {
        return fetch(
            'https://api.spotify.com/v1/me',
            { 'headers': { 'Authorization': 'Bearer ' + token } }
        );
    }

    const onPressLogin = async () => {
        await promptAsync();
            if (response && response.type === 'success') {
                const token = response.params.access_token;
                const refreshToken = response.params.refresh_token;
                SpotifyConstants.ACCESS_TOKEN = token;
                api.setAccessToken(token);
                console.log(token);
                api.setRefreshToken(refreshToken);
                AsyncStorage.setItem('access_token', JSON.stringify(token));
                getUserData(token)
                    .then(res => res.json())
                    .then(data => {
                        loginUser(data.id)
                            .then(user => {
                                navigation.navigate('Home', { navigation: navigation })
                            })
                            .catch((error) => {
                                console.log(error);
                                throw error;
                            })
                    });
            }
  
    }

    return (
        <View style={LoginStyles.topContainer}>
            <Button onPress={SpotifyConstants.ACCESS_TOKEN != null ? navigation.navigate('Home') : onPressLogin} title="Login" />
        </View>

    );
}
export default Login;

