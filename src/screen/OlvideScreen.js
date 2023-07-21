import React, { useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, Image, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import Input from '../components/Input';
import { typography } from '../styles/typography';
import { colors } from '../styles/colors';
import { sendPasswordResetEmail } from 'firebase/auth'; // Importar la función para enviar el correo de restablecimiento
import { auth } from '../utils/firebaseConfig';
import ButtonPrymary from "../components/ButtonPrymary";

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [showAlertMessage, setShowAlertMessage] = useState('');

  const handleSend = async () => {
    if (!validateEmail(email)) {
      setEmailError('Por favor ingrese un correo electrónico válido');
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setShowAlertMessage('Se ha enviado el correo de restablecimiento de contraseña. Por favor revisa tu bandeja de entrada.');
      setShowAlert(true);
    } catch (error) {
      console.log('Error al enviar el correo:', error);
      setShowAlertMessage('Ocurrió un error al enviar el correo de restablecimiento de contraseña. Por favor intenta nuevamente más tarde.');
      setShowAlert(true);
    }
  };

  const validateEmail = email => {
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return emailRegex.test(email);
  };

  return (
    <SafeAreaView style={styles.container}>
   <ImageBackground
        source={require("../assets/images/olvideback.png")}
        style={styles.imageback}
      >
         <Text style={[typography.h3, styles.title]}>Recuperar Contraseña</Text>
        <Image source={require('../assets/images/perfil.png')} style={styles.image} />
       
        <Text style={[typography.captionSecundary, styles.text]}>Para recuperar tu contraseña, ingresa el correo de tu cuenta y te enviaremos un correo de restablecimiento.</Text>

        <Text style={[typography.body, styles.inputText]}>Correo electrónico</Text>
        <Input
          placeholderText="Email"
          iconName="mail"
          onChangeText={setEmail}
          errorMessage={emailError}
        />
        {emailError !== '' && (
          <Text style={styles.errorText}>{emailError}</Text>
        )}

        <ButtonPrymary onPress={handleSend} text="Enviar correo" />


      {/* Alerta */}
      {showAlert && (
        <TouchableOpacity
          activeOpacity={1}
          style={styles.alertOverlay}
          onPress={() => setShowAlert(false)}
        >
          <View style={styles.alertContainer}>
            <Text style={styles.alertText}>{showAlertMessage}</Text>
            <ButtonPrymary
              onPress={() => setShowAlert(false)}
              text="Aceptar"
            />
          </View>
        </TouchableOpacity>
      )}
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: 'center',
  },
  imageback: {
    flex: 1,
    resizeMode: "cover",
    marginLeft: -15,
    paddingLeft:15
  },
  image: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginVertical: 30,
  },
  title: {
    textAlign: 'center',
    marginVertical: 16,
    fontWeight: 'bold',
    color: colors.white,
    fontSize:24
  },
  text: {
    textAlign: 'center',
    color: colors.white,
    marginHorizontal:20,
  },
  inputText: {
    marginHorizontal: 20,
  },
  errorText: {
    marginHorizontal: 20,
    color: colors.error,
  },
  alertOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    width: '80%',
  },
  alertText: {
    ...typography.body,
    marginBottom: 16,
  },
});
