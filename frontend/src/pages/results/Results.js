import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Text, View, Image, ScrollView, TouchableOpacity, BackHandler } from 'react-native';
import ResultsStyles from './ResultsStyles';
import Navbar from '../../components/navbar/Navbar';
import MoodGraph from '../../components/moodgraph/MoodGraph';
import { Dimensions } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import * as Linking from 'expo-linking';
import LottieView from 'lottie-react-native';
import Loading from '../../components/loading/Loading';
import { useFocusEffect } from '@react-navigation/native';
import {
    refreshAccessToken,
    createLibrary,
    createPlaylist,
    addTracksToPlaylist,
} from '../../client/src/actions/spotifyActions';
import {
    getUserDatabaseArtists,
    saveRecommendations,
    saveUserRating,
    getPlaylistsAmount,
    incrementPlaylistsAmount,
    setPlaylisted
} from '../../client/src/actions/dbActions';
import { useDispatch } from 'react-redux';
import StarRating from 'react-native-star-rating';
import playimg from '../../../assets/icons/home/play.png';
import spotifylogo from '../../../assets/icons/login/spotifylogo.png';
import ResultsError from '../../components/resultserror/ResultsError';
import { getMood, filterFeaturesByMaxEmotion } from './ResultsHelpers';

const { width, height } = Dimensions.get('window');

