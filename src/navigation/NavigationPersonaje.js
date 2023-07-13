import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Rickandmorty from '../screen/Rickandmorty';
import Personaje from '../screen/Personaje';



export default function NavigationPersonaje() {

    const Stack = createStackNavigator();
  return (
    <Stack.Navigator  >
        <Stack.Screen name='Rickmorty' component={Rickandmorty} options={{headerShown: false}}/>
        <Stack.Screen name='Personaje' component={Personaje} options={{title: "Personaje"}}/>
    </Stack.Navigator>
  )
}