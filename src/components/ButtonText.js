import React from 'react';
import {ButtonTextStyle} from '../styles/buttonTextStyle';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
  Pressable,
} from 'react-native';

const ButtonText = props => {

  const {onPress, text} = props

  return (
    <Pressable onPress={onPress}>
      <View>
          <Text style={ButtonTextStyle.buttonText}>{text}</Text>
      </View>
    </Pressable>
  );
};

export default ButtonText;
