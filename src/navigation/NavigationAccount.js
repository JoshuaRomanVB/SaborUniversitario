import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Account from '../screen/Account';



export default function NavigationAccount() {

    const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
        <Stack.Screen name='Account' component={Account} options={{headerShown: false}}/>
    </Stack.Navigator>
  )
}