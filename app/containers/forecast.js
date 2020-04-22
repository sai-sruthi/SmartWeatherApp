import React, { useState } from 'react';
import { View, Text } from 'react-native';
import ForecastInfo from '../components/forecastInfo';
import styles from '../styles';
import {searchForecastByCity} from '../services/forecastService';
import SearchBox from '../components/searchBox';


// function useForceUpdate() {
//     console.log("fd");
//     let [value, setState] = useState(true);
//     return () => setState(!value);
//     }

let forecastData = {};

const sf = async (q) =>{
    forecastData = await searchForecastByCity(q);
    console.log(forecastData);
}

export default function Forecast (props) {
    forecastData = props.route.params.forecastData;
    
    
    // console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
    // console.log(forecastData);
    return (
        <View style={styles.container}>
            <SearchBox onComplete={sf} />
            {/* <ForecastInfo
                forecastData= {forecastData}
            /> */}
            <Text>{forecastData[5].name}</Text> 
        </View>
        
    );

};
