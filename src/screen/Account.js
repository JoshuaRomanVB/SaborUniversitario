import { View, Text, SafeAreaView, StyleSheet} from 'react-native';
import React, { useState } from 'react';
import UserData from '../components/Auth/UserData';
import LoginForm from '../components/Auth/LoginForm';
import useAuth from '../hooks/useAuth';

export default function Account() {
  const {auth} =useAuth() // Estado de autenticación
  return (
    <SafeAreaView style={styles.container}>
      {auth ? <UserData/> : <LoginForm/>} 
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
      flex: 1
  }
})
