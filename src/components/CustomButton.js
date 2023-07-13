import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function CustomButton({ title, onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#1dadc0', // Cambia aquí el color de fondo deseado
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 50,
  },
  buttonText: {
    color: 'white', // Cambia aquí el color del texto deseado
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
