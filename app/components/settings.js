import React, { useEffect, useState } from 'react';
import { View, Text, AsyncStorage, TouchableOpacity, TextInput, StyleSheet, Switch } from 'react-native';
import styles from '../styles';
import { saveUser } from '../services/welcomeService';
import { sendNotifications } from '../services/notificationService';

// TODO: save user preference to the db and async storage
const togglePromotionalNotifications =
    (user, updatePreference, savePreference) => (
        <View>
            <Text style={styles.label}>Receive Promotional Notifications?</Text>
            <View style={styles.options, localStyles.wrapper}>
                <View style={styles.optionWrapper}>
                    <Text style={localStyles.option}>{'Nay'}</Text>
                    <Switch value={user.updates} onValueChange={updatePreference} />
                    <Text style={localStyles.option}>{'Yay'}</Text>
                </View>
            </View>
            <TouchableOpacity
                style={styles.submit}
                onPress={savePreference}>
                <Text style={styles.btnLabel}>Update Notification Preference</Text>
            </TouchableOpacity>
        </View>
    );

const createPromotionalNotification = (userId, notification, setNotification) => (
    <View
        style={styles.wrapper}>
        <Text
            style={styles.label}>
            Create a promotional notification
            </Text>
        <TextInput
            placeholder="Title"
            value={notification.title}
            onChangeText={(value) => {
                setNotification({
                    ...notification,
                    title: value
                })
            }}
            style={styles.largeInput}>
        </TextInput>
        <TextInput
            placeholder="Body"
            value={notification.body}
            onChangeText={(value) => {
                setNotification({
                    ...notification,
                    body: value
                })
            }}
            style={styles.largeInput}>
        </TextInput>
        <TouchableOpacity
            style={styles.submit}
            onPress={() => {
                async function send() {
                    await sendNotifications(userId, notification);
                    setNotification({
                        to: [],
                        title: "",
                        body: ""
                    })
                };
                send();
            }}>
            <Text style={styles.btnLabel}>Create discount notification</Text>
        </TouchableOpacity>
    </View>
);

export default function Settings({ route, navigation }) {
    let temp = route.params.user;
    const [user, setUser] = useState(temp);
    const [notification, setNotification] = useState({
        to: [],
        title: "",
        body: ""
    });
    const updatePreference = () => {
        setUser({
            ...user,
            updates: !user.updates,
        });
    }
    const savePreference = () => {
        async function save() {
            console.log(user);
            await saveUser(user, navigation, false);
            await AsyncStorage.removeItem("user");
            await AsyncStorage.setItem("user", JSON.stringify(user));
            const temp = await AsyncStorage.getItem("user");
            console.log(temp);
            alert("Preference saved!");
        };
        save();
    }
    let toggleNotifications =
        togglePromotionalNotifications(user, updatePreference, savePreference);
    let createNotification = user.isBusinessUser ? (
        createPromotionalNotification(user.userId, notification, setNotification)
    ) : (<View></View>);
    return (
        <View style={styles.mainContainer}>
            {toggleNotifications}
            {createNotification}
        </View>
    );
}

const localStyles = StyleSheet.create({
    wrapper: {
        marginBottom: 10,
    },
    option: {
        textAlign: 'center',
        fontSize: 14,
        margin: 10,
        color: '#FFFFFF',
    },
});