import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import { useFonts } from 'expo-font'
import HomeStyles from './HomeStyles';
import hamburger from '../../assets/icons/home/hamburger.png';
import scan from '../../assets/icons/home/scan.png';

function Home({ navigation }) {

  const [loaded] = useFonts({

    InconsolataBold: require('../../assets/fonts/Inconsolata/static/Inconsolata/Inconsolata-Bold.ttf'),
    InconsolataLight: require('../../assets/fonts/Inconsolata/static/Inconsolata/Inconsolata-Light.ttf'),
    InconsolataMedium: require('../../assets/fonts/Inconsolata/static/Inconsolata/Inconsolata-Medium.ttf'),
    InconsolataBlack: require('../../assets/fonts/Inconsolata/static/Inconsolata/Inconsolata-Black.ttf')
  });

  if (!loaded) {
    return null;
  }

  return (
    <View style={HomeStyles.mainContainer}>
      <View style={HomeStyles.topContainer}>
        <View style={HomeStyles.topBar}>
          <Image style={HomeStyles.hamburger} source={hamburger} />
          <TouchableOpacity onPress={() => navigation.navigate('Upload')}>
          <Image style={HomeStyles.scan} source={scan}  />
            </TouchableOpacity>
          
        </View>
        <Text style={HomeStyles.welcome}>
          welcome, user!
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
          onPress={() => navigation.navigate('Upload')}
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
