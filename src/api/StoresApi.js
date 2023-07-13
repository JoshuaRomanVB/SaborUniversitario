import { View, Text } from 'react-native'
import React, { useState, useEffect } from 'react'
import HomeStoresList from '../components/HomeStoresList';
import { db } from '../utils/firebaseConfig';
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';

export default function StoresApi() {

    const [listStore, setListStore] = useState([]);
    const storesList = [
        {
            id: 1,
            name: "tienda 1",
        },
        {
            id: 2,
            name: "tienda 2",
        }
    ]


    /**
     * Función para obtener las tiendas almacenadas en la base de datos
     * @returns 
     */
    const getStores = async () => {
        
    }

    useEffect(() => {
        // Creamos referencia a la base de datos y a la colección
        const refCollection = collection(db, 'Tiendas');
        const queryFetch = query(refCollection);

        // Cada que se actualice la colección se ejecutara esta función 
        //para traer las tiendas
        const unsubscribe = onSnapshot(queryFetch, (querySnapshot) => {
            setListStore(
                querySnapshot.docs.map((item) => ({
                        id_store: item.id,
                        name_store: item.data().name_store,
                        description: item.data().description
                }))
            )
            const objStores = querySnapshot.docs.map((item) => ({
                id_store: item.id,
                ...item.data()
            }))
            setListStore(objStores);
            
        });

        // Se deberá de terminar la consulta que regresa onSnapshot
        return () => unsubscribe();
    }, []);

    return (
        <View style={{flex: 1}}>
            <HomeStoresList stores={listStore}/>
        </View>
    )
}