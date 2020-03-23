import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import styles from '../styles';

export default function Login() {
    return (
        <View>
            <Text style={styles.sectionHeader}>Login</Text>
            <Text style={styles.label}>Username</Text>
            <TextInput
                style={styles.input}
                placeholder="eg. John Doe"
                onChangeText={() => { }} />
            <Text style={styles.label}>Password</Text>
            <TextInput
                secureTextEntry={true}
                style={styles.input}
                placeholder="Secret"
                onChangeText={() => { }} />
            <TouchableOpacity
                style={styles.submit}
                onPress={() => { }}>
                <Text style={styles.btnLabel}>Login</Text>
            </TouchableOpacity>
        </View>
    );
}

const localStyles = StyleSheet.create({
    wrapper: {
        marginBottom: 5,
    },
    option: {
        textAlign: 'center',
        fontSize: 14,
        margin: 10,
        color: '#FFFFFF',
    },
});