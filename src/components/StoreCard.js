import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { colors } from '../styles/colors';
import { Entypo } from '@expo/vector-icons';

export default function StoreCard({dataStore}) {

    const navigation = useNavigation();

    const { name_store, name_user, image_url, school_store } = dataStore;
    

    /**
     * Función para redireccionar a la screen del formulario de tienda
     * @date 7/13/2023 - 8:28:48 AM
     * @author Alessandro Guevara
     */
    const handlePressCard = () => {
        navigation.navigate('FormStore', {
            dataStore: dataStore
        });
    }

    return (
        <TouchableOpacity 
            style={styles.container}
            onPress={() => handlePressCard()}
        > 
            <View>
                <Image source={{ uri: image_url }} style={styles.imageStore} />
            </View>
            <View style={styles.containerInfo}>
                <View style={{flex: 0.8}}>
                    <Text style={styles.textTitle}>{name_store}</Text>
                    <Text style={styles.textSubTitle}>{name_user}</Text>
                </View>
                <View style={{flex: 0.2, justifyContent: 'center', alignItems: 'center'}}>
                    <Entypo name="location" size={30} color={colors.primary} />
                    <Text style={styles.textSubTitle}>{school_store}</Text>
                </View>

            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.whiteLight,
        borderRadius: 20
    },
    imageStore: { 
        height: 180, 
        width: '100%', 
        borderRadius: 20,
        resizeMode: 'contain'
    },
    containerInfo: {
        flex: 1,
        flexDirection: 'row',
        padding: 10
    },
    textTitle: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    textSubTitle: {
        fontSize: 14,
        fontStyle: 'italic'
    }
});