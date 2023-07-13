import React from 'react';
import { View, Text, TouchableWithoutFeedback, Image, StyleSheet } from 'react-native';

export default function Rickandmortycard(props) {
  const { characters, navigation } = props;

  const goToPersonaje = () => {
    navigation.navigate("Personaje", { characters: characters });
  }

    // Verificar si no hay datos cargados
    if (characters.length === 0 && isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <CustomActivityIndicator />
        </View>
      );
    }

    
  return (
    <TouchableWithoutFeedback onPress={goToPersonaje}>
      <View style={styles.card}>
        <View style={styles.colorCard}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: characters.image }} style={styles.image} />
          </View>
          <View style={styles.bottomContainer}>
            <Text style={styles.number}>#{`${characters.id}`.padStart(3, 0)}</Text>
            <View style={styles.containerText}>
              <Text style={styles.name} numberOfLines={3}>{characters.name}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  card: {
    flexGrow: 1,
    height: 220,
    width: 190,
    padding: 5,
  },
  colorCard: {
    flex: 1,
    padding: 5,
    borderRadius: 10,
    borderColor: '#bbdf5e',
    borderWidth: 3,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 130,
    height: 130,
    borderRadius: 90,
    borderColor: '#FFF',
    borderWidth: 3,
  },
  bottomContainer: {
    backgroundColor: '#fff',
    padding: 5,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  number: {
    color: '#000',
    fontSize: 11,
  },
  name: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 14,
  },
  containerText: {
    width: 150,
  },
});
