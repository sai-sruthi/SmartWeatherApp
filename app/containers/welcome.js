import React, { useState, useEffect } from 'react';
import { View, Text, TouchableWithoutFeedback, Keyboard } from 'react-native';
import styles from '../styles';
import Login from '../components/login';
import Register from '../components/register';
import { authenticateUser as authUser, registerUser as regUser } from '../services/welcomeService';
import { registerForPushNotifications } from '../services/notificationService';

// TODO: create a reducer for all the functions
// if time permits
export default function Welcome({ navigation }) {
    const [user, setUser] = useState({
        userName: "",
        userPswd: "",
        updates: false,
        businessUser: false,
    });
    const setName = (value) => {
        setUser({
            ...user,
            userName: value
        });
    }
    const setPassword = (value) => {
        setUser({
            ...user,
            userPswd: value
        });
    }
    const setUpdates = (value) => {
        setUser({
            ...user,
            updates: value
        });
    }
    const setBusinessUser = (value) => {
        setUser({
            ...user,
            businessUser: value
        });
    }
    const authenticateUser = () => {
        authUser(user, navigation);
    }
    const registerUser = () => {
        regUser(user, navigation);
    }
    return (
        <TouchableWithoutFeedback
            onPress={() => {
                Keyboard.dismiss();
            }}>
            <View style={styles.loginContainer}>
                <Login
                    setName={setName}
                    setPassword={setPassword}
                    authenticateUser={authenticateUser} />
                <View>
                    <Text style={styles.sectionHeader}>
                        ------------------- OR -------------------
                    </Text>
                </View>
                <Register
                    user={user}
                    setName={setName}
                    setPassword={setPassword}
                    setUpdates={setUpdates}
                    setBusinessUser={setBusinessUser}
                    registerUser={registerUser} />
            </View>
        </TouchableWithoutFeedback>
    );
}