import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from '../screen/HomeScreen';
import FormStoreScreen from '../screen/FormStoreScreen';
import ProductsScreen from '../screen/ProductsScreen';
import FormProductScreen from '../screen/FormProductScreen';

export default function NavigationHome() {

    const Stack = createStackNavigator();
    return (
        <Stack.Navigator  >
            <Stack.Screen name='HomeScreen' component={HomeScreen} options={{headerShown: false}}/>
            <Stack.Screen name='FormStore' component={FormStoreScreen} options={{ headerShown: false }}/>
            <Stack.Screen name='Products' component={ProductsScreen} options={{headerShown: false}}/>
            <Stack.Screen name='FormProduct' component={FormProductScreen} options={{ headerShown: false }}/>
        </Stack.Navigator>
    )
}