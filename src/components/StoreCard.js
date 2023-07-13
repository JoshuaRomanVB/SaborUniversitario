import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

export default function StoreCard({dataStore}) {

    const navigation = useNavigation();

    let name_store;
    try {
        name_store = dataStore.name_store;
        
    } catch (error) {
        name_store = "NO NAME";
        
    }

    /**
     * Función para redireccionar a la screen del formulario de tienda
     * @date 7/13/2023 - 8:28:48 AM
     * @author Alessandro Guevara
     */
    const handlePressCard = () => {
        navigation.navigate('FormStore', {
            dataStore: dataStore
        });
    }

    return (
        <TouchableOpacity 
            style={styles.container}
            onPress={() => handlePressCard()}
        > 
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