import { PieChart } from "react-native-chart-kit";
import React from 'react';
import { View, Text, Dimensions, PixelRatio, Platform } from 'react-native';
import MoodGraphStyles from "./MoodGraphStyles";
const { width, height } = Dimensions.get('window');
import { useFonts } from 'expo-font';
function MoodGraph({ data }) {

    const getRatio = (value) => {
        return Math.min(PixelRatio.get() * value, value);
    }

    const [loaded] = useFonts({
        InconsolataBold: require('../../../assets/fonts/Montserrat/static/Montserrat-Bold.ttf'),
        InconsolataLight: require('../../../assets/fonts/Montserrat/static/Montserrat-Light.ttf'),
        InconsolataMedium: require('../../../assets/fonts/Montserrat/static/Montserrat-Medium.ttf'),
        InconsolataBlack: require('../../../assets/fonts/Montserrat/static/Montserrat-Italic.ttf'),
    });

    if (!loaded) {
        return (
            <View>
                <Text>Loading</Text>
            </View>
        )
    }
    const chartConfig = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false, // optional,
        propsForLabels: {
            fontFamily: 'InconsolataBlack'
        }
    };

    return (
        <View style={MoodGraphStyles.mainContainer}>
            <View style={MoodGraphStyles.topContainer}>
                <PieChart
                    data={data}
                    width={width}
                    height={Platform.OS == 'android' ? width / 2.3 : getRatio(180)}
                    center={[getRatio(207), Platform.OS == 'android' ? height / 2 : getRatio(448)]}
                    accessor='percentage'
                    chartConfig={chartConfig}
                    backgroundColor="transparent"
                    paddingLeft='15'
                    xAxisLabel={'50'}
                    hasLegend={true}
                />
                <PieChart
                    data={data}
                    width={width}
                    height={Platform.OS == 'android' ? width / 2.07 : getRatio(200)}
                    center={[0, 0]}
                    accessor='percentage'
                    chartConfig={chartConfig}
                    backgroundColor="transparent"
                    paddingLeft='15'
                    xAxisLabel={'50'}
                    hasLegend={false}
                />
            </View>
        </View>
    );
}

export default MoodGraph;