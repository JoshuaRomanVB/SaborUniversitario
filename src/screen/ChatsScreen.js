import React, { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../utils/firebaseConfig";

export default function ChatsScreen({ navigation }) {
  const [chats, setChats] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      // Consultar los chats existentes con el usuario actual
      const fetchChats = async () => {
        try {
          const querySnapshot = await getDocs(
            query(
              collection(db, "Chats"),
              where("users", "array-contains", auth.currentUser.uid)
            )
          );

          const chatArray = [];

          for (const chatDoc of querySnapshot.docs) {
            const chatData = chatDoc.data();
            const otherUserId = chatData.users.find(
              (uid) => uid !== auth.currentUser.uid
            );

            // Obtener los datos del otro usuario
            const userSnapshot = await getDocs(
              query(collection(db, "Usuarios"), where("uid", "==", otherUserId))
            );

            if (!userSnapshot.empty) {
              const otherUserData = userSnapshot.docs[0].data();

              // Combinar los datos del chat con los datos del otro usuario
              const chatWithUserData = {
                ...chatData,
                otherUserName: otherUserData.name, // Reemplaza "otherUserName" con el campo adecuado del nombre del usuario
                otherUserImageUri: otherUserData.imageUri, // Reemplaza "otherUserImageUri" con el campo adecuado de la imagen del usuario
              };

              chatArray.push(chatWithUserData);
            }
          }

          setChats(chatArray);
        } catch (error) {
          console.log("Error al obtener chats:", error);
        }
      };

      fetchChats();
    }, [])
  );

  const handleChatPress = async (chat) => {
    // Obtener el ID del chat y el ID del otro usuario
    const chatId = chat.id;
    const otherUserId = chat.users.find((uid) => uid !== auth.currentUser.uid);

    // Redirigir a la pantalla de chat
    navigation.navigate("chat", {
      chatId: chatId,
      senderId: auth.currentUser.uid,
      receiverId: otherUserId,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Chats Existentes</Text>

      <FlatList
        data={chats}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.chatItem}
            onPress={() => handleChatPress(item)}
          >
            {item.otherUserImageUri === "../assets/images/perfil.png" ? (
              // Mostrar otra imagen si la URI de la imagen del usuario es "../assets/images/perfil.png"
              <Image
                source={require("../assets/images/perfil.png")}
                style={styles.profileImage}
              />
            ) : (
              // Mostrar la imagen del usuario si la URI no es "../assets/images/perfil.png"
              <Image
                source={{ uri: item.otherUserImageUri }}
                style={styles.profileImage}
              />
            )}
            <Text style={styles.username}>
              {item.otherUserName} {item.Apellido}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  chatItem: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 12,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  username: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
