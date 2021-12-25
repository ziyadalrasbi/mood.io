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

  const [selectedImage, setSelectedImage] = useState({ base64: "", uri: "" });
  const [moodAnalysis, setMoodAnalysis] = useState({ moodAnalysis: [] });
  const [loading, setLoading] = useState(true);

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

    const data = { base64: picker.base64, uri: picker.uri };

    setSelectedImage({ base64: picker.base64, uri: picker.uri });

    return data;
  }

  const analyseImage = async () => {
    openImagePicker()
      .then((res) => {
        if (res.base64 != "") {
          fetch("http://192.168.0.65:19001/detect/detectFace", {
            method: 'post',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              base64: res.base64
            })
          })
            .then((res) => res.json())
            .then(data => {
              setMoodAnalysis({ moodAnalysis: data.image[0].expressions });
            })
        }
      })
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
          onPress={() => analyseImage()}
        >
          upload image
        </Button>
        <Button
          style={UploadStyles.continueButton}
          uppercase={false}
          mode="contained"
          labelStyle={UploadStyles.mainFont}
          disabled={Object.keys(moodAnalysis.moodAnalysis).length > 0 ? false : true}
          onPress={() => navigation.navigate('Results', { navigation: navigation, results: moodAnalysis.moodAnalysis })}
        >
          continue
        </Button>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

export default Upload;