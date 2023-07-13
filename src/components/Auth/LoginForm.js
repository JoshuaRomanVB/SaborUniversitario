/**
 * Formulario login.
 * Autor: Joshua Roman Vazquez Benitez
 * Fecha: 7/7/2023
 */

import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { userDetails, user } from "../../utils/userDB";
import CustomButton from "../CustomButton";
import { auth } from "../../utils/firebaseConfig";


/**
Componente de formulario de inicio de sesión
Este componente muestra un formulario de inicio de sesión con campos de correo electrónico y contraseña.
También maneja la validación del formulario y la autenticación del usuario.
@param {Object} props - Propiedades del componente.
@param {Object} props.navigation - Objeto de navegación de React Navigation.
@returns {JSX.Element} - Elemento JSX que representa el formulario de inicio de sesión.
*/

export default function LoginForm(props) {
  const { navigation } = props;
  const [error, setError] = useState("");

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    validateOnChange: false,
    onSubmit: async (formData) => {
      setError("");
      const { username, password } = formData;
    
      try {
        await auth.signInWithEmailAndPassword(username, password);
        navigation.navigate("Tabs");
        // Aquí puedes redirigir al usuario a la pantalla de inicio o hacer cualquier otra acción necesaria después del inicio de sesión exitoso.
      } catch (error) {
        console.log("Error de inicio de sesión:", error);
        setError("Usuario o contraseña incorrecta");
      }
    },
  });

  /**
Función para establecer los valores iniciales del formulario.
@returns {Object} - Objeto con los valores iniciales del formulario.
*/

  function initialValues() {
    return {
      username: "",
      password: "",
    };
  }

  /**

Función para establecer el esquema de validación del formulario.
@returns {Object} - Objeto con el esquema de validación del formulario.
*/
  function validationSchema() {
    return {
      username: Yup.string().required("El nombre de usuario es obligatorio"),
      password: Yup.string().required("La contraseña es obligatoria"),
    };
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/backgroudLogin.png")}
        style={styles.image} // Establece el color del borde de la imagen
      >
<Text style={styles.title}>Bienvenido de nuevo</Text>
      </ImageBackground>


    <View style ={styles.containerForm}>

      <Text style={styles.title}>Bienvenido de nuevo</Text>
    <Text style={styles.text}>Email</Text>
      <TextInput
        placeholder={"Correo"} // Corrección: placeholder en lugar de placehorder
        placeholderTextColor="#C9C9C9"
        style={styles.input}
        autoCapitalize="none"
        value={formik.values.username}
        onChangeText={(text) => formik.setFieldValue("username", text)}
      />
      <Text style={styles.error}>{formik.errors.username}</Text>
      <Text style={styles.text}>Contraseña</Text>
      <TextInput
        placeholder={"Contraseña"} // Corrección: placeholder en lugar de placehorder
        placeholderTextColor="#C9C9C9"
        style={styles.input}
        autoCapitalize="none"
        value={formik.values.password}
        secureTextEntry={true}
        onChangeText={(text) => formik.setFieldValue("password", text)}
      />
      <Text style={styles.error}>{formik.errors.password}</Text>
      <CustomButton
        title="¿Olvidaste tu contraseña?"
        onPress={formik.handleSubmit}
      />
      <CustomButton title="Iniciar sesión" onPress={formik.handleSubmit} />
      <Text style={styles.error}>{error}</Text>

      <Text>
        ¿No tienes una cuenta?{" "}
        <TouchableOpacity>
          <Text style={{ fontWeight: "bold", textDecorationLine: "underline" }}>
            Registrate
          </Text>
        </TouchableOpacity>
      </Text>
    </View>
     
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 50,
    width: '100%',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#FFF',
    color: "#000",
    // Estilos para Android
    elevation: 2,
    // Estilos para iOS
    shadowColor: '#000',
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
  background: {
    height: "100%",
    alignContent: "center",
    justifyContent: "center",
  },
  image: {
    height: 520,
    width: '100%',
    alignSelf: "center",
  },

  container: {
    flex:1,
  },
  containerForm: {
    backgroundColor: '#FFF',
    position: "absolute",
    paddingHorizontal:30,
    borderTopRightRadius: 40,
    borderTopLeftRadius:40,
    bottom: 0,
    left: 0,
    right: 0,
    height: 500,
  
  },
  title:{
    marginTop:20,
    color: '#557BF1',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 30
  },
  text:{
    color: '#557BF1',
    fontWeight: 'bold',
    fontSize: 16
  }
});
