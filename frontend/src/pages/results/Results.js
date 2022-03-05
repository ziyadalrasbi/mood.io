import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState } from 'react';
import { Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import ResultsStyles from './ResultsStyles';
import Navbar from '../../components/navbar/Navbar';
import MoodGraph from '../../components/moodgraph/MoodGraph';
import { Dimensions } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import * as Linking from 'expo-linking';
import LottieView from 'lottie-react-native';
import Loading from '../../components/loading/Loading';
import {
    refreshAccessToken,
    createLibrary,
    getRecommendations,
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
import { connect, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import StarRating from 'react-native-star-rating';
import playimg from '../../../assets/icons/home/play.png';
import spotifylogo from '../../../assets/icons/login/spotifylogo.png';

const { width, height } = Dimensions.get('window');

function Results({ navigation, route }) {

    const dispatch = useDispatch();

    const getMood = (maxMood) => {
        if (maxMood) {
            if (maxMood == 'happy') {
                const mood = {
                    moodHeader: 'that you are feeling happy!',
                    moodDescription: 'Be sure to spread the happiness with others around you :)'
                }
                return mood;
            }
            if (maxMood == 'sad') {
                const mood = {
                    moodHeader: 'that you are feeling down.',
                    moodDescription: 'It will get better, keep your head up high!'
                }
                return mood;
            }
            if (maxMood == 'angry') {
                const mood = {
                    moodHeader: 'that you seem tempered and full of energy!',
                    moodDescription: 'Try to harness your energy into something positive!'
                }
                return mood;
            }
            if (maxMood == 'fearful') {
                const mood = {
                    moodHeader: 'that you seem fearful. Stay safe!',
                    moodDescription: 'Surround yourself around people that make you feel safe.'
                }
                return mood;
            }
            if (maxMood == 'disgusted') {
                const mood = {
                    moodHeader: 'that something may be putting you off.',
                    moodDescription: 'Engage in activities that put you in your comfort zone.'
                }
                return mood;
            }
            if (maxMood == 'surprised') {
                const mood = {
                    moodHeader: 'that something may be surprising you!',
                    moodDescription: 'We hope it is nothing to be concerned about!'
                }
                return mood;
            }
            if (maxMood == 'confused') {
                const mood = {
                    moodHeader: 'that you may be confused about something.',
                    moodDescription: 'Be patient, you\'ll figure it out!'
                }
                return mood;
            }
            if (maxMood == 'neutral') {
                const mood = {
                    moodHeader: 'that everything seems normal!',
                    moodDescription: 'Being in a neutral state of mind is always good!'
                }
                return mood;
            }
        }
    }

    const [moodHeader, setMoodHeader] = useState({ moodHeader: "" });
    const [moodDescription, setMoodDescription] = useState({ moodDescription: "" });

    const [recommendations, setRecommendations] = useState([]);
    const [length, setLength] = useState(0);
    const [uris, setUris] = useState([]);

    const [count, setCount] = useState(0);

    const [detectedMood, setDetectedMood] = useState(getMood(route.params.maxMood));

    const [loading, setLoading] = useState(true);
    const [rloading, setRLoading] = useState(true);
    const [ploading, setPLoading] = useState(false);

    const [saving, setSaving] = useState(false);
    const [complete, setComplete] = useState(false);

    const [scrolled, setScrolled] = useState(false);

    const [playlistsAmount, setPlaylistsAmount] = useState(0);

    const scrollRef = useRef();
    const secondRef = useRef();

    const onPressTouch = () => {
        scrollRef.current.scrollTo({
            y: 1230,
            animated: true,
            behavior: 'smooth'
        });
        setTimeout(() => {
            setScrolled(true);
        }, 1000);
    }

    const filterFeaturesByMaxEmotion = (emotion) => {
        const maxEmotion = emotion;

        const valence = maxEmotion == 'happy' ? 0.9 :
            (maxEmotion == 'sad' ? 0.4 :
                (maxEmotion == 'angry' ? 0.4 :
                    (maxEmotion == 'netutral' ? 0.7 :
                        (maxEmotion == 'surprised' ? 0.7 :
                            (maxEmotion == 'confused' && 0.6)))));

        const energy = maxEmotion == 'happy' ? 0.8 :
            (maxEmotion == 'sad' ? 0.2 :
                (maxEmotion == 'angry' ? 0.3 :
                    (maxEmotion == 'netutral' ? 0.4 :
                        (maxEmotion == 'surprised' ? 0.5 :
                            (maxEmotion == 'confused' && 0.3)))));

        const danceability = maxEmotion == 'happy' ? 0.7 :
            (maxEmotion == 'sad' ? 0.1 :
                (maxEmotion == 'angry' ? 0.2 :
                    (maxEmotion == 'netutral' ? 0.3 :
                        (maxEmotion == 'surprised' ? 0.5 :
                            (maxEmotion == 'confused' && 0.3)))));

        const loudness = maxEmotion == 'happy' ? -10 :
            (maxEmotion == 'sad' ? -55 :
                (maxEmotion == 'angry' ? -45 :
                    (maxEmotion == 'netutral' ? -30 :
                        (maxEmotion == 'surprised' ? -30 :
                            (maxEmotion == 'confused' && -40)))));

        const mode = maxEmotion == 'happy' ? 0.9 :
            (maxEmotion == 'sad' ? 0.3 :
                (maxEmotion == 'angry' ? 0.3 :
                    (maxEmotion == 'netutral' ? 0.6 :
                        (maxEmotion == 'surprised' ? 0.7 :
                            (maxEmotion == 'confused' && 0.5)))));

        const tempo = maxEmotion == 'happy' ? 115 :
            (maxEmotion == 'sad' ? 80 :
                (maxEmotion == 'angry' ? 90 :
                    (maxEmotion == 'netutral' ? 100 :
                        (maxEmotion == 'surprised' ? 100 :
                            (maxEmotion == 'confused' && 80)))));

        var arrayOfFeatures = [mode, valence, energy, danceability, loudness, tempo];

        var objectOfFeatures = {
            target_mode: mode,
            max_mode: mode,
            target_valence: valence,
            max_valence: valence,
            target_energy: energy,
            max_energy: energy,
            target_danceability: danceability,
            max_danceability: danceability,
            target_loudness: loudness,
            max_loudness: loudness,
            target_tempo: tempo,
            max_tempo: tempo
        }

        const features = {
            array: arrayOfFeatures,
            object: objectOfFeatures
        }

        return features;
    }

    const fetchData = async (
        tokenSignal,
        dbArtistsSignal,
        librarySignal,
        getRecommendationsSignal,
        saveRecommendationsSignal,
        incrementPlaylistsAmountSignal,
        getPlaylistsAmountSignal
    ) => {
        const token = await SecureStore.getItemAsync('spotify_access_token');
        const refreshToken = await SecureStore.getItemAsync('spotify_refresh_token');
        const getToken = await dispatch(refreshAccessToken(token, refreshToken, tokenSignal));
        const accessToken = getToken.refreshAccessToken;
        SecureStore.setItemAsync('spotify_access_token', accessToken, { keychainAccessible: SecureStore.ALWAYS_THIS_DEVICE_ONLY });

        const id = await SecureStore.getItemAsync('user_id');
        const getArtists = await dispatch(getUserDatabaseArtists(id, dbArtistsSignal));
        const artists = getArtists.getUserDatabaseArtists;
        const features = filterFeaturesByMaxEmotion(route.params.maxMood);

        const getAmount = await dispatch(getPlaylistsAmount(id, getPlaylistsAmountSignal));
        const amount = getAmount.getPlaylistsAmount + 1;
        setPlaylistsAmount(amount);
        await dispatch(incrementPlaylistsAmount(id, incrementPlaylistsAmountSignal))

        const getLibrary = await dispatch(createLibrary(accessToken, artists, features.object, librarySignal));
        const trackIds = getLibrary.createLibrary;
        const getRec = await dispatch(getRecommendations(accessToken, trackIds, features.array, getRecommendationsSignal));
        setLength(getRec.getRecommendations.recommendations.length + 1);
        setRecommendations(getRec.getRecommendations.recommendations);
        setUris(getRec.getRecommendations.uris);
        await dispatch(saveRecommendations(id, route.params.maxMood, JSON.stringify(getRec.getRecommendations.recommendations), amount, saveRecommendationsSignal));
        setRLoading(false);
    }

    useEffect(() => {
        const tokenController = new AbortController();
        const getArtistsController = new AbortController();
        const createLibraryController = new AbortController();
        const getRecommendationsController = new AbortController();
        const saveRecommendationsController = new AbortController();
        const getPlaylistsAmountController = new AbortController();
        const incrementPlaylistsAmountController = new AbortController();
        try {
            fetchData(
                tokenController.signal,
                getArtistsController.signal,
                createLibraryController.signal,
                getRecommendationsController.signal,
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
            getRecommendationsController.abort();
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
            const getToken = await dispatch(refreshAccessToken(token, refreshToken, tokenController.signal));
            const accessToken = getToken.refreshAccessToken;
            SecureStore.setItemAsync('spotify_access_token', accessToken, { keychainAccessible: SecureStore.ALWAYS_THIS_DEVICE_ONLY });

            const getPlaylist = await dispatch(createPlaylist(accessToken, 'Your ' + route.params.maxMood + ' mood.io playlist #' + playlistsAmount, 'A playlist generated for you on mood.io to better your mood!', createPlaylistController.signal));
            const id = getPlaylist.createPlaylist.id;
            await dispatch(addTracksToPlaylist(accessToken, id, uris, addTracksController.signal));

            await dispatch(setPlaylisted(userId, playlistsAmount, setPlaylistedController.signal));
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
        <ScrollView scrollEnabled={false} nestedScrollEnabled={true} ref={scrollRef} style={ResultsStyles.scroll}>
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
                <TouchableOpacity style={{ alignSelf: 'center' }} onPress={onPressTouch}>
                    <LottieView
                        source={require('./animations/90278-arrow-down.json')}
                        autoPlay
                        loop={true}
                        style={ResultsStyles.continueLottie}
                    />
                </TouchableOpacity>
                <View style={{ height: 415 }} />
            </View>
            <View style={ResultsStyles.topContainer}>
                <Navbar page={'results'} navigation={navigation} />
            </View>
            <Text style={ResultsStyles.firstHeader}>
                Find a collection of songs below suited to better your mood!
            </Text>
            <Text style={ResultsStyles.firstSubHeader}>
                Scroll below to save this collection as a playlist to your Spotify account.
            </Text>
            <View style={{ borderBottomColor: 'grey', borderBottomWidth: 1 }} />
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }} style={{ height: height - 300, flex: 1 }} nestedScrollEnabled={true}>
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
                                source={require('./animations/8707-loading.json')}
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
                    <View style={{ alignSelf: 'center', marginTop: 10 }}>
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
    );
}

export default Results;