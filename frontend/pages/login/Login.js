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

    const [refreshToken, setRefreshToken] = React.useState(null);
    const [userName, setUserName] = React.useState(null);

    var api = new SpotifyWebApi({
        clientId: "481af46969f2416e95e9196fa60d808d",
        clientSecret: "830caf99293c4da0a262ce0ea53009b5",
        redirectUri: "moodio://oauthredirect"
    });

    const [request, response, promptAsync] = useAuthRequest(
        {
            responseType: ResponseType.Token,
            clientId: "481af46969f2416e95e9196fa60d808d",
            scopes: [
                'user-read-email',
                'user-read-private',
                'user-top-read'
            ],
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

    const initUser = async (user, refreshToken) => {
        try {
            await fetch("http://192.168.0.65:19001/initUser", {
                method: 'post',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user: user,
                    refreshToken: refreshToken
                })
            })
                .then((res) => res.json())
                .then(data => {
                    console.log('success initializing user');
                })

        } catch (error) {
            console.log(error);
            throw error;
        }
    }


    function getUserData(token) {
        try {
            return fetch(
                'https://api.spotify.com/v1/me',
                { 'headers': { 'Authorization': 'Bearer ' + token } }
            );
        } catch (error) {
            console.log('Error getting user data, please try again. \n' + error);
            throw error;
        }

    }

    const onPressLogin = async () => {
        await promptAsync()
        .then((res) => {
        if (res && res.type === 'success') {
            const token = res.params.access_token;
            setRefreshToken(res.params.access_token);
            console.log(token);
            SpotifyConstants.ACCESS_TOKEN = token;
            api.setAccessToken(token);
            AsyncStorage.setItem('access_token', JSON.stringify(token));
            getUserData(token)
                .then(res => res.json())
                .then(data => {
                    initUser(data.id, res.params.access_token);
                    loginUser(data.id)
                    navigation.navigate('Home', { navigation: navigation })
                })
                .catch((error) => {
                    console.log('Error logging in, please try again. \n' + error);
                    throw error;
                });
            };
        });
    }

    return (
        <View style={LoginStyles.topContainer}>
            <Button onPress={onPressLogin} title="Login" />
        </View>

    );
}
export default Login;
