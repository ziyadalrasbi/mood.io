import * as React from 'react';
import { makeRedirectUri, useAuthRequest, ResponseType } from 'expo-auth-session';
import { View, Button } from 'react-native';
import LoginStyles from './LoginStyles';
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
        redirectUri: "exp://192.168.0.14:19000"
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
            redirectUri: "exp://192.168.0.14:19000"
        },
        discovery
    );

    const loginUser = async (id) => {
        try {
            await fetch("http://192.168.0.65:19001/database/admin/createToken", {
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
                    return fetch("http://192.168.0.65:19001/database/admin/signIn", {
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
            await fetch("http://192.168.0.14:19001/database/admin/initUser", {
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


    const getUserData = async (token) => {
        try {
            return fetch("http://192.168.0.14:19001/spotify/login/getUserId", {
                method: 'post',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token: token
                })
            })
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    const getUserGenres = async (token) => {
        try {
            return fetch("http://192.168.0.14:19001/spotify/login/getUserTopGenres", {
                method: 'post',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token: token
                })
            })
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    const saveUserGenres = async (user, genres) => {
        try {
            return fetch("http://192.168.0.14:19001/database/login/saveUserGenres", {
                method: 'post',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user: user,
                    genres: genres
                })
            })
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    const onPressLogin = async () => {
        await promptAsync()
            .then((res) => {
                if (res && res.type === 'success') {
                    const token = res.params.access_token;
                    setRefreshToken(res.params.access_token);
                    api.setAccessToken(token);
                    console.log(token);
                    AsyncStorage.setItem('access_token', token);
                    getUserData(token)
                        .then(res => res.json())
                        .then(data => {
                            const userId = data.id;
                            initUser(userId, res.params.access_token);
                            loginUser(userId);
                            getUserGenres(token)
                            .then((res) => res.json())
                            .then(data => {
                                saveUserGenres(userId, data.topGenres);
                                navigation.navigate('Home', { navigation: navigation });
                            })
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
