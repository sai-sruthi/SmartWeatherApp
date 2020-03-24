import axios from 'axios';
import config from '../../config';

export function authenticateUser(user) {
    axios.post(config.server + '/users/authenticate/', user)
        .then(function (response) {
            // evaluate response, redirect to home page
            console.log(response);
        })
        .catch(function (error) {
            // display a toast, ask to try again
        });
};

export function registerUser(user) {
    navigator.geolocation.getCurrentPosition(
        (position) => {
            user.latitude = position.coords.latitude.toString();
            user.longitude = position.coords.longitude.toString();
            console.log(user);
            axios.post(config.server + '/users/', user)
                .then(function (response) {
                    // display a toast, redirect to home page
                    console.log(response);
                })
                .catch(function (error) {
                    // display a toast, ask to try again
                });
        },
        () => {
            // handle this later
            return LOCATION_RETRIEVAL_FAILED;
        },
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 });
};