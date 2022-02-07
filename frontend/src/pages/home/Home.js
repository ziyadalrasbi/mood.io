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
import {
  getTopArtists,
  getName,
  getTopTracks,
  getListeningHabits,
  signOut,
  getUserDatabaseGenres,
  getGenreSeeds,
  getUserId,
  getPreviousRecommendations
} from '../../fetch';
import nextimg from '../../../assets/icons/home/next.png'
import playimg from '../../../assets/icons/home/play.png';

function Home({ navigation, route }) {

  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");

  const [topArtists, setTopArtists] = useState({ topArtists: [] });
  const [topTracks, setTopTracks] = useState({ topTracks: [] });

  const [trackIds, setTrackIds] = useState({ trackIds: [] });
  const [habits, setHabits] = useState({ habits: [] });

  const [newUser, setNewUser] = useState({ newUser: false });

  const [recommendations, setRecommendations] = useState({ recommendations: [] });
  const [artistImgLoaded, setArtistImgLoaded] = useState(false);
  const [trackImgLoaded, setTrackImgLoaded] = useState(false);

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
      await getTopArtists(token)
        .then((res) => res.json())
        .then(data => {

          if (data != null) {
            setTopArtists(data.artistNames);
          }
        }).catch((error) => {
          console.log('Error fetching top artists, please try again. \n' + error);
          throw error;
        })
      await getName(token)
        .then((res) => res.json())
        .then(data => {
          setName(data.name);
        }).catch((error) => {
          console.log('Error fetching name, please try again. \n' + error);
          throw error;
        })
      await getTopTracks(token)
        .then((res) => res.json())
        .then(data => {
          if (data != null) {
            setTopTracks(data.topTracks);
            setTrackIds(data.trackIds);
          }
        }).catch((error) => {
          console.log('Error fetching top tracks, please try again. \n' + error);
          throw error;
        })
      /* ----- ENDPOINT CAUSING ERRORS, MUST FIX ------
       .then(() => {
         getListeningHabits(token, trackIds)
          .then((res) => res.json())
           .then(data => {
            setHabits({ habits: data.habits });
          })
           .catch((error) => {
             console.log('Error fetching habits, please try again. \n' + error);
             throw error;
           })
     })*/
      await getUserId(token)
        .then(res => res.json())
        .then(data => {
          getUserDatabaseGenres(data.id)
            .then(res => res.json())
            .then(data => {
              if (data.topGenres == null) {
                console.log('hello')
                var isNew = true;
                setNewUser({ newUser: isNew });
              }
            })
          getPreviousRecommendations(data.id)
            .then(res => res.json())
            .then(data => {
              var recommendation = [];
              for (var i = 0; i < data.recommendations.length && recommendation.length < 6; i++) {
                const current = data.recommendations[i].tracks[0];
                if (!isArrayInArray(recommendation, current)) {
                  recommendation.push(current);
                }
              }
              setRecommendations(recommendation);
            })
            .catch((error) => {
              console.log('Error fetching user genres, please try again. \n' + error);
              throw error;
            })
        }).catch((error) => {
          console.log('Error fetching user ID, please try again. \n' + error);
          throw error;
        })


    }
    fetchData().then(() => {
      setLoading(false)
    }).catch((error) => {
      console.log('Error fetching top tracks, please try again. \n' + error);
      throw error;
    });

  }, []);

  if (!loaded || loading) {
    return (
      <Loading page={"home"} />
    )
  }

  const changeArtistImageLoadedTrue = () => {
    setArtistImgLoaded(true);
  }

  const changeArtistImageLoadedFalse = () => {
    setArtistImgLoaded(false);
  }

  const changeTrackImageLoadedTrue = () => {
    setTrackImgLoaded(true);
  }

  const changeTrackImageLoadedFalse = () => {
    setTrackImgLoaded(true);
  }



  const signOutUser = async () => {
    try {
      await SecureStore.deleteItemAsync('spotify_access_token');
      await SecureStore.deleteItemAsync('spotify_refresh_token');
      await SecureStore.deleteItemAsync('database_access_token');
      await signOut()
        .then(() => {
          navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
        })
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  return (
    <ScrollView style={HomeStyles.scroll} showsVerticalScrollIndicator={false}>
      <LinearGradient
        // Background Linear Gradient
        colors={['#0d324d', '#7f5a83']}
        style={HomeStyles.gradientContainer}
      />
      <GenreModal newUser={newUser.newUser} navigation={navigation} />
      <View style={HomeStyles.mainContainer}>
        <View style={HomeStyles.topContainer}>
          <Navbar navigation={navigation} name={name} page={'home'} signOut={signOutUser} />
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
                    onLoadStart={changeArtistImageLoadedFalse}
                    onLoad={changeArtistImageLoadedTrue}
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
                    onLoadStart={changeArtistImageLoadedFalse}
                    onLoad={changeArtistImageLoadedTrue}
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
                    onLoadStart={changeTrackImageLoadedFalse}
                    onLoad={changeTrackImageLoadedTrue}
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
          <View style={{ height: newUser.newUser == true? 500 : 30 }} />
                  
        </View>
        <StatusBar style="auto" />
      </View>
      <View style={{ height: '100%', backgroundColor: '#7f5a83' }} />
    </ScrollView>

  );
}

export default Home;
