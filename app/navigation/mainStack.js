import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Welcome from '../containers/welcome';
import Main from '../containers/main';
import Settings from '../components/settings';
import {Forecast} from '../containers/forecast';

const Stack = createStackNavigator();

function Navigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Welcome">
                <Stack.Screen name="Welcome" component={Welcome} options={{
                    title: "",
                    headerStyle: {
                        height: 0
                    }
                }} />
                <Stack.Screen name="Home" component={Main} options={{
                    headerLeft: null,
                    title: "",
                    headerStyle: {
                        height: 0
                    }
                }} />
                <Stack.Screen name="Settings" component={Settings} options={{
                    headerLeft: null,
                    title: "",
                    headerStyle: {
                        height: 0
                    }
                }} />
                <Stack.Screen name="Forecast" component={Forecast} options={{
                    title: "",
                    headerStyle: {
                        height: 0
                    }
                }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Navigator;