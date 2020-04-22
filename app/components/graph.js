import React, {Component} from 'react'
import { View, Text, Dimensions } from 'react-native'
import {LineChart} from 'react-native-chart-kit'

class Graph extends Component {
    render(){
        const linedata = {
            labels: ['1', '2', '3', '4', '5'],
            datasets: [
              {
                data: [20, 45, 28, 80, 99],
                strokeWidth: 2, // optional
              },
            ],
          };
        return (
            <View>
                <Text>
                    Bezier Line Chart
                </Text>
                <LineChart
                    data={linedata}
                    width={Dimensions.get('window').width} // from react-native
                    height={220}
                    yAxisLabel={'°C'}
                    chartConfig={{
                    backgroundGradientFrom: '#648dd1',
                    backgroundGradientTo: '#ffa726',
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                        borderRadius: 16
                    }
                    }}
                    line
                    style={{
                    marginVertical: 8,
                    borderRadius: 10
                    }}
                />
            </View>
        )      
    }
}

export default Graph