import * as React from 'react';
import { makeRedirectUri, useAuthRequest, ResponseType, Prompt } from 'expo-auth-session';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import LoginStyles from './LoginStyles';
import * as SecureStore from 'expo-secure-store';
import spotifylogo from '../../../assets/icons/login/spotifylogo.png';
import { useFonts } from 'expo-font';
import CustomCarousel from '../../components/carousel/CustomCarousel';
import { LinearGradient } from 'expo-linear-gradient';

function Login({ navigation }) {

    const discovery = {
        authorizationEndpoint: 'https://accounts.spotify.com/authorize',
        tokenEndpoint: 'https://accounts.spotify.com/api/token',
    };

    const [loaded] = useFonts({
        MontserratBold: require('../../../assets/fonts/Montserrat/static/Montserrat-Bold.ttf'),
        InconsolataLight: require('../../../assets/fonts/Montserrat/static/Montserrat-Light.ttf'),
        InconsolataMedium: require('../../../assets/fonts/Montserrat/static/Montserrat-Medium.ttf'),
        InconsolataBlack: require('../../../assets/fonts/Montserrat/static/Montserrat-Black.ttf'),
        InconsolataSemiExpanded: require('../../../assets/fonts/Montserrat/static/Montserrat-SemiBold.ttf'),
    });


    const [refreshToken, setRefreshToken] = React.useState(null);
    const [userName, setUserName] = React.useState(null);

    const [request, response, promptAsync] = useAuthRequest(
        {
            responseType: 'code',
            clientId: "481af46969f2416e95e9196fa60d808d",
            scopes: [
                'user-read-email',
                'user-read-private',
                'user-top-read'
            ],
            prompt: Prompt.Login,
            usePKCE: false,
            redirectUri: makeRedirectUri({
                native: "moodio://oauthredirect"
            }),
            
        },
        discovery
    );

    const loginUser = async (id) => {
        try {
            await fetch("http://192.168.0.14:19001/database/admin/createToken", {
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
                    SecureStore.setItemAsync('database_access_token', tempToken, { keychainAccessible: SecureStore.ALWAYS_THIS_DEVICE_ONLY });
                    return fetch("http://192.168.0.14:19001/database/login/signIn", {
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
            await fetch("http://192.168.0.14:19001/database/login/addUser", {
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

    const saveUserGenres = async (user, genres, artists) => {
        try {
            return fetch("http://192.168.0.14:19001/database/login/saveUserGenres", {
                method: 'post',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user: user,
                    genres: genres,
                    artists: artists
                })
            })
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    const requestAccessToken = async (code) => {
        try {
            return fetch("http://192.168.0.14:19001/spotify/login/requestAccessToken", {
                method: 'post',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    code: code
                })
            })
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    const getGenreSeeds = async (token) => {
        try {
            return fetch("http://192.168.0.14:19001/spotify/login/getGenreSeeds", {
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

    const onPressLogin = async () => {
        await promptAsync()
            .then((res) => {
                if (res && res.type === 'success') {
                    console.log(res);
                    requestAccessToken(res.params.code)
                        .then(res => res.json())
                        .then(data => {
                            const accessToken = data.accessToken;
                            console.log(accessToken);
                            const refreshToken = data.refreshToken;
                            SecureStore.setItemAsync('spotify_access_token', accessToken, { keychainAccessible: SecureStore.ALWAYS_THIS_DEVICE_ONLY });
                            SecureStore.setItemAsync('spotify_refresh_token', refreshToken, { keychainAccessible: SecureStore.ALWAYS_THIS_DEVICE_ONLY });
                            getUserData(accessToken)
                                .then(res => res.json())
                                .then(data => {
                                    const userId = data.id;
                                    initUser(userId, accessToken);
                                    loginUser(userId);
                                    getUserGenres(accessToken)
                                        .then((res) => res.json())
                                        .then(data => {
                                            console.log(Object.keys(data.topGenres).length);
                                            if (Object.keys(data.topGenres).length > 0) {
                                                saveUserGenres(userId, data.topGenres, data.topArtists);
                                                navigation.reset({ index: 0, routes: [{ name: 'Home', params: { new: false } }] });
                                            } else {
                                                getGenreSeeds(accessToken)
                                                    .then(res => res.json())
                                                    .then(data => {
                                                        navigation.reset({ index: 0, routes: [{ name: 'Home', params: { new: true, genreSeeds: data.genreSeeds } }] });
                                                    })
                                            }

                                        })
                                })
                                .catch((error) => {
                                    console.log('Error logging in, please try again. \n' + error);
                                    throw error;
                                });
                        });
                };
            });
    }

    if (!loaded) {
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        )
    }

    return (
        <View style={LoginStyles.mainContainer}>
            <LinearGradient
                // Background Linear Gradient
                colors={['#185a9d', '#4ca1af']}
                style={LoginStyles.gradientContainer}
            />
            <View style={LoginStyles.logo}>
                <Text>
                    LOGO HERE
                </Text>
            </View>
            <View style={LoginStyles.bottomContainer}>
                <CustomCarousel onPressLogin={onPressLogin} />
            </View>
        </View>

    );
}
export default Login;
