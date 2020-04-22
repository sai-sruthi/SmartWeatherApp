import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableOpacity, AsyncStorage } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import WeatherInfo from '../components/weatherInfo';
import SearchBox from '../components/searchBox';
import Options from '../components/options';
import ForecastInfo from '../components/forecastInfo';
import styles from '../styles';
import * as weatherActions from '../actions';
import {searchForecastByCoordinates} from '../services/forecastService';
import {searchForecastByCity} from '../services/forecastService';

export class Forecast extends Component {
//     constructor(){
//         super();


//   }

    state = {
        forecastData: {}
    }

    componentDidMount() {
            navigator.geolocation.getCurrentPosition( 
                (position) => {
                    const lat = position.coords.latitude.toString();
                    const lon = position.coords.longitude.toString();
                    // this.props.actions.setIsLocal(true);
                    async function getForecast(){
                        forecastData = await searchForecastByCoordinates(lat, lon);
                        this.state.forecastData = forecastData;
                        console.log("#####################");
                        console.log(this.state);
                        console.log("#####################");
                    }
                    getForecast();
                    
                },
                () => {
                    const errorMessage = 'Could not fetch weather forecast for your location';
                    // this.props.actions.setErrorMessage(errorMessage);
                },
                { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 });
                
        
        // this.getUser();
    }

    render() {
        // const { state, actions, navigation } = this.props;
        // const { weatherData, errorMessage, isLoading, isFahrenheit ,isLocal} = state;
        
        
        return (
          <View style={styles.container}>
            {/*<SearchBox onComplete={searchForecastByCity} />*/}

            

          </View>
        );
    }
}

// export default connect(state => ({
//     state,
// }),
// dispatch => ({
//     actions: bindActionCreators(weatherActions, dispatch),
// }),
// )(Forecast);
