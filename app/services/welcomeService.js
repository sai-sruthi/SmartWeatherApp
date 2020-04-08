import axios from 'axios';
import config from '../../config';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import { AsyncStorage } from 'react-native';

const setContext = async (loggedIn, user) => {
    await AsyncStorage.setItem("loggedIn", JSON.stringify(loggedIn));
    await AsyncStorage.setItem("user", JSON.stringify(user));
};

export const authenticateUser = (user, navigation) => {
    let check = false;
    axios.post(config.server + "/users/authenticate/", user)
        .then(function (response) {
            // TODO: set context
            check = response.data;
        })
        .catch(function (error) {
            // display a toast, ask to try again
        })
        .finally(function () {
            if (check) {
                setContext(true, user);
                navigation.navigate("Home");
            } else {
                // display a toast
                console.log(check);
            }
        });
};

export const registerUser = async (user, navigation) => {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    if (status !== "granted") {
        alert("Please enable notifications!");
        return;
    }
    user.userToken = await Notifications.getExpoPushTokenAsync();
    let check = false;
    navigator.geolocation.getCurrentPosition(
        (position) => {
            user.latitude = position.coords.latitude.toString();
            user.longitude = position.coords.longitude.toString();
            axios.post(config.server + "/users/", user)
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
                        setContext(true, user);
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