import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Text, View, Image, ScrollView, TouchableOpacity, Nest } from 'react-native';
import { Button } from 'react-native-paper';
import { useFonts } from 'expo-font'
import RecommendationsStyles from './RecommendationsStyles';
import Navbar from '../../components/navbar/Navbar';
import { getRecentMood, getPreviousRecommendations } from '../../client/src/actions/dbActions';
import * as SecureStore from 'expo-secure-store';
import Loading from '../../components/loading/Loading';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import * as Linking from 'expo-linking';
import playimg from '../../../assets/icons/home/play.png';
import defaultimg from '../../../assets/icons/stats/default.png';
import { connect, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

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

    useEffect(() => {
        const getRecommendationsController = new AbortController();

        const fetchData = async () => {
            try {
                const userId = await SecureStore.getItemAsync('user_id');
                const getMood = await dispatch(getRecentMood(userId, getRecommendationsController.signal));
                const getRecommendations = await dispatch(getPreviousRecommendations(userId));
                setRecentMood({ recentMood: getMood.getRecentMood });
                setRecommendations(getRecommendations.getPreviousRecommendations);
                console.log(getRecommendations.getPreviousRecommendations);
            } catch (error) {
                console.log('Error aborting recommendations, please try again. ' + error);
            }

        }

        fetchData().then(() => setLoading(false));

        return () => {
            getRecommendationsController.abort();
        }

    }, [loading, dispatch])

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
                        {recommendations.length > 0 &&
                            <Text style={RecommendationsStyles.firstSubHeader}>
                                Recent mood: {recentMood.recentMood}
                            </Text>
                        }
                    </View>

                    {recommendations.length > 0 && recommendations.map((recommendation, index) =>
                        <View key={index} style={[RecommendationsStyles.topTracksContainer, { borderWidth: 1, borderColor: 'grey', backgroundColor: '#0d324d', }]}>
                            <TouchableOpacity style={{
                                width: '100%', backgroundColor: '#09263b', padding: 10, borderBottomWidth: 1, borderBottomColor: 'grey', shadowColor: '#000',
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.5,
                                shadowRadius: 2, elevation: 5
                            }} onPress={() => toggleHide(index)}>
                                <Text style={RecommendationsStyles.firstHeader}>
                                    Date: {convertTimeToDate(recommendation.time)}
                                </Text>
                                <Text style={RecommendationsStyles.firstSubHeader}>
                                    Mood: {recommendation.mood}
                                </Text>
                                {recommendation.playlisted == true ?
                                    <Text style={RecommendationsStyles.firstSubHeader}>
                                        SAVED
                                    </Text>
                                    :
                                    <Text style={RecommendationsStyles.firstSubHeader}>
                                        Save as playlist
                                    </Text>
                                }
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
