import React, { Component, PropTypes } from 'react';
import { View } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import WeatherInfo from '../components/weatherInfo';
import SearchBox from '../components/searchBox';
import Options from '../components/options';
import styles from '../styles';
import * as weatherActions from '../actions';

export class WeatherApp extends Component {
    static propTypes = {
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition( 
            (position) => {
                const lat = position.coords.latitude.toString();
                const lon = position.coords.longitude.toString();
                this.props.actions.setIsLocal(true);
                this.props.actions.searchByCoordinates(lat, lon);
            },
            () => {
                const errorMessage = 'Could not fetch weather for your location';
                this.props.actions.setErrorMessage(errorMessage);
            },
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 });
    }

    render() {
        const { state, actions } = this.props;
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
