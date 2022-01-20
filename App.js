
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
                    await fetch("http://192.168.0.14:19001/spotify/login/refreshAccessToken", {
                        method: 'post',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            accessToken: spotifyAccessToken,
                            refreshToken: spotifyRefreshToken
                        })
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.token != "Null") {
                                token = data.token;
                                SecureStore.setItemAsync('spotify_access_token', data.token, { keychainAccessible: SecureStore.ALWAYS_THIS_DEVICE_ONLY });
                                setVerified(true);
                            }
                        })
                    await fetch("http://192.168.0.14:19001/spotify/login/getUserId", {
                        method: 'post',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            token: token
                        })
                    })
                        .then(res => res.json())
                        .then(data => {
                            tempId = data.id;
                        })
                    await fetch("http://192.168.0.14:19001/spotify/login/getUserTopGenres", {
                        method: 'post',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            token: token
                        })
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (Object.keys(data.topGenres).length > 0) {
                                fetch("http://192.168.0.14:19001/database/login/saveUserGenres", {
                                    method: 'post',
                                    headers: {
                                        Accept: 'application/json',
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify({
                                        user: tempId,
                                        genres: data.topGenres
                                    })
                                })
                            } else {
                                fetch("http://192.168.0.14:19001/database/login/getUserGenres", {
                                    method: 'post',
                                    headers: {
                                        Accept: 'application/json',
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify({
                                        user: tempId,
                                    })
                                })
                                    .then(res => res.json())
                                    .then(data => {
                                        if (data.code == 404) {
                                            fetch("http://192.168.0.14:19001/spotify/login/getGenreSeeds", {
                                                method: 'post',
                                                headers: {
                                                    Accept: 'application/json',
                                                    'Content-Type': 'application/json',
                                                },
                                                body: JSON.stringify({
                                                    token: token
                                                })
                                            })
                                                .then(res => res.json())
                                                .then(data => {
                                                    setSeeds({ ...seeds, seeds: data.genreSeeds });
                                                })
                                        }
                                    })
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
                <Stack.Screen name='Home' component={Home} initialParams={{ new: newUser, genreSeeds: seeds.seeds.length > 0 && seeds.seeds }} />
                <Stack.Screen name='Upload' component={Upload} />
                <Stack.Screen name='Results' component={Results} />
            </Stack.Navigator>
        </NavigationContainer>

    );
}

export default App;