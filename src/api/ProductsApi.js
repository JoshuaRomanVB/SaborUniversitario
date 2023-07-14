import { View, Text } from 'react-native'
import React, { useState, useEffect } from 'react'
import ProductsList from '../components/ProductsList';
import { db } from '../utils/firebaseConfig';
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import useAuth from '../hooks/useAuth';

export default function ProductsApi({idStore, nameStore, imageStore, idUserStore, dataStore}) {


    const { auth } = useAuth();
    const id_user_sesion  = auth.id_user;
    const [listProducts, setListProducts] = useState([]);
    const {  
        id_store, name_store, description,
        image_url,school_store, id_user
    } = dataStore;

    useEffect(() => {
        // Creamos referencia a la base de datos y a la colección
        const refCollection = collection(db, 'Productos');
        const queryFetch = query(refCollection, where('id_store', '==', id_store), where('estatus', '==', 1));

        // Cada que se actualice la colección se ejecutara esta función 
        //para traer las tiendas
        const unsubscribe = onSnapshot(queryFetch, (querySnapshot) => {
            // setListProducts(
            //     querySnapshot.docs.map((item) => ({
            //         id_product: item.id,
            //         name_store: item.data().name_store,
            //         description: item.data().description,
            //         image_url: item.data().image_url,
            //         id_user: item.data().id_user
            //     }))
            // )
            querySnapshot.docs.map((item) => {
                console.log(item.id);
            })
            const objStores = querySnapshot.docs.map((item) => ({
                id_product: item.id,
                ...item.data()
            }))
            console.l
            setListProducts(objStores);
            
        });

        // Se deberá de terminar la consulta que regresa onSnapshot
        return () => unsubscribe();
    }, []);

    return (
        <View style={{flex: 1}}>
            <ProductsList products={listProducts} dataStore={dataStore}/>
        </View>
    )
}