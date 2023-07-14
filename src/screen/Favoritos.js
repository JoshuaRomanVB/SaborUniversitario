import { getFavoriteApi } from "../api/favorito";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  ImageBackground
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import useAuth from '../hooks/useAuth'
import Rickandmortycard from "../components/Rickandmortycard";
import CustomActivityIndicator from "../components/CustomActivityIndicator";
export default function Favoritos() {
 
  return (
    <SafeAreaView style={styles.container}>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
