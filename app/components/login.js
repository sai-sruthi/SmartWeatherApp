import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import styles from '../styles';

export default function Login({ setName, setPassword, authenticateUser }) {
    return (
        <View>
            <Text style={styles.sectionHeader}>Login</Text>
            <Text style={styles.label}>Username</Text>
            <TextInput
                style={styles.input}
                placeholder="eg. John Doe"
                onChangeText={setName} />
            <Text style={styles.label}>Password</Text>
            <TextInput
                secureTextEntry={true}
                style={styles.input}
                placeholder="Secret"
                onChangeText={setPassword} />
            <TouchableOpacity
                style={styles.submit}
                onPress={authenticateUser}>
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