import React, { useState } from 'react';
import { View, Text, Dimensions } from 'react-native';
import ForecastInfo from '../components/forecastInfo';
import styles from '../styles';
import {searchForecastByCity} from '../services/forecastService';
import SearchBox from '../components/searchBox';
import {LineChart} from 'react-native-chart-kit';

let forecastData = {};
let city = {};
const sf = async (q) =>{
    forecastData = await searchForecastByCity(q);
    console.log(forecastData);
}

export default function Forecast (props) {
    forecastData = props.route.params.forecastData;
    city = forecastData.pop();
    var minData = [];
    var maxData = [];
    var dates = [];
    forecastData.forEach( val => {
       minData.push((val.main.temp_min - 273));
       maxData.push((val.main.temp_max - 273));
       dates.push((val.dt_txt));
    });
    const linedata = {
        labels: dates,
        datasets: [
          {
            data: minData,
            strokeWidth: 2, // optional
          },
        ],
      };
      const linedata2 = {
        labels: dates,
        datasets: [
          {
            data: maxData,
            strokeWidth: 2, // optional
          },
        ],
      };
    return (
        <View style={styles.container}>
            <SearchBox onComplete={sf} />
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
            <View>
                <Text>
                    Bezier Line Chart
                </Text>
                <LineChart
                    data={linedata2}
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
        </View>
    );
};
