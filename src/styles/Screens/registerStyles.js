import { StyleSheet } from 'react-native';
import { colors } from '../colors';
import { typography } from '../typography';
export const registerStyles = StyleSheet.create({

    imageContainer: {
        alignItems: 'center',
        marginVertical: 10,
        justifyContent: 'center',
        position: 'relative',
      },
      image: {
        width: '40%',
        height: 150,
        aspectRatio: 1,
        borderRadius: 90
      },
      addButton: {
        backgroundColor: '#fff',
        borderRadius: 50,
        height: 50,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        right: 100,
        bottom: 20,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
      },
      addButtonText: {
        color: '#000',
        fontSize: 30,
      },
    inputText:{
      marginHorizontal: 20,
    },
    errorText: {
      marginHorizontal: 20,
      color: colors.error,
    },
    containerGoBack: {
      flexDirection: 'row',
      alignItems: 'center',
      margin: 10,
    },
    text2: {
      marginLeft: 10,
      alignSelf: 'center',
      color: colors.gray,
    },

    text: {
      ...typography.heading1,
    },
  });