import { View, Text, StyleSheet, ScrollView, TextInput, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useFormik } from "formik";
import * as Yup from "yup";
import CustomButton from '../components/CustomButton';
import useAuth from '../hooks/useAuth';
import { db, storage } from '../utils/firebaseConfig';
import { collection, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes } from 'firebase/storage';
import { useNavigation } from '@react-navigation/native';
import Input from '../components/Input';
import AwesomeAlert from "react-native-awesome-alerts";
import { colors } from '../styles/colors';
import * as ImagePicker from "expo-image-picker";


export default function FormStoreScreen(props) {

    const dataStore = props.route.params.dataStore;
    const id_store = dataStore === undefined ? undefined : dataStore.id_store;
    const name_store = dataStore === undefined ? undefined : dataStore.name_store;
    const  description = dataStore === undefined ? undefined : dataStore.description;
    

    const navigation = useNavigation();
    const { auth } = useAuth();
    const [error, setError] = useState("");
    const [paramsAlert, setParamsAlert] = useState({
        showAlert: false,
        showAlertProgress: true,
        showButtonConfirm: true,
        textBtnConfirm: 'Aceptar',
        showButtonCancel: true,
        textBtnCancel: 'Cancelar',
        showAlertTittle: "Eliminar tienda",
        showAlertMessage: "¿Estás seguro que deseas eliminar la tienda?"
    });
    const [imageUri, setImageUri] = useState("");
    const [fileBlob, setFileBlob] = useState("");
    const [fileName, setFileName] = useState("");

    // Validación de formulario
    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        validateOnChange: false,
        onSubmit: async (formData) => {
            setError("");
        
            

            handleUploadImage().then((result) => {
                if(result) {
                    const objStore = {
                        name_store: formData.storeName,
                        description: formData.storeDescription,
                        image_url: fileName,
                        estatus: 1
                    }
                    if(dataStore != undefined) {
                        updateStore(objStore);
                    }else {
                        saveStore(objStore);
                    }
                }
            })
            
            
        },
    });


    /**
     * Función para guardar en la base de datos la tienda
     * @param {Object} dataStore - objeto con los datos de la tienda
     */
    const saveStore = async (dataStore) => {
        try {
            await addDoc(collection(db, 'Tiendas'), dataStore)
            .then(result => {
                navigation.goBack();
            })
            .catch(error => {
                console.log(error);
            })
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * Función para actualizar tienda en la base de datos
     * @date 7/13/2023 - 8:53:55 AM
     * @author Alessandro Guevara
     *
     * @async
     * @param {Object} dataStore - objeto con los datos de la tienda
     */
    const updateStore = async (dataStore) => {
        const docRef = doc(db, "Tiendas", id_store);

        await updateDoc(docRef, dataStore)
        .then(result => {
            navigation.goBack();
        })
        .catch(error => {
            console.log(error);
        })
    }

    /**
     * Función para eliminar tienda de firebase
     * @date 7/13/2023 - 8:11:02 PM
     * @author Alessandro Guevara
     *
     * @async
     */
    const deleteStore = async () => {
        setParamsAlert({
            ...paramsAlert,
            showAlertProgress: true,
            showAlertTittle: "Eliminar tienda",
            showAlertMessage: "¿Estás seguro que deseas eliminar la tienda?"
        })
        const docRef = doc(db, 'Tiendas', id_store);

        await deleteDoc(docRef)
            .then((result) => {
                console.log("STORE DELETED");
                setParamsAlert({
                    ...paramsAlert,
                    showAlert: false,
                    showAlertProgress: false
                })
                navigation.goBack();
            })
            .catch((error) => {
                console.log("ERROR STORE DELETED");
                setParamsAlert({
                    ...paramsAlert,
                    showAlertProgress: false,
                    showAlertMessage: 'Ocurrió un error',
                    showAlertTittle: 'No se pudo eliminar la tienda'
                })
            })
    }   

    /**
     * Función para abrir galería y seleccionar imagen
     * @date 7/13/2023 - 8:36:15 PM
     * @author Alessandro Guevara
     *
     * @async
     */
    const handleChooseImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
            console.log("Permission denied");
            return;
        }
    
        const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
    
        if (!result.canceled) {
            const fileUri = result.assets[0].uri;
            const fileName = fileUri.substring(fileUri.lastIndexOf("/") + 1);
        
            try {
                // Obtener los datos del archivo como un blob utilizando fetch
                const fileResponse = await fetch(fileUri);
                const fileBlob = await fileResponse.blob();
        
                // Mostrar la imagen seleccionada sin subirla a Firebase Storage
                setImageUri(fileUri);
        
                // Guardar la imagen en una variable para subirla posteriormente
                setFileBlob(fileBlob);
                setFileName(fileName);
            } catch (error) {
                console.error("Error al leer el archivo:", error);
            }
        } else {
            console.log(result);
        }
    };

    // Función para subir la imagen a Firebase Storage y actualizar el enlace en el servidor
    const handleUploadImage = async () => {
        return new Promise(async (resolve) => {
            
            try {
                    console.log("entry alert");
                    setParamsAlert({
                    ...paramsAlert,
                    showAlert: true,
                    showAlertProgress: true,
                    showButtonConfirm: false,
                    textBtnConfirm: 'Aceptar',
                    showButtonCancel: false,
                    textBtnCancel: 'Cancelar',
                    showAlertTittle: "Guardando tienda",
                    showAlertMessage: "Por favor espera un momento"
                });
                // Verificar si hay una imagen seleccionada para subir
                console.log("before if");

                if (fileBlob && fileName) {
                    // Crear una referencia del storage y carpeta y nombre de la imagen que
                    // se va a subir
                    const storageRef = ref(storage, `storesImages/${fileName}`);

                    await uploadBytes(storageRef, imageUri);
                    resolve(true);
                    


                    // Subir el blob al Firebase Storage
                    // const uploadTask = storageRef.put(fileBlob);
                    // uploadTask.on(
                    //     "state_changed",
                    //     null,
                    //     (error) => {
                    //         console.error(error);
                    //         resolve(false);
                    //     },
                    //     () => {
                    //         uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    //             console.log(`Imagen subida: ${downloadURL}`);

                    //             // Actualizar la URL de la imagen en tu estado
                    //             setImageUri(downloadURL);
                    //             resolve(true);
                                
                    //         });
                    //     }
                    // );
                } else {
                    // handleregister("../assets/images/people.png");
                    setParamsAlert({
                        ...paramsAlert,
                        showAlert: true,
                        showAlertProgress: false,
                        showButtonConfirm: false,
                        textBtnConfirm: 'Aceptar',
                        showButtonCancel: true,
                        textBtnCancel: 'Aceptar',
                        showAlertTittle: "Imagen necesaria",
                        showAlertMessage: "Por favor cargar una imagen"
                    });
                    resolve(false);
                }
            } catch (error) {
                console.error("Error al subir la imagen:", error);
                setParamsAlert({
                    ...paramsAlert,
                    showAlert: true,
                    showAlertProgress: false,
                    showButtonConfirm: false,
                    textBtnConfirm: 'Aceptar',
                    showButtonCancel: true,
                    textBtnCancel: 'Aceptar',
                    showAlertTittle: "Error imagen",
                    showAlertMessage: "Ocurrió un error al subir la imagen"
                });
                resolve(false);
                
            }
        })
    };

    /**
     * Función para establecer parámetros iniciales
     * @returns {Object} parámetros iniciales de formulario
     */
    function initialValues() {
        return {
            storeName: name_store != undefined ? name_store : "",
            storeDescription: description != undefined ? description : "",
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

    /**
     * Función para manejar cuando se presiona botón de eliminar y mostrar alerta
     * @date 7/13/2023 - 7:09:27 PM
     * @author Alessandro Guevara
     */
    const handlePressDelete = () => {
        setParamsAlert({
            ...paramsAlert,
            showAlert: true,
            showAlertProgress: false,
        })
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={{backgroundColor: '#fff'}}>
                <View style={styles.screenTop}>
                    <Text>{name_store != undefined ? `Actualizar tienda: ${name_store}` : "Crear tienda"} </Text>
                </View>
                <View style={styles.screenContent}>
                    <Text style={styles.text}>Nombre de tienda</Text>
                    <Input
                        placeholderText="Escribe un nombre"
                        value={formik.values.storeName}
                        iconName="document-text"
                        autoCapitalize="none"
                        onChangeText={(text) => formik.setFieldValue("storeName", text)}
                    />
                    <Text style={styles.error}>{formik.errors.storeName}</Text>

                    <Text style={styles.text}>Descripción</Text>
                    <Input
                        placeholderText="Escribe una descripción de la tienda"
                        value={formik.values.storeDescription}
                        iconName="copy"
                        autoCapitalize="none"
                        onChangeText={(text) => formik.setFieldValue("storeDescription", text)}
                    />
                    <Text style={styles.error}>{formik.errors.storeDescription}</Text>

                    <Text style={styles.text}>Imagen de portada</Text>
                    {imageUri && (
                        <View style={styles.containerImageStore}>
                            <View style={styles.borderImage}>
                                <Image source={{ uri: imageUri }} style={styles.imageStore} />
                            </View>
                        </View>
                    )}
                    
                    <View style={styles.contentBtnOption}>
                        <CustomButton title={'Cargar imagen'} onPress={() => handleChooseImage()}/>
                    </View>

                    <View style={styles.contentBtnOption}>
                        <CustomButton title={dataStore != undefined ? 'Actualizar' : 'Guardar'} onPress={formik.handleSubmit}/>
                    </View>
                    
                    {dataStore != undefined && (
                        <View style={styles.contentBtnOption}>
                            <CustomButton title={'Eliminar'} onPress={() => handlePressDelete()}/>
                        </View>
                    )}
                    
                </View>
                <AwesomeAlert
                    show={paramsAlert.showAlert}
                    title={paramsAlert.showAlertTittle}
                    message={paramsAlert.showAlertMessage}
                    showProgress={paramsAlert.showAlertProgress}
                    progressColor={colors.primary}
                    progressSize={40}
                    closeOnHardwareBackPress={true}
                    closeOnTouchOutside={false}
                    showConfirmButton={paramsAlert.showButtonConfirm}
                    showCancelButton={paramsAlert.showButtonCancel}
                    confirmText={paramsAlert.textBtnConfirm}
                    cancelText={paramsAlert.textBtnCancel}
                    onConfirmPressed={() => deleteStore()}
                    onCancelPressed={() => {
                        setParamsAlert({
                            ...paramsAlert,
                            showAlert: false
                        })
                    }}
                    confirmButtonStyle={{
                        backgroundColor: colors.secondary,
                        width: 100,
                        alignItems: "center",
                        borderRadius: 30,
                    }}
                    cancelButtonStyle={{
                        backgroundColor: colors.primary,
                        width: 100,
                        alignItems: "center",
                        borderRadius: 30,
                    }}
                    contentContainerStyle={{ borderRadius: 30, marginHorizontal: 50 }}
                />
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
    rowBtnOptions: {
        flexDirection: 'row',
    },
    contentBtnOption: {
        marginVertical: 5
    },
    containerImageStore: {
        justifyContent: 'center', 
        alignItems: 'center',
        marginVertical: 5
    },
    borderImage: {
        borderWidth: 3, 
        borderRadius: 10, 
        borderColor: colors.primary, 
        padding: 2
    },
    imageStore: { 
        height: 200, 
        width: 300, 
        borderRadius: 10
    }
    
})