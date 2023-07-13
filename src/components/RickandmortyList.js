import React,{useState, useEffect} from 'react';
import { View, Text, StyleSheet, SafeAreaView,FlatList, ActivityIndicator } from 'react-native';
import axios from 'axios';
import Rickandmortycard from './Rickandmortycard';
import CustomActivityIndicator from './CustomActivityIndicator';

export default function RickandmortyList({ navigation }) {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchNewPage();
  }, []);

  const fetchNewPage = async () => {
    try {
      setIsLoading(true);
      const url = `https://rickandmortyapi.com/api/character/?page=${page}`;
      const response = await axios.get(url);
      setCharacters((prevCharacters) => [...prevCharacters, ...response.data.results]);
      setPage((prevPage) => prevPage + 1);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  // Verificar si no hay datos cargados
  if (characters.length === 0 && isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <CustomActivityIndicator />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.listContainer}>
        <FlatList
          data={characters}
          numColumns={2}
          renderItem={({ item }) => <Rickandmortycard characters={item} navigation={navigation} />}
          keyExtractor={(characters) => String(characters.id)}
          onEndReachedThreshold={0.5}
          ListFooterComponent={isLoading && characters.length > 0 && <CustomActivityIndicator />}
          onEndReached={() => {
            if (!isLoading) {
              fetchNewPage();
            }
          }}
        />
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
    justifyContent: 'center',
    alignItems: 'center',
  },
});
