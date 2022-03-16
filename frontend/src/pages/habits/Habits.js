import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Text, View, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import HabitsStyles from './HabitsStyles';
import Navbar from '../../components/navbar/Navbar';
import { refreshAccessToken, getTopTracksStats, getListeningHabits } from '../../client/src/actions/spotifyActions';
import * as SecureStore from 'expo-secure-store';
import Loading from '../../components/loading/Loading';
import * as Linking from 'expo-linking';
import LottieView from 'lottie-react-native';
import { useDispatch } from 'react-redux';
import HabitsGraph from '../../components/habitsgraph/HabitsGraph';
import * as WebBrowser from 'expo-web-browser';
const { width, height } = Dimensions.get('window');

function Habits({ navigation }) {

    const dispatch = useDispatch();

    const [loading, setLoading] = useState(true);
    const [rloading, setRLoading] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(2);

    const [graphHabits, setGraphHabits] = useState([]);
    const [cardHabits, setCardHabits] = useState([]);

    useEffect(() => {
        const tokenController = new AbortController();
        const getTracksController = new AbortController();
        const getHabitsController = new AbortController();

        const fetchData = async () => {
            try {
                const token = await SecureStore.getItemAsync('spotify_access_token');
                const refreshToken = await SecureStore.getItemAsync('spotify_refresh_token');
                const tokenExpiry = await SecureStore.getItemAsync('token_expiry');
                const getToken = await dispatch(refreshAccessToken(token, refreshToken, tokenExpiry, tokenController.signal));
                const accessToken = getToken.refreshAccessToken.token;
                const time = getToken.refreshAccessToken.time;
                SecureStore.setItemAsync('spotify_access_token', accessToken, { keychainAccessible: SecureStore.ALWAYS_THIS_DEVICE_ONLY });
                SecureStore.setItemAsync('token_expiry', time, { keychainAccessible: SecureStore.ALWAYS_THIS_DEVICE_ONLY });

                const getTracks = await dispatch(getTopTracksStats(accessToken, 'medium_term', getTracksController.signal));
                const trackIds = getTracks.getTopTracksStats.trackIds;
                const amount = getTracks.getTopTracksStats.trackIds.length;

                const getHabits = await dispatch(getListeningHabits(accessToken, trackIds, amount, getHabitsController.signal));

                const graphValues = getHabits.getListeningHabits.graphHabits;
                const cardValues = getHabits.getListeningHabits.cardHabits;

                setGraphHabits(graphValues);
                setCardHabits(cardValues);


            } catch (error) {
                console.log('Error getting users listening habits, please try again. ' + error);
            }
        }
        fetchData().then(() => setLoading(false));

        return () => {
            tokenController.abort();
            getTracksController.abort();
            getHabitsController.abort();
        }
    }, [loading, dispatch])

    if (loading) {
        return (
            <Loading page={"habits"} />
        );
    }

    const changeRange = async (range, i) => {
        const tokenController = new AbortController();
        const getTracksController = new AbortController();
        const getHabitsController = new AbortController();

        try {
            setRLoading(true);
            setSelectedIndex(i);

            const token = await SecureStore.getItemAsync('spotify_access_token');
            const refreshToken = await SecureStore.getItemAsync('spotify_refresh_token');
            const tokenExpiry = await SecureStore.getItemAsync('token_expiry');
            const getToken = await dispatch(refreshAccessToken(token, refreshToken, tokenExpiry, tokenController.signal));
            const accessToken = getToken.refreshAccessToken.token;
            const time = getToken.refreshAccessToken.time;
            SecureStore.setItemAsync('spotify_access_token', accessToken, { keychainAccessible: SecureStore.ALWAYS_THIS_DEVICE_ONLY });
            SecureStore.setItemAsync('token_expiry', time, { keychainAccessible: SecureStore.ALWAYS_THIS_DEVICE_ONLY });

            const getTracks = await dispatch(getTopTracksStats(accessToken, range, getTracksController.signal));
            const trackIds = getTracks.getTopTracksStats.trackIds;
            const amount = getTracks.getTopTracksStats.trackIds.length;

            const getHabits = await dispatch(getListeningHabits(accessToken, trackIds, amount, getHabitsController.signal));

            const graphValues = getHabits.getListeningHabits.graphHabits;
            const cardValues = getHabits.getListeningHabits.cardHabits;

            setGraphHabits(graphValues);
            setCardHabits(cardValues);

            setRLoading(false);

        } catch (error) {
            console.log('Error changing range, please try again. ' + error);
        }
        tokenController.abort();
        getTracksController.abort();
        getHabitsController.abort();
    }

    return (
        <ScrollView style={HabitsStyles.scroll}>
            <View style={HabitsStyles.topContainer}>
                <Navbar page={'habits'} navigation={navigation} />
            </View>
            <View style={HabitsStyles.mainContainer}>
                <Text style={HabitsStyles.welcome}>
                    Your Listening Habits
                </Text>
                <Text style={HabitsStyles.subWelcome}>
                    Habits are averaged using your top 15 tracks from the given time range.
                </Text>
                <View style={HabitsStyles.selectContainer}>
                    <TouchableOpacity
                        style={[HabitsStyles.opacityContainer, { backgroundColor: selectedIndex == 1 ? '#1d2ea1' : 'transparent' }]}
                        onPress={() => changeRange('short_term', 1)}
                        disabled={selectedIndex == 1 ? true : false}
                    >
                        <Text style={[HabitsStyles.selectText, { color: selectedIndex == 1 ? 'white' : 'grey' }]}>
                            4 weeks
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[HabitsStyles.opacityContainer, { backgroundColor: selectedIndex == 2 ? '#1d2ea1' : 'transparent' }]}
                        onPress={() => changeRange('medium_term', 2)}
                        disabled={selectedIndex == 2 ? true : false}
                    >
                        <View style={HabitsStyles.selectButtonContainer}>
                            <Text style={[HabitsStyles.selectText, { color: selectedIndex == 2 ? 'white' : 'grey' }]}>
                                6 months
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[HabitsStyles.opacityContainer, { backgroundColor: selectedIndex == 3 ? '#1d2ea1' : 'transparent' }]}
                        onPress={() => changeRange('long_term', 3)}
                        disabled={selectedIndex == 3 ? true : false}
                    >
                        <View style={HabitsStyles.selectButtonContainer}>
                            <Text style={[HabitsStyles.selectText, { color: selectedIndex == 3 ? 'white' : 'grey' }]}>
                                All time
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <ScrollView style={HabitsStyles.habitsScrollContainer} showsHorizontalScrollIndicator={false} horizontal={true}>
                    <View style={HabitsStyles.habitContainer}>
                        <View style={{ flexDirection: 'row' }}>
                            <LottieView
                                source={require('./animations/loudness.json')}
                                autoPlay
                                loop={false}
                                style={HabitsStyles.habitAnimation}
                            />

                            <Text style={HabitsStyles.habitName}>
                                Loudness
                            </Text>
                        </View>
                        {(rloading == false && cardHabits != null) ?
                            <Text style={HabitsStyles.habitDescription}>
                                {cardHabits.loudness} dB
                            </Text>
                            :
                            rloading == true ?
                                <LottieView
                                    source={require('./animations/loading.json')}
                                    autoPlay
                                    loop
                                    style={HabitsStyles.loadingLottie}
                                />
                                :
                                <Text style={HabitsStyles.habitDescription}>
                                    --
                                </Text>
                        }
                    </View>
                    <View style={[HabitsStyles.habitContainer, { backgroundColor: '#5311d6' }]}>
                        <View style={{ flexDirection: 'row' }}>
                            <LottieView
                                source={require('./animations/tempo.json')}
                                autoPlay
                                loop={false}
                                style={HabitsStyles.habitAnimation}
                            />
                            <Text style={HabitsStyles.habitName}>
                                Tempo
                            </Text>
                        </View>
                        {(rloading == false && cardHabits != null) ?
                            <Text style={HabitsStyles.habitDescription}>
                                {cardHabits.tempo} BPM
                            </Text>
                            :
                            rloading == true ?
                                <LottieView
                                    source={require('./animations/loading.json')}
                                    autoPlay
                                    loop
                                    style={HabitsStyles.loadingLottie}
                                />
                                :
                                <Text style={HabitsStyles.habitDescription}>
                                    --
                                </Text>
                        }
                    </View>
                    <View style={[HabitsStyles.habitContainer, { backgroundColor: '#16b5c9' }]}>
                        <View style={{ flexDirection: 'row' }}>
                            <LottieView
                                source={require('./animations/speechiness.json')}
                                autoPlay
                                loop={false}
                                style={HabitsStyles.habitAnimation}
                            />
                            <Text style={HabitsStyles.habitName}>
                                Speechiness
                            </Text>
                        </View>
                        {(rloading == false && cardHabits != null) ?
                            <Text style={HabitsStyles.habitDescription}>
                                {cardHabits.speechiness}
                            </Text>
                            :
                            rloading == true ?
                                <LottieView
                                    source={require('./animations/loading.json')}
                                    autoPlay
                                    loop
                                    style={HabitsStyles.loadingLottie}
                                />
                                :
                                <Text style={HabitsStyles.habitDescription}>
                                    --
                                </Text>
                        }
                    </View>
                    <View style={[HabitsStyles.habitContainer, { backgroundColor: '#20bd52' }]}>
                        <View style={{ flexDirection: 'row' }}>
                            <LottieView
                                source={require('./animations/acousticness.json')}
                                autoPlay
                                loop={false}
                                style={HabitsStyles.habitAnimation}
                            />
                            <Text style={HabitsStyles.habitName}>
                                Acousticness
                            </Text>
                        </View>
                        {(rloading == false && cardHabits != null) ?
                            <Text style={HabitsStyles.habitDescription}>
                                {cardHabits.acousticness}
                            </Text>
                            :
                            rloading == true ?
                                <LottieView
                                    source={require('./animations/loading.json')}
                                    autoPlay
                                    loop
                                    style={HabitsStyles.loadingLottie}
                                />
                                :
                                <Text style={HabitsStyles.habitDescription}>
                                    --
                                </Text>
                        }
                    </View>
                </ScrollView>
            </View>
            <View style={{ marginTop: height / 29.8666667 }}>
                {graphHabits != null ?
                    <View>
                        <HabitsGraph data={graphHabits} />
                        <View style={{ flexDirection: 'row', marginLeft: width / 20.7 }}>
                            <Text style={HabitsStyles.learnText}>
                                To learn more about these values,&nbsp;
                            </Text>
                            <TouchableOpacity onPress={() => WebBrowser.openBrowserAsync('https://developer.spotify.com/documentation/web-api/reference/#/operations/get-audio-features')}>
                                <Text style={HabitsStyles.learnLink}>
                                    visit the Spotify website.
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    :
                    <Text style={HabitsStyles.noDataText}>
                        No data found for this time frame. Try a different time frame, or listen to some more
                        music on Spotify and come back at a later date to view this data!
                    </Text>
                }
            </View>
            <View style={{ height: height / 17.92 }} />
            <StatusBar style="auto" />
        </ScrollView>
    );
}

export default Habits;