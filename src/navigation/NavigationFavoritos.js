import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ChatsScreen from '../screen/ChatsScreen';
import ChatScreen from '../screen/ChatScreen';



export default function NavigationFavoritos() {

    const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
        <Stack.Screen name='chats' component={ChatsScreen} options={{headerShown: false}}/>
        <Stack.Screen name='chat' component={ChatScreen} options={{title: "Chat"}}/>
    </Stack.Navigator>
  )
}