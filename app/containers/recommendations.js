import React from 'react';
import { View, Text, Image } from 'react-native';
import _ from 'lodash';
import styles from '../styles';

export default function Recommendations({ route }) {
    let imageSrc1 = null;
    let imageSrc2 = null;
    const sunrise = route.params.data.sys.sunrise;
    const sunset = route.params.data.sys.sunset;
    const rightNow = Date.now() / 1000;
    const dayTime = rightNow > sunrise && rightNow < sunset;
    console.log(dayTime)

    const isChilly = (temperature = Math.round(route.params.data.main.temp - 273.15)) => {
      if (temperature < 15) {
        imageSrc1 = 'https://img.icons8.com/ios-filled/50/000000/suit.png';
        return 'Chilly weather conditions, carry a jacket!\nAlso, ';
      }
      return '';
    };

    const getAccToWeather = (description = route.params.data.weather[0].main) => {
      let suggestion;
      switch (description) {
          case 'Snow':
              suggestion = "Consider carrying Snow-Safe clothings.";
              imageSrc2 = "https://img.icons8.com/ios-filled/50/000000/scarf.png";
              break;
          case 'Rain':
              suggestion = "Carry an Umbrella or a Rain-Coat to protect yourself from the rain.";
              imageSrc2 = 'https://img.icons8.com/carbon-copy/100/000000/umbrella.png';
              break;
          case 'Fog':
              suggestion = "Foggy weather could reduce visibility. So, please carry any Anti-Fog equipments.";
              imageSrc2 = "https://img.icons8.com/ios-filled/50/000000/fog-lamp.png";
              break;
          case 'Clear':
              if (dayTime){
                suggestion = "Consider carrying a Sun-Screen.";
                imageSrc2 = "https://img.icons8.com/ios-filled/50/000000/foundation-makeup.png";
              }
              else{
                suggestion = "you can carry some cool night shades.";
                imageSrc2 = "https://img.icons8.com/pastel-glyph/64/000000/vintage-glasses.png";
              }
              break;
          default:
              if (dayTime){
                suggestion = "Consider carrying Sun-Glases!";
                imageSrc2 = "https://img.icons8.com/pastel-glyph/64/000000/sun-glasses--v2.png";
              }
              else{
                suggestion = "you can carry some cool night shades.";
                imageSrc2 = "https://img.icons8.com/pastel-glyph/64/000000/vintage-glasses.png";
              }
      }
      return suggestion;
  };
  isChilly();
  getAccToWeather();
  return (
    <View style={styles.container}>
      <View style={[styles.cardContainer, styles.cardMargin]}>
        <View style={styles.weatherCard}>
          {_.isNull(imageSrc1) ? <Text></Text>
            :
            <View style={styles.weatherDetails}>
          
                <Image style={{height:100, width:100, padding: 50}} source={{uri: imageSrc1,}}></Image>
                {/* <Text style={{color: '#FFFFFF'}}>Image 1</Text> */}
            </View>
          }
            <View style={styles.weatherDetails}>
                <Image style={{height:100, width:100, padding: 50}} source={{uri: imageSrc2,}}></Image>
                {/* <Text style={{color: '#FFFFFF'}}>Image2</Text> */}
            </View>
        </View>
        <View
            style={{
                borderBottomColor: '#b7daf7',
                borderBottomWidth: 0.5,
                marginVertical: 4,
                marginHorizontal: 20
            }}
        />
        <View style={styles.weatherCard}>
            <View style={styles.weatherDetails}>
                <Text style={{color: '#FFFFFF', textAlign: "left"}}>{isChilly()}{getAccToWeather()}</Text>
            </View>
        </View>
      </View>
    </View>
  );

}