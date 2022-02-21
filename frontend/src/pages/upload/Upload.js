import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import { useFonts } from 'expo-font'
import UploadStyles from './UploadStyles';
import Navbar from '../../components/navbar/Navbar';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { detectFace } from '../../client/src/actions/detectActions';
import { saveRecentMood } from '../../client/src/actions/dbActions';
import uploadimg from '../../../assets/icons/upload/upload.png';
import LottieView from 'lottie-react-native';
import * as SecureStore from 'expo-secure-store';
import { connect, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

function Upload({ navigation }) {

  const dispatch = useDispatch();

  const [selectedImage, setSelectedImage] = useState({ base64: "", uri: "" });
  const [moodAnalysis, setMoodAnalysis] = useState({ moodAnalysis: [] });
  const [loading, setLoading] = useState(false);


  const [loaded] = useFonts({
    InconsolataBold: require('../../../assets/fonts/Inconsolata/static/Inconsolata/Inconsolata-Bold.ttf'),
    InconsolataLight: require('../../../assets/fonts/Inconsolata/static/Inconsolata/Inconsolata-Light.ttf'),
    InconsolataMedium: require('../../../assets/fonts/Inconsolata/static/Inconsolata/Inconsolata-Medium.ttf'),
    InconsolataBlack: require('../../../assets/fonts/Inconsolata/static/Inconsolata/Inconsolata-Black.ttf')
  });

  if (!loaded) {
    return (
      <View style={{ height: '100%', backgroundColor: '#0d324d' }} />
    )
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
    const res = await openImagePicker();
    if (res.base64 != "") {
      setLoading(true);
      const getFace = await dispatch(detectFace(res.base64))
      if (getFace.detectFace[0] != null) {
        setMoodAnalysis({ moodAnalysis: getFace.detectFace[0].expressions });
        console.log(getFace.detectFace[0].expressions)
        setLoading(false);
      } else {
        setMoodAnalysis({ moodAnalysis: null });
        setLoading(false);
      }
    }
  }


  const navigateResults = async () => {
    var jsonText = JSON.stringify(moodAnalysis.moodAnalysis);
    var data = JSON.parse(jsonText);
    var getValues = [];
    var getMoods = [];
    var tempMax = 0;
    var tempProp;
    for (var prop in moodAnalysis.moodAnalysis) {
      var value = data[prop];
      getValues.push(value);
      getMoods.push(prop);
      if (value > tempMax) {
        tempMax = value;
        tempProp = prop;
      }
    }
    var tempAverages = [];
    for (var i = 0; i < getValues.length; i++) {
      const getAverages = {
        name: getMoods[i],
        percentage: getValues[i],
        color: getMoods[i] === 'happy' ? 'yellow' : getMoods[i] === 'sad' ? 'grey' : getMoods[i] === 'angry' ? 'red' :
          getMoods[i] === 'fearful' ? 'blue' : getMoods[i] === 'disgusted' ? 'purple' : getMoods[i] === 'surprised' ? 'orange' : 'black',
        legendFontColor: 'white',
        legendFontSize: 15,
      };
      tempAverages.push(getAverages);
    }
    const id = await SecureStore.getItemAsync('user_id');
    await dispatch(saveRecentMood(id, tempProp));

    navigation.navigate('Results', {
      results: moodAnalysis.moodAnalysis,
      maxMood: tempProp,
      averages: tempAverages,
      values: getValues
    });

  }


  return (
    <ScrollView style={UploadStyles.scroll} showsVerticalScrollIndicator={false}>
      <View style={UploadStyles.topContainer}>
        <Navbar page={'upload'} navigation={navigation} />
      </View>
      <View style={UploadStyles.mainContainer}>
        <Text style={UploadStyles.welcome}>
          Upload Image
        </Text>
        <Text style={UploadStyles.subWelcome}>
          Upload an image below to detect your mood.
        </Text>
        {selectedImage.uri != "" ?
          <View style={UploadStyles.uploadContainer}>
            <Image
              style={UploadStyles.selectedImage}
              source={{ uri: selectedImage.uri != "" && selectedImage.uri }}
            />
          </View>
          :
          <TouchableOpacity style={{ width: '100%' }} onPress={() => analyseImage()}>
            <View style={UploadStyles.uploadContainer}>
              <Image
                style={{ width: 50, height: 50 }}
                source={uploadimg}
              />
            </View>
          </TouchableOpacity>
        }
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
          {moodAnalysis.moodAnalysis != null ?
            <Button
              style={{ display: !loading && selectedImage.uri != "" ? "flex" : "none", marginTop: 10, marginLeft: 50 }}
              uppercase={false}
              mode="contained"
              labelStyle={UploadStyles.mainFont}
              disabled={Object.keys(moodAnalysis.moodAnalysis).length > 0 ? false : true}
              onPress={() => navigateResults()}
            >
              continue
            </Button>
            :
            <Text style={{ display: !loading && selectedImage.uri != "" ? "flex" : "none", color: 'red', fontFamily: 'MontserratBold', marginTop: 10, paddingHorizontal: 10 }}>
              No face was detected in this image, please try again.
            </Text>
          }
          {loading &&
            <LottieView
              source={require('./animations/142-loading-animation.json')}
              autoPlay
              loop={true}
              style={{ marginTop: -5, width: 75, height: 75 }}
            />
          }
        </View>
        <StatusBar style="auto" />
      </View>
    </ScrollView>
  );
}

const mapStateToProps = (state) => {
  return {
    detectFace: state.detectReducer.detectFace,
    saveRecentMood: state.dbReducer.saveRecentMood
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  detectFace,
  saveRecentMood
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Upload);
