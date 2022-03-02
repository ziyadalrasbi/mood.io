import * as React from 'react';
import { makeRedirectUri, useAuthRequest, ResponseType, Prompt, startAsync } from 'expo-auth-session';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import LoginStyles from './LoginStyles';
import * as SecureStore from 'expo-secure-store';
import { useFonts } from 'expo-font';
import CustomCarousel from '../../components/carousel/CustomCarousel';
import { LinearGradient } from 'expo-linear-gradient';
import { requestAccessToken, getUserId, getTopArtistsLogin, getUserProfile } from '../../client/src/actions/spotifyActions';
import { initUser, loginUser, saveUserArtists } from '../../client/src/actions/dbActions';
import { connect, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as WebBrowser from 'expo-web-browser';
import logo from '../../../assets/icons/testlogo.png';

if (Platform.OS === 'web') {
    WebBrowser.maybeCompleteAuthSession();
}
function Login({ navigation }) {

    const dispatch = useDispatch();

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

    const [request, response, promptAsync] = useAuthRequest(
        {
            responseType: 'code',
            clientId: "481af46969f2416e95e9196fa60d808d",
            scopes: [
                'user-read-email',
                'user-read-private',
                'user-top-read',
                'playlist-modify-public',
                'playlist-modify-private'
            ],
            prompt: Prompt.Login,
            usePKCE: false,
            extraParams: {
                show_dialog: 'true'
            },
            redirectUri: makeRedirectUri({
                native: 'moodio://oauthredirect'
            }),
        },
        discovery
    );

    const onPressLogin = async () => {
        await SecureStore.deleteItemAsync('spotify_access_token');
        await SecureStore.deleteItemAsync('spotify_refresh_token');
        const res = await promptAsync();
        if (res && res.type == 'success') {
            const getTokens = await dispatch(requestAccessToken(request.redirectUri, res.params.code));
            const accessToken = getTokens.requestAccessToken.accessToken;
            const refreshToken = getTokens.requestAccessToken.refreshToken;
            SecureStore.setItemAsync('spotify_access_token', accessToken, { keychainAccessible: SecureStore.ALWAYS_THIS_DEVICE_ONLY });
            SecureStore.setItemAsync('spotify_refresh_token', refreshToken, { keychainAccessible: SecureStore.ALWAYS_THIS_DEVICE_ONLY });
            const getUser = await dispatch(getUserId(accessToken));
            await dispatch(getUserProfile(accessToken));
            const userId = getUser.getUserId;
            SecureStore.setItemAsync('user_id', userId, { keychainAccessible: SecureStore.ALWAYS_THIS_DEVICE_ONLY });
            await dispatch(initUser(userId));
            await dispatch(loginUser(userId));
            const getTopArtists = await dispatch(getTopArtistsLogin(accessToken));
            if (getTopArtists.getTopArtistsLogin != null) {
                await dispatch(saveUserArtists(userId, getTopArtists.getTopArtistsLogin));
            }
            navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
        }
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
                colors={['#185a9d', '#4ca1af']}
                style={LoginStyles.gradientContainer}
            />
            <View style={LoginStyles.logoContainer}>
                <Image
                style={LoginStyles.logo}
                source={logo}
                />
            </View>
            <View style={LoginStyles.bottomContainer}>
                <CustomCarousel onPressLogin={onPressLogin} />
            </View>
        </View>
    );
}

const mapStateToProps = (state) => {
    return {
        requestAccessToken: state.spotifyReducer.requestAccessToken,
        initUser: state.dbReducer.initUser,
        loginUser: state.dbReducer.loginUser,
        getTopArtistsLogin: state.spotifyReducer.getTopArtistsLogin,
        saveUserArtists: state.dbReducer.saveUserArtists,
        getUserProfile: state.spotifyReducer.getUserProfile
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    requestAccessToken,
    initUser,
    loginUser,
    getTopArtistsLogin,
    saveUserArtists,
    getUserProfile
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Login);
