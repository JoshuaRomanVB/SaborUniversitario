import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

/**
 * 
 * @param {String} handleNavigate - Pantalla a la que se va a navegar 
 * @param {String} screenCalled - Pantalla donde se llama al boton
 * @returns 
 */
export default function FloatButton ( { handleNavigate, screenCalled } ) {
    const navigation = useNavigation();
    const backgroundColor = screenCalled === 'home' ? "#FF773D" : "#f88";
    const plusColor = screenCalled === 'home' ? "#fff" : "#000";
    
    return (
        <TouchableOpacity
            style={{...styles.button, backgroundColor: backgroundColor}}
            onPress={() => navigation.navigate(handleNavigate)}
        >
            <AntDesign name="plus" size={24} color={plusColor} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        width: 70,
        position: 'absolute',
        bottom: 10,
        right: 10,
        height: 70,
        borderRadius: 100,
    }
})