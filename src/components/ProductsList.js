import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import StoreCard from "./StoreCard";
import FloatButton from "./FloatButton";
import { useNavigation } from "@react-navigation/native";
import ProductCard from "./ProductCard";
import { colors } from "../styles/colors";
import useAuth from "../hooks/useAuth";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import {
  collection,
  getDocs,
  limit,
  addDoc,
  query,
  where,
  serverTimestamp 
} from "firebase/firestore";
import { auth, db } from "../utils/firebaseConfig";

export default function ProductsList({ products, dataStore }) {
  const [sendMsg, setSendMsg] = React.useState(false);
  const [inputValue, setInputValue] = useState("");
  const navigation = useNavigation();
  const { auth } = useAuth();
  const id_user_sesion = auth.id_user;
  const { is_vendedor } = auth;
  const {
    id_store,
    name_store,
    description,
    image_url,
    school_store,
    id_user,
  } = dataStore;

  /**
   * Función para navegar a pantalla FormStore
   * @date 7/13/2023 - 8:40:42 AM
   * @author Alessandro Guevara
   */
  const handleNavigate = () => {
    navigation.navigate("FormProduct", {
      dataProduct: undefined,
      id_store: id_store,
      name_store: name_store,
    });
  };

  const handlePressUpdate = () => {
    navigation.navigate("FormStore", {
      dataStore: dataStore,
    });
  };

  const sendMessage = () => {
    setSendMsg(true);
  };

  const saveMessage = async () => {
    try {
      // Verificar si ya existe un chat entre los usuarios (caso 1)
      const chatSnapshot1 = await getDocs(
        query(
          collection(db, "Chats"),
          where("users", "==", [id_user_sesion, id_user]),
          limit(1)
        )
      );

      // Verificar si ya existe un chat entre los usuarios (caso 2)
      const chatSnapshot2 = await getDocs(
        query(
          collection(db, "Chats"),
          where("users", "==", [id_user, id_user_sesion]),
          limit(1)
        )
      );

      let chatId = "";

      if (!chatSnapshot1.empty) {
        // Existe un chat entre los usuarios (caso 1)
        chatId = chatSnapshot1.docs[0].data().id;
      } else if (!chatSnapshot2.empty) {
        // Existe un chat entre los usuarios (caso 2)
        chatId = chatSnapshot2.docs[0].data().id;
      } else {
        // No existe un chat entre los usuarios, crear un nuevo chat
        chatId = generateChatId(); // Generar un ID único para el chat
        const newChat = {
          id: chatId,
          users: [id_user_sesion, id_user],
        };

        await addDoc(collection(db, "Chats"), newChat);
      }
     
      try {
        const message = {
          text: inputValue,
          senderId: id_user_sesion,
          receiverId: id_user,
          timestamp: serverTimestamp(),
          chatId: chatId, // Agregar la referencia al chat en el mensaje
        };
  
        await addDoc(collection(db, 'Mensajes'), message);
        setInputValue('');
      } catch (error) {
        console.log('Error al enviar el mensaje:', error);
      }

      // Redirigir a la pantalla de chat
      navigation.navigate("chat", {
        chatId: chatId,
        senderId: id_user_sesion,
        receiverId: id_user,
      });
    } catch (error) {
      console.log("Error al enviar el mensaje o iniciar el chat:", error);
    }
  };

  const generateChatId = () => {
    const randomId = Math.random().toString(36).substring(7);
    const timestamp = Date.now().toString();
    const chatId = `${randomId}-${timestamp}`;

    return chatId;
  };

  const headerInfo = () => {
    return (
      <View style={styles.contentHeader}>
        <View style={styles.headerScreen}>
          <Image source={{ uri: image_url }} style={styles.imageStore} />
        </View>
        <View style={styles.contentTextRow}>
          <View style={{ flex: 0.8 }}>
            <Text style={styles.textTitle}>{name_store}</Text>
          </View>
          {is_vendedor && id_user === id_user_sesion && (
            <View
              style={{
                flex: 0.2,
                justifyContent: "center",
                alignItems: "center",
                marginVertical: 5,
              }}
            >
              <TouchableOpacity
                style={styles.circleBtn}
                onPress={() => handlePressUpdate()}
              >
                <AntDesign name="shoppingcart" size={24} color="black" />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        ListHeaderComponent={headerInfo}
        numColumns={1}
        renderItem={({ item }) => (
          <ProductCard
            dataProduct={item}
            isVendedor={is_vendedor}
            idUserAuth={id_user_sesion}
            idUserStore={id_user}
          />
        )}
        keyExtractor={(products) => String(products.id_product)}
        onEndReachedThreshold={0.5}
      />
      {is_vendedor ? null : (
        <>
          {sendMsg ? (
            <View>
              <Text style={styles.titleInput}>Registra tu pedido:</Text>
              <View style={styles.contentSelect}>
                <TextInput
                  style={styles.inputProducts}
                  multiline={true}
                  onChangeText={(text) => setInputValue(text)}
                  placeholder="Ingresa tus productos aquí..."
                />
                <TouchableOpacity
                  style={styles.btnSend}
                  onPress={() => saveMessage()}
                >
                  <FontAwesome name="send" size={44} color="black" />
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.floatingButton}
              onPress={() => sendMessage()}
            >
              <AntDesign name="shoppingcart" size={44} color="black" />
            </TouchableOpacity>
          )}
        </>
      )}
      {is_vendedor && id_user === id_user_sesion && (
        <FloatButton
          handleNavigateTo={handleNavigate}
          screenCalled={"products"}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerScreen: {
    height: 200,
  },
  contentSelect: {
    backgroundColor: colors.light,
    flexDirection: "row",
  },
  floatingButton: {
    position: "absolute",
    bottom: 16,
    right: 16,
    backgroundColor: colors.amarillo,
    width: 66,
    height: 66,
    borderRadius: 33,
    justifyContent: "center",
    alignItems: "center",
    borderColor: colors.black,
    borderWidth: 1,
  },
  titleInput: {
    fontSize: 16,
    fontWeight: "bold",
    fontStyle: "italic",
    color: colors.black,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 0,
    marginTop: 0,
    backgroundColor: colors.light,
  },
  inputProducts: {
    height: 40,
    margin: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: colors.primary,
    backgroundColor: colors.whiteLight,
    width: "80%",
    height: 80,
    fontSize: 16,
    marginTop: 0,
  },
  btnSend: {
    height: 40,
    marginTop: 10,
    marginBottom: 10,
    width: "20%",
  },
  imageStore: {
    height: 200,
    width: "100%",
    borderRadius: 1,
    resizeMode: "contain",
  },
  textTitle: {
    fontSize: 28,
    fontWeight: "bold",
    fontStyle: "italic",
    color: colors.white,
  },
  contentHeader: {
    marginBottom: 20,
    backgroundColor: colors.primary,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  contentTextRow: {
    flexDirection: "row",
  },
  circleBtn: {
    width: 40,
    height: 40,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 80,
  },
});
