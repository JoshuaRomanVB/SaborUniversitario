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
import {auth} from "../../utils/firebaseConfig"
import Input from "../Input";
import { signInWithEmailAndPassword } from "firebase/auth";

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
      const { email, password } = formData;

      try {
        signInWithEmailAndPassword(auth, email, password)
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
      email: "",
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
      email: Yup.string().required("El correo electrónico es obligatorio").email("El correo electrónico no es válido"),
    };
  }

  function irACrearCuenta() {
    navigation.navigate("CreateCuenta");
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
        <Text style={styles.title}>Bienvenido de nuevo</Text>
        <Text style={styles.text}>Email</Text>
        <Input
          placeholderText="Ingresa tu correo"
          value={formik.values.email}
          iconName="happy"
          autoCapitalize="none"
          onChangeText={(text) => formik.setFieldValue("email", text)}
        />
        {formik.errors.email !== "" && (
          <Text style={styles.error}>{formik.errors.email}</Text>
        )}
        <Text style={styles.text}>Contraseña</Text>
        <Input
          placeholderText="Ingrese su contraseña"
          value={formik.values.password}
          secureTextEntry={true}
          autoCapitalize="none"
          iconName="lock-closed"
          onChangeText={(text) => formik.setFieldValue("password", text)}
        />
        {formik.errors.password !== "" && (
          <Text style={styles.error}>{formik.errors.password}</Text>
        )}
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
  error: {
    color: "#F70303",
    textAlign: "center",
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
    paddingHorizontal: 20,
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
    fontWeight: "bold",
    color: "#557BF1",
    textAlign: "right",
    paddingHorizontal: 20,
    marginVertical:10,
  },
});
