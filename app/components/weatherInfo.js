import React, { PropTypes, useEffect } from 'react';
import { Text, View, AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import _ from 'lodash';
import styles from '../styles';
import utils from '../utils';

const genIcon = (description, sys) => {
    const { sunrise, sunset } = sys;
    const rightNow = Date.now() / 1000;
    const dayTime = rightNow > sunrise && rightNow < sunset;
    let icon;
    switch (description) {
        case 'Haze':
            icon = dayTime ?
                (<Icon name="ios-cloudy" style={styles.weatherIcon} size={40} color="#FFFFFF" />) :
                (<Icon name="ios-cloudy-night" style={styles.weatherIcon} size={40} color="#FFFFFF" />);
            break;
        case 'Snow':
            icon = (<Icon name="ios-snow" style={styles.weatherIcon} size={40} color="#FFFFFF" />);
            break;
        case 'Clouds':
            icon = (<Icon name="ios-cloudy" style={styles.weatherIcon} size={40} color="#FFFFFF" />);
            break;
        case 'Clear':
            icon = dayTime ?
                (<Icon name="ios-sunny" style={styles.weatherIcon} size={40} color="#FFFF44" />) :
                (<Icon name="ios-moon" style={styles.weatherIcon} size={40} color="#FFFFFF" />);
            break;
        case 'Rain':
            icon = (<Icon name="ios-rainy" style={styles.weatherIcon} size={40} color="#FFFFFF" />);
            break;
        case 'Fog':
            icon = (<Icon name="ios-partlysunny" style={styles.weatherIcon} size={40} color="#FFFFFF" />);
            break;
        default:
            icon = (<Icon name="ios-sunny" style={styles.weatherIcon} size={40} color="#FFFFFF" />);
    }
    return icon;
};

const renderContent = (weatherData, isFahrenheit, isLocal) =>
    (
        <View>
            {_.isEmpty(weatherData) ?
                <Text style={styles.weatherInfo}>{'Search for a location'}</Text>
                :
                <View>
                    <Text style={styles.weatherInfo}>{`${weatherData.name}`}</Text>
                    <Text style={styles.weatherInfo}>{
                        isFahrenheit ?
                            `${utils.toFahrenheit(weatherData.main.temp)} °F` :
                            `${utils.toCelsius(weatherData.main.temp)} °C`}</Text>
                    {genIcon(weatherData.weather[0].main, weatherData.sys)}
                    <Text style={styles.weatherInfo}>Feels Like: {
                        isFahrenheit ?
                            `${utils.toFahrenheit(weatherData.main.feels_like)} °F` :
                            `${utils.toCelsius(weatherData.main.feels_like)} °C`}</Text>
                    <Text style={styles.weatherInfo}>{`${weatherData.weather[0].description}`}</Text>
                    <Text style={styles.weatherInfo}>Wind Speed: {`${weatherData.wind.speed}`} m/sec</Text>
                    <Text style={styles.weatherInfo}>Humidty: {`${weatherData.main.humidity}`} %</Text>
                    <Text style={styles.weatherInfo}>{isLocal ? `Sunrise : ${utils.toDate(weatherData.sys.sunrise)}, Sunset: ${utils.toDate(weatherData.sys.sunset)}` : ''}</Text>
                </View>
            }                
        </View>
    );

const renderError = errorMessage =>
    (
        <View style={styles.errorContainer}>
            <Text style={styles.errorMessage}>{errorMessage}</Text>
        </View>
    );

const WeatherInfo = (props) => {
    const { weatherData, isFahrenheit, isLocal, errorMessage, isLoading } = props;
    const stuff =
        renderContent(weatherData, isFahrenheit, isLocal)
    return (
        <View style={styles.textContainer}>
            {stuff}
        </View>
    );
};


export default WeatherInfo;
