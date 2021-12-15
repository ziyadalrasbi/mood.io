import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import { useFonts } from 'expo-font'
import HomeStyles from './HomeStyles';
import Navbar from '../../components/navbar/Navbar';
import * as SpotifyConstants from '../../backend/spotify/SpotifyConstants';
import spotifyHomeFunctions from '../../backend/spotify/home/SpotifyHomeFunctions';
var SpotifyWebApi = require('spotify-web-api-node');

function Home({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [loaded] = useFonts({
    InconsolataBold: require('../../assets/fonts/Inconsolata/static/Inconsolata/Inconsolata-Bold.ttf'),
    InconsolataLight: require('../../assets/fonts/Inconsolata/static/Inconsolata/Inconsolata-Light.ttf'),
    InconsolataMedium: require('../../assets/fonts/Inconsolata/static/Inconsolata/Inconsolata-Medium.ttf'),
    InconsolataBlack: require('../../assets/fonts/Inconsolata/static/Inconsolata/Inconsolata-Black.ttf')
  });




  var temp;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await spotifyHomeFunctions.getName();
        console.log(data);
        setName(data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();

  }, []);

  if (!loaded) {
    return null;
  }

  return (
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
          onPress={() => test()}
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
      <StatusBar style="auto" />
    </View>
  );
}

export default Home;
