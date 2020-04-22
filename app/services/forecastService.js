import axios from 'axios';
import config from '../../config';

export const searchForecastByCoordinates = async (latitude, longitude) => {
    let forecastData = {};
    let dailyData = {};
    await axios.get(config.forecast_url, {
        params: {
            lat: latitude,
            lon: longitude,
            appid: config.appid,
        }
    })

    .then(function (response) {
        forecastData = response.data;
        dailyData = forecastData.list.filter(reading => {   
        return reading.dt_txt.includes("18:00:00")
        
    })
    
    })
    .catch(function (error) {
        console.log("Error retreiving forecast data for current location");
    });
    dailyData.push(forecastData.city);
    // console.log("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF");
    // console.log(dailyData);
    return dailyData;
    
};

export const searchForecastByCity = async (searchTerm) => {
    let forecastData = {};
    let dailyData = {};
    await axios.get(config.forecast_url, {
        params: {
            q: searchTerm,
            appid: config.appid,
        }
    })
    .then(function (response) {
        forecastData = response.data;
        dailyData = forecastData.list.filter(reading => {   
            return reading.dt_txt.includes("18:00:00")
            
        })
    })
    .catch(function (error) {
        console.log("Error retreiving forecast data for entered city");
    })
    dailyData.push(forecastData.city);
    // console.log(dailyData);
    return dailyData;
};