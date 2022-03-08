import * as React from 'react';
import { makeRedirectUri, useAuthRequest, ResponseType, Prompt } from 'expo-auth-session';
import { View, Image } from 'react-native';
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
import Loading from '../../components/loading/Loading';
import * as Constants from '../../Constants';

const REDIRECT_URI = Constants.REDIRECT_URI;
const AUTHORIZATION_ENDPOINT = Constants.AUTHORIZATION_ENDPOINT;
const TOKEN_ENDPOINT = Constants.TOKEN_ENDPOINT;
const CLIENT_ID = Constants.CLIENT_ID;
const SPOTIFY_SCOPES = Constants.SPOTIFY_SCOPES;

if (Platform.OS === 'web') {
    WebBrowser.maybeCompleteAuthSession();
}
function Login({ navigation }) {

    const dispatch = useDispatch();

    const [pressed, setPressed] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const discovery = {
        authorizationEndpoint: AUTHORIZATION_ENDPOINT,
        tokenEndpoint: TOKEN_ENDPOINT
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
            clientId: CLIENT_ID,
            scopes: SPOTIFY_SCOPES,
            prompt: Prompt.Login,
            usePKCE: false,
            extraParams: {
                show_dialog: 'true'
            },
            redirectUri: makeRedirectUri({
                native: REDIRECT_URI
            }),
        },
        discovery
    );

    const onPressLogin = async () => {
        const requestTokenController = new AbortController();
        const getUserIdController = new AbortController();
        const getUserProfileController = new AbortController();
        const initUserController = new AbortController();
        const loginUserController = new AbortController();
        const getArtistsController = new AbortController();
        const saveArtistsController = new AbortController();
        try {
            await SecureStore.deleteItemAsync('spotify_access_token');
            await SecureStore.deleteItemAsync('spotify_refresh_token');
            const res = await promptAsync();

            if (res && res.type == 'success') {
                setLoading(true);
                const getTokens = await dispatch(requestAccessToken(request.redirectUri, res.params.code, requestTokenController.signal));

                const accessToken = getTokens.requestAccessToken.accessToken;
                const refreshToken = getTokens.requestAccessToken.refreshToken;
                const totalExpiry = Date.now() + 3.6e6;

                SecureStore.setItemAsync('spotify_access_token', accessToken, { keychainAccessible: SecureStore.ALWAYS_THIS_DEVICE_ONLY });
                SecureStore.setItemAsync('spotify_refresh_token', refreshToken, { keychainAccessible: SecureStore.ALWAYS_THIS_DEVICE_ONLY });
                SecureStore.setItemAsync('token_expiry', JSON.stringify(totalExpiry), { keychainAccessible: SecureStore.ALWAYS_THIS_DEVICE_ONLY });

                const getUser = await dispatch(getUserId(accessToken, getUserIdController.signal));
                await dispatch(getUserProfile(accessToken, getUserProfileController.signal));
                const userId = getUser.getUserId;
                SecureStore.setItemAsync('user_id', userId, { keychainAccessible: SecureStore.ALWAYS_THIS_DEVICE_ONLY });
                await dispatch(initUser(userId, initUserController.signal));
                await dispatch(loginUser(userId, loginUserController.signal));
                const getTopArtists = await dispatch(getTopArtistsLogin(accessToken, getArtistsController.signal));
                if (getTopArtists.getTopArtistsLogin != null) {
                    await dispatch(saveUserArtists(userId, getTopArtists.getTopArtistsLogin, saveArtistsController.signal));
                }
                requestTokenController.abort();
                getUserIdController.abort();
                getUserProfileController.abort();
                initUserController.abort();
                loginUserController.abort();
                getArtistsController.abort();
                saveArtistsController.abort();
                setLoading(false);
                navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
            }
        } catch (error) {
            console.log('Error logging in, please try again. ' + error);
        }
    }

    if (!loaded) {
        return <View />;
    }

    if (loading) {
        return (
            <Loading page={'login'} />
        )
    }

    return (
        <View style={LoginStyles.mainContainer}>
            <LinearGradient
                colors={['#141E30', '#243B55']}
                style={LoginStyles.gradientContainer}
            />
            <View style={LoginStyles.logoContainer}>
                <Image
                    style={LoginStyles.logo}
                    source={logo}
                />
            </View>
            <View style={LoginStyles.bottomContainer}>
                <CustomCarousel onPressLogin={onPressLogin} pressed={pressed} />
            </View>
        </View>
    );
}

export default Login;