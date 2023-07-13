import { getFavoriteApi } from "../api/favorito";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  ImageBackground
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import useAuth from '../hooks/useAuth'
import Rickandmortycard from "../components/Rickandmortycard";
import CustomActivityIndicator from "../components/CustomActivityIndicator";
export default function Favoritos({ navigation }) {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const{auth} = useAuth();


  useFocusEffect(()=>{
    if(auth){
      (async()=>{

      })()
    }
  },[auth])

  useFocusEffect(
    React.useCallback(() => {
      if(auth){
        checkFavorito();
      }
 
    }, [auth])
  );

  const checkFavorito = async () => {
    try {
      setIsLoading(true);
      const response = await getFavoriteApi();
  
      // Construir las URLs utilizando los IDs
      const urls = response.map((id) =>
        `https://rickandmortyapi.com/api/character/${id}`
      );
  
      // Realizar las peticiones a las URLs
      const responses = await Promise.all(urls.map((url) => axios.get(url)));
  
      // Obtener los resultados de las respuestas
      const characters = responses.map((response) => response.data);
  
      setCharacters(characters);
  
      setIsLoading(false);
      console.log(response);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.listContainer}>
      <ImageBackground
      source={require("../assets/background.jpg")} // Ruta de la imagen de fondo
      style={styles.background}
    >
    {!auth ?(
        <Text>Sin logear</Text>
      ): (
        <FlatList
          data={characters}
          numColumns={2}
          renderItem={({ item }) => <Rickandmortycard characters={item} navigation={navigation} />}
          keyExtractor={(characters) => String(characters.id)}
          onEndReachedThreshold={0.5}
          ListFooterComponent={isLoading && characters.length > 0 && <CustomActivityIndicator />}
          onEndReached={() => {
            if (!isLoading) {
           
            }
          }}
        />
      )}
       
          </ImageBackground>
      </View>

    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  background: {
    height: "100%",
    alignContent: "center",
    justifyContent: "center",
  
  },
});
