import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Account from '../screen/Account';
import LoginForm from '../components/Auth/LoginForm';
import Navigation from './Navigation';
import CrearCuenta from '../screen/RegisterScreen';
import OlvideContraScreen from '../screen/OlvideScreen';
import ChatScreen from '../screen/ChatScreen';



export default function NavigationAccount() {

    const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name='Login' component={LoginForm} options={{headerShown: false}}/>
        <Stack.Screen name='CreateCuenta' component={CrearCuenta} options={{headerShown: false}}/>
        <Stack.Screen name='Olvide' component={OlvideContraScreen} options={{title: "Olvide mi contraseña"}}/>
        <Stack.Screen name='Tabs' component={Navigation} options={{headerShown: false}}/>
        <Stack.Screen name="chat" component={ChatScreen} />
    </Stack.Navigator>
  )
}