import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import {ButtonPrymaryStyle} from '../styles/buttonPrymaryStyle';
import {globalstyles} from '../styles/globalstyles';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
  Pressable,
} from 'react-native';

const ButtonPrymary = props => {
  const {onPress, text} = props;

  return (
    <Pressable onPress={onPress}>
      <View style={globalstyles.containerB}>
        <LinearGradient
          // Button Linear Gradient
          colors={['#4478A0', '#66D0C2']}
          start={{x: 0, y: 0.5}}
          end={{x: 1, y: 0.5}}
          style={ButtonPrymaryStyle.button}>
          <Text style={ButtonPrymaryStyle.buttonText}>{text}</Text>
        </LinearGradient>
      </View>
    </Pressable>
  );
};

export default ButtonPrymary;
