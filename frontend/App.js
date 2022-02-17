
import * as React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import HomeStyles from './src/pages/home/HomeStyles';
import { Text, View } from 'react-native';
import { refreshAccessToken, getUserId, getUserTopArtistsLogin, saveUserArtists } from './src/fetch';
import DrawerStack from './src/components/drawer/DrawerStack';

function App({ navigation }) {

    const [verified, setVerified] = React.useState(false);
    const [loading, setLoading] = React.useState(true);

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
        fetchData().then(() => setLoading(false));
    }, [loading])

    if (loading) {
        return (
            <View style={HomeStyles.mainContainer}>
                <View style={HomeStyles.topContainer}>
                    <Text style={HomeStyles.welcome}>
                        moodio...
                    </Text>
                </View>
            </View>
        );
    }

    return (
        <NavigationContainer>
            <DrawerStack loading={loading} verified={verified} />
        </NavigationContainer>
    );
}

export default App;