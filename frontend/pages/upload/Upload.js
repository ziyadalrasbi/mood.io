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
var RNFS = require('react-native-fs');

function Upload({ navigation }) {

  const [selectedImage, setSelectedImage] = useState(null);
  const [formattedImage, setFormattedImage] = useState(null);

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

    let picker = await ImagePicker.launchImageLibraryAsync();

    if (picker.cancelled === true) {
      return;
    }

    setSelectedImage({ localUri: picker.uri });


    if (selectedImage != null) {
      await fetch("http://192.168.0.65:19001/detectFace", {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          img: selectedImage.localUri
        })
      })
        .then((res) => res.json())
        .then(data => {
          setFormattedImage({ localUri: data.image })
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
        {formattedImage != null &&
          <Image
            style={UploadStyles.selectedImage}
            source={{ uri: formattedImage.localUri }}
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
        >
          continue
        </Button>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

export default Upload;