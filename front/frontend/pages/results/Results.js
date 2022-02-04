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
import { getRecommendations, getUserDatabaseGenres, getUserId, refreshAccessToken, saveUserRating } from '../../fetch';
import StarRating from 'react-native-star-rating';
const { width } = Dimensions.get('window');



function Results({ navigation, route }) {

    const [maxProp, setMaxProp] = useState({ maxProp: "" });
    const [maxValue, setMaxValue] = useState({ maxValue: "" });

    const [moodHeader, setMoodHeader] = useState({ moodHeader: "" });
    const [moodDescription, setMoodDescription] = useState({ moodDescription: "" });

    const [moods, setMoods] = useState({ moods: [] });
    const [values, setValues] = useState({ values: [] });
    const [averages, setAverages] = useState({ averages: [] });

    const [recommendations, setRecommendations] = useState([]);

    const [count, setCount] = useState(0);
    const numRef = useRef(0);

    const [loading, setLoading] = useState(true);
    const [rloading, setRLoading] = useState(true);

    useEffect(() => {
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
                                getUserDatabaseGenres(data.id)
                                    .then(res => res.json())
                                    .then((data) => {
                                        const artists = data.topGenres;
                                        getRecommendations(accessToken, artists)
                                            .then(res => res.json())
                                            .then((data) => {
                                                setRecommendations(data.recommendations);
                                                setRLoading(false);
                                            })
                                    })
                            })
                    })
            } catch (error) {
                console.log(error);
                throw error;
            }

        }
        const getMood = async () => {
            if (route.params.results != null) {
                var jsonText = JSON.stringify(route.params.results);
                var data = JSON.parse(jsonText);
                var getValues = [];
                var getMoods = [];
                var tempMax = 0;
                var tempProp;
                for (var prop in route.params.results) {
                    var value = data[prop];
                    getValues.push(value);
                    getMoods.push(prop);
                    if (value > tempMax) {
                        tempMax = value;
                        tempProp = prop;
                    }
                }
                setMaxProp({ maxProp: tempProp });
                setMaxValue({ maxValue: tempMax });
                setValues({ values: getValues });
                setMoods({ moods: getMoods });

                if (values.values.length > 1) {
                    var tempAverages = [];
                    for (var i = 0; i < values.values.length; i++) {
                        const getAverages = {
                            name: moods.moods[i],
                            percentage: values.values[i],
                            color: moods.moods[i] === 'happy' ? 'yellow' : moods.moods[i] === 'sad' ? 'grey' : moods.moods[i] === 'angry' ? 'red' :
                                moods.moods[i] === 'fearful' ? 'blue' : moods.moods[i] === 'disgusted' ? 'purple' : moods.moods[i] === 'surprised' ? 'orange' : 'black',
                            legendFontColor: 'white',
                            legendFontSize: width / 29.5714286,
                        };
                        tempAverages.push(getAverages);
                    }
                    setAverages({ averages: tempAverages });
                }

                if (maxValue.maxValue != "surprised" && maxProp.maxProp != "") {
                    if (maxProp.maxProp == 'happy') {
                        setMoodHeader({ moodHeader: 'that you are feeling happy. that makes us happy too!' });
                        setMoodDescription({ moodDescription: 'be sure to spread the happiness with others around you :)' });
                    }
                    if (maxProp.maxProp == 'sad') {
                        setMoodHeader({ moodHeader: 'that you are feeling down. we\'re sorry to hear that.' });
                        setMoodDescription({ moodDescription: 'it will get better, keep your head up high!' })
                    }
                    if (maxProp.maxProp == 'angry') {
                        setMoodHeader({ moodHeader: 'that you seem tempered and fully of energy!' });
                        setMoodDescription({ moodDescription: 'try to harness your thoughts and energy into something positive!' });
                    }
                    if (maxProp.maxProp == 'fearful') {
                        setMoodHeader({ moodHeader: 'that you seem fearful. stay safe!' });
                        setMoodDescription({ moodDescription: 'surround yourself around people that make you feel safe.' });
                    }
                    if (maxProp.maxProp == 'disgusted') {
                        setMoodHeader({ moodHeader: 'that something may be putting you off. let\'s change that!' });
                        setMoodDescription({ moodDescription: 'engage in activities that put you in your comfort zone.' });
                    }
                    if (maxProp.maxProp == 'surprised') {
                        setMoodHeader({ moodHeader: 'that somthing may have caught you off guard recently!' });
                        setMoodDescription({ moodDescription: 'there may be something that is surprising you. we hope it is something positive!' });
                    }
                    if (maxProp.maxProp == 'neutral') {
                        setMoodHeader({ moodHeader: 'that everything seems normal!' })
                        setMoodDescription({ moodDescription: 'being in a neutral state of mind is always good!' });
                    }
                }
            }
        }

        fetchData();
        getMood();
        setLoading(false);
    }, [loading, rloading])

    const onStarRatingPress = async (rating) => {
        setCount(rating);
        await saveUserRating(rating);
    }

    if (loading || rloading) {
        return (
            <Loading page={"results"} />
        );
    }

    return (
        <ScrollView style={ResultsStyles.scroll}>
            <View style={ResultsStyles.topContainer}>
                <Navbar page={'results'} navigation={navigation} />
            </View>
            <View style={ResultsStyles.mainContainer}>
                <Text style={ResultsStyles.welcome}>
                    results
                </Text>
                <Text style={ResultsStyles.subWelcome}>
                    your mood analysis can be found below!
                </Text>

                <View style={ResultsStyles.firstContainer}>
                    <Text style={ResultsStyles.firstHeader}>
                        your result analysis showed {maxProp.maxProp != "" && moodHeader.moodHeader}
                    </Text>
                    <Text style={ResultsStyles.firstSubHeader}>
                        {maxProp.maxProp != "" && moodDescription.moodDescription}
                    </Text>
                    {!loading && !rloading && <MoodGraph data={averages.averages} />}
                </View>
                <ScrollView style={ResultsStyles.recommendationsContainer} showsHorizontalScrollIndicator={false} horizontal={true}>
                    {recommendations.length > 0 && recommendations.map((track, index) =>
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
                <Text style={{ fontFamily: 'MontserratBold', fontSize: 11, display: count > 0 ? 'none' : 'flex', marginBottom: 10 }}>
                    how would you rate the accuracy of this recommendation?
                </Text>
                <View style={{ display: count > 0 ? 'none' : 'flex' }}>

                    <StarRating
                        disabled={false}
                        maxStars={5}
                        rating={count}
                        selectedStar={(rating) => onStarRatingPress(rating)}
                        starSize={30}
                        fullStarColor='gold'
                    />
                </View>
                <Text style={{ fontFamily: 'MontserratBold', fontSize: 11, display: count > 0 ? 'flex' : 'none' }}>
                    thank you! ⭐
                </Text>
                <View style={{ height: 30 }} />
                <StatusBar style="auto" />
            </View>
        </ScrollView>
    );
}

export default Results;