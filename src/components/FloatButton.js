import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { colors } from "../styles/colors";

/**
 * 
 * @param {Function Callback} handleNavigateTo - Función para navegar a otra screen 
 * @param {String} screenCalled - Pantalla donde se llama al botón
 * @returns 
 */
export default function FloatButton ( { handleNavigateTo, screenCalled } ) {
    const backgroundColor = screenCalled === 'home' ? colors.primary : screenCalled === "products" ? colors.primary : "#f88";
    const plusColor = screenCalled === 'home' ? "#fff" : "#000";
    
    return (
        <TouchableOpacity
            style={{...styles.button, backgroundColor: backgroundColor}}
            onPress={() => handleNavigateTo()}
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