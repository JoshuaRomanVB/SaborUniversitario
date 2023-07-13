import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, FlatList, ImageBackground } from "react-native";
import axios from "axios";
import HeaderInfo from "../components/HeaderInfo";
import TableInfo from "../components/TableInfo";
import useAuth from "../hooks/useAuth";
import Favoritos from "../components/Favoritos";

export default function Personaje({ route }) {
  const { characters } = route.params;
  const {auth} = useAuth()
  const [location, setLocation] = useState(null);
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    fetchLocation();
    fetchEpisodes();
  }, []);

  let color = "#4FEE00"; // Variable local para almacenar el color

  if (characters.status === "Dead") {
    color = "#EE2400"; // Actualiza el color si el personaje está muerto
  }

  const fetchLocation = async () => {
    try {
      const response = await axios.get(characters.location.url);
      setLocation(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchEpisodes = async () => {
    try {
      const episodePromises = characters.episode.map((episodeUrl) =>
        axios.get(episodeUrl)
      );
      const episodeResponses = await Promise.all(episodePromises);
      const episodeData = episodeResponses.map((response) => response.data);
      setEpisodes(episodeData);
    } catch (error) {
      console.error(error);
    }
  };

  if (!location || episodes.length === 0) {
    // Si aún no se ha cargado la ubicación o no hay episodios, muestra un mensaje de carga o un indicador de carga aquí
    return null;
  }

  return (
    <ImageBackground
      source={require("../assets/images/background.jpg")} // Ruta de la imagen de fondo
      style={styles.background}
    >
      <View style={styles.container}>
        <HeaderInfo characters={characters} />

        <FlatList
          data={[{ key: "location" }, { key: "episodes" }]}
          renderItem={({ item }) => {
            if (item.key === "location") {
              return (
                <View style={styles.backgroundplanetsContainer}>
                <ImageBackground
                  source={require("../assets/images/planets.jpg")} // Ruta de la imagen de fondo
                  style={styles.backgroundplanets}
                >
                  <View style={styles.locationContainer}>
                    <Text style={styles.heading}>Ubicación:</Text>
                    <Text style={styles.sub}>{location.name}</Text>
                    <Text style={styles.sub}>{location.dimension}</Text>
                  </View>
                </ImageBackground>
              </View>
              );
            } else if (item.key === "episodes") {
              return (
                <View style={styles.episodesContainer}>
                  <Text style={styles.heading}>Episodios:</Text>
                  {episodes.map((episode) => (
                    <Text key={episode.id} style={styles.sub}>
                      {episode.name}
                    </Text>
                  ))}
                </View>
              );
            }
            return null;
          }}
          keyExtractor={(item) => item.key}
          ListHeaderComponent={
            <>
              <Image
                source={{ uri: characters.image }}
                style={[styles.image, { borderColor: color }]} // Establece el color del borde de la imagen
              />
              {auth && <Favoritos id={characters.id}/>}
              
              <Text style={[styles.status, { backgroundColor: color }]}>{characters.status}</Text>
              <TableInfo characters={characters} />
            </>
          }
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  backgroundplanets: {
    flex: 1,
    borderRadius: 10,
   
  },
  backgroundplanetsContainer: {
    flex: 1,
    marginHorizontal: 40,
    marginVertical: 20,
    borderRadius: 20, // Agrega el borde redondo con el valor deseado
    overflow: "hidden",
     // Para recortar el contenido dentro del contenedor
  },
  container: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Ajusta la opacidad del fondo si es necesario
  },
  locationContainer: {
    paddingHorizontal: 20,
    borderRadius:20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  episodesContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 180,
    borderWidth: 5,
    alignSelf: "center",
  },
  name: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
    color: "#FFF",
  },
  status:{
    width:100,
    textAlign: 'center',
    alignSelf : "center",
    color: "#FFF",
    margin: 10,
    fontSize: 24,
    fontWeight: 'bold',
    borderRadius: 10,
  },
  sub: {
    fontSize: 22,
    textAlign: "center",
    marginVertical: 10,
    color: "#FFF",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
    color: "#FFF",
  },
});
