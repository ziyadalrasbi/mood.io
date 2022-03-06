import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, useCallback } from 'react';
import { Text, View, Image, ScrollView, TouchableOpacity, RefreshControl, Dimensions } from 'react-native';
import { useFonts } from 'expo-font'
import RecommendationsStyles from './RecommendationsStyles';
import Navbar from '../../components/navbar/Navbar';
import { getRecentMood, getPreviousRecommendations, setPlaylisted } from '../../client/src/actions/dbActions';
import { refreshAccessToken, createPlaylist, addTracksToPlaylist } from '../../client/src/actions/spotifyActions';
import * as SecureStore from 'expo-secure-store';
import Loading from '../../components/loading/Loading';
import * as Linking from 'expo-linking';
import playimg from '../../../assets/icons/home/play.png';
import { connect, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import LottieView from 'lottie-react-native';

function Recommendations({ navigation, route }) {

    const dispatch = useDispatch();

    const [loaded] = useFonts({
        InconsolataBold: require('../../../assets/fonts/Inconsolata/static/Inconsolata/Inconsolata-Bold.ttf'),
        InconsolataLight: require('../../../assets/fonts/Inconsolata/static/Inconsolata/Inconsolata-Light.ttf'),
        InconsolataMedium: require('../../../assets/fonts/Inconsolata/static/Inconsolata/Inconsolata-Medium.ttf'),
        InconsolataBlack: require('../../../assets/fonts/Inconsolata/static/Inconsolata/Inconsolata-Black.ttf')
    });

    const [recentMood, setRecentMood] = useState({ recentMood: "" });
    const [recommendations, setRecommendations] = useState({ recommendations: [] });

    const [loading, setLoading] = useState(true);

    const [toggle, setToggle] = useState({});

    const [ploading, setPLoading] = useState({});
    const [saving, setSaving] = useState({});
    const [complete, setComplete] = useState({});

    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        const getRecentMoodController = new AbortController();
        const getRecommendationsController = new AbortController();

        const fetchData = async () => {
            try {
                const userId = await SecureStore.getItemAsync('user_id');
                const getMood = await dispatch(getRecentMood(userId, getRecentMoodController.signal));
                const getRecommendations = await dispatch(getPreviousRecommendations(userId, getRecommendationsController.signal));
                setRecentMood({ recentMood: getMood.getRecentMood });
                setRecommendations(getRecommendations.getPreviousRecommendations);
            } catch (error) {
                console.log('Error aborting recommendations, please try again. ' + error);
            }

        }

        fetchData().then(() => setLoading(false));

        return () => {
            getRecentMoodController.abort();
            getRecommendationsController.abort();
        }

    }, [loading, dispatch])

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        const getRecommendationsController = new AbortController();
        try {
            const userId = await SecureStore.getItemAsync('user_id');
            const getRecommendations = await dispatch(getPreviousRecommendations(userId, getRecommendationsController.signal));
            setRecommendations(getRecommendations.getPreviousRecommendations);
        } catch (error) {
            console.log('Error refreshing recommendations, please try again. ' + error);
        }
        getRecommendationsController.abort();
        setRefreshing(false);
    }, [refreshing]);

    if (!loaded || loading) {
        return (
            <Loading page={"home"} />
        );
    }

    const toggleLoading = index => {
        setPLoading({ ...ploading[index], [index]: true });
    }

    const toggleSavingTrue = index => {
        setSaving({ ...saving[index], [index]: true });
    }

    const toggleSavingFalse = index => {
        setSaving({ ...saving[index], [index]: false });
    }

    const toggleComplete = index => {
        setComplete({ ...complete[index], [index]: true });
    }

    const toggleHide = index => {
        setToggle({ ...toggle[index], [index]: !toggle[index] });
    }

    const convertTimeToDate = (time) => {
        var date = new Date(time);
        var format = {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric'
        };
        var finalDate = date.toLocaleDateString('en', format);
        return finalDate.toString();
    }

    const savePlaylist = async (mood, playlistId, uris, index) => {
        const tokenController = new AbortController();
        const createPlaylistController = new AbortController();
        const addTracksController = new AbortController();
        const setPlaylistedController = new AbortController();
        try {
            toggleLoading(index);
            toggleSavingTrue(index);
            const userId = await SecureStore.getItemAsync('user_id');
            const token = await SecureStore.getItemAsync('spotify_access_token');
            const refreshToken = await SecureStore.getItemAsync('spotify_refresh_token');
            const getToken = await dispatch(refreshAccessToken(token, refreshToken, tokenController.signal));
            const accessToken = getToken.refreshAccessToken;
            SecureStore.setItemAsync('spotify_access_token', accessToken, { keychainAccessible: SecureStore.ALWAYS_THIS_DEVICE_ONLY });

            const getPlaylist = await dispatch(createPlaylist(accessToken, 'Your ' + mood + ' mood.io playlist #' + playlistId, 'A playlist generated for you on mood.io to better your mood!', createPlaylistController.signal));
            const id = getPlaylist.createPlaylist.id;
            const link = getPlaylist.createPlaylist.link;
            await dispatch(addTracksToPlaylist(accessToken, id, uris, addTracksController.signal));

            await dispatch(setPlaylisted(userId, playlistId, link, setPlaylistedController.signal));
            toggleSavingFalse(index);
            toggleComplete(index);
        } catch (error) {
            console.log('Error saving playlist, please try again. ' + error);
        }
        tokenController.abort();
        createPlaylistController.abort();
        addTracksController.abort();
        setPlaylistedController.abort();
    }

    return (
        <View style={RecommendationsStyles.scroll}>
            <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} style={RecommendationsStyles.tabView} showsVerticalScrollIndicator={false}>
                <View style={RecommendationsStyles.topContainer}>
                    <Navbar page={'recommendations'} navigation={navigation} />
                </View>
                <View style={RecommendationsStyles.mainContainer}>
                    <View style={RecommendationsStyles.firstContainer}>
                        <Text style={RecommendationsStyles.firstSubHeader}>
                            Find your recent recommendations below!
                        </Text>
                        <Text style={RecommendationsStyles.firstSubHeader}>
                            Recommendations are saved for 1 week.
                        </Text>
                        {recommendations.length > 0 &&
                            <Text style={RecommendationsStyles.firstSubHeader}>
                                Recent mood: {recentMood.recentMood}
                            </Text>
                        }
                    </View>
                    {recommendations.length > 0 && recommendations.map((recommendation, index) =>
                        <View key={index} style={RecommendationsStyles.topTracksContainer}>
                            <TouchableOpacity
                                style={RecommendationsStyles.trackContainer}
                                onPress={() => toggleHide(index)}>
                                <View>
                                    <Text style={RecommendationsStyles.firstHeader}>
                                        Recommendation #{recommendation.id}
                                    </Text>
                                    <Text style={RecommendationsStyles.firstSubHeader}>
                                        Date: {convertTimeToDate(recommendation.time)}
                                    </Text>
                                    <Text style={RecommendationsStyles.firstSubHeader}>
                                        Mood: {recommendation.mood}
                                    </Text>
                                </View>
                                <View>
                                    {recommendation.playlisted == true &&
                                        <TouchableOpacity style={RecommendationsStyles.openSpotify} onPress={() => Linking.openURL(recommendation.link)}>
                                            <Text style={RecommendationsStyles.firstSubHeader}>
                                                OPEN SPOTIFY
                                            </Text>
                                        </TouchableOpacity>
                                    }
                                    {recommendation.playlisted == false && !ploading[index] &&
                                        <TouchableOpacity style={RecommendationsStyles.saveToSpotify} onPress={() => savePlaylist(recommendation.mood, recommendation.id, recommendation.uris, index)}>
                                            <Text style={RecommendationsStyles.firstSubHeader}>
                                                SAVE TO SPOTIFY
                                            </Text>
                                        </TouchableOpacity>
                                    }
                                    {recommendation.playlisted == false && saving[index] &&
                                        <LottieView
                                            source={require('./animations/8707-loading.json')}
                                            autoPlay
                                            loop={true}
                                            style={RecommendationsStyles.lottieView}
                                        />
                                    }
                                    {recommendation.playlisted == false && complete[index] &&
                                        <Text style={RecommendationsStyles.firstSubHeader}>
                                            Playlist saved!
                                        </Text>
                                    }
                                </View>
                            </TouchableOpacity>
                            {!!toggle[index] &&
                                <View style={{ paddingHorizontal: Dimensions.get('window').width / 41.4 }}>
                                    {recommendation.tracks.map((track, i) =>
                                        <View key={i} style={RecommendationsStyles.recommendationContainer}>
                                            <TouchableOpacity
                                                style={{
                                                    shadowColor: '#000',
                                                    shadowOffset: { width: 0, height: 2 },
                                                    shadowOpacity: 0.5,
                                                    shadowRadius: 2, elevation: 5
                                                }}
                                                onPress={() => Linking.openURL(track[3])}>
                                                <Image
                                                    style={RecommendationsStyles.topTrackImage}
                                                    source={{ uri: track[2] }}
                                                />
                                            </TouchableOpacity>
                                            <View style={RecommendationsStyles.topTrackTextContainer}>
                                                <Text style={RecommendationsStyles.topTrackText}>{track[0]}</Text>
                                                <Text style={RecommendationsStyles.topTrackArtistText}>{track[1]}</Text>
                                            </View>
                                            <TouchableOpacity
                                                style={{ marginLeft: 'auto', paddingHorizontal: 10 }}
                                                onPress={() => Linking.openURL(track[3])}>
                                                <Image
                                                    style={RecommendationsStyles.playImage}
                                                    source={playimg}
                                                />
                                            </TouchableOpacity>
                                        </View>
                                    )}
                                </View>
                            }
                        </View>
                    )}
                    {recommendations.length == 0 &&
                        <Text style={RecommendationsStyles.noDataText}>
                            No recommendations yet. To get recommendations, press the "get started" button on the home page!
                        </Text>
                    }
                    <View style={{ height: Dimensions.get('window').height / 2.56 }} />
                </View>
                <StatusBar style="auto" />
            </ScrollView >
        </View>

    );
}

const mapStateToProps = (state) => {
    return {
        getRecentMood: state.dbReducer.getRecentMood,
        getPreviousRecommendations: state.dbReducer.getPreviousRecommendations
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    getRecentMood,
    getPreviousRecommendations
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Recommendations);
