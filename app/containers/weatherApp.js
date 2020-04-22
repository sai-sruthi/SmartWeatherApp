import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableOpacity, AsyncStorage } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import WeatherInfo from '../components/weatherInfo';
import SearchBox from '../components/searchBox';
import Options from '../components/options';
import styles from '../styles';
import * as weatherActions from '../actions';
import {searchForecastByCoordinates} from '../services/forecastService';

export class WeatherApp extends Component {
    static propTypes = {
    }

    user = null;

    location = {

    }

    getUser = async () => {
      const temp = await AsyncStorage.getItem("user");
      this.user = JSON.parse(temp);
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition( 
            (position) => {
                const lat = position.coords.latitude.toString();
                const lon = position.coords.longitude.toString();
                this.location.latitude = lat;
                this.location.longitude = lon;
                this.props.actions.setIsLocal(true);
                this.props.actions.searchByCoordinates(lat, lon);
            },
            () => {
                const errorMessage = 'Could not fetch weather for your location';
                this.props.actions.setErrorMessage(errorMessage);
            },
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 });
        this.getUser();
    }

    render() {
        const { state, actions, navigation } = this.props;
        const { weatherData, errorMessage, isLoading, isFahrenheit ,isLocal} = state;
        return (
          <View style={styles.container}>
            <SearchBox onComplete={actions.searchByCity} />
            <WeatherInfo
              weatherData={weatherData}
              errorMessage={errorMessage}
              isLoading={isLoading}
              isFahrenheit={isFahrenheit}
              isLocal = {isLocal}
            />
            <Options
              style={styles.options}
              onValueChange={value => actions.setIsFahrenheit(value)}
              isFahrenheit={isFahrenheit}
              isLocal = {isLocal}
            />
            <TouchableOpacity
                style={styles.submit}
                onPress={() => {
                  // this is needed because in certain
                  // scenarios (2 as of now), the updated
                  // user value stored in the async storage
                  // is not set to the class variable before
                  // it is passed to the settings screen
                  prereq = async () => {
                    await this.getUser();
                    navigation.navigate("Settings", {user: this.user});
                  }
                  prereq();
                }}>
                <Text style={styles.btnLabel}>CHANGE NOTIFICATION SETTINGS</Text>
                
            </TouchableOpacity> 
            <TouchableOpacity
                style={styles.submit}
                onPress={() => {
                  searchForecastByCoordinates(this.location.latitude, this.location.longitude)
                  .then(function(data){                  
                    navigation.navigate("Forecast", {forecastData: data});    
                  });
                }}>
                <Text style={styles.btnLabel}>Get Forecast</Text>
            </TouchableOpacity> 
          </View>
        );
    }
}

export default connect(state => ({
    state,
}),
dispatch => ({
    actions: bindActionCreators(weatherActions, dispatch),
}),
)(WeatherApp);
