import { StyleSheet } from 'react-native';
import { colors } from './colors';
export const ButtonPrymaryStyle = StyleSheet.create({
    button: {
        height: 50,
        backgroundColor: colors.bluesecondary,
        marginHorizontal: 20,
        paddingHorizontal: 40,
        marginVertical: 10,
        borderRadius: 30,
        justifyContent: 'center'
    },
    buttonText:{ 
        textAlign: 'center',
        fontWeight: 'bold',
        color: colors.white,
        fontSize: 16,
    }

  });