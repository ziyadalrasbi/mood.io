import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import { useFonts } from 'expo-font'
import UserStatsStyles from './UserStatsStyles';
import Navbar from '../../components/navbar/Navbar';
import { refreshAccessToken, getUserProfile, getTopArtistsStats, getTopTracksStats } from '../../client/src/actions/spotifyActions';
import * as SecureStore from 'expo-secure-store';
import Loading from '../../components/loading/Loading';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import * as Linking from 'expo-linking';
import playimg from '../../../assets/icons/home/play.png';
import defaultimg from '../../../assets/icons/stats/default.png';
import LottieView from 'lottie-react-native';
import { connect, useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';

function UserStats({ navigation, route }) {

    const dispatch = useDispatch();

    const FirstRoute = () => (
        <ScrollView style={UserStatsStyles.tabView} showsVerticalScrollIndicator={false}>
            <View style={UserStatsStyles.artistsRouteContainer} >
                {(rloading == false && topArtists.length > 0) ? topArtists.map((artist, index) =>
                    <View style={{ padding: 10 }} key={index}>
                        <TouchableOpacity
                            style={{
                                shadowColor: '#000',
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.5,
                                shadowRadius: 2, elevation: 5
                            }}
                            onPress={() => Linking.openURL(artist[2])}>
                            <Image
                                style={UserStatsStyles.topTrackArtistImage}
                                source={{ uri: artist[1] }}
                            />
                        </TouchableOpacity>
                        <Text style={UserStatsStyles.topArtistText}>{artist[0]}</Text>
                    </View>
                )
                    :
                    <LottieView
                        source={require('./animations/142-loading-animation.json')}
                        autoPlay
                        loop={true}
                        style={{ marginTop: 50, width: 150, height: 150, alignSelf: 'center' }}
                    />
                }
            </View>
            {topArtists.length == 0 &&
                <Text style={UserStatsStyles.noDataText}>
                    No data found for this time frame. Try a different time frame, or listen to some more
                    music on Spotify and come back at a later date to view this data!
                </Text>
            }
            <View style={{ height: 20 }} />
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
                            source={{ uri: track[2] }}
                        />
                    </TouchableOpacity>
                    <View style={UserStatsStyles.topTrackTextContainer}>
                        <Text style={UserStatsStyles.topTrackText}>{track[0]}</Text>
                        <Text style={UserStatsStyles.topTrackArtistText}>{track[1]}</Text>
                    </View>
                    <TouchableOpacity
                        style={{ marginLeft: 'auto', paddingHorizontal: 10 }}
                        onPress={() => Linking.openURL(track[3])}>
                        <Image
                            style={UserStatsStyles.playImage}
                            source={playimg}
                        />
                    </TouchableOpacity>

                </View>
            )
                :
                <LottieView
                    source={require('./animations/142-loading-animation.json')}
                    autoPlay
                    loop={true}
                    style={{ marginTop: 50, width: 150, height: 150, alignSelf: 'center' }}
                />
            }
            {topTracks.length == 0 &&
                <Text style={UserStatsStyles.noDataText}>
                    No data found for this time frame. Try a different time frame, or listen to some more
                    music on Spotify and come back at a later date to view this data!
                </Text>
            }
            <View style={{ height: 20 }} />
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

    const [loaded] = useFonts({
        InconsolataBold: require('../../../assets/fonts/Inconsolata/static/Inconsolata/Inconsolata-Bold.ttf'),
        InconsolataLight: require('../../../assets/fonts/Inconsolata/static/Inconsolata/Inconsolata-Light.ttf'),
        InconsolataMedium: require('../../../assets/fonts/Inconsolata/static/Inconsolata/Inconsolata-Medium.ttf'),
        InconsolataBlack: require('../../../assets/fonts/Inconsolata/static/Inconsolata/Inconsolata-Black.ttf')
    });

    useEffect(() => {
        const fetchData = async () => {
            const token = await SecureStore.getItemAsync('spotify_access_token');
            const refreshToken = await SecureStore.getItemAsync('spotify_refresh_token');

            const getToken = await dispatch(refreshAccessToken(token, refreshToken));
            const accessToken = getToken.refreshAccessToken;
            SecureStore.setItemAsync('spotify_access_token', accessToken, { keychainAccessible: SecureStore.ALWAYS_THIS_DEVICE_ONLY });

            const getArtists = await dispatch(getTopArtistsStats(accessToken, 'medium_term'));
            if (getArtists.getTopArtistsStats != null) {
                setTopArtists(getArtists.getTopArtistsStats);
            }
            const getTracks = await dispatch(getTopTracksStats(accessToken, 'medium_term'));
            if (getTracks.getTopTracksStats != null) {
                setTopTracks(getTracks.getTopTracksStats);
            }
        }
        fetchData().then(() => setLoading(false));
    }, [loading, dispatch])

    if (!loaded || loading) {
        return (
            <Loading page={"home"} />
        );
    }

    const changeRange = async (range, i) => {
        setRLoading(true);
        setSelectedIndex(i);

        const token = await SecureStore.getItemAsync('spotify_access_token');
        const refreshToken = await SecureStore.getItemAsync('spotify_refresh_token');
        const getToken = await dispatch(refreshAccessToken(token, refreshToken));
        const accessToken = getToken.refreshAccessToken;
        SecureStore.setItemAsync('spotify_access_token', accessToken, { keychainAccessible: SecureStore.ALWAYS_THIS_DEVICE_ONLY });

        const getArtists = await dispatch(getTopArtistsStats(accessToken, range));
        if (getArtists.getTopArtistsStats != null) {
            setTopArtists(getArtists.getTopArtistsStats);
        }

        const getTracks = await dispatch(getTopTracksStats(accessToken, range));
        if (getTracks.getTopTracksStats != null) {
            setTopTracks(getTracks.getTopTracksStats);
        }
        
        setRLoading(false);
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
                    <TouchableOpacity onPress={() => changeRange('short_term', 1)}>
                        <View style={UserStatsStyles.selectButtonContainer}>
                            <View
                                style={[UserStatsStyles.selectIcon, { backgroundColor: selectedIndex == 1 ? '#0e219c' : 'grey' }]}
                            />
                            <Text style={UserStatsStyles.selectText}>
                                Past 4 weeks
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => changeRange('medium_term', 2)}>
                        <View style={UserStatsStyles.selectButtonContainer}>
                            <View
                                style={[UserStatsStyles.selectIcon, { backgroundColor: selectedIndex == 2 ? '#0e219c' : 'grey' }]}
                            />
                            <Text style={UserStatsStyles.selectText}>
                                Past 6 months
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => changeRange('long_term', 3)}>
                        <View style={UserStatsStyles.selectButtonContainer}>
                            <View
                                style={[UserStatsStyles.selectIcon, { backgroundColor: selectedIndex == 3 ? '#0e219c' : 'grey' }]}
                            />
                            <Text style={UserStatsStyles.selectText}>
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

const mapStateToProps = (state) => {
    return {
        refreshAccessToken: state.spotifyReducer.refreshAccessToken,
        getUserProfile: state.spotifyReducer.getUserProfile,
        getTopArtistsStats: state.spotifyReducer.getTopArtistsStats,
        getTopTracksStats: state.spotifyReducer.getTopTracksStats
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    refreshAccessToken,
    getUserProfile,
    getTopArtistsStats,
    getTopTracksStats
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(UserStats);