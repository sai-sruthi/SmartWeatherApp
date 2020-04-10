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
            check = response.data;
        })
        .catch(function (error) {
            // display a toast, ask to try again
        })
        .finally(function () {
            if (check.check) {
                setContext(check.check, check.user);
                navigation.navigate("Home");
            } else {
                // display a toast
                console.log(check);
            }
        });
};

export const saveUser = async (user, navigation, navigate) => {
    let check = false;
    axios.post(config.server + "/users/", user)
    .then(function (response) {
            if (response.data.userId !== undefined) {
                check = true;
                user = response.data;
            }
    })
    .catch(function (error) {
        // display a toast, ask to try again
    })
    .finally(function () {
        if (check && navigate) {
            setContext(check, user);
            navigation.navigate("Home");
        } else {
            // display a toast
            console.log(check);
        }
    });
}

export const registerUser = async (user, navigation) => {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    if (status !== "granted") {
        alert("Please enable notifications!");
        return;
    }
    user.userToken = await Notifications.getExpoPushTokenAsync();
    navigator.geolocation.getCurrentPosition(
        (position) => {
            user.latitude = position.coords.latitude.toString();
            user.longitude = position.coords.longitude.toString();
            saveUser(user, navigation, true);
        },
        () => {
            // handle this later
            return LOCATION_RETRIEVAL_FAILED;
        },
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 });
};