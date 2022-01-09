import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Text, View, Image, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';
import { useFonts } from 'expo-font'
import HomeStyles from './HomeStyles';
import Navbar from '../../components/navbar/Navbar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HabitsGraph from '../../components/habitsgraph/HabitsGraph';

function Home({ navigation }) {

  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");

  const [topArtists, setTopArtists] = useState({ topArtists: [] });
  const [topArtistsOne, setTopArtistsOne] = useState({ topArtistsOne: [] });
  const [topArtistsTwo, setTopArtistsTwo] = useState({ topArtistsTwo: [] });

  const [topTracks, setTopTracks] = useState({ topTracks: [] });
  const [topTracksOne, setTopTracksOne] = useState({ topTracksOne: [] });
  const [topTracksTwo, setTopTracksTwo] = useState({ topTracksTwo: [] });

  const [trackIds, setTrackIds] = useState({ trackIds: [] });
  const [habits, setHabits] = useState({ habits: [] });


  const [loaded] = useFonts({
    InconsolataBold: require('../../../assets/fonts/Inconsolata/static/Inconsolata/Inconsolata-Bold.ttf'),
    InconsolataLight: require('../../../assets/fonts/Inconsolata/static/Inconsolata/Inconsolata-Light.ttf'),
    InconsolataMedium: require('../../../assets/fonts/Inconsolata/static/Inconsolata/Inconsolata-Medium.ttf'),
    InconsolataBlack: require('../../../assets/fonts/Inconsolata/static/Inconsolata/Inconsolata-Black.ttf'),
    InconsolataSemiExpanded: require('../../../assets/fonts/Inconsolata/static/Inconsolata_SemiExpanded/Inconsolata_SemiExpanded-Black.ttf')
  });

  useEffect(() => {
    const fetchData = async () => {
      const token = await AsyncStorage.getItem('access_token');
      if (token != null) {
        try {
          await fetch("http://192.168.0.65:19001/spotify/getTopArtists", {
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
                const half = Math.ceil(Object.entries(topArtists).length / 2);
                setTopArtistsOne(Object.entries(topArtists).slice(0, half));
                setTopArtistsTwo(Object.entries(topArtists).slice(-half));
              }
            })
          await fetch("http://192.168.0.65:19001/spotify/getName", {
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
          await fetch("http://192.168.0.65:19001/spotify/getTopTracks", {
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
                const half = Math.ceil(Object.keys(topTracks).length / 2);
                setTopTracksOne(Object.entries(topTracks).slice(0, half));
                setTopTracksTwo(Object.entries(topTracks).slice(-half));
              }
            })
            .then(() => {
          fetch("http://192.168.0.65:19001/spotify/getListeningHabits", {
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
              setHabits({habits: data.habits});
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
        <View style={HomeStyles.topContainer}>
          <Text style={HomeStyles.welcome}>
            Loading...
          </Text>
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={HomeStyles.scroll}>
      <View style={HomeStyles.mainContainer}>
        <View style={HomeStyles.topContainer}>
          <Navbar scan={true} navigation={navigation} />
          <Text style={HomeStyles.welcome}>
            welcome, {name}!
          </Text>
          <Text style={HomeStyles.subWelcome}>
            how are you feeling today?
          </Text>
        </View>
        <View style={HomeStyles.subTop}>
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
          <View style={HomeStyles.topArtistsContainer}>
            {topArtistsOne != null ? Object.keys(topArtistsOne).map((artist, index) =>
              <View>
                {topArtistsOne[artist].map((artist2, i) =>
                  artist2[1] != null &&
                  <View>
                    <Text style={HomeStyles.topArtistText}>{artist2[0]}</Text>
                    <Image
                      style={{ width: 100, height: 100 }}
                      source={{ uri: artist2[1] }}
                    />
                  </View>
                )}
              </View>

            ) : <Text style={HomeStyles.topArtistText}>Loading...</Text>}
          </View>
          <View style={HomeStyles.topArtistsContainer}>
            {topArtistsTwo != null ? Object.keys(topArtistsTwo).map((artist, index) =>
              <View>
                {topArtistsTwo[artist].map((artist2, i) =>
                  artist2[1] != null &&
                  <View>
                    <Text style={HomeStyles.topArtistText}>{artist2[0]}</Text>
                    <Image
                      style={{ width: 100, height: 100 }}
                      source={{ uri: artist2[1] }}
                    />
                  </View>
                )}
              </View>
            ) : <Text style={HomeStyles.topArtistText}>Loading...</Text>}
          </View>
          <View style={{ height: 20 }} />
        </View>
        <View style={HomeStyles.fourthContainer}>
          <Text style={HomeStyles.thirdHeader}>
            your top tracks
          </Text>
          <Text style={HomeStyles.thirdSubHeader}>
            your top tracks in the past 6 months
          </Text>
          <View style={HomeStyles.topTracksContainer}>
            {topTracksOne != null ? Object.keys(topTracksOne).map((track) =>
              <View>
                {topTracksOne[track].map((track2, i) =>
                  track2[2] != null &&
                  <View>
                    <Text style={HomeStyles.topTrackText}>{track2[0]}</Text>
                    <Text style={HomeStyles.topTrackArtistText}>by {track2[1]}</Text>
                    <Image
                      style={{ width: 150, height: 150 }}
                      source={{ uri: track2[2] }}
                    />
                  </View>
                )}
              </View>
            ) : <Text style={HomeStyles.topTrackText}>Loading...</Text>}
          </View>
          <View style={HomeStyles.topTracksContainer}>
            {topTracksTwo != null ? Object.keys(topTracksTwo).map((track) =>
              <View>
                {topTracksTwo[track].map((track2, i) =>
                  track2[2] != null &&
                  <View>
                    <Text style={HomeStyles.topTrackText}>{track2[0]}</Text>
                    <Text style={HomeStyles.topTrackArtistText}>by {track2[1]}</Text>
                    <Image
                      style={{ width: 150, height: 150 }}
                      source={{ uri: track2[2] }}
                    />
                  </View>
                )}
              </View>
            ) : <Text style={HomeStyles.topTrackText}>Loading...</Text>}
          </View>
          <View style={{ height: 20 }} />
        </View>
        <StatusBar style="auto" />
      </View>
    </ScrollView>
  );
}

export default Home;
