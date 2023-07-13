import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

export default function StoreCard({dataStore}) {
    let name_store;
    try {
        name_store = dataStore.name_store;
        
    } catch (error) {
        name_store = "NO NAME";
        
    }
    return (
        <TouchableOpacity style={styles.container}>
            <Text>Store {name_store}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10, 
        backgroundColor: '#f999'
    }
});