import { View, Text, StyleSheet, ScrollView, TextInput, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useFormik } from "formik";
import * as Yup from "yup";
import CustomButton from '../components/CustomButton';
import useAuth from '../hooks/useAuth';
import { db, storage } from '../utils/firebaseConfig';
import { collection, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigation } from '@react-navigation/native';
import Input from '../components/Input';
import AwesomeAlert from "react-native-awesome-alerts";
import { colors } from '../styles/colors';
import * as ImagePicker from "expo-image-picker";
import { color } from 'react-native-reanimated';


export default function FormProductScreen(props) {

    const dataProduct = props.route.params.dataProduct;
    const id_store = props.route.params.id_store;
    const name_store = props.route.params.name_store;
    const id_product = dataProduct === undefined ? undefined : dataProduct.id_product;
    const name_product = dataProduct === undefined ? undefined : dataProduct.name_product;
    const price = dataProduct === undefined ? undefined : dataProduct.price;
    const image_url = dataProduct === undefined ? "" : dataProduct.image_url;

    const navigation = useNavigation();
    const { auth } = useAuth();
    const { id_user, name_user } = auth;

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
    const [imageUri, setImageUri] = useState(image_url);
    const [fileBlob, setFileBlob] = useState("");
    const [fileName, setFileName] = useState("");
    const [pickerImageOpen, setPickerImageOpen] = useState(false);

    // Validación de formulario
    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        validateOnChange: false,
        onSubmit: async (formData) => {
            setError("");
        
            

            handleUploadImage().then((result) => {
                // resul.status => 
                // 0 = Fallo al subir imagen
                // 1 = Imagen subida
                // 2 = No se selecciono una imagen, asi que no se sube imagen
                if(result.status === 1 || result.status === 2) {
                    const urlImage = result.status === 1 ? result.download_url : dataProduct === undefined ? "" : image_url;
                    const objStore = {
                        id_store: id_store,
                        name_store: name_store,
                        name_product: formData.productName,
                        price: formData.productPrice,
                        image_url: urlImage,
                        estatus: 1
                    }
                    if(dataProduct != undefined) {
                        updateProduct(objStore);
                    }else {
                        saveProduct(objStore);
                    }
                }
            })
            
            
        },
    });


    /**
     * Función para guardar en la base de datos la tienda
     * @param {Object} dataProduct - objeto con los datos de la tienda
     */
    const saveProduct = async (dataProduct) => {
        try {
            await addDoc(collection(db, 'Productos'), dataProduct)
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
     * @param {Object} dataProduct - objeto con los datos de la tienda
     */
    const updateProduct = async (dataProduct) => {
        const docRef = doc(db, "Productos", id_product);

        await updateDoc(docRef, dataProduct)
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
            showAlertTittle: "Eliminar producto",
            showAlertMessage: "¿Estás seguro que deseas eliminar el producto?"
        })
        const docRef = doc(db, 'Productos', id_product);

        await deleteDoc(docRef)
            .then((result) => {
                console.log("PRODUCT DELETED");
                setParamsAlert({
                    ...paramsAlert,
                    showAlert: false,
                    showAlertProgress: false
                })
                navigation.goBack();
            })
            .catch((error) => {
                console.log("ERROR PRODUCT DELETED");
                setParamsAlert({
                    ...paramsAlert,
                    showAlertProgress: false,
                    showAlertMessage: 'Ocurrió un error',
                    showAlertTittle: 'No se pudo eliminar el producto'
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
        
                // Cambiamos estatus de pickerImageOpen para saber
                // cuando se haya cambiado la imagen y podamos validar
                // cuando se haga una actualización
                setPickerImageOpen(true);

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
                  
                // Validamos si selecciono una imagen
                if(pickerImageOpen) {

                    setParamsAlert({
                        ...paramsAlert,
                        showAlert: true,
                        showAlertProgress: true,
                        showButtonConfirm: false,
                        textBtnConfirm: 'Aceptar',
                        showButtonCancel: false,
                        textBtnCancel: 'Cancelar',
                        showAlertTittle: "Guardando producto",
                        showAlertMessage: "Por favor espera un momento"
                    });
                    // Verificar si hay una imagen seleccionada para subir
                

                    if (fileBlob && fileName) {

                        // Crear una referencia al archivo en Firebase Storage
                        const filePath = `productsImages/${fileName}`;
                        const storageRef = ref(storage, filePath);
                
                        // Subir el blob al Firebase Storage
                        const uploadTask = uploadBytesResumable(storageRef, fileBlob);
                
                        uploadTask.on(
                            "state_changed",
                            (snapshot) => {
                                // Observar eventos de cambio de estado como progreso, pausa y reanudación
                                // Obtener el progreso de la tarea, incluyendo el número de bytes subidos y el número total de bytes a subir
                                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                                console.log('Upload is ' + progress + '% done');
                                switch (snapshot.state) {
                                    case 'paused':
                                        console.log('Upload is paused');
                                        break;
                                    case 'running':
                                        console.log('Upload is running');
                                        break;
                                }
                            },
                            (error) => {
                                // Manejar errores de subida fallida
                                console.error("Error al subir la imagen:", error);
                                const objResp ={
                                    status: 0,
                                }
                                resolve(objResp);
                            },
                            () => {
                                // Manejar subida exitosa en la finalización
                                // Por ejemplo, obtener la URL de descarga: https://firebasestorage.googleapis.com/...
                                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                                    console.log('File available at', downloadURL);
                        
                                    // retornamos objeto con status y url de archivo subido
                                    const objResp ={
                                        status: 1,
                                        download_url: downloadURL
                                    }
                                    resolve(objResp);
                                });
                            }
                        );

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
                        const objResp ={
                            status: 0,
                        }
                        resolve(objResp);
                    }
                }else {
                    if(dataProduct === undefined) {
                        setParamsAlert({
                            ...paramsAlert,
                            showAlert: true,
                            showAlertProgress: false,
                            showButtonConfirm: false,
                            textBtnConfirm: 'Aceptar',
                            showButtonCancel: true,
                            textBtnCancel: 'Aceptar',
                            showAlertTittle: "Imagen necesaria",
                            showAlertMessage: "Por favor carga una imagen"
                        });
                    }
                    const objResp ={
                        status: dataProduct === undefined ? 0 : 2,
                    }
                    resolve(objResp);
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
                const objResp ={
                    status: 0,
                }
                resolve(objResp);
                
            }
        })
    };

    /**
     * Función para establecer parámetros iniciales
     * @returns {Object} parámetros iniciales de formulario
     */
    function initialValues() {
        return {
            productName: name_product != undefined ? name_product : "",
            productPrice: price != undefined ? price : "",
        };
    }

    /**
     * Función para definir mensaje de errores en la validación de formulario
     * @returns {Object} mensaje de errores
     */
    function validationSchema() {
        return {
            productName: Yup.string().required("EL nombre de producto es obligatorio."),
            productPrice: Yup.number('El precio debe de ser numérico').required("El precio es obligatorio").positive('El precio debe de ser un número positivo'),
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
                    <Text style={styles.textTitle}>{name_product != undefined ? `Actualizar producto: ${name_product}` : "Crear producto"} </Text>
                </View>
                <View style={styles.screenContent}>
                    <Text style={styles.text}>Nombre producto</Text>
                    <Input
                        placeholderText="Escribe un nombre"
                        value={formik.values.productName}
                        iconName="document-text"
                        onChangeText={(text) => formik.setFieldValue("productName", text)}
                    />
                    <Text style={styles.error}>{formik.errors.productName}</Text>

                    <Text style={styles.text}>Precio</Text>
                    <Input
                        placeholderText="Escribe un precio"
                        value={formik.values.productPrice}
                        iconName="copy"
                        onChangeText={(text) => formik.setFieldValue("productPrice", text)}
                    />
                    <Text style={styles.error}>{formik.errors.productPrice}</Text>


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
                        <CustomButton title={dataProduct != undefined ? 'Actualizar producto' : 'Guardar'} onPress={formik.handleSubmit}/>
                    </View>
                    
                    {dataProduct != undefined && (
                        <View style={styles.contentBtnOption}>
                            <CustomButton title={'Eliminar producto'} onPress={() => handlePressDelete()}/>
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
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center'
    },
    screenContent: {
        backgroundColor: '#fff',
        marginTop: -40,
        borderTopLeftRadius: 40, 
        borderTopRightRadius: 40,
        paddingTop: 20,
        marginBottom: 40
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
    },
    textTitle: {
        fontSize: 28,
        textAlign: 'center',
        fontWeight: 'bold',
        fontStyle: 'italic',
        color: colors.white
    },
    text: {
        color: colors.primary,
        fontWeight: "bold",
        fontSize: 16,
        left: 30
    },
    
})