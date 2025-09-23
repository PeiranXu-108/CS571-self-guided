import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BadgerNewsScreen from '../screens/BadgerNewsScreen';
import BadgerArticleScreen from '../screens/BadgerArticleScreen';
import BadgerChatScreen from '../screens/BadgerChatScreen.jsx';
const Stack = createNativeStackNavigator();

export default function BadgerNewsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="NewsHome" component={BadgerNewsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Article" component={BadgerArticleScreen} />
      <Stack.Screen name="Chatboot" component={BadgerChatScreen}/>
    </Stack.Navigator>
  );
}
