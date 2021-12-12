import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import { useFonts } from 'expo-font'
import HomeStyles from './HomeStyles';
import Navbar from '../../components/navbar/Navbar';

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
        <Navbar scan={true} navigation={navigation}/>
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
