import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { collection, doc, onSnapshot, query, orderBy, where, addDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../utils/firebaseConfig';
import { colors } from '../styles/colors';

export default function ChatScreen({ route }) {
  const { chatId, senderId, receiverId } = route.params;
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');

  useEffect(() => {
    // Consultar los mensajes del chat
    const q = query(
      collection(db, 'Mensajes'),
      where('chatId', '==', chatId),
      orderBy('timestamp' ,'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messageArray = snapshot.docs.map((doc) => doc.data());
      setMessages(messageArray);
    });

    return () => unsubscribe();
  }, [chatId]);

  const handleSend = async () => {
    if (messageText.trim() === '') return;

    try {
      const message = {
        text: messageText,
        senderId: senderId,
        receiverId: receiverId,
        timestamp: serverTimestamp(),
        chatId: chatId, // Agregar la referencia al chat en el mensaje
      };

      await addDoc(collection(db, 'Mensajes'), message);
      setMessageText('');
    } catch (error) {
      console.log('Error al enviar el mensaje:', error);
    }
  };

  const renderMessage = ({ item }) => {
    const isCurrentUser = item.senderId === senderId;
    const containerStyle = isCurrentUser ? styles.currentUserMessageContainer : styles.otherUserMessageContainer;
    const textStyle = isCurrentUser ? styles.currentUserMessageText : styles.otherUserMessageText;

    return (
      <View style={[styles.messageContainer, containerStyle]}>
        <Text style={textStyle}>{item.text}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.timestamp}
        renderItem={renderMessage}
        inverted
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Escribe un mensaje"
          value={messageText}
          onChangeText={setMessageText}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingBottom: 40
  },
  messageContainer: {
    backgroundColor: '#ebebeb',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  currentUserMessageContainer: {
    alignSelf: 'flex-end',
    backgroundColor: colors.primary,
  },
  otherUserMessageContainer: {
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
  },
  currentUserMessageText: {
    fontSize: 16,
    color: '#fff',
  },
  otherUserMessageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 8,
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
