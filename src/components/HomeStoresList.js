import { View, Text, StyleSheet, FlatList } from 'react-native'
import React from 'react'
import StoreCard from './StoreCard';
import FloatButton from './FloatButton';
import { useNavigation } from '@react-navigation/native';
import useAuth from '../hooks/useAuth';

export default function HomeStoresList({stores}) {

    const navigation = useNavigation();
    const { auth } = useAuth();
    const { is_vendedor } = auth; 
    /**
     * Función para navegar a pantalla FormStore
     * @date 7/13/2023 - 8:40:42 AM
     * @author Alessandro Guevara
     */
    const handleNavigate = () => {
        navigation.navigate('FormStore', {
            dataStore: undefined
        });
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={stores}
                numColumns={1}
                renderItem={({ item }) => <StoreCard dataStore={item} />}
                keyExtractor={(stores) => String(stores.id_store)}
                onEndReachedThreshold={0.5}
            />
            {stores.length < 1 && is_vendedor && (
                <FloatButton handleNavigateTo={handleNavigate} screenCalled={'home'}/>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})