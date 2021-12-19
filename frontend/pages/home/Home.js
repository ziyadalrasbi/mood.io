import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Text, View, Image, SafeAreaView, ScrollView, Linking } from 'react-native';
import { Button } from 'react-native-paper';
import { useFonts } from 'expo-font'
import HomeStyles from './HomeStyles';
import Navbar from '../../components/navbar/Navbar';
import spotifyHomeFunctions from '../../../backend/spotify/home/SpotifyHomeFunctions';
import { TouchableOpacity } from 'react-native-gesture-handler';

function Home({ navigation }) {

  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");

  const [topArtists, setTopArtists] = useState([]);
  const [topArtistsOne, setTopArtistsOne] = useState([]);
  const [topArtistsTwo, setTopArtistsTwo] = useState([]);

  const [topTracks, setTopTracks] = useState([]);
  const [topTracksOne, setTopTracksOne] = useState([]);
  const [topTracksTwo, setTopTracksTwo] = useState([]);

  const [loaded] = useFonts({
    InconsolataBold: require('../../../assets/fonts/Inconsolata/static/Inconsolata/Inconsolata-Bold.ttf'),
    InconsolataLight: require('../../../assets/fonts/Inconsolata/static/Inconsolata/Inconsolata-Light.ttf'),
    InconsolataMedium: require('../../../assets/fonts/Inconsolata/static/Inconsolata/Inconsolata-Medium.ttf'),
    InconsolataBlack: require('../../../assets/fonts/Inconsolata/static/Inconsolata/Inconsolata-Black.ttf'),
    InconsolataSemiExpanded: require('../../../assets/fonts/Inconsolata/static/Inconsolata_SemiExpanded/Inconsolata_SemiExpanded-Black.ttf')
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        await spotifyHomeFunctions.getTopArtists()
          .then((artists) => {
            if (artists != null) {
              setTopArtists(artists);
              const half = Math.ceil(topArtists.length / 2);
              setTopArtistsOne(topArtists.slice(0, half));
              setTopArtistsTwo(topArtists.slice(-half));
            }
            spotifyHomeFunctions.getName()
              .then((name) => {
                setName(name);
                spotifyHomeFunctions.getTopTracks()
                  .then((tracks) => {
                    if (tracks != null) {
                      setTopTracks(tracks);
                      const half = Math.ceil(topTracks.length / 2);
                      setTopTracksOne(topTracks.slice(0, half));
                      setTopTracksTwo(topTracks.slice(-half));
                    }
                  })
              })
          })
      } catch (err) {
        console.log('Error fetching home data, please try again. \n' + err);
      }
    }
    fetchData().then(() => setLoading(false));
    return () => topTracksTwo;

  }, [loading]);

  if (!loaded || loading) {
    return null;
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
            {topArtistsOne != null ? topArtistsOne.map((artist) =>
              <View>
                <Text style={HomeStyles.topArtistText}>{artist[0]}</Text>
                <Image
                  style={{ width: 100, height: 100 }}
                  source={{ uri: artist[1] }}
                />
              </View>
            ) : <Text style={HomeStyles.topArtistText}>Loading...</Text>}
          </View>
          <View style={HomeStyles.topArtistsContainer}>
            {topArtistsTwo != null ? topArtistsTwo.map((artist) =>
              <View>
                <Text style={HomeStyles.topArtistText}>{artist[0]}</Text>
                <Image
                  style={{ width: 100, height: 100 }}
                  source={{ uri: artist[1] }}
                />
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
            {topTracksOne != null ? topTracksOne.map((track) =>
              <View>
                <Text style={HomeStyles.topTrackText}>{track[0]}</Text>
                <Text style={HomeStyles.topTrackArtistText}>by {track[1]}</Text>
                <Image
                  style={{ width: 150, height: 150 }}
                  source={{ uri: track[2] }}
                />
              </View>
            ) : <Text style={HomeStyles.topTrackText}>Loading...</Text>}
          </View>
          <View style={HomeStyles.topTracksContainer}>
            {topTracksTwo != null ? topTracksTwo.map((track) =>
              <View>
                <Text style={HomeStyles.topTrackText}>{track[0]}</Text>
                <Text style={HomeStyles.topTrackArtistText}>by {track[1]}</Text>
                <Image
                  style={{ width: 150, height: 150 }}
                  source={{ uri: track[2] }}
                />
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
