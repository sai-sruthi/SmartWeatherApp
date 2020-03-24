import React, { useState } from 'react';
import { View, Text, TouchableWithoutFeedback, Keyboard } from 'react-native';
import styles from '../styles';
import Login from './login';
import Register from './register';
import { authenticateUser as authUser, registerUser as regUser } from '../services/welcomeService';

export default function Welcome() {
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
        authUser(user);
    }
    const registerUser = () => {
        regUser(user);
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