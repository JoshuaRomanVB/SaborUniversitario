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
        signInWithEmailAndPassword(auth, username, password)
          .then((userCredential) => {
            // Acceso exitoso
            navigation.navigate("Tabs");
            const user = userCredential.user;
            console.log(user);
          })
          .catch((error) => {
            // Error de autenticación
            console.log(error);
          });

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

  function irACrearCuenta(){
    navigation.navigate('CreateCuenta');
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/images/backgroundLogin.png")}
        style={styles.image}
      >
        <View style={styles.overlay}>
          <Text style={styles.titleH}>Sabor Universitario</Text>
        </View>
      </ImageBackground>

      <View style={styles.containerForm}>
        {/* Resto del contenido del formulario */}
      </View>

      <View style={styles.containerForm}>
        <Text style={styles.title}>Bienvenido de nuevo</Text>
        <Text style={styles.text}>Email</Text>
        <TextInput
          placeholder={"Ingrese su correo electronico"} // Corrección: placeholder en lugar de placehorder
          placeholderTextColor="#C9C9C9"
          style={styles.input}
          autoCapitalize="none"
          value={formik.values.username}
          onChangeText={(text) => formik.setFieldValue("username", text)}
        />
        <Text style={styles.error}>{formik.errors.username}</Text>
        <Text style={styles.text}>Contraseña</Text>
        <TextInput
          placeholder={"Ingrese su contraseña"} // Corrección: placeholder en lugar de placehorder
          placeholderTextColor="#C9C9C9"
          style={styles.input}
          autoCapitalize="none"
          value={formik.values.password}
          secureTextEntry={true}
          onChangeText={(text) => formik.setFieldValue("password", text)}
        />
        <Text style={styles.error}>{formik.errors.password}</Text>
        <TouchableOpacity>
          <Text style={styles.olvide}>¿Olvidaste tu contraseña?</Text>
        </TouchableOpacity>
        <CustomButton title="Iniciar sesión" onPress={formik.handleSubmit} />
        <Text style={styles.error}>{error}</Text>
        <View style={styles.signupContainer}>
          <TouchableOpacity onPress={irACrearCuenta}>
            <Text style={styles.signupText}>
              ¿No tienes una cuenta?{" "}
              <Text style={styles.signupLink}>Registrate qquí</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
  background: {
    height: "50%",
    alignContent: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
  },
  containerForm: {
    backgroundColor: "#FFF",
    position: "absolute",
    paddingHorizontal: 30,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    bottom: 0,
    left: 0,
    right: 0,
    height: 500,
  },
  title: {
    marginVertical: 20,
    color: "#557BF1",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 30,
  },
  text: {
    color: "#557BF1",
    fontWeight: "bold",
    fontSize: 16,
  },
  imageContainer: {
    position: "relative",
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
  },
  textContainer: {
    position: "absolute",
    top: 50,
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  titleH: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 50,
    marginTop: 80,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },

  signupContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  signupText: {
    textAlign: "center",
  },
  signupLink: {
    fontWeight: "bold",
    color: "#557BF1",
  },
  olvide: {
    marginVertical: 10,
    fontWeight: "bold",
    color: "#557BF1",
    textAlign: 'right'
  },
});
