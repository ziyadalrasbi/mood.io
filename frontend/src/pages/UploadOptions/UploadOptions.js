import React from 'react';
import { Text, View, Image, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';
import LottieView from 'lottie-react-native';
import UploadOptionsStyles from './UploadOptionsStyles';
import Navbar from '../../components/navbar/Navbar';

function UploadOptions({ navigation }) {


    return (
        <ScrollView style={UploadOptionsStyles.scroll} showsVerticalScrollIndicator={false}>
            <View style={UploadOptionsStyles.topContainer}>
                <Navbar page={'uploadOptions'} navigation={navigation} />
            </View>
            <View style={UploadOptionsStyles.mainContainer}>
                <Text style={UploadOptionsStyles.welcome}>
                    Detect Your Mood
                </Text>
                <Text style={UploadOptionsStyles.subWelcome}>
                    Let's discover some new music! To begin, choose an option
                    below to detect your mood.
                </Text>

                <Text style={UploadOptionsStyles.headerText}>
                    1. Upload Image
                </Text>
                <LottieView
                    source={require('./animations/lf30_editor_3xr8ifgo.json')}
                    autoPlay
                    loop={false}
                    style={UploadOptionsStyles.lottie}
                />
                <View style={{ flexDirection: 'row', alignSelf: 'center', alignItems: 'center', marginTop: 5 }}>
                    <Text style={UploadOptionsStyles.headerSubText}>
                        Upload a picture of your face to detect your mood automatically.
                    </Text>
                    <Button
                        style={UploadOptionsStyles.submitButton}
                        uppercase={false}
                        mode="contained"
                        labelStyle={UploadOptionsStyles.submitText}
                        onPress={() => navigation.navigate('Upload')}
                    >
                        Continue
                    </Button>
                </View>

                <Text style={UploadOptionsStyles.headerText}>
                    2. Select Mood
                </Text>
                <LottieView
                    source={require('./animations/lf30_editor_r2rkclcy.json')}
                    autoPlay
                    loop={false}
                    style={UploadOptionsStyles.lottie}
                />
                <View style={{ flexDirection: 'row', alignSelf: 'center', alignItems: 'center' }}>
                    <Text style={UploadOptionsStyles.headerSubText}>
                        Select the mood that best describes you from a list of options.
                    </Text>
                    <Button
                        style={UploadOptionsStyles.selectMoodButton}
                        uppercase={false}
                        mode="contained"
                        labelStyle={UploadOptionsStyles.submitText}
                        onPress={() => navigation.navigate('SelectMood')}
                    >
                        Continue
                    </Button>
                </View>
            </View>
        </ScrollView>
    )
}

export default UploadOptions;