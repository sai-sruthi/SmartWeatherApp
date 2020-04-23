import React, { useEffect } from 'react';
import { View, Text, TextInput, Switch, TouchableOpacity, StyleSheet } from 'react-native';
import styles from '../styles';
import { registerUser } from '../services/welcomeService';

export default function Register({ user, setName, setPassword, setUpdates, setBusinessUser, registerUser }) {
    return (
        <View>
            <Text style={styles.sectionHeader}>Register</Text>
            {/* <Text style={styles.label}>Name</Text> */}
            <TextInput
                style={styles.input}
                placeholder="Name"
                onChangeText={setName} />
            {/* <Text style={styles.label}>Password</Text> */}
            <TextInput
                secureTextEntry={true}
                style={styles.input}
                placeholder="Password"
                onChangeText={setPassword} />
            {/* <Text style={styles.label}>Confirm Password</Text> */}
            <TextInput
                secureTextEntry={true}
                style={styles.input}
                placeholder="Confirm Password"
                onChange={() => { }} />
            <Text style={styles.label}>
                Receive Promotion Alerts?
            </Text>
            <View style={styles.options, localStyles.wrapper}>
                <View style={styles.optionWrapper}>
                    <Text style={localStyles.option}>{'Nay'}</Text>
                    <Switch value={user.updates} onValueChange={setUpdates} />
                    <Text style={localStyles.option}>{'Yay'}</Text>
                </View>
            </View>
            <Text style={styles.label}>Business user?</Text>
            <View style={styles.options, localStyles.wrapper}>
                <View style={styles.optionWrapper}>
                    <Text style={localStyles.option}>{'Nay'}</Text>
                    <Switch value={user.isBusinessUser} onValueChange={setBusinessUser} />
                    <Text style={localStyles.option}>{'Yay'}</Text>
                </View>
            </View>
            <TouchableOpacity
                style={styles.submit}
                onPress={registerUser}>
                <Text style={styles.btnLabel}>Create Account</Text>
            </TouchableOpacity>
        </View>

    );
};

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