import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState } from 'react';
import { Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import { useFonts } from 'expo-font'
import ResultsStyles from './ResultsStyles';
import Navbar from '../../components/navbar/Navbar';
import MoodGraph from '../../components/moodgraph/MoodGraph';
import { LinearGradient } from 'expo-linear-gradient';
import { Dimensions } from 'react-native';
import HomeStyles from '../home/HomeStyles';
import * as SecureStore from 'expo-secure-store';
import * as Linking from 'expo-linking';
import Loading from '../../components/loading/Loading';
import {
    getRecommendations,
    getUserDatabaseGenres,
    getUserId,
    refreshAccessToken,
    saveRecommendations,
    saveUserRating,
    getAudioFeatures,
    createPlaylist,
    addTracksToPlaylist
} from '../../fetch';
import StarRating from 'react-native-star-rating';
const { width } = Dimensions.get('window');



function Results({ navigation, route }) {

    const getMood = (maxMood) => {
        if (maxMood) {
            if (maxMood == 'happy') {
                const mood = {
                    moodHeader: 'that you are feeling happy. That makes us happy too!',
                    moodDescription: 'Be sure to spread the happiness with others around you :)'
                }
                return mood;
            }
            if (maxMood == 'sad') {
                const mood = {
                    moodHeader: 'that you are feeling down. We\'re sorry to hear that.',
                    moodDescription: 'It will get better, keep your head up high!'
                }
                return mood;
            }
            if (maxMood == 'angry') {
                const mood = {
                    moodHeader: 'that you seem tempered and full of energy!',
                    moodDescription: 'Try to harness your thoughts and energy into something positive!'
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
                    moodHeader: 'that something may be putting you off. Let\'s change that!',
                    moodDescription: 'Engage in activities that put you in your comfort zone.'
                }
                return mood;
            }
            if (maxMood == 'surprised') {
                const mood = {
                    moodHeader: 'that somthing may have caught you off guard recently!',
                    moodDescription: 'There may be something that is surprising you. We hope it is something positive!'
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

    const [maxProp, setMaxProp] = useState({ maxProp: "" });
    const [maxValue, setMaxValue] = useState({ maxValue: "" });

    const [moodHeader, setMoodHeader] = useState({ moodHeader: "" });
    const [moodDescription, setMoodDescription] = useState({ moodDescription: "" });

    const [moods, setMoods] = useState({ moods: [] });
    const [values, setValues] = useState({ values: [] });
    const [averages, setAverages] = useState({ averages: [] });

    const [recommendations, setRecommendations] = useState([]);
    const [length, setLength] = useState(0);
    const [uris, setUris] = useState([]);

    const [count, setCount] = useState(0);
    const numRef = useRef(0);
    const [detectedMood, setDetectedMood] = useState(getMood(route.params.maxMood));

    const [loading, setLoading] = useState(true);
    const [rloading, setRLoading] = useState(true);
    const [ploading, setPLoading] = useState(false);

    const [saving, setSaving] = useState(false);
    const [complete, setComplete] = useState(false);

    const createArrayOfFeatures = (emotion) => {
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

        var features = [mode, valence, energy, danceability, loudness];

        return features;
    }


    const filterFeaturesByMaxEmotion = async (emotion) => {
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

        var features = {
            target_mode: mode,
            max_mode: mode,
            target_valence: valence,
            max_valence: valence,
            target_energy: energy,
            max_energy: energy,
            target_danceability: danceability,
            max_danceability: danceability,
            target_loudness: loudness,
            max_loudness: loudness
        }



        return features;
    }
    const fetchData = async () => {
        const token = await SecureStore.getItemAsync('spotify_access_token');
        const refreshToken = await SecureStore.getItemAsync('spotify_refresh_token');
        var accessToken;
        try {
            await refreshAccessToken(token, refreshToken)
                .then(res => res.json())
                .then(data => {
                    if (data.token != "Null") {
                        accessToken = data.token;
                        SecureStore.setItemAsync('spotify_access_token', data.token, { keychainAccessible: SecureStore.ALWAYS_THIS_DEVICE_ONLY });
                    }
                })
                .then(() => {
                    getUserId(accessToken)
                        .then(res => res.json())
                        .then(data => {
                            const id = data.id;
                            getUserDatabaseGenres(id)
                                .then(res => res.json())
                                .then((data) => {
                                    const artists = data.topGenres;
                                    const features = filterFeaturesByMaxEmotion(route.params.maxMood);
                                    getRecommendations(accessToken, artists, features)
                                        .then(res => res.json())
                                        .then((data) => {
                                            const features2 = createArrayOfFeatures(route.params.maxMood);
                                            console.log(features2);
                                            getAudioFeatures(accessToken, data.trackIds, features2)
                                                .then(res => res.json())
                                                .then((data) => {
                                                    setLength(data.recommendations.length + 1);
                                                    setRecommendations(data.recommendations);
                                                    setUris(data.uris);
                                                    setRLoading(false);
                                                    saveRecommendations(id, route.params.maxMood, JSON.stringify(data.recommendations));

                                                })

                                        })
                                })
                        })
                })
        } catch (error) {
            console.log(error);
            throw error;
        }

    }



    useEffect(() => {
        fetchData();
        setMoodHeader({ moodHeader: detectedMood.moodHeader });
        setMoodDescription({ moodDescription: detectedMood.moodDescription });
        setLoading(false);
    }, [])

    const onStarRatingPress = async (rating) => {
        setCount(rating);
        await saveUserRating(rating);
    }

    if (loading || rloading) {
        return (
            <Loading page={"results"} />
        );
    }

    const savePlaylist = async () => {
        setPLoading(true);
        setSaving(true);
        const token = await SecureStore.getItemAsync('spotify_access_token');
        await createPlaylist(token, 'Your ' + route.params.maxMood + ' mood.io playlist #' + length, 'A playlist generated for you on mood.io to better your mood!')
            .then(res => res.json())
            .then((data) => {
                const id = data.playlist.id;
                addTracksToPlaylist(token, id, uris)
                    .then(res => res.json())
                    .then((data) => {
                        console.log(data);
                        setSaving(false);
                        setComplete(true);
                    })
            })
    }

    return (
        <ScrollView style={ResultsStyles.scroll}>
            <View style={ResultsStyles.topContainer}>
                <Navbar page={'results'} navigation={navigation} />
            </View>
            <View style={ResultsStyles.mainContainer}>
                <Text style={ResultsStyles.welcome}>
                    Results
                </Text>
                <Text style={ResultsStyles.subWelcome}>
                    Your mood analysis can be found below!
                </Text>

                <View style={ResultsStyles.firstContainer}>
                    <Text style={ResultsStyles.firstHeader}>
                        Your result analysis showed {moodHeader.moodHeader}
                    </Text>
                    <Text style={ResultsStyles.firstSubHeader}>
                        {moodDescription.moodDescription}
                    </Text>
                    {<MoodGraph data={route.params.averages} />}
                </View>
                <Text style={ResultsStyles.secondHeader}>
                    Find a collection of songs below suited to better your mood!
                </Text>
                <ScrollView style={ResultsStyles.recommendationsContainer} showsHorizontalScrollIndicator={false} horizontal={true}>
                    {!rloading && recommendations.length > 0 && recommendations.map((track, index) =>
                        <View key={index}>
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
                            <Text style={ResultsStyles.trackText}>{track[0]}</Text>
                            <Text style={ResultsStyles.trackArtistText}>by {track[1]}</Text>
                        </View>
                    )}
                </ScrollView>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={ResultsStyles.saveText}>
                        To save this collection of songs as a playlist on your Spotify Profile,
                        press this button!
                    </Text>
                    {ploading == false &&
                        <Button
                            style={ResultsStyles.saveButton}
                            mode="contained"
                            labelStyle={ResultsStyles.saveButtonText}
                            onPress={() => savePlaylist()}
                        >
                            Save playlist
                        </Button>
                    }
                    {saving == true &&
                        <Text style={[ResultsStyles.rateText, {marginLeft: 20}]}>
                            Saving playlist...
                        </Text>
                    }
                    {complete == true &&
                        <Text style={[ResultsStyles.rateText, {marginLeft: 20}]}>
                            Playlist saved!
                        </Text>
                    }
                </View>
                <View style={{alignSelf:'center', marginTop: 10}}>
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
                </View>

                <View style={{ height: 40 }} />
                <StatusBar style="auto" />
            </View>
        </ScrollView>
    );
}

export default Results;