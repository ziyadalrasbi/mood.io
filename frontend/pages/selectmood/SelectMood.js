import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import { useFonts } from 'expo-font'
import SelectMoodStyles from './SelectMoodStyles';
import Navbar from '../../components/navbar/Navbar';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { detectFace } from '../../fetch';
import happy from '../../../assets/icons/selectmood/happy.png';
import angry from '../../../assets/icons/selectmood/angry.png';
import sad from '../../../assets/icons/selectmood/sad.png';
import neutral from '../../../assets/icons/selectmood/neutral.png';
import confused from '../../../assets/icons/selectmood/thinking.png';
import surprised from '../../../assets/icons/selectmood/surprised.png';
import LottieView from 'lottie-react-native';

function SelectMood({ navigation }) {

    const [index, setIndex] = useState(-1);

    const [loaded] = useFonts({
        InconsolataBold: require('../../../assets/fonts/Inconsolata/static/Inconsolata/Inconsolata-Bold.ttf'),
        InconsolataLight: require('../../../assets/fonts/Inconsolata/static/Inconsolata/Inconsolata-Light.ttf'),
        InconsolataMedium: require('../../../assets/fonts/Inconsolata/static/Inconsolata/Inconsolata-Medium.ttf'),
        InconsolataBlack: require('../../../assets/fonts/Inconsolata/static/Inconsolata/Inconsolata-Black.ttf')
    });

    if (!loaded) {
        return null;
    }

    const changeSelectedMood = (i) => {
        setIndex(i);
    }

    return (
        <ScrollView style={SelectMoodStyles.scroll} showsVerticalScrollIndicator={false}>
            <View style={SelectMoodStyles.topContainer}>
                <Navbar page={'select'} navigation={navigation} />
            </View>
            <View style={SelectMoodStyles.mainContainer}>
                <Text style={SelectMoodStyles.welcome}>
                    Select Mood
                </Text>
                <Text style={SelectMoodStyles.subWelcome}>
                    Choose the mood that best describes you below.
                </Text>
                <View style={{ marginTop: 30 }}>
                    <View style={SelectMoodStyles.moodContainer}>
                        <TouchableOpacity onPress={() => changeSelectedMood(1)}>
                            <View style={[SelectMoodStyles.moodOption, { backgroundColor: index == 1 ? 'white' : 'grey' }]}>
                                <Image
                                    style={[SelectMoodStyles.moodImg, { opacity: index == 1 ? 1 : 0.3 }]}
                                    source={happy}
                                />
                                <Text style={SelectMoodStyles.moodText}>
                                    Happy
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => changeSelectedMood(2)}>
                            <View style={[SelectMoodStyles.moodOption, { backgroundColor: index == 2 ? 'white' : 'grey' }]}>
                                <Image
                                    style={[SelectMoodStyles.moodImg, { opacity: index == 2 ? 1 : 0.3 }]}
                                    source={neutral}
                                />
                                <Text style={SelectMoodStyles.moodText}>
                                    Neutral
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={SelectMoodStyles.moodContainer}>
                        <TouchableOpacity onPress={() => changeSelectedMood(3)}>
                            <View style={[SelectMoodStyles.moodOption, { backgroundColor: index == 3 ? 'white' : 'grey' }]}>
                                <Image
                                    style={[SelectMoodStyles.moodImg, { opacity: index == 3 ? 1 : 0.3 }]}
                                    source={sad}
                                />
                                <Text style={SelectMoodStyles.moodText}>
                                    Sad
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => changeSelectedMood(4)}>
                            <View style={[SelectMoodStyles.moodOption, { backgroundColor: index == 4 ? 'white' : 'grey' }]}>
                                <Image
                                    style={[SelectMoodStyles.moodImg, { opacity: index == 4 ? 1 : 0.3 }]}
                                    source={angry}
                                />
                                <Text style={SelectMoodStyles.moodText}>
                                    Angry
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={SelectMoodStyles.moodContainer}>
                        <TouchableOpacity onPress={() => changeSelectedMood(5)}>
                            <View style={[SelectMoodStyles.moodOption, { backgroundColor: index == 5 ? 'white' : 'grey' }]}>
                                <Image
                                    style={[SelectMoodStyles.moodImg, { opacity: index == 5 ? 1 : 0.3 }]}
                                    source={confused}
                                />
                                <Text style={SelectMoodStyles.moodText}>
                                    Confused
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => changeSelectedMood(6)}>
                            <View style={[SelectMoodStyles.moodOption, { backgroundColor: index == 6 ? 'white' : 'grey' }]}>
                                <Image
                                    style={[SelectMoodStyles.moodImg, { opacity: index == 6 ? 1 : 0.3 }]}
                                    source={surprised}
                                />
                                <Text style={SelectMoodStyles.moodText}>
                                    Surprised
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <StatusBar style="auto" />
            </View>
        </ScrollView>
    );
}

export default SelectMood;