import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Account from '../screen/Account';
import Favoritos from '../screen/Favoritos';



export default function NavigationFavoritos() {

    const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
        <Stack.Screen name='Favoritos' component={Favoritos} options={{title: "Chats"}}/>
    </Stack.Navigator>
  )
}