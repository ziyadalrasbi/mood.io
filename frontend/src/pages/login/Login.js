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
import { loginUser, initUser, getUserData, getUserGenres, saveUserGenres, requestAccessToken, getGenreSeeds } from '../../fetch';

function Login({ navigation }) {

    const discovery = {
        authorizationEndpoint: 'https://accounts.spotify.com/authorize',
        tokenEndpoint: 'https://accounts.spotify.com/api/token',
    };

    const [loaded] = useFonts({
        InconsolataBold: require('../../../assets/fonts/Montserrat/static/Montserrat-Bold.ttf'),
        InconsolataLight: require('../../../assets/fonts/Montserrat/static/Montserrat-Light.ttf'),
        InconsolataMedium: require('../../../assets/fonts/Montserrat/static/Montserrat-Medium.ttf'),
        InconsolataBlack: require('../../../assets/fonts/Montserrat/static/Montserrat-Black.ttf'),
        InconsolataSemiExpanded: require('../../../assets/fonts/Montserrat/static/Montserrat-SemiBold.ttf'),
    });
    const REDIRECT_URI = "https://mood-io-app.herokuapp.com";
    const [request, response, promptAsync] = useAuthRequest(
        {
            responseType: 'code',
            clientId: "481af46969f2416e95e9196fa60d808d",
            scopes: [
                'user-read-email',
                'user-read-private',
                'user-top-read'
            ],
            show_dialog: 'true',
            prompt: Prompt.Login,
            usePKCE: false,
            extraParams: {
                show_dialog: 'true',
            },
            redirectUri: REDIRECT_URI
        },
        discovery
    );

    const onPressLogin = async () => {
        await promptAsync()
            .then((res) => {
                if (res && res.type === 'success') {
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
                                                saveUserGenres(userId, data.topArtists);
                                                navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
                                            } else {
                                                getGenreSeeds(accessToken)
                                                    .then(res => res.json())
                                                    .then(data => {
                                                        navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
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
