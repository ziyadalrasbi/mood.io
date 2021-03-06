import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import UserStatsStyles from './UserStatsStyles';
import Navbar from '../../components/navbar/Navbar';
import { refreshAccessToken, getTopArtistsStats, getTopTracksStats } from '../../client/src/actions/spotifyActions';
import * as SecureStore from 'expo-secure-store';
import Loading from '../../components/loading/Loading';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import * as Linking from 'expo-linking';
import playimg from '../../../assets/icons/home/play.png';
import defaultimg from '../../../assets/icons/stats/default.png';
import LottieView from 'lottie-react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Dimensions } from 'react-native';
import defaultartist from '../../../assets/defaultartist.jpg';
import defaulttrack from '../../../assets/defaulttrack.png';
const { width, height } = Dimensions.get('window');

function UserStats({ navigation, route }) {

    const dispatch = useDispatch();

    const FirstRoute = () => (
        <ScrollView style={UserStatsStyles.tabView} showsVerticalScrollIndicator={false}>
            <View style={UserStatsStyles.artistsRouteContainer} >
                {(rloading == false && topArtists.length > 0) ? topArtists.map((artist, index) =>
                    <View style={{ padding: width / 41.4 }} key={index}>
                        <TouchableOpacity
                            style={{
                                shadowColor: '#000',
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.5,
                                shadowRadius: 2, 
                                elevation: 5
                            }}
                            onPress={() => Linking.openURL(artist[2])}>
                            <Image
                                style={UserStatsStyles.topTrackArtistImage}
                                source={artist[1] != 404 ? { uri: artist[1] } : defaultartist}
                            />
                        </TouchableOpacity>
                        <Text style={UserStatsStyles.topArtistText}>{artist[0]}</Text>
                    </View>
                )
                    :
                    rloading == true ?
                        <View>
                            <LottieView
                                source={require('./animations/loading.json')}
                                autoPlay
                                loop={true}
                                style={UserStatsStyles.lottieView}
                            />
                        </View>
                        :
                        <Text style={UserStatsStyles.noDataText}>
                            No data found for this time frame. Try a different time frame, or listen to some more
                            music on Spotify and come back at a later date to view this data!
                        </Text>
                }
            </View>

            <View style={{ height: height / 44.8 }} />
        </ScrollView>
    );

    const SecondRoute = () => (
        <ScrollView style={UserStatsStyles.tabView} showsVerticalScrollIndicator={false}>
            {(rloading == false && topTracks.length > 0) ? topTracks.map((track, index) =>
                <View key={index} style={UserStatsStyles.topTracksContainer}>
                    <TouchableOpacity
                        style={{
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.5,
                            shadowRadius: 2, elevation: 5
                        }}
                        onPress={() => Linking.openURL(track[3])}>
                        <Image
                            style={UserStatsStyles.topTrackImage}
                            source={track[2] != 404 ? { uri: track[2] } : defaulttrack}
                        />
                    </TouchableOpacity>
                    <View style={UserStatsStyles.topTrackTextContainer}>
                        <Text style={UserStatsStyles.topTrackText}>{track[0]}</Text>
                        <Text style={UserStatsStyles.topTrackArtistText}>{track[1]}</Text>
                    </View>
                    <TouchableOpacity
                        style={{ marginLeft: 'auto', paddingHorizontal: width / 41.4 }}
                        onPress={() => Linking.openURL(track[3])}>
                        <Image
                            style={UserStatsStyles.playImage}
                            source={playimg}
                        />
                    </TouchableOpacity>
                </View>
            )
                :
                rloading == true ?
                    <LottieView
                        source={require('./animations/loading.json')}
                        autoPlay
                        loop={true}
                        style={UserStatsStyles.lottieView}
                    />
                    :
                    <Text style={UserStatsStyles.noDataText}>
                        No data found for this time frame. Try a different time frame, or listen to some more
                        music on Spotify and come back at a later date to view this data!
                    </Text>
            }
            <View style={{ height: height / 44.8 }} />
        </ScrollView>
    );

    const renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute,
    });

    const userProfile = useSelector(state => state.spotifyReducer.getUserProfile);

    const [loading, setLoading] = useState(true);
    const [rloading, setRLoading] = useState(false);

    const [topArtists, setTopArtists] = useState({ topArtists: [] });
    const [topTracks, setTopTracks] = useState({ topTracks: [] });

    const [index, setIndex] = useState(route.params.index);

    const [routes] = useState([
        { key: 'first', title: 'Top Artists' },
        { key: 'second', title: 'Top Tracks' },
    ]);
    const [selectedIndex, setSelectedIndex] = useState(2);

    useEffect(() => {
        const tokenController = new AbortController();
        const getArtistsController = new AbortController();
        const getTracksController = new AbortController();

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

                const getArtists = await dispatch(getTopArtistsStats(accessToken, 'medium_term', getArtistsController.signal));
                if (getArtists.getTopArtistsStats != null) {
                    setTopArtists(getArtists.getTopArtistsStats);
                }
                const getTracks = await dispatch(getTopTracksStats(accessToken, 'medium_term', getTracksController.signal));
                if (getTracks.getTopTracksStats != null) {
                    setTopTracks(getTracks.getTopTracksStats.topTracks);
                }
            } catch (error) {
                console.log('Error getting user stats, please try again. ' + error);
            }
        }
        fetchData().then(() => setLoading(false));

        return () => {
            tokenController.abort();
            getArtistsController.abort();
            getTracksController.abort();
        }
    }, [loading, dispatch])

    if (loading) {
        return (
            <Loading page={"stats"} />
        );
    }

    const changeRange = async (range, i) => {
        const tokenController = new AbortController();
        const getArtistsController = new AbortController();
        const getTracksController = new AbortController();
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

            const getArtists = await dispatch(getTopArtistsStats(accessToken, range, getArtistsController.signal));
            if (getArtists.getTopArtistsStats != null) {
                setTopArtists(getArtists.getTopArtistsStats);
            }

            const getTracks = await dispatch(getTopTracksStats(accessToken, range, getTracksController.signal));
            if (getTracks.getTopTracksStats != null) {
                setTopTracks(getTracks.getTopTracksStats.topTracks);
            }

            setRLoading(false);

        } catch (error) {
            console.log('Error changing range, please try again. ' + error);
        }
        tokenController.abort();
        getArtistsController.abort();
        getTracksController.abort();
    }

    const renderTabBar = props => {
        return (
            <TabBar
                style={{ backgroundColor: 'transparent' }}
                {...props}
                renderLabel={({ focused, route }) => {
                    return (
                        <Text style={[UserStatsStyles.tabBarText, { color: focused ? 'white' : 'grey' }]}>
                            {route.title}
                        </Text>
                    );
                }}
            />
        );
    };

    return (
        <View style={UserStatsStyles.scroll}>
            <View style={UserStatsStyles.topContainer}>
                <Navbar page={'stats'} navigation={navigation} />
            </View>
            <View style={UserStatsStyles.mainContainer}>
                <View style={UserStatsStyles.firstContainer}>
                    <Image
                        style={UserStatsStyles.profilePicture}
                        source={userProfile.profile.picture != null ? { uri: userProfile.profile.picture } : defaultimg}
                    />
                    <Text style={UserStatsStyles.firstHeader}>
                        {userProfile.profile.name}
                    </Text>
                    <Text style={UserStatsStyles.firstSubHeader}>
                        Followers: {userProfile.profile.followers}
                    </Text>
                </View>
                <View style={UserStatsStyles.selectContainer}>
                    <TouchableOpacity
                        style={[UserStatsStyles.opacityContainer, { backgroundColor: selectedIndex == 1 ? '#1d2ea1' : 'transparent' }]}
                        onPress={() => changeRange('short_term', 1)}
                        disabled={selectedIndex == 1 ? true : false}
                    >
                        <Text style={[UserStatsStyles.selectText, { color: selectedIndex == 1 ? 'white' : 'grey' }]}>
                            4 weeks
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[UserStatsStyles.opacityContainer, { backgroundColor: selectedIndex == 2 ? '#1d2ea1' : 'transparent' }]}
                        onPress={() => changeRange('medium_term', 2)}
                        disabled={selectedIndex == 2 ? true : false}
                    >
                        <View style={UserStatsStyles.selectButtonContainer}>
                            <Text style={[UserStatsStyles.selectText, { color: selectedIndex == 2 ? 'white' : 'grey' }]}>
                                6 months
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[UserStatsStyles.opacityContainer, { backgroundColor: selectedIndex == 3 ? '#1d2ea1' : 'transparent' }]}
                        onPress={() => changeRange('long_term', 3)}
                        disabled={selectedIndex == 3 ? true : false}
                    >
                        <View style={UserStatsStyles.selectButtonContainer}>
                            <Text style={[UserStatsStyles.selectText, { color: selectedIndex == 3 ? 'white' : 'grey' }]}>
                                All time
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: '100%' }}
                style={UserStatsStyles.tabContainer}
                renderTabBar={renderTabBar}
            />
            <StatusBar style="auto" />
        </View>
    );
}

export default UserStats;