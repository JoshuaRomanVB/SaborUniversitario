import React, {useState} from 'react';
import {View, TextInput, Pressable, Text, TouchableOpacity} from 'react-native';
import {inputStyles} from '../styles/inputStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../styles/colors';

const Input = props => {
  const [sec, setSec] = useState(props.secureTextEntry);
  const [iconSecurity, setIconSecurity] = useState('eye');

  const handlePress = () => {
    setSec(!sec);
    if(iconSecurity ==  'eye'){
      setIconSecurity('eye-off');
    }else{
      setIconSecurity('eye');
    }
  };

  return (
    <View style={inputStyles.container}>
      <TextInput
        style={inputStyles.input}
        underlineColorAndroid="transparent"
        {...props}
        value={props.value}
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
          <Ionicons name={iconSecurity} size={24} color={colors.primary} />
        </Pressable>
      )}


    </View>
  );
};

export default Input;
