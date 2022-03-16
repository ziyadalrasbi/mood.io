import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import SelectMoodStyles from './SelectMoodStyles';
import Navbar from '../../components/navbar/Navbar';
import * as SecureStore from 'expo-secure-store';
import happy from '../../../assets/icons/selectmood/happy.png';
import angry from '../../../assets/icons/selectmood/angry.png';
import sad from '../../../assets/icons/selectmood/sad.png';
import neutral from '../../../assets/icons/selectmood/neutral.png';
import confused from '../../../assets/icons/selectmood/thinking.png';
import surprised from '../../../assets/icons/selectmood/surprised.png';
import { incrementMoodCount, saveRecentMood } from '../../client/src/actions/dbActions';
import { useDispatch } from 'react-redux';

function SelectMood({ navigation }) {

    const dispatch = useDispatch();

    const [index, setIndex] = useState({ index: -1, mood: "" });

    const [pressed, setPressed] = useState(false);

    const changeSelectedMood = (i, mood) => {
        setIndex({ index: i, mood: mood });
    }

    const navigateResults = async () => {
        setPressed(true);
        const mood = {
            "angry": index.mood == "angry" ? 1 : 0,
            "confused": index.mood == "confused" ? 1 : 0,
            "happy": index.mood == "happy" ? 1 : 0,
            "neutral": index.mood == "neutral" ? 1 : 0,
            "sad": index.mood == "sad" ? 1 : 0,
            "surprised": index.mood == "surprised" ? 1 : 0,
        }
        var jsonText = JSON.stringify(mood);
        var data = JSON.parse(jsonText);
        var getValues = [];
        var getMoods = [];
        var tempMax = 0;
        var tempProp;
        for (var prop in mood) {
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
                    getMoods[i] === 'confused' ? 'white' : getMoods[i] === 'surprised' ? 'purple' : 'blue',
                legendFontColor: 'white',
                legendFontSize: 15,
            };
            tempAverages.push(getAverages);
        }

        const saveMoodController = new AbortController();
        const incrementMoodController = new AbortController();
        try {
            const id = await SecureStore.getItemAsync('user_id');
            await dispatch(saveRecentMood(id, tempProp, saveMoodController.signal));
            await dispatch(incrementMoodCount(id, tempProp, incrementMoodController.signal));
        } catch (error) {
            console.log('Error saving mood, please try again. ' + error);
        }
        saveMoodController.abort();
        incrementMoodController.abort();
        setPressed(false);

        navigation.navigate('Results', {
            results: mood,
            maxMood: index.mood,
            averages: tempAverages,
            values: getValues
        });

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
                        <TouchableOpacity onPress={() => changeSelectedMood(1, "happy")}>
                            <View style={[SelectMoodStyles.moodOption, { backgroundColor: index.index == 1 ? 'white' : 'grey' }]}>
                                <Image
                                    style={[SelectMoodStyles.moodImg, { opacity: index.index == 1 ? 1 : 0.3 }]}
                                    source={happy}
                                />
                                <Text style={SelectMoodStyles.moodText}>
                                    Happy
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => changeSelectedMood(2, "neutral")}>
                            <View style={[SelectMoodStyles.moodOption, { backgroundColor: index.index == 2 ? 'white' : 'grey' }]}>
                                <Image
                                    style={[SelectMoodStyles.moodImg, { opacity: index.index == 2 ? 1 : 0.3 }]}
                                    source={neutral}
                                />
                                <Text style={SelectMoodStyles.moodText}>
                                    Neutral
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={SelectMoodStyles.moodContainer}>
                        <TouchableOpacity onPress={() => changeSelectedMood(3, "sad")}>
                            <View style={[SelectMoodStyles.moodOption, { backgroundColor: index.index == 3 ? 'white' : 'grey' }]}>
                                <Image
                                    style={[SelectMoodStyles.moodImg, { opacity: index.index == 3 ? 1 : 0.3 }]}
                                    source={sad}
                                />
                                <Text style={SelectMoodStyles.moodText}>
                                    Sad
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => changeSelectedMood(4, "angry")}>
                            <View style={[SelectMoodStyles.moodOption, { backgroundColor: index.index == 4 ? 'white' : 'grey' }]}>
                                <Image
                                    style={[SelectMoodStyles.moodImg, { opacity: index.index == 4 ? 1 : 0.3 }]}
                                    source={angry}
                                />
                                <Text style={SelectMoodStyles.moodText}>
                                    Angry
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={SelectMoodStyles.moodContainer}>
                        <TouchableOpacity onPress={() => changeSelectedMood(5, "confused")}>
                            <View style={[SelectMoodStyles.moodOption, { backgroundColor: index.index == 5 ? 'white' : 'grey' }]}>
                                <Image
                                    style={[SelectMoodStyles.moodImg, { opacity: index.index == 5 ? 1 : 0.3 }]}
                                    source={confused}
                                />
                                <Text style={SelectMoodStyles.moodText}>
                                    Confused
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => changeSelectedMood(6, "surprised")}>
                            <View style={[SelectMoodStyles.moodOption, { backgroundColor: index.index == 6 ? 'white' : 'grey' }]}>
                                <Image
                                    style={[SelectMoodStyles.moodImg, { opacity: index.index == 6 ? 1 : 0.3 }]}
                                    source={surprised}
                                />
                                <Text style={SelectMoodStyles.moodText}>
                                    Surprised
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                {index.mood != "" &&
                    <View style={{ alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between', width: '80%', alignItems: 'center' }}>
                        <Text style={SelectMoodStyles.selectedMoodText}>
                            Selected mood: {index.mood}
                        </Text>
                        <Button
                            disabled={pressed}
                            style={[SelectMoodStyles.continueButton]}
                            uppercase={false}
                            mode="contained"
                            labelStyle={SelectMoodStyles.continueText}
                            onPress={() => navigateResults()}
                        >
                            Continue
                        </Button>

                    </View>
                }
                <StatusBar style="auto" />
            </View>
        </ScrollView>
    );
}

export default SelectMood;