import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Text, View, Image } from 'react-native';
import { Button } from 'react-native-paper';
import { useFonts } from 'expo-font'
import ResultsStyles from './ResultsStyles';
import Navbar from '../../components/navbar/Navbar';
import MoodGraph from '../../components/moodgraph/MoodGraph';

function Results({ navigation, route }) {

    const [maxProp, setMaxProp] = useState({maxProp: "", found: 0});
    const [maxValue, setMaxValue] = useState({maxValue: ""});

    const [moodHeader, setMoodHeader] = useState({moodHeader: ""});
    const [moodDescription, setMoodDescription] = useState({moodDescription: ""});

    const [moods, setMoods] = useState([]);
    const [values, setValues] = useState([]);
    const [averages, setAverages] = useState([]);

    const [loading, setLoading] = useState(true);
    const { results } = route.params;

    useEffect(() => {
        const getMood = async() => {
            var jsonText = JSON.stringify(results);
            var data = JSON.parse(jsonText);
            var getValues = [];
            var getMoods = [];
            var tempMax;
            var tempProp;
            for (var prop in data) {
                var value = data[prop];
                getValues.push(value);
                getMoods.push(prop);
                if (value > maxValue.maxValue) {
                    tempMax = value;
                    tempProp = prop;
                }
            }
            setMaxProp({maxProp: tempProp});
            setMaxValue({maxValue: tempMax});
            setValues(getValues);
            setMoods(getMoods);
            await getAnalysisStatement();
        }

        const parseAverages = async() => {
            var tempAverages = [];
            for (var i=0; i<values.length; i++) {
                const getAverages = {
                    name: moods[i],
                    percentage: values[i],
                    color: moods[i] === 'happy' ? 'yellow' : moods[i] === 'sad' ? 'grey' : moods[i] === 'angry' ? 'red' : 
                    moods[i] === 'fearful' ? 'blue' : moods[i] === 'disgusted' ? 'purple' : moods[i] === 'surprised' ? 'orange' : 'black' ,
                    legendFontColor: '#7F7F7F', 
                    legendFontSize: 15
                };
                tempAverages.push(getAverages);
            }
            setAverages(tempAverages);
        }

        const getAnalysisStatement = async() => {
            if (maxValue.maxValue != "" && maxProp.maxProp != "") {
                if (maxProp.maxProp  == 'happy') {
                    setMoodHeader({moodHeader: 'that you are feeling happy. that makes us happy too!'});
                    setMoodDescription({moodDescription: 'be sure to spread the happiness with others around you :)'});
                } else if (maxProp.maxProp  == 'sad') {
                    setMoodHeader({moodHeader: 'that you are feeling down. we\'re sorry to hear that.'});
                    setMoodDescription({moodDescription: 'it will get better, keep your head up high!'})
                } else if (maxProp.maxProp  == 'angry') {
                    setMoodHeader({moodHeader: 'that you seem tempered and fully of energy!'});
                    setMoodDescription({moodDescription: 'try to harness your thoughts and energy into something positive!'});
                } else if (maxProp.maxProp  == 'fearful') {
                    setMoodHeader({moodHeader: 'that you seem fearful. stay safe!'});
                    setMoodDescription({moodDescription: 'surround yourself around people that make you feel safe.'});
                } else if (maxProp.maxProp  == 'disgusted') {
                    setMoodHeader({moodHeader: 'that something may be putting you off. let\'s change that!'});
                    setMoodDescription({moodDescription: 'engage in activities that put you in your comfort zone.'});
                } else if (maxProp.maxProp  == 'surprised') {
                    setMoodHeader({moodHeader: 'that somthing may have caught you off guard recently!'});
                    setMoodDescription({moodDescription: 'there may be something that is surprising you. we hope it is something positive!'});
                } else if (maxProp.maxProp  == 'neutral') {
                    setMoodHeader({moodHeader: 'that everything seems normal!'})
                    setMoodDescription({moodDescription: 'being in a neutral state of mind is always good!'});
                }
            }
        }


        getMood();
        parseAverages();
        setLoading(false);

    }, [loading])

    

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
            <View style={ResultsStyles.firstContainer}>
                <Text style={ResultsStyles.firstHeader}>
                    your result analysis showed {moodHeader.moodHeader != "" && moodHeader.moodHeader}
                </Text>
                <Text style={ResultsStyles.firstSubHeader}>
                    {moodDescription.moodDescription != "" && moodDescription.moodDescription}
                </Text>
                {/* {averages != null ? <MoodGraph data={JSON.stringify(averages)}/> : null} */}
            </View>
            <View>

            </View>
            <StatusBar style="auto" />
        </View>
    );
}

export default Results;