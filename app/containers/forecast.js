import React, { useState } from 'react';
import { View, Text, Dimensions } from 'react-native';
import styles from '../styles';
import {searchForecastByCity} from '../services/forecastService';
import SearchBox from '../components/searchBox';
import {LineChart} from 'react-native-chart-kit';

export default function Forecast (props) {
    const [forecastData, setForecastData] = useState(props.route.params.forecastData); 
    const [nextdayData, setNextdayData] = useState(props.route.params.nextdayData); 
    const [city, setCity] = useState(props.route.params.city);

    //Function called on entering city in Searchbox
    const sf = async (q) =>{
      let data = await searchForecastByCity(q);
      if (typeof data[2] == 'undefined'){
        return;
      }
      setForecastData(data[0]);
      setNextdayData(data[1]);
      setCity(data[2]);
    }    


    var five_days_data = [];
    var nextData = [];
    var dates = [];
    var hours = [];
    var gsDayNames = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
      ];

    //Populate 5 days forecast data
    forecastData.forEach( val => {
      five_days_data.push((val.main.temp - 273));
       var d = new Date(val.dt*1000);
       dates.push(gsDayNames[d.getDay()]);
    });

    //Populate next 24 hours data
    nextdayData.forEach( val => {
      nextData.push((val.main.temp - 273));
      var d = new Date(val.dt*1000);
      hours.push(d.getUTCHours());
    });



    //Constants for graphs
    const linedata = {
        labels: dates,
        datasets: [
          {
            data: five_days_data,
            strokeWidth: 2, // optional
          },
        ],
      };
      const linedata2 = {
        labels: hours,
        datasets: [
          {
            data: nextData,
            strokeWidth: 2, // optional
          },
        ],
      };


    return (
        <View style={styles.container}>
            <SearchBox onComplete={sf} />
            <View>
                <Text>
                Temperature data for the next 5 days for {city.name}
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
                Temperature data for the next 24 hours for {city.name}
                </Text>
                <LineChart
                    data={linedata2}
                    width={Dimensions.get('window').width} // from react-native
                    height={220}
                    yAxisSuffix={'°C'}
                    xAxisLabel={':00'}
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
