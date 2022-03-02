import { BarChart } from "react-native-chart-kit";
import React from 'react';
import { View, Text, Dimensions, PixelRatio, Platform } from 'react-native';
import HabitsGraphStyles from "./HabitsGraphStyles";
const { width, height } = Dimensions.get('window');

function HabitsGraph({ data }) {

    const getRatio = (value) => {
        return Math.min(PixelRatio.get() * value, value);
    }

    const chartConfig = {
        backgroundColor: '#ffffff',
        backgroundGradientToOpacity: 0,
        backgroundGradientFromOpacity: 0,
        color: (opacity = 1) => `rgba(0, 110, 199, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        barRadius: 5,
        fillShadowGradientOpacity:1,
    };
    const parsedData = {
        labels: data.keys,
        datasets: [
            {
                data: data.values,
                colors: [
                    (opacity = 1) => `rgba(235, 235, 52, ${opacity})`,
                    (opacity = 1) => `rgba(240, 46, 62, ${opacity})`,
                    (opacity = 1) => `rgba(45, 235, 190, ${opacity})`,
                    (opacity = 1) => `rgba(20, 44, 222, ${opacity})`,
                ]
            }
        ],
        
    };

    return (
        <View style={HabitsGraphStyles.mainContainer}>
            <View style={HabitsGraphStyles.topContainer}>
                <BarChart
                    data={parsedData}
                    width={width}
                    height={Platform.OS == 'android' ? 220 : getRatio(340)}
                    chartConfig={chartConfig}
                    fromZero={true}
                    withCustomBarColorFromData={true}
                    flatColor={true}
                    showBarTops={false}
                    style={{marginLeft: -5}}
                />
            </View>
        </View>
    );
}

export default HabitsGraph;