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

function Home({ navigation, route }) {

  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");

  const [topArtists, setTopArtists] = useState({ topArtists: [] });
  const [topTracks, setTopTracks] = useState({ topTracks: [] });

  const [trackIds, setTrackIds] = useState({ trackIds: [] });
  const [habits, setHabits] = useState({ habits: [] });


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
          await fetch("http://192.168.0.14:19001/spotify/home/getTopArtists", {
            method: 'post',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              token: token
            })
          })
            .then((res) => res.json())
            .then(data => {
              if (data != null) {
                setTopArtists(data.artistNames);
              }
            })
          await fetch("http://192.168.0.14:19001/spotify/home/getName", {
            method: 'post',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              token: token
            })
          })
            .then((res) => res.json())
            .then(data => {
              setName(data.name);
            })
          await fetch("http://192.168.0.14:19001/spotify/home/getTopTracks", {
            method: 'post',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              token: token
            })
          })
            .then((res) => res.json())
            .then(data => {
              if (data != null) {
                setTopTracks(data.topTracks);
                setTrackIds(data.trackIds);
              }
            })
            .then(() => {
              fetch("http://192.168.0.14:19001/spotify/home/getListeningHabits", {
                method: 'post',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  token: token,
                  tracks: trackIds
                })
              })
                .then((res) => res.json())
                .then(data => {
                  setHabits({ habits: data.habits });
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
      <View style={HomeStyles.mainContainer}>
        <LinearGradient
          // Background Linear Gradient
          colors={['#185a9d', '#4ca1af']}
          style={HomeStyles.gradientContainer}
        />
        <View style={HomeStyles.topContainer}>
          <Text style={HomeStyles.welcome}>
            Loading...
          </Text>
        </View>
      </View>
    );
  }

  const signOut = async () => {
    try {
      await SecureStore.deleteItemAsync('spotify_access_token');
      await SecureStore.deleteItemAsync('spotify_refresh_token');
      await SecureStore.deleteItemAsync('database_access_token');
      await fetch("http://192.168.0.14:19001/database/login/signOut", {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
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
      <View style={HomeStyles.mainContainer}>
        <View style={HomeStyles.topContainer}>
          <LinearGradient
            // Background Linear Gradient
            colors={['#185a9d', '#4ca1af']}
            style={HomeStyles.gradientContainer}
          />
          <Navbar scan={true} signOut={signOut} />
          <Text style={HomeStyles.welcome}>
            welcome, {name}!
          </Text>
          <Text style={HomeStyles.subWelcome}>
            how are you feeling today?
          </Text>
        </View>
        <View style={HomeStyles.firstContainer}>

          <Text style={HomeStyles.firstHeader}>
            let's find some new music!
          </Text>
          <Text style={HomeStyles.firstSubHeader}>
            press the button below to scan your mood 😎
          </Text>
          <Button
            style={HomeStyles.startButton}
            uppercase={false}
            mode="contained"
            labelStyle={HomeStyles.mainFont}
            onPress={() => navigation.navigate('Upload', { navigation: navigation })}
          >
            get started
          </Button>
        </View>
        <View style={HomeStyles.secondContainer}>
          <Text style={HomeStyles.secondHeader}>
            recent recommendations
          </Text>
          <Text style={HomeStyles.secondSubHeader}>
            songs recommended to you in the past week
          </Text>
        </View>
        <View style={HomeStyles.thirdContainer}>
          <Text style={HomeStyles.thirdHeader}>
            your top artists
          </Text>
          <Text style={HomeStyles.thirdSubHeader}>
            your top artists in the past 6 months
          </Text>
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
          <Text style={HomeStyles.fourthHeader}>
            your top tracks
          </Text>
          <Text style={HomeStyles.fourthSubHeader}>
            your top tracks in the past 6 months
          </Text>
          <ScrollView style={HomeStyles.topArtistsContainer} showsHorizontalScrollIndicator={false} horizontal={true}>
            {topTracks.length > 0 && topTracks.map((track, index) =>
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
                    style={HomeStyles.topTrackImage}
                    source={{ uri: track[2] }}
                  />
                </TouchableOpacity>
                <Text style={HomeStyles.topTrackText}>{track[0]}</Text>
                <Text style={HomeStyles.topTrackArtistText}>by {track[1]}</Text>
              </View>
            )}
          </ScrollView>
          {topTracks.length == 0 &&
            <Text style={HomeStyles.noDataText}>
              It seems like you haven't listened to much music on your Spotify account. Listen to some more music
              and come back at a later date to view this data!
            </Text>
          }
          <View style={{ height: 30 }} />
        </View>
        {route.params.new == true &&
          <GenreModal data={route.params.new} seeds={route.params.genreSeeds} />
        }
        <StatusBar style="auto" />
      </View>

    </ScrollView>

  );
}

export default Home;
