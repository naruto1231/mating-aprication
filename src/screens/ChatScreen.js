import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppContext } from '../context/AppContext';

export default function ChatScreen({ route }) {
  const { profile } = route.params;
  const { messages, sendMessage } = useAppContext();
  const [text, setText] = useState('');

  const chatMessages = messages[profile.id] || [];

  const handleSend = () => {
    if (!text.trim()) return;
    sendMessage(profile.id, text.trim());
    setText('');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={90}
    >
      <FlatList
        data={chatMessages}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messageList}
        renderItem={({ item }) => (
          <View
            style={[
              styles.bubble,
              item.fromMe ? styles.myBubble : styles.theirBubble,
            ]}
          >
            <Text style={item.fromMe ? styles.myText : styles.theirText}>
              {item.text}
            </Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            {profile.name}さんとマッチしました。最初のメッセージを送ろう!
          </Text>
        }
      />

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={setText}
          placeholder="メッセージを入力..."
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Ionicons name="send" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  messageList: {
    padding: 16,
    flexGrow: 1,
  },
  bubble: {
    maxWidth: '75%',
    padding: 10,
    borderRadius: 16,
    marginBottom: 8,
  },
  myBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#FF4458',
  },
  theirBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#eee',
  },
  myText: {
    color: '#fff',
  },
  theirText: {
    color: '#333',
  },
  emptyText: {
    textAlign: 'center',
    color: '#888',
    marginTop: 40,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  input: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 8,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FF4458',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
