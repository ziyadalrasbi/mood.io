import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Text, View, Image, ScrollView, TouchableOpacity, Modal, Pressable } from 'react-native';
import { Button } from 'react-native-paper';
import { useFonts } from 'expo-font'
import HomeStyles from './HomeStyles';
import * as SecureStore from 'expo-secure-store';
import Navbar from '../../components/navbar/Navbar';
import HabitsGraph from '../../components/habitsgraph/HabitsGraph';
import * as Linking from 'expo-linking';
import GenreModal from '../../components/genremodal/GenreModal';
import { LinearGradient } from 'expo-linear-gradient';
import Loading from '../../components/loading/Loading';
import { getTopArtists, getName, getTopTracks, getListeningHabits, signOut, getUserDatabaseGenres, getGenreSeeds, getUserId } from '../../fetch';
import nextimg from '../../../assets/icons/home/next.png'
function Home({ navigation }) {

  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");

  const [topArtists, setTopArtists] = useState({ topArtists: [] });
  const [topTracks, setTopTracks] = useState({ topTracks: [] });

  const [trackIds, setTrackIds] = useState({ trackIds: [] });
  const [habits, setHabits] = useState({ habits: [] });

  const [newUser, setNewUser] = useState({ newUser: false });


  const [loaded] = useFonts({
    MontserratBold: require('../../../assets/fonts/Montserrat/static/Montserrat-Bold.ttf'),
    InconsolataLight: require('../../../assets/fonts/Montserrat/static/Montserrat-Light.ttf'),
    InconsolataMedium: require('../../../assets/fonts/Montserrat/static/Montserrat-Medium.ttf'),
    InconsolataBlack: require('../../../assets/fonts/Montserrat/static/Montserrat-Black.ttf'),
    InconsolataSemiExpanded: require('../../../assets/fonts/Montserrat/static/Montserrat-SemiBold.ttf'),
  });

  useEffect(() => {
    const fetchData = async () => {
      const token = await SecureStore.getItemAsync('spotify_access_token');
      if (token != null) {
        try {
          await getTopArtists(token)
            .then((res) => res.json())
            .then(data => {
              if (data != null) {
                setTopArtists(data.artistNames);
              }
            })
          await getName(token)
            .then((res) => res.json())
            .then(data => {
              setName(data.name);
            })
          await getTopTracks(token)
            .then((res) => res.json())
            .then(data => {
              if (data != null) {
                setTopTracks(data.topTracks);
                setTrackIds(data.trackIds);
              }
            })
            .then(() => {
              getListeningHabits(token, trackIds)
                .then((res) => res.json())
                .then(data => {
                  setHabits({ habits: data.habits });
                })
            })
          await getUserId(token)
            .then(res => res.json())
            .then(data => {
              getUserDatabaseGenres(data.id)
                .then(res => res.json())
                .then(data => {
                  if (data.topGenres == null) {
                    var isNew = true;
                    setNewUser({ newUser: isNew });
                  }
                })
            })
        } catch (error) {
          console.log('Error fetching home data, please try again. \n' + error);
        }
      }
    }
    fetchData().then(() => setLoading(false));

  }, [loading]);

  if (!loaded || loading) {
    return (
      <Loading page={"home"} />
    );
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
      <View style={HomeStyles.mainContainer}>
        <View style={HomeStyles.topContainer}>
          <Navbar navigation={navigation} name={name} page={'home'} signOut={signOutUser} />
        </View>
        <View style={HomeStyles.firstContainer}>
          <Text style={HomeStyles.firstHeader}>
            Discover Music
          </Text>
          <Text style={HomeStyles.firstSubHeader}>
            press the button below to scan your mood
          </Text>
          <Button
            style={HomeStyles.startButton}
            uppercase={false}
            mode="contained"
            labelStyle={HomeStyles.mainFont}
            onPress={() => navigation.navigate('UploadOptions', { navigation: navigation })}
          >
            get started
          </Button>
        </View>
        <View style={HomeStyles.secondContainer}>
          <Text style={HomeStyles.secondHeader}>
            Recent Recommendations
          </Text>
          <Text style={HomeStyles.secondSubHeader}>
            songs recommended to you in the past week
          </Text>
        </View>

        <View style={HomeStyles.thirdContainer}>
          <View style={HomeStyles.headerContainer}>
            <Text style={HomeStyles.thirdHeader}>
              Top Artists
            </Text>
            <View style={{ flexDirection: 'row', marginRight: 10 }}>
              <Text style={HomeStyles.thirdHeader}>
                All
              </Text>
              <Image
                style={HomeStyles.next}
                source={nextimg}
              />
            </View>
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
              Top Tracks
            </Text>
            <View style={{ flexDirection: 'row', marginRight: 10 }}>
              <Text style={HomeStyles.thirdHeader}>
                All
              </Text>
              <Image
                style={HomeStyles.next}
                source={nextimg}
              />
            </View>

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
              </View>
            </View>
          )}
          {topTracks.length == 0 &&
            <Text style={HomeStyles.noDataText}>
              It seems like you haven't listened to much music on your Spotify account. Listen to some more music
              and come back at a later date to view this data!
            </Text>
          }
          <View style={{ height: 30 }} />
        </View>
        <GenreModal data={true} navigation={navigation} />
        <StatusBar style="auto" />
      </View>
      <View style={{ height: '100%', backgroundColor: '#7f5a83' }} />
    </ScrollView>

  );
}

export default Home;
