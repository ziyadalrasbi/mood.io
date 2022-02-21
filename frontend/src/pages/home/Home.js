import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Text, View, Image, ScrollView, TouchableOpacity, Modal, Pressable } from 'react-native';
import { Button } from 'react-native-paper';
import { useFonts } from 'expo-font';
import HomeStyles from './HomeStyles';
import * as SecureStore from 'expo-secure-store';
import Navbar from '../../components/navbar/Navbar';
import HabitsGraph from '../../components/habitsgraph/HabitsGraph';
import * as Linking from 'expo-linking';
import GenreModal from '../../components/genremodal/GenreModal';
import { LinearGradient } from 'expo-linear-gradient';
import Loading from '../../components/loading/Loading';
import { getTopArtistsHome, getName, getTopTracksHome } from '../../client/src/actions/spotifyActions';
import { getUserDatabaseArtists, getPreviousRecommendations } from '../../client/src/actions/dbActions';
import { connect, useDispatch } from 'react-redux';
import nextimg from '../../../assets/icons/home/next.png'
import playimg from '../../../assets/icons/home/play.png';
import { bindActionCreators } from 'redux';

function Home({ navigation, route }) {

  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const [name, setName] = useState("");

  const [topArtists, setTopArtists] = useState({ topArtists: [] });
  const [topTracks, setTopTracks] = useState({ topTracks: [] });

  const [trackIds, setTrackIds] = useState({ trackIds: [] });
  const [habits, setHabits] = useState({ habits: [] });

  const [newUser, setNewUser] = useState({ newUser: false });

  const [recommendations, setRecommendations] = useState({ recommendations: [] });

  const [loaded] = useFonts({
    MontserratBold: require('../../../assets/fonts/Montserrat/static/Montserrat-Bold.ttf'),
    InconsolataLight: require('../../../assets/fonts/Montserrat/static/Montserrat-Light.ttf'),
    InconsolataMedium: require('../../../assets/fonts/Montserrat/static/Montserrat-Medium.ttf'),
    InconsolataBlack: require('../../../assets/fonts/Montserrat/static/Montserrat-Black.ttf'),
    InconsolataSemiExpanded: require('../../../assets/fonts/Montserrat/static/Montserrat-SemiBold.ttf'),
  });

  function isArrayInArray(arr, item) {
    var item_as_string = JSON.stringify(item);
    var contains = arr.some(function (ele) {
      return JSON.stringify(ele) === item_as_string;
    });
    return contains;
  }

  useEffect(() => {
    const fetchData = async () => {
      const token = await SecureStore.getItemAsync('spotify_access_token');
      const userId = await SecureStore.getItemAsync('user_id');

      const getArtists = await dispatch(getTopArtistsHome(token));
      const getUserName = await dispatch(getName(token));
      const getTracks = await dispatch(getTopTracksHome(token));
      const getDbArtists = await dispatch(getUserDatabaseArtists(userId));
      const getRecommendations = await dispatch(getPreviousRecommendations(userId));

      setTopArtists(getArtists.getTopArtistsHome);
      setName(getUserName.getName);
      setTopTracks(getTracks.getTopTracksHome.topTracks);
      setTrackIds(getTracks.getTopTracksHome.trackIds);
      setNewUser({ newUser: getDbArtists.getUserDatabaseArtists });

      var recommendation = [];

      for (var i = 0; i < getRecommendations.getPreviousRecommendations.length && getRecommendations.getPreviousRecommendations.length < 6; i++) {
        const current = getRecommendations.getPreviousRecommendations[i].tracks[0];
        if (!isArrayInArray(recommendation, current)) {
          recommendation.push(current);
        }
      }

      setRecommendations(recommendation);
    }

    fetchData().then(() => {
      setLoading(false)
    }).catch((error) => {
      console.log('Error fetching top tracks, please try again. \n' + error);
      throw error;
    });

  }, [dispatch]);

  if (!loaded || loading) {
    return (
      <Loading page={"home"} />
    )
  }

  return (
    <ScrollView style={HomeStyles.scroll} showsVerticalScrollIndicator={false}>
      <LinearGradient
        // Background Linear Gradient
        colors={['#2b5876', '#4e4376']}
        style={HomeStyles.gradientContainer}
      />
      <GenreModal newUser={newUser.newUser} navigation={navigation} />
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
            get started
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
          <View style={{ height: newUser.newUser == true ? 500 : 30 }} />
        </View>
        <StatusBar style="auto" />
      </View>
      <View style={{ height: '100%', backgroundColor: '#4e4376' }} />
    </ScrollView>

  );
}

const mapStateToProps = (state) => {
  return {
    getTopArtistsHome: state.spotifyReducer.getTopArtistsHome,
    getName: state.spotifyReducer.getName,
    getTopTracksHome: state.spotifyReducer.getTopTracksHome,
    getUserDatabaseArtists: state.dbReducer.getUserDatabaseArtists,
    getPreviousRecommendations: state.dbReducer.getPreviousRecommendations
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  getTopArtistsHome,
  getName,
  getTopTracksHome,
  getUserDatabaseArtists,
  getPreviousRecommendations
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
