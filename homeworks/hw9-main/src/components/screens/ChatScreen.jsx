// src/screens/ChatScreen.js
import { View, Text, StyleSheet } from 'react-native';
export default function ChatScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>🤖 Chat Screen - Coming Soon!</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 20 }
});
