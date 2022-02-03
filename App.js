
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './frontend/pages/login/Login';
import Home from './frontend/pages/home/Home';
import Upload from './frontend/pages/upload/Upload';
import Results from './frontend/pages/results/Results';
import * as SecureStore from 'expo-secure-store';
import HomeStyles from './frontend/pages/home/HomeStyles';
import { Text, View, Image, ScrollView } from 'react-native';
import { refreshAccessToken, getUserId, getUserGenres, saveUserGenres, getUserDatabaseGenres, getGenreSeeds } from './frontend/fetch';
import UploadOptions from './frontend/pages/UploadOptions/UploadOptions';
import UserStats from './frontend/pages/userstats/UserStats';
import SelectMood from './frontend/pages/selectmood/SelectMood';

function App({ navigation }) {

    const Stack = createNativeStackNavigator();
    const [verified, setVerified] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const [newUser, setNewUser] = React.useState(false);
    const [seeds, setSeeds] = React.useState({ seeds: [] });
    const isNewUser = [];
    React.useEffect(() => {
        const isNew = [];
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
                            if (data.token != "Null") {
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
                    await getUserGenres(token)
                        .then(res => res.json())
                        .then(data => {
                            if (Object.keys(data.topGenres).length > 0) {
                                saveUserGenres(tempId, data.topArtists)
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
            <Stack.Navigator
                initialRouteName={!loading && verified == true ? 'Home' : 'Login'}
                initialParams={loading}
                screenOptions={{ headerShown: false }}
            >
                <Stack.Screen name='Login' component={Login} />
                <Stack.Screen name='Home' component={Home} />
                <Stack.Screen name='UploadOptions' component={UploadOptions} />
                <Stack.Screen name='Upload' component={Upload} />
                <Stack.Screen name='SelectMood' component={SelectMood} />
                <Stack.Screen name='Results' component={Results} />
                <Stack.Screen name='UserStats' component={UserStats} />
            </Stack.Navigator>
        </NavigationContainer>

    );
}

export default App;