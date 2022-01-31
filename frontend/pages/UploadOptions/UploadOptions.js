import React, { useEffect, useState } from 'react';
import { Text, View, Image, ScrollView, TouchableOpacity, Modal, Pressable } from 'react-native';
import { Button } from 'react-native-paper';
import { useFonts } from 'expo-font';
import LottieView from 'lottie-react-native';
import UploadOptionsStyles from './UploadOptionsStyles';
import Navbar from '../../components/navbar/Navbar';

function UploadOptions({ navigation }) {


    return (
        <ScrollView style={UploadOptionsStyles.scroll} showsVerticalScrollIndicator={false}>
            <View style={UploadOptionsStyles.topContainer}>
                <Navbar navigation={navigation} />
            </View>
            <View style={UploadOptionsStyles.mainContainer}>
                <Text style={UploadOptionsStyles.welcome}>
                    Detect Your Mood
                </Text>
                <Text style={UploadOptionsStyles.subWelcome}>
                    Let's discover some new music! To begin, choose an option
                    below to detect your mood.
                </Text>
                <View style={UploadOptionsStyles.uploadContainer}>
                    <Text style={UploadOptionsStyles.headerText}>
                        1. Upload Image
                    </Text>
                    <LottieView
                        source={require('./animations/lf30_editor_pijjj3w6.json')}
                        autoPlay
                        loop
                        style={UploadOptionsStyles.lottie}
                    />
                    <View style={{ flexDirection: 'row', alignSelf: 'center', marginLeft: 10, alignItems: 'center' }}>
                        <Text style={UploadOptionsStyles.headerSubText}>
                            Upload a picture of your face and your mood will be detected automatically!
                        </Text>
                        <Button
                            style={UploadOptionsStyles.startButton}
                            uppercase={false}
                            mode="contained"
                            labelStyle={UploadOptionsStyles.mainFont}
                            onPress={() => navigation.navigate('Upload', { navigation: navigation })}
                        >
                            continue
                        </Button>
                    </View>
                </View>
                <View style={UploadOptionsStyles.uploadContainer}>
                    <Text style={UploadOptionsStyles.headerText}>
                        2. Select Mood
                    </Text>
                    <LottieView
                        source={require('./animations/lf30_editor_r2rkclcy.json')}
                        autoPlay
                        loop={false}
                        style={UploadOptionsStyles.lottie}
                    />
                    <View style={{ flexDirection: 'row', alignSelf: 'center', marginLeft: 10, alignItems: 'center' }}>
                        <Text style={UploadOptionsStyles.headerSubText}>
                            Select the mood that best describes you from a list of options.
                        </Text>
                        <Button
                            style={UploadOptionsStyles.startButton}
                            uppercase={false}
                            mode="contained"
                            labelStyle={UploadOptionsStyles.mainFont}
                            onPress={() => navigation.navigate('Upload', { navigation: navigation })}
                        >
                            continue
                        </Button>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

export default UploadOptions;