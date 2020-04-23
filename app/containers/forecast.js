import React, { useState } from 'react';
import { View, Text, Dimensions } from 'react-native';
import ForecastInfo from '../components/forecastInfo';
import styles from '../styles';
import {searchForecastByCity} from '../services/forecastService';
import SearchBox from '../components/searchBox';
import {LineChart} from 'react-native-chart-kit';

export default function Forecast (props) {
    const [forecastData, setForecastData] = useState(props.route.params.forecastData); 
    const [city, setCity] = useState(forecastData.pop());
    const sf = async (q) =>{
      let data = await searchForecastByCity(q);
      setForecastData(data);
    }    
    var minData = [];
    var maxData = [];
    var dates = [];
    var gsDayNames = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
      ];
    forecastData.forEach( val => {
       minData.push((val.main.temp_min - 273));
       maxData.push((val.main.temp_max - 273));
       var d = new Date(val.dt*1000);
       dates.push(gsDayNames[d.getDay()]);
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
                    Minimum Temperatures estimates
                </Text>
                <LineChart
                    data={linedata}
                    // verticalLabelRotation={90}
                    width={Dimensions.get('window').width} // from react-native
                    height={220}
                    yAxisSuffix={'°C'}
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
                Maximum Temperatures estimates
                </Text>
                <LineChart
                    data={linedata2}
                    width={Dimensions.get('window').width} // from react-native
                    height={220}
                    yAxisSuffix={'°C'}
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
