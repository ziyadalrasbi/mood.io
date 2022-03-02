
import * as React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import HomeStyles from './src/pages/home/HomeStyles';
import { Text, View } from 'react-native';
import { refreshAccessToken, getUserId, getUserTopArtistsLogin, saveUserArtists } from './src/fetch';
import DrawerStack from './src/components/drawer/DrawerStack';
import store from './src/client/src/store';
import { Provider } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import Loading from './src/components/loading/Loading';
import cacheAssests from './cacheAssets';

function App({ navigation }) {

    const [verified, setVerified] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const [assetsLoading, setAssetsLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchData = async () => {
            var tempId;
            var token;
            const spotifyAccessToken = await SecureStore.getItemAsync('spotify_access_token');
            const spotifyRefreshToken = await SecureStore.getItemAsync('spotify_refresh_token');
            if (spotifyAccessToken != null) {
                try {
                    await refreshAccessToken(spotifyAccessToken, spotifyRefreshToken)
                        .then(res => res.json())
                        .then(data => {
                            if (data.token != null) {
                                token = data.token;
                                SecureStore.setItemAsync('spotify_access_token', data.token, { keychainAccessible: SecureStore.ALWAYS_THIS_DEVICE_ONLY });
                                setVerified(true);
                            }
                        })
                    await getUserId(token)
                        .then(res => res.json())
                        .then(data => {
                            tempId = data.id;
                        })
                    await getUserTopArtistsLogin(token)
                        .then(res => res.json())
                        .then(data => {
                            if (Object.keys(data.topArtists).length > 0) {
                                saveUserArtists(tempId, data.topArtists)
                            }
                        })
                } catch (error) {
                    console.log('Error fetching home data, please try again. \n' + error);
                }
            }
        }

        const loadAssets = async () => {
            try {


                await cacheAssests({
                    images: [
                        require('./assets/icons/testlogo.png'),
                        /* CAROUSEL IMAGES */
                        require('./assets/icons/carousel/improveicon.png'),
                        require('./assets/icons/carousel/moodicon.png'),
                        require('./assets/icons/carousel/musicicon.png'),
                        require('./assets/icons/carousel/playlisticon.png'),
                        require('./assets/icons/carousel/statsicon.png'),
                        /* GENRE SELECT IMAGES */
                        require('./assets/icons/genreselect/add.png'),
                        require('./assets/icons/genreselect/remove.png'),
                        /* HOME IMAGES */
                        require('./assets/icons/home/about.png'),
                        require('./assets/icons/home/close.png'),
                        require('./assets/icons/home/hamburger.png'),
                        require('./assets/icons/home/next.png'),
                        require('./assets/icons/home/play.png'),
                        /* LOGIN IMAGES */
                        require('./assets/icons/login/spotifylogo.png'),
                        /* SELECT MOOD IMAGES */
                        require('./assets/icons/selectmood/angry.png'),
                        require('./assets/icons/selectmood/happy.png'),
                        require('./assets/icons/selectmood/neutral.png'),
                        require('./assets/icons/selectmood/sad.png'),
                        require('./assets/icons/selectmood/surprised.png'),
                        require('./assets/icons/selectmood/thinking.png'),
                        require('./assets/icons/selectmood/user.png'),
                        /* STATS IMAGES */
                        require('./assets/icons/stats/default.png'),
                        /* UPLOAD IMAGES */
                        require('./assets/icons/upload/back.png'),
                        require('./assets/icons/upload/upload.png')
                    ],
                    fonts: [{
                        MontserratBold: require('./assets/fonts/Montserrat/static/Montserrat-Bold.ttf'),
                        MontserratLight: require('./assets/fonts/Montserrat/static/Montserrat-Light.ttf'),
                        MontserratMedium: require('./assets/fonts/Montserrat/static/Montserrat-Medium.ttf'),
                        MontserratBlack: require('./assets/fonts/Montserrat/static/Montserrat-Black.ttf'),
                        MontserratSemiBold: require('./assets/fonts/Montserrat/static/Montserrat-SemiBold.ttf'),
                    }]
                })
            } catch (error) {
                console.log('Error caching assets, please try again. '+ error);
            } finally {
                setAssetsLoading(false);
            }
        }

        loadAssets();
        fetchData().then(() => setLoading(false));
        
    }, [loading])

    if (loading || assetsLoading) {
        return (
            <Loading page={'main'} />
        );
    }

    return (
        <Provider store={store}>
            <NavigationContainer>
                <DrawerStack loading={loading} verified={verified} />
            </NavigationContainer>
        </Provider>
    );
}

export default App;