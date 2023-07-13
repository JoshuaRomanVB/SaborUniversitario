import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from "react-native-vector-icons/FontAwesome5";
import { addFavoriteApi, isFavoriteApi, removeFavoriteApi } from '../api/favorito';
import { set } from 'react-native-reanimated';

export default function Favoritos(props) {
    const {id} =props
    const [isFavorite, setIsFavorite] = useState(undefined);

    useEffect(()=>{
        (async()=>{
            const response = await isFavoriteApi(id)
            if (response) setIsFavorite(true)
            else setIsFavorite(false)
        })()
    },[])
  const addFavorite =  async() =>{
    await addFavoriteApi(id)
    setIsFavorite(true)
  }

  const removeFavorite= async()=>{
    await removeFavoriteApi(id)
    setIsFavorite(false)
  }
    return (
   <Icon
        name='heart'
        color='white'
        size={30}
        onPress={isFavorite ? removeFavorite : addFavorite}
        style={{marginLeft:20, marginTop:30}}
        solid={isFavorite}
        />    
  )
}