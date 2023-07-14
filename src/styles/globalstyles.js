import { StyleSheet } from 'react-native';
import { colors } from './colors';
export const globalstyles = StyleSheet.create({
    container: {
      flex: 1,
    },
    containerB: {
   
      alignItems: 'center',
      justifyContent: 'center',
    },
    scroll: {
      width: '100%',
    },
    input:{
      backgroundColor: colors.text
    }
  });