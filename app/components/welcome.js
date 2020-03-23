import React, { useState } from 'react';
import { View, Text, TouchableWithoutFeedback, Keyboard } from 'react-native';
import styles from '../styles';
import Login from './login';
import Register from './register';

export default function Welcome() {
    const [user, setUser] = useState({
        name: "",
        updates: false,
        businessUser: false,
    });
    const setName = (value) => {
        setUser({
            ...user,
            name: value
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
    return (
        <TouchableWithoutFeedback
            onPress={() => {
                Keyboard.dismiss();
            }}>
            <View style={styles.loginContainer}>
                <Login />
                <View>
                    <Text style={styles.sectionHeader}>
                        ------------------- OR -------------------
                </Text>
                </View>
                <Register
                    user={user}
                    setName={setName}
                    setUpdates={setUpdates}
                    setBusinessUser={setBusinessUser} />
            </View>
        </TouchableWithoutFeedback>
    );
}