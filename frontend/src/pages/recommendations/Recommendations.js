import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Text, View, Image, ScrollView, TouchableOpacity, Nest } from 'react-native';
import { Button } from 'react-native-paper';
import { useFonts } from 'expo-font'
import RecommendationsStyles from './RecommendationsStyles';
import Navbar from '../../components/navbar/Navbar';
import { getRecentMood, getPreviousRecommendations } from '../../fetch';
import * as SecureStore from 'expo-secure-store';
import Loading from '../../components/loading/Loading';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import * as Linking from 'expo-linking';
import playimg from '../../../assets/icons/home/play.png';
import defaultimg from '../../../assets/icons/stats/default.png';

function Recommendations({ navigation, route }) {

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

    useEffect(() => {
        const fetchData = async () => {
            const userId = await SecureStore.getItemAsync('user_id');
            await getRecentMood(userId)
                .then(res => res.json())
                .then(data => {
                    setRecentMood({ recentMood: data.recentMood });
                })
            await getPreviousRecommendations(userId)
                .then(res => res.json())
                .then(data => {
                    setRecommendations(data.recommendations);
                })

        }
        fetchData().then(() => setLoading(false));
    }, [loading])

    if (!loaded || loading) {
        return (
            <Loading page={"home"} />
        );
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
    return (

        <View style={RecommendationsStyles.scroll}>
            <ScrollView style={RecommendationsStyles.tabView} showsVerticalScrollIndicator={false}>
                <View style={RecommendationsStyles.topContainer}>
                    <Navbar page={'recommendations'} navigation={navigation} />
                </View>
                <View style={RecommendationsStyles.mainContainer}>
                    <View style={RecommendationsStyles.firstContainer}>
                        <Text style={RecommendationsStyles.firstSubHeader}>
                            Find your recent recommendations below!
                        </Text>
                        <Text style={RecommendationsStyles.firstSubHeader}>
                            Recommendations are saved for 4 weeks.
                        </Text>
                        <Text style={RecommendationsStyles.firstSubHeader}>
                            Recent mood: {recentMood.recentMood}
                        </Text>
                    </View>

                    {recommendations.length > 0 && recommendations.map((recommendation, index) =>
                        <View key={index} style={RecommendationsStyles.topTracksContainer}>
                            <TouchableOpacity style={{ width: '100%' }} onPress={() => toggleHide(index)}>
                                <Text style={RecommendationsStyles.firstHeader}>
                                    Recommendation from date {convertTimeToDate(recommendation.time)}
                                </Text>
                                <Text style={RecommendationsStyles.firstHeader}>
                                    Recommendation mood: {recommendation.mood}
                                </Text>
                            </TouchableOpacity>
                            {!!toggle[index] &&
                                <View>
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
                    <View style={{ height: 400 }} />
                </View>
                <StatusBar style="auto" />
            </ScrollView >
        </View>

    );
}

export default Recommendations;