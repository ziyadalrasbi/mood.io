import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, useCallback } from 'react';
import { Text, View, Image, ScrollView, TouchableOpacity, RefreshControl, BackHandler } from 'react-native';
import { Button } from 'react-native-paper';
import HomeStyles from './HomeStyles';
import * as SecureStore from 'expo-secure-store';
import Navbar from '../../components/navbar/Navbar';
import HabitsGraph from '../../components/habitsgraph/HabitsGraph';
import * as Linking from 'expo-linking';
import GenreModal from '../../components/genremodal/GenreModal';
import { LinearGradient } from 'expo-linear-gradient';
import Loading from '../../components/loading/Loading';
import { getTopArtistsHome, getName, getTopTracksHome, getListeningHabitsHome, refreshAccessToken } from '../../client/src/actions/spotifyActions';
import { getUserDatabaseArtists, getPreviousRecommendations, getMoodCount } from '../../client/src/actions/dbActions';
import { useDispatch } from 'react-redux';
import nextimg from '../../../assets/icons/home/next.png'
import playimg from '../../../assets/icons/home/play.png';
import TopMoodsGraph from '../../components/topmoodsgraph/TopMoodsGraph';

function Home({ navigation }) {

  const [newUser, setNewUser] = useState({ newUser: false });

  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const [name, setName] = useState("");

  const [topArtists, setTopArtists] = useState({ topArtists: [] });
  const [topTracks, setTopTracks] = useState({ topTracks: [] });

  const [trackIds, setTrackIds] = useState({ trackIds: [] });
  const [habits, setHabits] = useState([]);

  const [moods, setMoods] = useState([]);
  const [moodsTotal, setMoodsTotal] = useState(0);

  const [recommendations, setRecommendations] = useState({ recommendations: [] });

  const [refreshing, setRefreshing] = useState(false);

  function isArrayInArray(arr, item) {
    var item_as_string = JSON.stringify(item);
    var contains = arr.some(function (ele) {
      return JSON.stringify(ele) === item_as_string;
    });
    return contains;
  }

  useEffect(() => {
    const getArtistsController = new AbortController();
    const getUserNameController = new AbortController();
    const getTracksController = new AbortController();
    const getDbArtistsController = new AbortController();
    const getRecommendationsController = new AbortController();
    const getHabitsController = new AbortController();
    const getMoodsController = new AbortController();
    const tokenController = new AbortController();

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
        const userId = await SecureStore.getItemAsync('user_id');

        const getMoods = await dispatch(getMoodCount(userId, getMoodsController.signal));
        const total = getMoods.getMoodCount.total;
        const getArtists = await dispatch(getTopArtistsHome(accessToken, getArtistsController.signal));
        const getUserName = await dispatch(getName(accessToken, getUserNameController.signal));
        const getTracks = await dispatch(getTopTracksHome(accessToken, getTracksController.signal));
        const getDbArtists = await dispatch(getUserDatabaseArtists(userId, getDbArtistsController.signal));
        const getRecommendations = await dispatch(getPreviousRecommendations(userId, getRecommendationsController.signal));
        const amount = getTracks.getTopTracksHome.trackIds.length;
        const getHabits = await dispatch(getListeningHabitsHome(accessToken, getTracks.getTopTracksHome.trackIds, amount, getHabitsController.signal));

        if (total > 0) setMoods(getMoods.getMoodCount.moods);
        setMoodsTotal(total);
        setTopArtists(getArtists.getTopArtistsHome);
        setName(getUserName.getName);
        setTopTracks(getTracks.getTopTracksHome.topTracks);
        setTrackIds(getTracks.getTopTracksHome.trackIds);
        setHabits(getHabits.getListeningHabitsHome);

        if (getDbArtists.getUserDatabaseArtists.length == 0) {
          setNewUser({ newUser: true });
        }

        var recommendation = [];

        for (var i = 0; i < getRecommendations.getPreviousRecommendations.length && recommendation.length < 6; i++) {
          const current = getRecommendations.getPreviousRecommendations[i].tracks[0];
          if (!isArrayInArray(recommendation, current) || getRecommendations.getPreviousRecommendations.length == 1) {
            recommendation.push(current);
          }
        }

        setRecommendations(recommendation);
      } catch (error) {
        console.log('Error aborting' + error);
      }
    }

    fetchData().then(() => {
      setLoading(false)
    }).catch((error) => {
      console.log('Error fetching home data, please try again. \n' + error);
      throw error;
    });

    return () => {
      tokenController.abort();
      getMoodsController.abort();
      getArtistsController.abort();
      getUserNameController.abort();
      getTracksController.abort();
      getDbArtistsController.abort();
      getRecommendationsController.abort();
      getHabitsController.abort();
    };

  }, [dispatch]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    const tokenController = new AbortController();
    const getArtistsController = new AbortController();
    const getUserNameController = new AbortController();
    const getTracksController = new AbortController();
    const getDbArtistsController = new AbortController();
    const getRecommendationsController = new AbortController();
    const getHabitsController = new AbortController();
    const getMoodsController = new AbortController();
    try {
      const userId = await SecureStore.getItemAsync('user_id');

      const token = await SecureStore.getItemAsync('spotify_access_token');
      const refreshToken = await SecureStore.getItemAsync('spotify_refresh_token');
      const tokenExpiry = await SecureStore.getItemAsync('token_expiry');
      const getToken = await dispatch(refreshAccessToken(token, refreshToken, tokenExpiry, tokenController.signal));
      const accessToken = getToken.refreshAccessToken.token;
      const time = getToken.refreshAccessToken.time;
      SecureStore.setItemAsync('spotify_access_token', accessToken, { keychainAccessible: SecureStore.ALWAYS_THIS_DEVICE_ONLY });
      SecureStore.setItemAsync('token_expiry', time, { keychainAccessible: SecureStore.ALWAYS_THIS_DEVICE_ONLY });

      const getMoods = await dispatch(getMoodCount(userId, getMoodsController.signal));
      const total = getMoods.getMoodCount.total;
      const getArtists = await dispatch(getTopArtistsHome(accessToken, getArtistsController.signal));
      const getUserName = await dispatch(getName(accessToken, getUserNameController.signal));
      const getTracks = await dispatch(getTopTracksHome(accessToken, getTracksController.signal));
      const getDbArtists = await dispatch(getUserDatabaseArtists(userId, getDbArtistsController.signal));
      const getRecommendations = await dispatch(getPreviousRecommendations(userId, getRecommendationsController.signal));
      const amount = getTracks.getTopTracksHome.trackIds.length;
      const getHabits = await dispatch(getListeningHabitsHome(accessToken, getTracks.getTopTracksHome.trackIds, amount, getHabitsController.signal));

      if (total > 0) setMoods(getMoods.getMoodCount.moods);
      setMoodsTotal(total);
      setTopArtists(getArtists.getTopArtistsHome);
      setName(getUserName.getName);
      setTopTracks(getTracks.getTopTracksHome.topTracks);
      setTrackIds(getTracks.getTopTracksHome.trackIds);
      setHabits(getHabits.getListeningHabitsHome);

      if (getDbArtists.getUserDatabaseArtists.length == 0) {
        setNewUser({ newUser: true });
      }

      var recommendation = [];

      for (var i = 0; i < getRecommendations.getPreviousRecommendations.length && recommendation.length < 6; i++) {
        const current = getRecommendations.getPreviousRecommendations[i].tracks[0];
        if (!isArrayInArray(recommendation, current) || getRecommendations.getPreviousRecommendations.length == 1) {
          recommendation.push(current);
        }
      }

      setRecommendations(recommendation);
    } catch (error) {
      console.log('Error aborting' + error);
    }

    getMoodsController.abort();
    tokenController.abort();
    getArtistsController.abort();
    getUserNameController.abort();
    getTracksController.abort();
    getDbArtistsController.abort();
    getRecommendationsController.abort();
    getHabitsController.abort();
    setRefreshing(false);

  }, [refreshing]);

  if (loading) {
    return (
      <Loading page={"home"} />
    )
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} style={HomeStyles.scroll} showsVerticalScrollIndicator={false}>
        <LinearGradient
          // Background Linear Gradient
          colors={['#13547a', '#074366']}
          style={HomeStyles.gradientContainer}
        />
        <View style={HomeStyles.mainContainer}>

          <View style={HomeStyles.topContainer}>
            <Navbar navigation={navigation} name={name} page={'home'} />
          </View>
          <View style={HomeStyles.firstContainer}>
            <Text style={HomeStyles.firstHeader}>
              Discover Music
            </Text>
            <Button
              style={HomeStyles.startButton}
              uppercase={false}
              mode="contained"
              labelStyle={HomeStyles.mainFont}
              onPress={() => navigation.navigate('UploadOptions')}
            >
              Get started
            </Button>
          </View>
          <View style={HomeStyles.secondContainer}>
            <View style={HomeStyles.headerContainer}>
              <Text style={HomeStyles.secondHeader}>
                Recent Recommendations
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Recommendations', { index: 0 })}>
                <View style={HomeStyles.allContainer}>
                  <Text style={HomeStyles.thirdHeader}>
                    All
                  </Text>
                  <Image
                    style={HomeStyles.next}
                    source={nextimg}
                  />
                </View>
              </TouchableOpacity>
            </View>
            <ScrollView style={HomeStyles.topArtistsContainer} showsHorizontalScrollIndicator={false} horizontal={true}>
              {recommendations.length > 0 && recommendations.map((track, index) =>
                <View key={index}>
                  <TouchableOpacity
                    style={{
                      shadowColor: '#000',
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.5,
                      shadowRadius: 2, elevation: 5
                    }}
                    onPress={() => Linking.openURL(track[3])}>
                    <Image
                      style={HomeStyles.recommendationImage}
                      source={{ uri: track[2] }}
                    />
                  </TouchableOpacity>
                  <View style={HomeStyles.topTrackTextContainer}>
                    <Text style={HomeStyles.topRecommendationTrackText}>{track[0]}</Text>
                    <Text style={HomeStyles.topRecommendationTrackArtistText}>{track[1]}</Text>
                  </View>
                </View>
              )}
            </ScrollView>
            {recommendations.length == 0 &&
              <Text style={HomeStyles.noDataText}>
                No recommendations yet. To get recommendations, press the "get started" button above!
              </Text>}
          </View>
          <View style={HomeStyles.thirdContainer}>
            <View style={HomeStyles.headerContainer}>
              <Text style={HomeStyles.thirdHeader}>
                Your Top Artists
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate('UserStats', { index: 0 })}>
                <View style={HomeStyles.allContainer}>
                  <Text style={HomeStyles.thirdHeader}>
                    All
                  </Text>
                  <Image
                    style={HomeStyles.next}
                    source={nextimg}
                  />
                </View>
              </TouchableOpacity>
            </View>
            <ScrollView style={HomeStyles.topArtistsContainer} showsHorizontalScrollIndicator={false} horizontal={true}>
              {topArtists.length > 0 && topArtists.map((artist, index) =>
                <View key={index}>
                  <TouchableOpacity
                    style={{
                      shadowColor: '#000',
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.5,
                      shadowRadius: 2, elevation: 5
                    }}
                    onPress={() => Linking.openURL(artist[2])}>
                    <Image
                      style={HomeStyles.topTrackArtistImage}
                      source={{ uri: artist[1] }}
                    />
                  </TouchableOpacity>
                  <Text style={HomeStyles.topArtistText}>{artist[0]}</Text>
                </View>
              )}
            </ScrollView>
            {topArtists.length == 0 &&
              <Text style={HomeStyles.noDataText}>
                It seems like you haven't listened to much music on your Spotify account. Listen to some more music
                and come back at a later date to view this data!
              </Text>}
          </View>
          <View style={HomeStyles.fourthContainer}>
            <View style={HomeStyles.headerContainer}>
              <Text style={HomeStyles.fourthHeader}>
                Your Top Tracks
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate('UserStats', { index: 1 })}>
                <View style={HomeStyles.allContainer}>
                  <Text style={HomeStyles.thirdHeader}>
                    All
                  </Text>
                  <Image
                    style={HomeStyles.next}
                    source={nextimg}
                  />
                </View>
              </TouchableOpacity>

            </View>
            {topTracks.length > 0 && topTracks.map((track, index) =>
              <View key={index}>
                <View style={HomeStyles.topTracksContainer}>
                  <TouchableOpacity
                    style={{
                      shadowColor: '#000',
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.5,
                      shadowRadius: 2, elevation: 5
                    }}
                    onPress={() => Linking.openURL(track[3])}>
                    <Image
                      style={HomeStyles.topTrackImage}
                      source={{ uri: track[2] }}
                    />
                  </TouchableOpacity>
                  <View style={HomeStyles.topTrackTextContainer}>
                    <Text style={HomeStyles.topTrackText}>{track[0]}</Text>
                    <Text style={HomeStyles.topTrackArtistText}>{track[1]}</Text>
                  </View>
                  <TouchableOpacity
                    style={{ marginLeft: 'auto', paddingHorizontal: 10 }}
                    onPress={() => Linking.openURL(track[3])}>
                    <Image
                      style={HomeStyles.playImage}
                      source={playimg}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            )}
            {topTracks.length == 0 &&
              <Text style={HomeStyles.noDataText}>
                It seems like you haven't listened to much music on your Spotify account. Listen to some more music
                and come back at a later date to view this data!
              </Text>
            }

          </View>
          <View style={HomeStyles.fifthContainer}>
            <View style={HomeStyles.headerContainer}>
              <Text style={HomeStyles.sixthHeader}>
                Your Moods
              </Text>
            </View>
            {(moods != null && moodsTotal > 0) &&
              <TopMoodsGraph data={moods} />
            }
            {moodsTotal == 0 &&
              <Text style={HomeStyles.noDataText}>
                It seems like you haven't received any recommendations yet. Press "Get started" above to discover
                your mood and come back later to view this data!
              </Text>
            }
          </View>
          <View style={HomeStyles.fifthContainer}>
            <View style={HomeStyles.headerContainer}>
              <Text style={HomeStyles.fifthHeader}>
                Your Listening Habits
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Habits')}>
                <View style={HomeStyles.allContainer}>
                  <Text style={HomeStyles.fifthHeader}>
                    More
                  </Text>
                  <Image
                    style={HomeStyles.more}
                    source={nextimg}
                  />
                </View>
              </TouchableOpacity>
            </View>
            {habits != null &&
              <HabitsGraph data={habits} />
            }
            {habits == null &&
              <Text style={HomeStyles.noDataText}>
                It seems like you haven't listened to much music on your Spotify account. Listen to some more music
                and come back at a later date to view this data!
              </Text>
            }
          </View>
          <View style={{ height: newUser.newUser == true ? 500 : 40 }} />
          <StatusBar style="auto" />
        </View>
        <View style={{ height: '100%', backgroundColor: '#074366' }} />
      </ScrollView>
      <GenreModal newUser={newUser.newUser} navigation={navigation} />
    </View>
  );
}

export default Home;