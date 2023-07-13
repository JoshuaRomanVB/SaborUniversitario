import React, {useState} from 'react';
import {View, TextInput, Pressable, Text, TouchableOpacity} from 'react-native';
import {inputStyles} from '../styles/inputStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../styles/colors';

const Input = props => {
  const [sec, setSec] = useState(props.secureTextEntry);

  const handlePress = () => {
    setSec(!sec);
  };

  return (
    <View style={inputStyles.container}>
      <TextInput
        style={inputStyles.input}
        underlineColorAndroid="transparent"
        {...props}

        secureTextEntry={sec}
        placeholder={props.placeholderText}
        defaultValue={props.defaultValue}
      />
      <Ionicons
        name={props.iconName}
        size={24}
        color={colors.primary}
        style={inputStyles.icon}
      />
      {props.secureTextEntry && (
        <Pressable onPress={handlePress} style={inputStyles.touchable}>
          <Ionicons name="eye" size={24} color={colors.primary} />
        </Pressable>
      )}


    </View>
  );
};

export default Input;
