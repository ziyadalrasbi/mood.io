import { PieChart } from "react-native-chart-kit";
import React from 'react';
import { View, Text, Dimensions } from 'react-native';


function MoodGraph({ data }) {


    const chartConfig= {
        backgroundColor: '#e26a00',
        backgroundGradientFrom: '#fb8c00',
        backgroundGradientTo: '#ffa726',
        decimalPlaces: 2, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
          borderRadius: 16
        }
      }

    return (
        <View>
            <Text>
                mood analysis chart
            </Text>
            <PieChart 
                data={JSON.stringify(data)}
                width={Dimensions.get('window').width}
                height={220}
                accessor='percentage'
                chartConfig={chartConfig}
                backgroundColor="transparent"
                paddingLeft="15"
            />
        </View>
    );
}

export default MoodGraph;