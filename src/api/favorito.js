import AsyncStorage from '@react-native-async-storage/async-storage';
import {includes, pull} from 'lodash'
import { FAVORITE_STORAGE } from '../utils/constants';


export const getFavoriteApi = async() =>{
    try{
        const response = await AsyncStorage.getItem(FAVORITE_STORAGE);
        return JSON.parse(response|| []);
    } catch(error){
        console.log(error);
    }
};

export const addFavoriteApi = async (id) => {
    try{
        const favorites = await getFavoriteApi();
        favorites.push(id);
        await AsyncStorage.setItem(FAVORITE_STORAGE, JSON.stringify(favorites));
    }catch(error){
        console.log(error)
    }
};

export const isFavoriteApi = async (id) =>{
    try{
        const favorites = await getFavoriteApi();
        return includes(favorites,id);
    }catch(error){
        console.log(error)
        return false;
    }
};

export const removeFavoriteApi = async (id) => {
    try {
      const favorites = await getFavoriteApi();
      const updatedFavorites = pull(favorites, id);
      await AsyncStorage.setItem(FAVORITE_STORAGE, JSON.stringify(updatedFavorites));
    } catch (error) {
      console.log(error);
    }
  };
  
