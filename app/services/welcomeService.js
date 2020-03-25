import axios from 'axios';
import config from '../../config';

export function authenticateUser(user, navigation) {
    let check = false;
    axios.post(config.server + '/users/authenticate/', user)
        .then(function (response) {
            // TODO: set context
            check = response.data;
        })
        .catch(function (error) {
            // display a toast, ask to try again
        })
        .finally(function () {
            if (check) {
                navigation.navigate("Home");
            } else {
                // display a toast
                console.log(check);
            }
        });
};

export function registerUser(user, navigation) {
    let check = false;
    navigator.geolocation.getCurrentPosition(
        (position) => {
            user.latitude = position.coords.latitude.toString();
            user.longitude = position.coords.longitude.toString();
            console.log(user);
            axios.post(config.server + '/users/', user)
                .then(function (response) {
                    console.log(response.data);
                    // TODO: set context
                    if (response.data.userId !== undefined) {
                        check = true;
                    }
                })
                .catch(function (error) {
                    // display a toast, ask to try again
                })
                .finally(function () {
                    if (check) {
                        navigation.navigate("Home");
                    } else {
                        // display a toast
                        console.log(check);
                    }
                });
        },
        () => {
            // handle this later
            return LOCATION_RETRIEVAL_FAILED;
        },
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 });
};