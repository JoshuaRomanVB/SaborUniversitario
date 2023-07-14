import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import StoresApi from '../api/StoresApi'

export default function HomeScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <StoresApi />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})