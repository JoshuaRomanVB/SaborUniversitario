import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import CustomButton from "../CustomButton";
import useAuth from "../../hooks/useAuth";
import { useNavigation } from '@react-navigation/native';

export default function UserData() {
  const { auth, logout } = useAuth();
  const navigation = useNavigation();
  console.log(auth); // Imprimir el contenido de auth en la consola


  /**
   * Función para cerrar sesión y redireccionar a login
   * @date 7/21/2023 - 8:42:01 AM
   * @author Alessandro Guevara
   */
  const handleLogout = () => {
    logout();
    navigation.navigate('Login',{});
  }

  // Verificar si el avatar es la imagen predeterminada
  const profileImageSource =
    auth.avatar_user === "../assets/images/perfil.png"
      ? require("../../assets/images/perfil.png") // Cargar la imagen predeterminada
      : { uri: auth.avatar_user }; // Cargar la imagen personalizada desde la URL

  return (
    <View style={styles.container}>
      <Image
			 		source={require('../../assets/images/homeSU.png')}
			 		style={{ width: 80, height: 80, top: -140, left:8}}
		 		/>
      <Text style={styles.title}>Bienvenido {auth.name_user}</Text>
      <View style={styles.detailsContainer}>
       
        <Image
          source={profileImageSource} // Utilizar la imagen correspondiente
          style={styles.profileImage}
        />
        <Text style={styles.username}>{'\n'}{auth.name_user}</Text>
        <Text style={styles.email}>{auth.email_user}</Text>
      </View>
      <CustomButton title="Cerrar sesión" onPress={() => handleLogout()} />
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
    width: 260,
    height: 260,
    borderRadius: 150,
    
  },
  detailsContainer: {
    marginVertical: 20,
    
    
    padding: 20,
    borderRadius: 20,
    width:330,
    justifyContent: "center",
    alignItems: "center",
    marginTop: -40,
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
  title:{
    textAlign: 'center',
    fontSize:40,
    fontWeight:'bold',
    marginTop: 40,
    marginBottom: 45,
    marginTop:-140,
    color:'#FF7504'
},
});
