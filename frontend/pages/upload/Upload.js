import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import { useFonts } from 'expo-font'
import UploadStyles from './UploadStyles';
import Navbar from '../../components/navbar/Navbar';


function Upload({ navigation }) {

  const [loaded] = useFonts({
    InconsolataBold: require('../../../assets/fonts/Inconsolata/static/Inconsolata/Inconsolata-Bold.ttf'),
    InconsolataLight: require('../../../assets/fonts/Inconsolata/static/Inconsolata/Inconsolata-Light.ttf'),
    InconsolataMedium: require('../../../assets/fonts/Inconsolata/static/Inconsolata/Inconsolata-Medium.ttf'),
    InconsolataBlack: require('../../../assets/fonts/Inconsolata/static/Inconsolata/Inconsolata-Black.ttf')
  });
    
      if (!loaded) {
        return null;
      }

    return (
        <View style={UploadStyles.mainContainer}>
      <View style={UploadStyles.topContainer}>
        <Navbar scan={false}/>
        <Text style={UploadStyles.title}>
          scan your mood
        </Text>
        <Text style={UploadStyles.subText}>
          upload an image below to scan
        </Text>
      </View>
      <View style={UploadStyles.subTop} />
      <View style={UploadStyles.uploadContainer}>
      </View>
      <View style={UploadStyles.buttonContainer}>
          <Button 
          style={UploadStyles.uploadButton}
          uppercase={false}
          mode="contained"
          labelStyle={UploadStyles.mainFont}
          >
              upload image
          </Button>
          <Button 
          style={UploadStyles.continueButton}
          uppercase={false}
          mode="contained"
          labelStyle={UploadStyles.mainFont}
          >
              continue
          </Button>
      </View>
      <StatusBar style="auto" />
    </View>
    );
}

export default Upload;