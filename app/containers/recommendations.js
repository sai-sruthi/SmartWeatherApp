import React, { useState, useEffect, Component } from 'react';
import { View, Text, TouchableWithoutFeedback, Keyboard, AsyncStorage, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../styles';
import utils from '../utils';

export default function Recommendations({ route }) {
    const sunrise = route.params.data.sys.sunrise;
    const sunset = route.params.data.sys.sunset;
    const rightNow = Date.now() / 1000;
    const dayTime = rightNow > sunrise && rightNow < sunset;
    console.log(dayTime)

    const isChilly = (temperature = Math.round(route.params.data.main.temp - 273.15)) => {
      if (temperature < 15) {
        return 'Chilly weather conditions, Carry a jacket!\nAlong with it, ';
      }
      return '';
    };

    const getAccToWeather = (description = route.params.data.weather[0].main) => {
      let suggestion;
      switch (description) {
          case 'Snow':
              suggestion = "Consider carrying Snow-Safe clothings.";
              break;
          case 'Rain':
              suggestion = "Carry an Umbrella or a Rain-Coat to protect yourself from the rain.";
              break;
          case 'Fog':
              suggestion = "Foggy weather could reduce visibility. So, please carry any Anti-Fog equipments";
              break;
          default:
              if (dayTime){
                suggestion = "Consider carrying a UV-Protection cream!";
              }
              else{
                suggestion = "Consider carrying a light-weight jacket!"
              }
      }
      return suggestion;
  };




  console.log("###########################");
  console.log(route.params.data.main.temp);
  console.log(isChilly())
  console.log("###########################");
  return (
    <View>
      <Text>
        {"\n\n\n"}
        {/* {route.params.data.weather[0].main} */}
        {isChilly()}{getAccToWeather()}
      </Text>
    </View>
  );

}