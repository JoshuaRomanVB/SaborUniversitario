import { View, Text, StyleSheet, ScrollView, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useFormik } from "formik";
import * as Yup from "yup";
import CustomButton from '../components/CustomButton';
import useAuth from '../hooks/useAuth';
import { db } from '../utils/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';

export default function FormStoreScreen() {

    const navigation = useNavigation();
    const { auth } = useAuth();
    const [error, setError] = useState("");
    console.log(auth);

    // Validación de formulario
    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        validateOnChange: false,
        onSubmit: async (formData) => {
            console.log(formData);
            setError("");
        
            console.log("DATOS CORRECTOS");
            const dataStore = {
                name_store: formData.storeName,
                description: formData.storeDescription
            }
            saveStore(dataStore);
            
        },
    });

    /**
     * Función para guardar en la base de datos la tienda
     * @param {Object} dataStore - objeto con los datos de la tienda
     */
    const saveStore = async (dataStore) => {

        try {
            await addDoc(collection(db, 'Tiendas'), dataStore);
            navigation.goBack();
        } catch (error) {
            console.log("ERROR SAVE STORE");
            console.log(error);
        }
    }

    /**
     * Función para establecer parámetros iniciales
     * @returns {Object} parámetros iniciales de formulario
     */
    function initialValues() {
        return {
            storeName: "",
            storeDescription: "",
        };
    }

    /**
     * Función para definir mensaje de errores en la validación de formulario
     * @returns {Object} mensaje de errores
     */
    function validationSchema() {
        return {
            storeName: Yup.string().required("EL nombre de tienda es obligatorio."),
            storeDescription: Yup.string().required("La descripción de tienda es obligatoria"),
        };
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={{backgroundColor: '#fff'}}>
                <View style={styles.screenTop}>
                    <Text>Crear tienda</Text>
                </View>
                <View style={styles.screenContent}>
                    <Text style={styles.text}>Nombre de tienda</Text>
                    <TextInput
                        placeholder={"Escribe un nombre de tienda"} 
                        placeholderTextColor="#C9C9C9"
                        style={styles.input}
                        autoCapitalize="none"
                        value={formik.values.storeName}
                        onChangeText={(text) => formik.setFieldValue("storeName", text)}
                    />
                    <Text style={styles.error}>{formik.errors.storeName}</Text>

                    <Text style={styles.text}>Descripción</Text>
                    <TextInput
                        placeholder={"Escribe una breve descripción de la tienda"} 
                        placeholderTextColor="#C9C9C9"
                        style={styles.input}
                        autoCapitalize="none"
                        value={formik.values.storeDescription}
                        onChangeText={(text) => formik.setFieldValue("storeDescription", text)}
                    />
                    <Text style={styles.error}>{formik.errors.storeDescription}</Text>

                    <CustomButton title={'Guardar'} onPress={formik.handleSubmit}/>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    screenTop: {
        flex: 0.3,
        height: 280,
        backgroundColor: '#FF773D',
        justifyContent: 'center',
        alignItems: 'center'
    },
    screenContent: {
        backgroundColor: '#fff',
        marginTop: -40,
        borderTopLeftRadius: 40, 
        borderTopRightRadius: 40,
        padding: 20
    },
    input: {
        height: 50,
        width: "100%",
        padding: 10,
        borderRadius: 10,
        backgroundColor: "#FFF",
        color: "#000",
        // Estilos para Android
        elevation: 2,
        // Estilos para iOS
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
        error: {
        color: "#F70303",
        textAlign: "center",
        marginVertical: 10,
    },
})