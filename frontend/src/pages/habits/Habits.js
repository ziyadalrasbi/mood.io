import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import { useFonts } from 'expo-font'
import HabitsStyles from './HabitsStyles';
import Navbar from '../../components/navbar/Navbar';
import { refreshAccessToken, getUserProfile, getTopArtistsStats, getTopTracksStats, getListeningHabits } from '../../client/src/actions/spotifyActions';
import * as SecureStore from 'expo-secure-store';
import Loading from '../../components/loading/Loading';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import * as Linking from 'expo-linking';
import playimg from '../../../assets/icons/home/play.png';
import defaultimg from '../../../assets/icons/stats/default.png';
import LottieView from 'lottie-react-native';
import { connect, useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';

function Habits({ navigation }) {

    const dispatch = useDispatch();

    const [loading, setLoading] = useState(true);

    const [selectedIndex, setSelectedIndex] = useState(2);

    useEffect(() => {
        const tokenController = new AbortController();
        const getArtistsController = new AbortController();
        const getTracksController = new AbortController();
        const getHabitsController = new AbortController();

        const fetchData = async () => {
            try {
                const token = await SecureStore.getItemAsync('spotify_access_token');
                const refreshToken = await SecureStore.getItemAsync('spotify_refresh_token');

                const getToken = await dispatch(refreshAccessToken(token, refreshToken, tokenController.signal));
                const accessToken = getToken.refreshAccessToken;
                SecureStore.setItemAsync('spotify_access_token', accessToken, { keychainAccessible: SecureStore.ALWAYS_THIS_DEVICE_ONLY });

                const getTracks = await dispatch(getTopTracksStats(accessToken, 'medium_term', getTracksController.signal));
                const trackIds = getTracks.getTopTracksStats.trackIds;
                const amount = getTracks.getTopTracksStats.trackIds.length;

                const getHabits = await dispatch(getListeningHabits(accessToken, trackIds, amount, getHabitsController.signal));
                console.log(getHabits.getListeningHabits);


            } catch (error) {
                console.log('Error getting users listening habits, please try again. ' + error);
            }
        }
        fetchData().then(() => setLoading(false));

        return () => {
            tokenController.abort();
            getArtistsController.abort();
            getTracksController.abort();
            getHabitsController.abort();
        }
    }, [loading, dispatch])

    if (loading) {
        return (
            <Loading page={"home"} />
        );
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
                <View style={HabitsStyles.selectContainer}>
                    <TouchableOpacity onPress={() => changeRange('short_term', 1)}>
                        <View style={HabitsStyles.selectButtonContainer}>
                            <View
                                style={[HabitsStyles.selectIcon]}
                            />
                            <Text style={[HabitsStyles.selectText]}>
                                Past 4 weeks
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => changeRange('medium_term', 2)}>
                        <View style={HabitsStyles.selectButtonContainer}>
                            <View
                                style={[HabitsStyles.selectIcon]}
                            />
                            <Text style={[HabitsStyles.selectText]}>
                                Past 6 months
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => changeRange('long_term', 3)}>
                        <View style={HabitsStyles.selectButtonContainer}>
                            <View
                                style={[HabitsStyles.selectIcon]}
                            />
                            <Text style={[HabitsStyles.selectText]}>
                                All time
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <ScrollView style={HabitsStyles.habitsScrollContainer} showsHorizontalScrollIndicator={false} horizontal={true}>
                    <View style={HabitsStyles.habitContainer}>
                        <View style={{ flexDirection: 'row' }}>
                            <LottieView
                                source={require('./animations/60897-line-sound-icon-animations.json')}
                                autoPlay
                                loop
                                style={{ width: 40, height: 40, marginTop: -3 }}
                            />
                            <Text style={HabitsStyles.habitName}>
                                Loudness
                            </Text>
                        </View>
                        <Text style={HabitsStyles.habitDescription}>
                            -45 dB
                        </Text>
                    </View>
                    <View style={HabitsStyles.habitContainer}>
                        <View style={{ flexDirection: 'row' }}>
                            <LottieView
                                source={require('./animations/12730-sound-wave.json')}
                                autoPlay
                                loop
                                style={{ width: 40, height: 40, marginTop: -3 }}
                            />
                            <Text style={HabitsStyles.habitName}>
                                Tempo
                            </Text>
                        </View>
                        <Text style={HabitsStyles.habitDescription}>
                            110 BPM
                        </Text>
                    </View>
                    <View style={HabitsStyles.habitContainer}>
                        <View style={{ flexDirection: 'row' }}>
                            <LottieView
                                source={require('./animations/71410-speech-bubbles.json')}
                                autoPlay
                                loop
                                style={{ width: 40, height: 40, marginTop: -3 }}
                            />
                            <Text style={HabitsStyles.habitName}>
                                Speechiness
                            </Text>
                        </View>
                        <Text style={HabitsStyles.habitDescription}>
                            0.047
                        </Text>
                    </View>
                    <View style={HabitsStyles.habitContainer}>
                        <View style={{ flexDirection: 'row' }}>
                            <LottieView
                                source={require('./animations/lf30_editor_eskm9u1h.json')}
                                autoPlay
                                loop
                                style={{ width: 40, height: 40, marginTop: -3 }}
                            />
                            <Text style={HabitsStyles.habitName}>
                                Acousticness
                            </Text>
                        </View>
                        <Text style={HabitsStyles.habitDescription}>
                            0.8
                        </Text>
                    </View>
                </ScrollView>
            </View>
        </ScrollView>
    );
}

// const mapStateToProps = (state) => {
//     return {
//         refreshAccessToken: state.spotifyReducer.refreshAccessToken,
//         getUserProfile: state.spotifyReducer.getUserProfile,
//         getTopArtistsStats: state.spotifyReducer.getTopArtistsStats,
//         getTopTracksStats: state.spotifyReducer.getTopTracksStats
//     }
// }

// const mapDispatchToProps = dispatch => bindActionCreators({
//     refreshAccessToken,
//     getUserProfile,
//     getTopArtistsStats,
//     getTopTracksStats
// }, dispatch);

export default Habits;