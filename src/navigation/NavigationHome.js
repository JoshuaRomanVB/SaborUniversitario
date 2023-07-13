import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from '../screen/HomeScreen';
import FormStoreScreen from '../screen/FormStoreScreen';

export default function NavigationHome() {

    const Stack = createStackNavigator();
    return (
        <Stack.Navigator  >
            <Stack.Screen name='HomeScreen' component={HomeScreen} options={{headerShown: false}}/>
            <Stack.Screen name='FormStore' component={FormStoreScreen} options={{ headerShown: false }}/>
        </Stack.Navigator>
    )
}