import { View, Text, StyleSheet, FlatList } from 'react-native'
import React from 'react'
import StoreCard from './StoreCard';
import FloatButton from './FloatButton';
import { useNavigation } from '@react-navigation/native';
import ProductCard from './ProductCard';

export default function ProductsList({products, idStore, nameStore}) {
    console.log(products);

    const navigation = useNavigation();

    /**
     * Función para navegar a pantalla FormStore
     * @date 7/13/2023 - 8:40:42 AM
     * @author Alessandro Guevara
     */
    const handleNavigate = () => {
        navigation.navigate('FormProduct', {
            dataProduct: undefined,
            id_store: idStore,
            name_store: nameStore,
        });
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={products}
                numColumns={1}
                renderItem={({ item }) => <ProductCard dataProduct={item}/>}
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
    }
})