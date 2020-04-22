import React from 'react';
import { View, Text } from 'react-native';
import ForecastInfo from '../components/forecastInfo';
import styles from '../styles';

export default function Forecast (props) {

    const forecastData = props.route.params.forecastData;

    return (
        <View style={styles.mainContainer}>
            <Text>{forecastData.city.name}</Text>
        </View>
    );

};
