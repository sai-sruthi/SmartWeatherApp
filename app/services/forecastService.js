import axios from 'axios';
import config from '../../config';

export const searchForecastByCoordinates = async (latitude, longitude) => {
    let forecastData = {};
    let dailyData = {};
    let return_data = [];
    let nextday_data = {};
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

    nextday_data = forecastData.list.slice(0, 8);   

    return_data.push(dailyData);
    return_data.push(nextday_data);
    return_data.push(forecastData.city);

    })
    .catch(function (error) {
        // console.log(error);
        console.log("Error retreiving forecast data for current location");
    });
    
    return return_data;
    
};

export const searchForecastByCity = async (searchTerm) => {
    let forecastData = {};
    let dailyData = {};
    let return_data = [];
    let nextday_data = {};
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

        nextday_data = forecastData.list.slice(0, 8);
        
        return_data.push(dailyData);
        return_data.push(nextday_data);
        return_data.push(forecastData.city);
    })
    .catch(function (error) {
        console.log("Error retreiving forecast data for entered city");
        alert("Enter a valid location!");
    })
    return return_data;
};