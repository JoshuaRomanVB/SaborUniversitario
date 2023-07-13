import { View, Text, StyleSheet, FlatList } from 'react-native'
import React from 'react'
import StoreCard from './StoreCard';
import FloatButton from './FloatButton';

export default function HomeStoresList({stores}) {
    console.log(stores);
    return (
        <View style={styles.container}>
            <FlatList
                data={stores}
                numColumns={1}
                renderItem={({ item }) => <StoreCard dataStore={item} />}
                keyExtractor={(stores) => String(stores.id_store)}
                onEndReachedThreshold={0.5}
            />
            <FloatButton handleNavigate={'FormStore'} screenCalled={'home'}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})