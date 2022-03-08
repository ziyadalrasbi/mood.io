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
        color: (opacity = 1) => `rgba(0, 110, 199, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        barRadius: 5,
        fillShadowGradientOpacity: 1,
        barPercentage: width / 591.428571,
        propsForLabels: {
            fontSize: width / 37.6363636
        },
    };
    const parsedData = {
        labels: ["swim", "bike", "run"],
        data: [0.4, 0.6, 0.8],
        colors: [
            "rgba(255, 0, 0,0.5)",
            "rgba(238, 130, 238,0.6)",
            "rgba(106, 90, 205,0.5)"
          ],
        // datasets: [
        //     {
        //         data: [0.4, 0.6, 0.8],
        //         colors: [
        //             (opacity = 1) => `rgba(235, 235, 52, ${opacity})`,
        //             (opacity = 1) => `rgba(240, 46, 62, ${opacity})`,
        //             (opacity = 1) => `rgba(45, 235, 190, ${opacity})`,
        //         ]
        //     }
        // ],
    };

    return (
        <View style={TopMoodsGraphStyles.mainContainer}>
            <View style={TopMoodsGraphStyles.topContainer}>
                <ProgressChart
                    data={parsedData}
                    width={width + 20}
                    height={Platform.OS == 'android' ? height / 2.63529412 : getRatio(340)}
                    chartConfig={chartConfig}
                    fromZero={true}
                    withCustomBarColorFromData={true}
                    style={{ marginLeft: Platform.OS == 'android' ? -20 : -5 }}
                />
            </View>
        </View>
    );
}

export default TopMoodsGraph;