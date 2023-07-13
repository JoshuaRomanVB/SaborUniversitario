import React, { useState } from "react";
import { globalstyles } from "../styles/globalstyles";
import { typography } from "../styles/typography";
import { Ionicons } from "@expo/vector-icons";

import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Button,
} from "react-native";
import { registerStyles } from "../styles/Screens/registerStyles";
import Input from "../components/Input";
import ButtonPrymary from "../components/ButtonPrymary";
import { colors } from "../styles/colors";
import AwesomeAlert from "react-native-awesome-alerts";
import * as ImagePicker from "expo-image-picker";
import { db } from "../utils/firebaseConfig";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";

const RegisterScreen = ({ navigation }) => {
  //Alert dialog
  const [showAlert, setShowAlert] = useState(false);
  const [showAlertProgress, setShowAlertProgress] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [showAlertTittle, setShowAlertTittle] = useState("");
  const [showAlertMessage, setShowAlertMessage] = useState("");

  const [responseExitoso, setResponseExitoso] = useState(false);

  const [name, setName] = useState("");
  const [appat, setAppat] = useState("");
  const [apmat, setApmat] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordval, setPasswordval] = useState("");
  const [imageUri, setImageUri] = useState("");

  const [nameError, setNameError] = useState("");
  const [appatError, setAppatError] = useState("");
  const [apmatError, setApmatError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordvalError, setPasswordvalError] = useState("");

  const [fileBlob, setFileBlob] = useState("");
  const [fileName, setFileName] = useState("");

  // Definir una referencia a una colección
  const refCollection = collection(db, "Tiendas");
  const queryFetch = query(refCollection);

  const validateFields = () => {
    let isValid = true;

    // Validar nombre
    if (!name) {
      setNameError("Por favor ingrese su nombre");
      isValid = false;
    } else {
      setNameError("");
    }

    // Validar apellido paterno
    if (!appat) {
      setAppatError("Por favor ingrese su apellido paterno");
      isValid = false;
    } else {
      setAppatError("");
    }

    // Validar apellido materno
    if (!apmat) {
      setApmatError("Por favor ingrese su apellido materno");
      isValid = false;
    } else {
      setApmatError("");
    }

    // Validar correo electrónico
    if (!email) {
      setEmailError("Por favor ingrese su correo electrónico");
      isValid = false;
    } else if (!isValidEmail(email)) {
      setEmailError("Por favor ingrese un correo electrónico válido");
      isValid = false;
    } else {
      setEmailError("");
    }

    // Validar contraseña
    if (!password) {
      setPasswordError("Por favor ingrese una contraseña");
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError("La contraseña debe tener al menos 6 caracteres");
      isValid = false;
    } else {
      setPasswordError("");
    }

    // Validar confirmación de contraseña
    if (!passwordval) {
      setPasswordvalError("Por favor ingrese la confirmación de contraseña");
      isValid = false;
    } else if (password !== passwordval) {
      setPasswordvalError("Las contraseñas no coinciden");
      isValid = false;
    } else {
      setPasswordvalError("");
    }
    return isValid;
  };

  // Función auxiliar para validar el formato del correo electrónico
  const isValidEmail = (email) => {
    // Expresión regular para validar el formato del correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

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
    try {
      // Verificar si hay una imagen seleccionada para subir
      if (fileBlob && fileName) {
        // Crear una referencia al archivo en Firebase Storage
        const storageRef = reference.child(fileName);

        // Subir el blob al Firebase Storage
        const uploadTask = storageRef.put(fileBlob);
        uploadTask.on(
          "state_changed",
          null,
          (error) => console.error(error),
          () => {
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
              console.log(`Imagen subida: ${downloadURL}`);

              // Actualizar la URL de la imagen en tu estado
              setImageUri(downloadURL);

              // Llamar a handlerUpdateProfile con la nueva imagen
              handleregister(downloadURL);
            });
          }
        );
      } else {
        handleregister("../assets/images/people.png");
      }
    } catch (error) {
      console.error("Error al subir la imagen:", error);
    }
  };

  const handleregister = async (imageURL) => {
    const isValid = validateFields();
    if (isValid) {
      setShowAlert(!showAlert);
      setShowAlertProgress(!showAlertProgress);
      setShowButton(false);
      setShowAlertTittle("Guardando usuario");
      setShowAlertMessage("Por favor espera...");
      try {
        const response = await axios.post(
          "https://keen-napier.68-168-208-58.plesk.page/api/Auth/Registro",
          {
            nombre: name,
            apPat: appat,
            apMat: apmat,
            correo: email,
            imagen: imageURL,
            password: password,
          }
        );

        // Aquí puedes hacer algo con la respuesta, como guardar un token de acceso en el almacenamiento local o en el estado global.
        setShowAlertProgress(false);
        setShowButton(true);
        setShowAlertTittle("Exito en el guardado");
        setShowAlertMessage("Se han guardado tus datos correctamente");
        setResponseExitoso(true);
      } catch (error) {
        console.log(
          "nombre " +
            name +
            "  apPat" +
            appat +
            "  apMat" +
            apmat +
            "  email" +
            email +
            " pass " +
            password
        );
        console.error(error);
        setShowAlertProgress(false);
        setShowButton(true);
        setShowAlertTittle("Error en el guardado");
        setShowAlertMessage("Intentelo más tarde");
      }
    }
  };
  return (
    <SafeAreaView style={globalstyles.container}>
      <ScrollView style={globalstyles.scroll}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View style={registerStyles.containerGoBack}>
            <Ionicons name="arrow-back" size={24} color={colors.gray} />
            <Text style={registerStyles.text2}>volver</Text>
          </View>
        </TouchableOpacity>
        <Text style={typography.heading1}>Crear cuenta</Text>

        <AwesomeAlert
          show={showAlert}
          title={showAlertTittle}
          message={showAlertMessage}
          showProgress={showAlertProgress}
          progressColor={colors.primary}
          progressSize={40}
          closeOnHardwareBackPress={true}
          closeOnTouchOutside={false}
          showConfirmButton={showButton}
          confirmText="Aceptar"
          onConfirmPressed={() => {
            setShowAlert(false);
            if (responseExitoso) {
              navigation.navigate("Login");
            }
          }}
          confirmButtonStyle={{
            backgroundColor: colors.blue,
            width: 100,
            alignItems: "center",
            borderRadius: 30,
          }}
          contentContainerStyle={{ borderRadius: 30, marginHorizontal: 50 }}
        />

        <Text style={typography.caption}>
          Introduce tus datos para poder crear una cuenta en Drug
        </Text>
        <View style={registerStyles.imageContainer}>
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={registerStyles.image} />
          ) : (
            <Image
              source={require("../assets/images/perfil.png")}
              style={registerStyles.image}
            />
          )}
          <TouchableOpacity
            style={registerStyles.addButton}
            onPress={handleChooseImage}
          >
            <Text style={registerStyles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>
        <View style={registerStyles.containerForm}>
          <Text style={[typography.body, registerStyles.inputText]}>
            Nombre
          </Text>
          <Input
            placeholderText="Nombre "
            iconName="happy"
            onChangeText={setName}
          />
          {nameError !== "" && (
            <Text style={registerStyles.errorText}>{nameError}</Text>
          )}
          <Text style={[typography.body, registerStyles.inputText]}>
            Apellido Paterno
          </Text>
          <Input
            placeholderText="Apellido paterno"
            iconName="man"
            onChangeText={setAppat}
          />
          {appatError !== "" && (
            <Text style={registerStyles.errorText}>{appatError}</Text>
          )}
          <Text style={[typography.body, registerStyles.inputText]}>
            Apellido materno
          </Text>
          <Input
            placeholderText="Apellido materno"
            iconName="woman"
            onChangeText={setApmat}
          />
          {apmatError !== "" && (
            <Text style={registerStyles.errorText}>{apmatError}</Text>
          )}
          <Text style={[typography.body, registerStyles.inputText]}>
            Correo electronico
          </Text>
          <Input
            placeholderText="Email"
            iconName="mail"
            onChangeText={setEmail}
          />
          {emailError !== "" && (
            <Text style={registerStyles.errorText}>{emailError}</Text>
          )}
          <Text style={[typography.body, registerStyles.inputText]}>
            Contraseña
          </Text>
          <Input
            placeholderText="Contraseña"
            iconName="lock-closed"
            secureTextEntry
            onChangeText={setPassword}
          />
          {passwordError !== "" && (
            <Text style={registerStyles.errorText}>{passwordError}</Text>
          )}
          <Text style={[typography.body, registerStyles.inputText]}>
            Confirmar contraseña
          </Text>
          <Input
            placeholderText="Confirmar contraseña"
            iconName="lock-closed"
            secureTextEntry
            onChangeText={setPasswordval}
          />
          {passwordvalError !== "" && (
            <Text style={registerStyles.errorText}>{passwordvalError}</Text>
          )}
          <ButtonPrymary onPress={handleUploadImage} text="Registrarme" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
