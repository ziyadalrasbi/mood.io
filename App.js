
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './frontend/pages/login/Login';
import Home from './frontend/pages/home/Home';
import Upload from './frontend/pages/upload/Upload';
import Results from './frontend/pages/results/Results';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeStyles from './frontend/pages/home/HomeStyles';
import { Text, View, Image, ScrollView } from 'react-native';

function App({ navigation }) {

    const Stack = createNativeStackNavigator();
    const [verified, setVerified] = React.useState(false);
    const [userId, setUserId] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchData = async () => {
            const spotifyAccessToken = await AsyncStorage.getItem('spotify_access_token');
            const spotifyRefreshToken = await AsyncStorage.getItem('spotify_refresh_token');
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
                                AsyncStorage.setItem('spotify_access_token', data.token);
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
                            token: spotifyAccessToken
                        })
                    })
                        .then(res => res.json())
                        .then(data => {
                            setUserId(data.id);
                            fetch("http://192.168.0.14:19001/spotify/login/getUserTopGenres", {
                                method: 'post',
                                headers: {
                                    Accept: 'application/json',
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    token: spotifyAccessToken
                                })
                            })
                                .then(res => res.json())
                                .then(data => {
                                    fetch("http://192.168.0.14:19001/database/login/saveUserGenres", {
                                        method: 'post',
                                        headers: {
                                            Accept: 'application/json',
                                            'Content-Type': 'application/json',
                                        },
                                        body: JSON.stringify({
                                            user: userId,
                                            genres: data.topGenres
                                        })
                                    })
                                })
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
                screenOptions={{ headerShown: false }}
            >
                <Stack.Screen name='Login' component={Login} />
                <Stack.Screen name='Home' component={Home} />
                <Stack.Screen name='Upload' component={Upload} />
                <Stack.Screen name='Results' component={Results} />
            </Stack.Navigator>
        </NavigationContainer>

    );
}

export default App;