import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Text, View, Image } from 'react-native';
import { Button } from 'react-native-paper';
import { useFonts } from 'expo-font'
import UploadStyles from './UploadStyles';
import Navbar from '../../components/navbar/Navbar';
import * as ImagePicker from 'expo-image-picker';
import HomeStyles from '../home/HomeStyles';
import { height } from 'dom-helpers';

function Upload({ navigation }) {

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


  const openImagePicker = async () => {
    let permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permission.granted === false) {
      alert('Camera roll permission is required!');
    }

    let picker = await ImagePicker.launchImageLibraryAsync({ base64: true });

    if (picker.cancelled === true) {
      return;
    }

    setSelectedImage({ base64: picker.base64, uri: picker.uri });


    if (selectedImage != null) {
      await fetch("http://192.168.0.65:19001/detectFace", {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          base64: selectedImage.base64
        })
      })
        .then((res) => res.json())
        .then(data => {
          console.log(JSON.stringify(data.image[0].expressions));
          setMoodAnalysis(data.image[0].expressions);
          console.log('mood analysis is '+ moodAnalysis);
        })
    }
  }

  return (
    <View style={UploadStyles.mainContainer}>
      <View style={UploadStyles.topContainer}>
        <Navbar scan={false} />
        <Text style={UploadStyles.title}>
          scan your mood
        </Text>
        <Text style={UploadStyles.subText}>
          upload an image below to scan
        </Text>
      </View>
      <View style={UploadStyles.subTop} />
      <View style={UploadStyles.uploadContainer}>
        {selectedImage != null &&
          <Image
            style={UploadStyles.selectedImage}
            source={{ uri: selectedImage.uri }}
          />
        }
      </View>
      <View style={UploadStyles.buttonContainer}>
        <Button
          style={UploadStyles.uploadButton}
          uppercase={false}
          mode="contained"
          labelStyle={UploadStyles.mainFont}
          onPress={() => openImagePicker()}
        >
          upload image
        </Button>
        <Button
          style={UploadStyles.continueButton}
          uppercase={false}
          mode="contained"
          labelStyle={UploadStyles.mainFont}
          disabled={moodAnalysis != null ? false : true}
          onPress={() => navigation.navigate('Results', { params: { navigation: navigation, results: JSON.stringify(moodAnalysis) }})}
        >
          continue
        </Button>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

export default Upload;