import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";

import axios from "axios";
import RickandmortyList from "../components/RickandmortyList";

export default function Rickandmorty({navigation}) {

  const [characters, setCharacters] = useState([]);
 
  const API_URL = "https://rickandmortyapi.com/api/character";

  useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await axios.get(API_URL);
              setCharacters(response.data.results);
          } catch (error) {
              console.error(error);
          }
      };
      fetchData();
  }, []);
  return (
 //Crear componente importar y pasar props
      <View >
      
          <RickandmortyList characters={characters} navigation={navigation}/>
      </View>
  );
}
