import { View, Text, StyleSheet} from 'react-native'
import React from 'react'

export default function HeaderInfo({characters}) {
  return (
    <View>
      <Text style={styles.name}>{characters.name}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
name: {
  fontSize: 32,
  fontWeight: "bold",
  textAlign: "center",
  marginVertical: 10,
}
})