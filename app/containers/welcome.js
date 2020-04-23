import React, { useState, useEffect } from 'react';
import {
    View, Text, TouchableHighlight, TouchableWithoutFeedback, Keyboard, AsyncStorage,
    ScrollView, Modal, StyleSheet
} from 'react-native';
import styles from '../styles';
import Login from '../components/login';
import Register from '../components/register';
import { authenticateUser as authUser, registerUser as regUser, saveUser } from '../services/welcomeService';
import { Notifications } from 'expo';

// TODO: create a reducer for all the functions
// if time permits
export default function Welcome({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [notification, setNotification] = useState({text: "", body: ""});
    useEffect(() => {
        // TODO: compare token with db token instead of
        // the token stored in async storage
        async function checkIfLoggedIn() {
            const loggedIn = await AsyncStorage.getItem("loggedIn");
            if (JSON.parse(loggedIn)) {
                token = await Notifications.getExpoPushTokenAsync();
                const temp = await AsyncStorage.getItem("user");
                let user = JSON.parse(temp);
                if (user != null) {
                    if (user.userToken != token) {
                        user.userToken = token;
                        await saveUser(user, navigation, false);
                        await AsyncStorage.removeItem("user");
                        await AsyncStorage.setItem("user", JSON.stringify(user));
                        navigation.navigate("Home");
                    } else {
                        navigation.navigate("Home");
                    }
                }
            }
        }
        this._notificationSubscription = Notifications.addListener(handleNotification);
        checkIfLoggedIn();
    }, []);
    const [user, setUser] = useState({
        userName: "",
        userPswd: "",
        updates: false,
        isBusinessUser: false,
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
            isBusinessUser: value
        });
    }
    const authenticateUser = () => {
        authUser(user, navigation);
    }
    const registerUser = () => {
        regUser(user, navigation);
    }
    const handleNotification = (notification) => {
        setNotification(notification.data);
        setModalVisible(true);
    }
    return (
        <ScrollView>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    console.log("closed");
                }}
            >
                <View style={localStyles.centeredView}>
                    <View style={localStyles.modalView}>
                    <Text style={localStyles.modalText}>{notification.title}</Text>
                        <Text style={{...localStyles.modalText, marginBottom: 10}}>{notification.body}</Text>
                        <TouchableHighlight
                            style={{...styles.submit, marginBottom: 0, backgroundColor: '#5DBCD2'}}
                            onPress={() => {
                                setModalVisible(!modalVisible);
                            }}
                        >
                            <Text style={localStyles.textStyle}>Close</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </Modal>
            <TouchableWithoutFeedback
                onPress={() => {
                    Keyboard.dismiss();
                }}>
                <View style={styles.mainContainer}>
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
        </ScrollView>
    );
}

const localStyles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 10,
        padding: 10,
        alignItems: "center"
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        fontSize: 20,
        fontWeight: "400",
        marginBottom: 4,
        textAlign: "center"
    }
});
