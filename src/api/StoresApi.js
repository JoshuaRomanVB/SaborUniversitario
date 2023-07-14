import { View, Text } from 'react-native'
import React, { useState, useEffect } from 'react'
import HomeStoresList from '../components/HomeStoresList';
import { db } from '../utils/firebaseConfig';
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import useAuth from '../hooks/useAuth';

export default function StoresApi() {


    const { auth } = useAuth();
    const { id_user } = auth;
    const [listStore, setListStore] = useState([]);

    useEffect(() => {
        // Creamos referencia a la base de datos y a la colección
        const refCollection = collection(db, 'Tiendas');
        const queryFetch = query(refCollection, where('id_user', '==', id_user), where('estatus', '==', 1));

        // Cada que se actualice la colección se ejecutara esta función 
        //para traer las tiendas
        const unsubscribe = onSnapshot(queryFetch, (querySnapshot) => {
            setListStore(
                querySnapshot.docs.map((item) => ({
                    id_store: item.id,
                    name_store: item.data().name_store,
                    description: item.data().description,
                    image_url: item.data().image_url,
                    id_user: item.data().id_user
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
        <View style={{flex: 1, padding: 10}}>
            <HomeStoresList stores={listStore}/>
        </View>
    )
}