function Results({ navigation, route }) {

    const dispatch = useDispatch();

    const [moodHeader, setMoodHeader] = useState({ moodHeader: "" });
    const [moodDescription, setMoodDescription] = useState({ moodDescription: "" });

    const [recommendations, setRecommendations] = useState([]);
    const [uris, setUris] = useState([]);

    const [count, setCount] = useState(0);

    const [detectedMood, setDetectedMood] = useState(getMood(route.params.maxMood));

    const [loading, setLoading] = useState(true);
    const [rloading, setRLoading] = useState(true);
    const [ploading, setPLoading] = useState(false);

    const [saving, setSaving] = useState(false);
    const [complete, setComplete] = useState(false);

    const [playlistsAmount, setPlaylistsAmount] = useState(0);

    const scrollRef = useRef();

    const [error, setError] = useState(false);

    const onPressTouch = () => {
        scrollRef.current.scrollTo({
            y: height,
            animated: true,
            behavior: 'smooth'
        });
    }

    const fetchData = async (
        tokenSignal,
        dbArtistsSignal,
        librarySignal,
        saveRecommendationsSignal,
        incrementPlaylistsAmountSignal,
        getPlaylistsAmountSignal
    ) => {
        const token = await SecureStore.getItemAsync('spotify_access_token');
        const refreshToken = await SecureStore.getItemAsync('spotify_refresh_token');
        const tokenExpiry = await SecureStore.getItemAsync('token_expiry');
        const getToken = await dispatch(refreshAccessToken(token, refreshToken, tokenExpiry, tokenSignal));
        const accessToken = getToken.refreshAccessToken.token;
        const time = getToken.refreshAccessToken.time;
        SecureStore.setItemAsync('spotify_access_token', accessToken, { keychainAccessible: SecureStore.ALWAYS_THIS_DEVICE_ONLY });
        SecureStore.setItemAsync('token_expiry', time, { keychainAccessible: SecureStore.ALWAYS_THIS_DEVICE_ONLY });

        const id = await SecureStore.getItemAsync('user_id');
        const getArtists = await dispatch(getUserDatabaseArtists(id, dbArtistsSignal));
        const artists = getArtists.getUserDatabaseArtists;
        const features = filterFeaturesByMaxEmotion(route.params.maxMood);

        const getLibrary = await dispatch(createLibrary(
            accessToken,
            artists,
            features.object.target_valence,
            features.object.target_tempo,
            features.object.target_energy,
            features.array,
            librarySignal
        ));
        if (getLibrary.createLibrary.status == 200 && getLibrary.createLibrary.recommendations != null) {
            const getAmount = await dispatch(getPlaylistsAmount(id, getPlaylistsAmountSignal));
            const amount = getAmount.getPlaylistsAmount + 1;
            setPlaylistsAmount(amount);
            await dispatch(incrementPlaylistsAmount(id, incrementPlaylistsAmountSignal));
            setRecommendations(getLibrary.createLibrary.recommendations);
            setUris(getLibrary.createLibrary.uris);
            await dispatch(saveRecommendations(id, route.params.maxMood, JSON.stringify(getLibrary.createLibrary.recommendations), getLibrary.createLibrary.uris, amount, saveRecommendationsSignal));
        } else {
            setError(true);
        }
        setRLoading(false);
    }

    useEffect(() => {
        const tokenController = new AbortController();
        const getArtistsController = new AbortController();
        const createLibraryController = new AbortController();
        const saveRecommendationsController = new AbortController();
        const getPlaylistsAmountController = new AbortController();
        const incrementPlaylistsAmountController = new AbortController();
        try {
            fetchData(
                tokenController.signal,
                getArtistsController.signal,
                createLibraryController.signal,
                saveRecommendationsController.signal,
                incrementPlaylistsAmountController.signal,
                getPlaylistsAmountController.signal
            );
            setMoodHeader({ moodHeader: detectedMood.moodHeader });
            setMoodDescription({ moodDescription: detectedMood.moodDescription });
            setLoading(false);
        } catch (error) {
            console.log('Error creating recommendations, please try again. ' + error);
        }

        return () => {
            tokenController.abort();
            getArtistsController.abort();
            createLibraryController.abort();
            saveRecommendationsController.abort();
            getPlaylistsAmountController.abort();
            incrementPlaylistsAmountController.abort();
        }
    }, [dispatch])

    const onStarRatingPress = async (rating) => {
        const saveRatingController = new AbortController();
        try {
            setCount(rating);
            await dispatch(saveUserRating(rating, saveRatingController.signal));
        } catch (error) {
            console.log('Error saving rating, please try again. ' + error);
        }
        saveRatingController.abort();
    }

    useFocusEffect(
        useCallback(() => {
            const onBackPress = () => {
                navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
                return true;
            };

            BackHandler.addEventListener('hardwareBackPress', onBackPress);

            return () =>
                BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        }, []),
    );

    if (loading || rloading) {
        return (
            <Loading page={"results"} />
        );
    }

    const savePlaylist = async () => {
        const tokenController = new AbortController();
        const createPlaylistController = new AbortController();
        const addTracksController = new AbortController();
        const setPlaylistedController = new AbortController();
        try {
            setPLoading(true);
            setSaving(true);
            const userId = await SecureStore.getItemAsync('user_id');
            const token = await SecureStore.getItemAsync('spotify_access_token');
            const refreshToken = await SecureStore.getItemAsync('spotify_refresh_token');
            const tokenExpiry = await SecureStore.getItemAsync('token_expiry');
            const getToken = await dispatch(refreshAccessToken(token, refreshToken, tokenExpiry, tokenController.signal));
            const accessToken = getToken.refreshAccessToken.token;
            const time = getToken.refreshAccessToken.time;
            SecureStore.setItemAsync('spotify_access_token', accessToken, { keychainAccessible: SecureStore.ALWAYS_THIS_DEVICE_ONLY });
            SecureStore.setItemAsync('token_expiry', time, { keychainAccessible: SecureStore.ALWAYS_THIS_DEVICE_ONLY });

            const getPlaylist = await dispatch(createPlaylist(accessToken, 'Your ' + route.params.maxMood + ' mood.io playlist #' + playlistsAmount, 'A playlist generated for you on mood.io to better your mood!', createPlaylistController.signal));
            const id = getPlaylist.createPlaylist.id;
            const link = getPlaylist.createPlaylist.link;
            await dispatch(addTracksToPlaylist(accessToken, id, uris, addTracksController.signal));

            await dispatch(setPlaylisted(userId, playlistsAmount, link, setPlaylistedController.signal));
            setSaving(false);
            setComplete(true);
        } catch (error) {
            console.log('Error saving playlist, please try again. ' + error);
        }
        tokenController.abort();
        createPlaylistController.abort();
        addTracksController.abort();
        setPlaylistedController.abort();
    }



    return (
        error == false ?
            <ScrollView scrollEnabled={false} ref={scrollRef} style={ResultsStyles.scroll}>
                <View style={{ flexDirection: 'column', justifyContent: 'center', height: height }}>
                    <View style={ResultsStyles.topContainer}>
                        <Navbar page={'results'} navigation={navigation} />
                    </View>
                    <View style={ResultsStyles.mainContainer}>
                        <Text style={ResultsStyles.welcome}>
                            Results
                        </Text>
                        <View style={ResultsStyles.firstContainer}>
                            <Text style={ResultsStyles.firstHeader}>
                                Your mood analysis showed {moodHeader.moodHeader}
                            </Text>
                            <Text style={ResultsStyles.firstSubHeader}>
                                {moodDescription.moodDescription}
                            </Text>
                            {<MoodGraph data={route.params.averages} />}
                        </View>
                    </View>
                    <TouchableOpacity onPress={onPressTouch}>
                        <LottieView
                            source={require('./animations/continue.json')}
                            autoPlay
                            loop={true}
                            style={ResultsStyles.continueLottie}
                        />
                    </TouchableOpacity>
                </View>
                <View style={ResultsStyles.secondTopContainer}>
                    <Navbar page={'results'} navigation={navigation} />
                </View>
                <Text style={ResultsStyles.firstHeader}>
                    Find a collection of songs below suited to better your mood!
                </Text>
                <Text style={ResultsStyles.firstSubHeader}>
                    Scroll below to save this collection as a playlist to your Spotify account.
                </Text>
                <View style={{ borderBottomColor: 'grey', borderBottomWidth: 1, flex: 1 }} />
                <ScrollView showsVerticalScrollIndicator={false} overScrollMode='never' contentContainerStyle={{ flexGrow: 0 }} style={{ height: height / 1.49333333, flex: 1, }}>
                    <View style={ResultsStyles.secondContainer}>
                        <View style={ResultsStyles.recommendationsContainer}>
                            {!rloading && recommendations.length > 0 && recommendations.map((track, index) =>
                                <View key={index} style={ResultsStyles.trackContainer}>
                                    <TouchableOpacity
                                        style={{
                                            shadowColor: '#000',
                                            shadowOffset: { width: 0, height: 2 },
                                            shadowOpacity: 0.5,
                                            shadowRadius: 2,
                                            elevation: 5
                                        }}
                                        onPress={() => Linking.openURL(track[3])}>
                                        <Image
                                            style={ResultsStyles.trackImage}
                                            source={{ uri: track[2] }}
                                        />
                                    </TouchableOpacity>
                                    <View style={{ alignSelf: 'center' }}>
                                        <Text style={ResultsStyles.trackText}>{track[0]}</Text>
                                        <Text style={ResultsStyles.trackArtistText}>by {track[1]}</Text>
                                    </View>
                                    <TouchableOpacity
                                        style={{ marginLeft: 'auto', paddingHorizontal: 10 }}
                                        onPress={() => Linking.openURL(track[3])}>
                                        <Image
                                            style={ResultsStyles.playImage}
                                            source={playimg}
                                        />
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>
                        <View style={ResultsStyles.mainContainer}>
                            <Text style={ResultsStyles.secondHeader}>
                                To save this collection of songs as a playlist on your Spotify Profile,
                                press this button!
                            </Text>
                            {ploading == false &&
                                <TouchableOpacity
                                    style={ResultsStyles.buttonContainer}
                                    activeOpacity={0.5}
                                    onPress={() => savePlaylist()}
                                >
                                    <Image
                                        source={spotifylogo}
                                        style={ResultsStyles.spotifyLogo}
                                    />
                                    <View />
                                    <Text style={ResultsStyles.mainFont}> &nbsp; SAVE PLAYLIST TO SPOTIFY </Text>
                                </TouchableOpacity>
                            }
                            {saving == true &&
                                <LottieView
                                    source={require('./animations/loading.json')}
                                    autoPlay
                                    loop={true}
                                    style={ResultsStyles.lottieView}
                                />
                            }
                            {complete == true &&
                                <Text style={ResultsStyles.rateText}>
                                    Playlist saved!
                                </Text>
                            }
                        </View>
                        <View style={{ alignSelf: 'center', marginTop: height / 89.6 }}>
                            {count == 0 &&
                                <Text style={ResultsStyles.rateText}>
                                    How would you rate the accuracy of this recommendation?
                                </Text>
                            }
                            {count == 0 &&
                                <View style={{ alignSelf: 'center' }}>
                                    <StarRating
                                        disabled={false}
                                        maxStars={5}
                                        rating={count}
                                        selectedStar={(rating) => onStarRatingPress(rating)}
                                        starSize={30}
                                        fullStarColor='gold'
                                    />
                                </View>
                            }
                            {count > 0 &&
                                <Text style={ResultsStyles.rateText}>
                                    thank you! ⭐
                                </Text>
                            }
                            <View style={{ height: 40 }} />
                        </View>
                        <StatusBar style="auto" />
                    </View>
                </ScrollView>
            </ScrollView>
            :
            <ResultsError navigation={navigation} />
    );
}

export default Results;