import { BarChart } from "react-native-chart-kit";
import React from 'react';
import { View, Text, Dimensions, PixelRatio, Platform } from 'react-native';
import HabitsGraphStyles from "./HabitsGraphStyles";
const { width, height } = Dimensions.get('window');

function HabitsGraph() {

    const getRatio = (value) => {
        return Math.min(PixelRatio.get() * value, value);
    }

    const chartConfig = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
    };
    const data = {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
            {
                data: [20, 45, 28, 80, 99, 43]
            }
        ]
    };

    const style = {
        marginVertical: 8,
        borderRadius: 16
    }

    return (
        <View style={HabitsGraphStyles.mainContainer}>
            <View style={HabitsGraphStyles.topContainer}>
                <BarChart
                    data={data}
                    width={width}
                    height={Platform.OS == 'android' ? 220 : getRatio(300)}
                    chartConfig={chartConfig}
                    yAxisLabel="$"

                    style={{ backgroundColor: 'black' }}
                />
            </View>
        </View>
    );
}

export default HabitsGraph;