import { View, Text, ImageBackground, StyleSheet, Image } from 'react-native';
import React from 'react';
import CustomButton from '../CustomButton';
import useAuth from '../../hooks/useAuth';

export default function UserData() {
  const{auth,logout} = useAuth()
  return (
      <ImageBackground
        source={require('../../assets/background.jpg')}
        style={styles.backgroundImage}
      >
        <View style={styles.contentContainer}>
          <View style={styles.circleContainer}>
            <Image
              source={require('../../assets/profile.png')}
              style={styles.profileImage}
            />
          </View>
          <View style={styles.detailsContainer}>
            <Text style={styles.username}>{auth.username}</Text>
            <Text style={styles.email}>{auth.email}</Text>
            <Text style={styles.bio}>{auth.firstName} {auth.lastName}</Text>
          </View>

          <CustomButton title="Cerrar sesión" onPress={logout}/>
        </View>

      </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    height: "100%",
    alignContent: "center",
    justifyContent: "center",
  
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 140,
    height: 140,
    borderRadius: 50,
  },
  detailsContainer: {
    marginVertical: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 20,
    borderRadius: 10,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  email: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  bio: {
    fontSize: 16,
    textAlign: 'center',
  },
});
