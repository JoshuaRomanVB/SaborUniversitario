import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import StoreCard from './StoreCard';
import FloatButton from './FloatButton';
import { useNavigation } from '@react-navigation/native';
import ProductCard from './ProductCard';
import { colors } from '../styles/colors';
import useAuth from '../hooks/useAuth';
import { Feather } from '@expo/vector-icons';

export default function ProductsList({products, dataStore}) {

    const navigation = useNavigation();
    const { auth } = useAuth();
    const id_user_sesion  = auth.id_user;
    const {  
        id_store, name_store, description,
        image_url,school_store, id_user
    } = dataStore;

    /**
     * Función para navegar a pantalla FormStore
     * @date 7/13/2023 - 8:40:42 AM
     * @author Alessandro Guevara
     */
    const handleNavigate = () => {
        navigation.navigate('FormProduct', {
            dataProduct: undefined,
            id_store: id_store,
            name_store: name_store,
        });
    }

    const handlePressUpdate = () => {
        navigation.navigate('FormStore', {
            dataStore: dataStore,
        });
    }
 
    const headerInfo = () => {
        return (
            <View style={styles.contentHeader}>
                <View style={styles.headerScreen}>
                    <Image source={{ uri: image_url }} style={styles.imageStore} />
                </View>
                <View style={styles.contentTextRow}>
                    <View style={{flex: 0.8}}>
                        <Text style={styles.textTitle}>{name_store}</Text>
                    </View>
                    <View style={{flex: 0.2, justifyContent: 'center', alignItems: 'center', marginVertical: 5}}>
                        <TouchableOpacity 
                            style={styles.circleBtn}
                            onPress={() => handlePressUpdate()}
                        >
                            <Feather name="edit-2" size={24} color={colors.primary}  />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            
        )
    }

    return (
        <View style={styles.container}>

            
            <FlatList
                data={products}
                ListHeaderComponent={
                    headerInfo
                }
                numColumns={1}
                renderItem={({ item }) => <ProductCard dataProduct={item} />}
                keyExtractor={(products) => String(products.id_product)}
                onEndReachedThreshold={0.5}
            />
            <FloatButton handleNavigateTo={handleNavigate} screenCalled={'products'}/>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    headerScreen: {
        height: 200,
    },
    imageStore: { 
        height: 200, 
        width: '100%', 
        borderRadius: 1,
        resizeMode: 'contain'
    },
    textTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        fontStyle: 'italic',
        color: colors.white
    },
    contentHeader: {
        marginBottom: 20,
        backgroundColor: colors.primary,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,

    },
    contentTextRow: {
        flexDirection: 'row'
    },
    circleBtn: {
        width: 40, 
        height: 40, 
        backgroundColor: colors.white, 
        justifyContent: 'center', 
        alignItems: 'center', 
        borderRadius: 80, 
    }

})