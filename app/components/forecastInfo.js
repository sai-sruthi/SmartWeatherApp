import React, { PropTypes, useEffect } from 'react';
import { Text, View, AsyncStorage } from 'react-native';
import styles from '../styles';

const ForecastInfo = (props) => {

    const { forecastData } = props;
    return (
        <View style={styles.textContainer}>
            <Text>{forecastData.city.name}</Text>
        </View>
    );
};

export default ForecastInfo;
