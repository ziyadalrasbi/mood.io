import { PieChart } from "react-native-chart-kit";
import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import MoodGraphStyles from "./MoodGraphStyles";
const { width, height } = Dimensions.get('window');

function MoodGraph({ data }) {

    const chartConfig = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false, // optional,
    };

    return (
        <View style={MoodGraphStyles.mainContainer}>
            <View style={MoodGraphStyles.topContainer}>
                <PieChart
                    data={data}
                    width={width}
                    height={width/2.3}
                    center={[Dimensions.get('window').width * 0.5, 300]}
                    accessor='percentage'
                    chartConfig={chartConfig}
                    backgroundColor="transparent"
                    paddingLeft='15'
                    xAxisLabel={'50'}
                    hasLegend={true}
                />
                <PieChart
                    data={data}
                    width={Dimensions.get('window').width}
                    height={width/2.07}
                    center={[Dimensions.get('window').width * 0.03, 0]}
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