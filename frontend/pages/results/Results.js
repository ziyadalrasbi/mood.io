import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Text, View, Image } from 'react-native';
import { Button } from 'react-native-paper';
import { useFonts } from 'expo-font'
import ResultsStyles from './ResultsStyles';
import Navbar from '../../components/navbar/Navbar';

function Results({ navigation, results }) {

  const [selectedImage, setSelectedImage] = useState(null);
  const [moodAnalysis, setMoodAnalysis] = useState(null);

  const [loaded] = useFonts({
    InconsolataBold: require('../../../assets/fonts/Inconsolata/static/Inconsolata/Inconsolata-Bold.ttf'),
    InconsolataLight: require('../../../assets/fonts/Inconsolata/static/Inconsolata/Inconsolata-Light.ttf'),
    InconsolataMedium: require('../../../assets/fonts/Inconsolata/static/Inconsolata/Inconsolata-Medium.ttf'),
    InconsolataBlack: require('../../../assets/fonts/Inconsolata/static/Inconsolata/Inconsolata-Black.ttf')
  });

  if (!loaded) {
    return null;
  }

  console.log('results are '+ results);

  return (
    <View style={ResultsStyles.mainContainer}>
      <View style={ResultsStyles.topContainer}>
        <Navbar scan={false} />
        <Text style={ResultsStyles.title}>
          results
        </Text>
        <Text style={ResultsStyles.subText}>
          your mood analysis can be found below!
        </Text>
      </View>
      <View style={ResultsStyles.subTop} />
      <View style={ResultsStyles.moodAnalysis}>
          <Text>
              {JSON.stringify(results)}
          </Text>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

export default Results;