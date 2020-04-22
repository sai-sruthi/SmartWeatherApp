import axios from 'axios';
import config from '../../config';

export const searchForecastByCoordinates = async (latitude, longitude) => {
    let forecastData = {};
    await axios.get(config.forecast_url, {
        params: {
            lat: latitude,
            lon: longitude,
            appid: config.appid,
        }
    })
    .then(function (response) {
        forecastData = response.data;
        // console.log(response.data);
    })
    .catch(function (error) {
        console.log("Error retreiving forecast data for current location");
    });
    return forecastData;
};

export const searchForecastByCity = (searchTerm) => {
    axios.get(config.forecast_url, {
        params: {
            q: searchTerm,
            appid: config.appid,
        }
    })
    .then(function (response) {
        forecastData = response.data;
        // console.log(response.data);
    })
    .catch(function (error) {
        console.log("Error retreiving forecast data for entered city");
    })
    .finally(function () {
        return forecastData;
    });
};