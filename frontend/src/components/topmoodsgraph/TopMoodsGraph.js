import { ProgressChart } from "react-native-chart-kit";
import React from 'react';
import { View, Text, Dimensions, PixelRatio, Platform } from 'react-native';
import TopMoodsGraphStyles from "./TopMoodsGraphStyles";
const { width, height } = Dimensions.get('window');

function TopMoodsGraph({ data }) {

    const getRatio = (value) => {
        return Math.min(PixelRatio.get() * value, value);
    }

    const chartConfig = {
        backgroundColor: '#ffffff',
        backgroundGradientToOpacity: 0,
        backgroundGradientFromOpacity: 0,
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        fillShadowGradientOpacity: 1,
        barPercentage: width / 591.428571,
        propsForLabels: {
            fontSize: width / 37.6363636
        },
    };
    const parsedData = {
        labels: data.keys,
        data: data.values,
        colors: [
            "rgba(255, 0, 0,1)",
            "rgba(238, 130, 238,1)",
            "rgba(106, 90, 205,1)",
            "rgba(60, 179, 113,1)",
            "rgba(255, 172, 71 , 1)",
            "rgba(0, 200, 255 , 1)",
        ]
    };

    return (
        <View style={TopMoodsGraphStyles.mainContainer}>
            <View style={TopMoodsGraphStyles.topContainer}>
                <ProgressChart
                    data={parsedData}
                    width={width-60}
                    height={200}
                    strokeWidth={5}
                    chartConfig={chartConfig}
                    radius={30}
                    withCustomBarColorFromData={true}
                    style={{ marginLeft: Platform.OS == 'android' ? -20 : -5 }}
                />
            </View>
        </View>
    );
}

export default TopMoodsGraph;