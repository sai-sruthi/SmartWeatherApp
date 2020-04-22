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
                (<Icon name="ios-cloudy" style={styles.weatherIcon} size={40} color="#FFCC00" />) :
                (<Icon name="ios-cloudy-night" style={styles.weatherIcon} size={40} color="#FFCC00" />);
            break;
        case 'Snow':
            icon = (<Icon name="ios-snow" style={styles.weatherIcon} size={40} color="#FFCC00" />);
            break;
        case 'Clouds':
            icon = (<Icon name="ios-cloudy" style={styles.weatherIcon} size={40} color="#FFCC00" />);
            break;
        case 'Clear':
            icon = dayTime ?
                (<Icon name="ios-sunny" style={styles.weatherIcon} size={40} color="#FFCC00" />) :
                (<Icon name="ios-moon" style={styles.weatherIcon} size={40} color="#FFCC00" />);
            break;
        case 'Rain':
            icon = (<Icon name="ios-rainy" style={styles.weatherIcon} size={40} color="#FFCC00" />);
            break;
        case 'Fog':
            icon = (<Icon name="ios-partlysunny" style={styles.weatherIcon} size={40} color="#FFCC00" />);
            break;
        default:
            icon = (<Icon name="ios-sunny" style={styles.weatherIcon} size={40} color="#FFCC00" />);
    }
    return icon;
};

const renderContent = (weatherData, isFahrenheit, isLocal) =>
    (
        <View>
            {_.isEmpty(weatherData) ?
                <Text style={styles.weatherInfo}>{'Search for a location'}</Text>
                :
                <View style={styles.weatherInfo}>
                    <View style={styles.location}>
                        <Icon name='md-locate' size={20} color="#FFFFFF"/>
                        <Text style={[styles.weatherInfo, styles.locationName]}>{`${weatherData.name}`}</Text>
                    </View>
                    <View style={styles.temperature}>
                        {genIcon(weatherData.weather[0].main, weatherData.sys)}
                        <Text style={styles.temperatureValue}>{
                            isFahrenheit ?
                            `${utils.toFahrenheit(weatherData.main.temp)}° ` :
                            `${utils.toCelsius(weatherData.main.temp)}° `}
                        </Text>
                    </View>
                    <Text style={styles.weatherInfo}>Feels Like: {
                        isFahrenheit ?
                            `${utils.toFahrenheit(weatherData.main.feels_like)} °F` :
                            `${utils.toCelsius(weatherData.main.feels_like)} °C`}</Text>
                    <Text style={styles.weatherInfo}>{`${weatherData.weather[0].description[0].toUpperCase()}`+`${weatherData.weather[0].description.slice(1)}`}</Text>
                    {/* <Text style={styles.weatherInfo}>Wind Speed: {`${weatherData.wind.speed}`} m/sec</Text>
                    <Text style={styles.weatherInfo}>Humidty: {`${weatherData.main.humidity}`} %</Text>
                    <Text style={styles.weatherInfo}>{isLocal ? `Sunrise : ${utils.toDate(weatherData.sys.sunrise)}, Sunset: ${utils.toDate(weatherData.sys.sunset)}` : ''}</Text> */}
                     <View style={styles.cardContainer}>
                        <View style={styles.weatherCard}>
                            <View style={styles.weatherDetails}>
                                <Text style={{color: '#FFFFFF'}}>Wind Speed</Text>
                                <Text style={{color: '#FFFFFF'}}>{`${weatherData.wind.speed}`} m/sec</Text>    
                            </View>
                            <View
                                style={{
                                borderLeftWidth: 0.5,
                                borderLeftColor: '#b7daf7',
                                marginVertical: 4,
                                marginHorizontal: 20
                                }}
                            />
                            <View style={styles.weatherDetails}>
                                <Text style={{color: '#FFFFFF'}}>Humidty</Text>
                                <Text style={{color: '#FFFFFF'}}>{`${weatherData.main.humidity}`} %</Text>
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
                                <Text style={{color: '#FFFFFF'}}>Sunrise {"         "}</Text>
                                <Text style={{color: '#FFFFFF'}}>{isLocal ? `${utils.toDate(weatherData.sys.sunrise)}`: 'N/A'} </Text>    
                            </View>
                            <View
                                style={{
                                borderLeftWidth: 0.5,
                                borderLeftColor: '#b7daf7',
                                marginVertical: 4,
                                marginHorizontal: 20
                                }}
                            />
                            <View style={styles.weatherDetails}>
                                <Text style={{color: '#FFFFFF'}}>Sunset</Text>
                                <Text style={{color: '#FFFFFF'}}>{isLocal ? `${utils.toDate(weatherData.sys.sunset)}`: 'N/A'} </Text>  
                            </View>
                        </View>
                    </View>
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
