import React from 'react';
import { View, Image, StyleSheet, Animated } from 'react-native';

const CustomActivityIndicator = () => {
    const spinValue = new Animated.Value(0);
  
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      })
    ).start();
  
    const spin = spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });
  
    return (
      <View style={styles.container}>
        <Animated.Image
          source={require('../assets/images/portal.png')}
          style={[styles.image, { transform: [{ rotate: spin }] }]}
        />
      </View>
    );
  };

  export default CustomActivityIndicator;
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      width: 100,
      height: 100,
    },
  });
  