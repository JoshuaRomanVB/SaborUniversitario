import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import ProductsApi from '../api/ProductsApi'


export default function ProductsScreen(props) {
    const dataStore = props.route.params.dataStore;
    const id_store = dataStore === undefined ? undefined : dataStore.id_store;
    const name_store = dataStore === undefined ? undefined : dataStore.name_store;
    const description = dataStore === undefined ? undefined : dataStore.description;
    const image_url = dataStore === undefined ? "" : dataStore.image_url;
    const school_store = dataStore === undefined ? "" : dataStore.school_store;

    return (
        <SafeAreaView style={styles.container}>
            <ProductsApi idStore={id_store} nameStore={name_store}/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})