import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, ImageBackground } from 'react-native';
import RickandmortyApi from "../api/RickandmortyApi";

export default function Rickandmorty({ navigation }) {
  return (
    <ImageBackground
      source={require('../assets/images/background.jpg')} // Ruta de la imagen de fondo
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <RickandmortyApi navigation={navigation} />
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Opcional: para agregar un color de fondo semitransparente
    alignItems: 'center',
    justifyContent: 'center',
  },
});
