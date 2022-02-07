import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import { useFonts } from 'expo-font'
import RecommendationsStyles from './RecommendationsStyles';
import Navbar from '../../components/navbar/Navbar';
import { getUserProfile, getUserTopTracks, getUserTopArtists, refreshAccessToken } from '../../fetch';
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

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const token = await SecureStore.getItemAsync('spotify_access_token');
    //         const refreshToken = await SecureStore.getItemAsync('spotify_refresh_token');
    //         var accessToken;
    //         await refreshAccessToken(token, refreshToken)
    //             .then(res => res.json())
    //             .then(data => {
    //                 if (data.token != "Null") {
    //                     accessToken = data.token;
    //                     SecureStore.setItemAsync('spotify_access_token', data.token, { keychainAccessible: SecureStore.ALWAYS_THIS_DEVICE_ONLY });
    //                 }
    //             })
    //             .then(() => {
    //                 getUserProfile(accessToken)
    //                     .then(res => res.json())
    //                     .then(data => {
    //                         setProfile({ name: data.profile.name, picture: data.profile.picture, followers: data.profile.followers });
    //                     })
    //                 getUserTopArtists(accessToken, 'medium_term')
    //                     .then(res => res.json())
    //                     .then(data => {
    //                         if (data != null) {
    //                             setTopArtists(data.artistNames);
    //                         }
    //                     })
    //                 getUserTopTracks(accessToken, 'medium_term')
    //                     .then(res => res.json())
    //                     .then(data => {
    //                         if (data != null) {
    //                             setTopTracks(data.topTracks);
    //                         }
    //                     })
    //             })
    //     }
    //     fetchData().then(() => setLoading(false));
    // }, [loading])

    // if (!loaded || loading) {
    //     return (
    //         <Loading page={"home"} />
    //     );
    // }

    return (
        <View style={RecommendationsStyles.scroll}>
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
                        Recent mood: happy
                    </Text>
                </View>
            </View>
            <StatusBar style="auto" />
        </View>
    );
}

export default Recommendations;