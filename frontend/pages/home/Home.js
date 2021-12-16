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
        const getName = await spotifyHomeFunctions.getName();
        const getTopArtists = await spotifyHomeFunctions.getTopArtists();
        setName(getName);
        setTopArtists(getTopArtists);
        const half = Math.ceil(topArtists.length / 2);
        setTopArtistsOne(topArtists.slice(0, half));
        setTopArtistsTwo(topArtists.slice(-half));
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
    setLoading(false);

  }, [loading]);

  if (!loaded) {
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
              onPress={() => navigation.navigate('Upload', {navigation: navigation})}
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
              {!loading && topArtistsOne.map((artist) =>
                <View>
                  <Text style ={HomeStyles.topArtistText}>{artist[0]}</Text>
                  <Image
                    style={{ width: 100, height: 100 }}
                    source={{ uri: artist[1] }}
                  />
                </View>
              )}
            </View>
            <View style={HomeStyles.topArtistsContainer}>
              {!loading && topArtistsTwo.map((artist) =>
                <View>
                  <Text style={HomeStyles.topArtistText}>{artist[0]}</Text>
                  <Image
                    style={{ width: 100, height: 100 }}
                    source={{ uri: artist[1] }}
                  />
                </View>
              )}
            </View>
            <View style={{height:20}}/> 
          </View>
          <StatusBar style="auto" /> 
          </View>
      </ScrollView>  
      

    
  );
}

export default Home;
