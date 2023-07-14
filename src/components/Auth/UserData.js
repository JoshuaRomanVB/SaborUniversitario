import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import CustomButton from "../CustomButton";
import useAuth from "../../hooks/useAuth";

export default function UserData() {
  const { auth, logout } = useAuth();
  console.log(auth); // Imprimir el contenido de auth en la consola

  // Verificar si el avatar es la imagen predeterminada
  const profileImageSource =
    auth.avatar_user === "../assets/images/perfil.png"
      ? require("../../assets/images/perfil.png") // Cargar la imagen predeterminada
      : { uri: auth.avatar_user }; // Cargar la imagen personalizada desde la URL

  return (
    <View style={styles.container}>
      <View style={styles.circleContainer}>
        <Image
          source={profileImageSource} // Utilizar la imagen correspondiente
          style={styles.profileImage}
        />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.username}>{auth.name_user}</Text>
        <Text style={styles.email}>{auth.email_user}</Text>
      </View>
      <CustomButton title="Cerrar sesión" onPress={logout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  circleContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  profileImage: {
    width: 140,
    height: 140,
    borderRadius: 50,
  },
  detailsContainer: {
    marginVertical: 20,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: 20,
    borderRadius: 10,
  },
  username: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  email: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
  },
  bio: {
    fontSize: 16,
    textAlign: "center",
  },
});
