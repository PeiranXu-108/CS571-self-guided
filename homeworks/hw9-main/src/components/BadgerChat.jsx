// BadgerChat.jsx
import { useEffect, useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import { Provider as PaperProvider } from 'react-native-paper';
import BadgerChatroomScreen from './screens/BadgerChatroomScreen';
import BadgerRegisterScreen from './screens/BadgerRegisterScreen';
import BadgerLoginScreen from './screens/BadgerLoginScreen';
import BadgerLandingScreen from './screens/BadgerLandingScreen';
import BadgerLogoutScreen from './screens/BadgerLogoutScreen';
import TabNavigator from './navigation/TapNavigator';

import userContext from '../contexts/userContext';

const ChatDrawer = createDrawerNavigator();

export default function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [chatrooms, setChatrooms] = useState([]);
  const [isGuest, setIsGuest] = useState(false);
  const [username, setUsername] = useState(null)

  // 自动登录：如果 JWT 存在，就认为登录成功
  useEffect(() => {
    const checkLogin = async () => {
      const token = await SecureStore.getItemAsync("jwt");
      const savedUsername = await SecureStore.getItemAsync("username")
      if (token) {
        setIsLoggedIn(true);
        setUsername(savedUsername)
        await loadChatrooms();
      }
    };
    checkLogin();
  }, []);


  useEffect(() => {
    if (isLoggedIn) {
      loadChatrooms(); // 只要登录（无论游客还是注册用户）就拉聊天室
    }
  }, [isLoggedIn]);
  // 获取聊天室列表
  async function loadChatrooms() {
    const token = await SecureStore.getItemAsync("jwt");
    try {
      const res = await fetch("https://cs571.org/rest/s25/hw9/chatrooms", {
        headers: {
          "X-CS571-ID": "bid_f33917fdb8555977e6256d91feaf5c069fe9f6e5c945336aec5acc5db565134c"
        }
      });
      if (res.status === 200) {
        const data = await res.json();
        setChatrooms(data); // 注意：返回的是字符串数组
      }
    } catch (e) {
      alert("加载聊天室失败", e);
    }
  }
  async function handleSignup(username, pin) {
    try {
      const res = await fetch("https://cs571.org/rest/s25/hw9/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CS571-ID": "bid_f33917fdb8555977e6256d91feaf5c069fe9f6e5c945336aec5acc5db565134c"
        },
        body: JSON.stringify({ username, pin })
      });

      if (res.status === 200) {
        const data = await res.json();
        await SecureStore.setItemAsync("jwt", data.token);
        await SecureStore.setItemAsync("username", username);
        setUsername(username);
        setIsLoggedIn(true);
        setIsRegistering(false);
        await loadChatrooms();
      } else if (res.status === 409) {
        alert("用户名已存在！");
      } else {
        alert("注册失败！");
      }
    } catch (e) {
      alert("网络错误，注册失败");
    }
  }

  // 主界面（已登录）
  if (isLoggedIn) {
    return (
      <NavigationContainer>
        <ChatDrawer.Navigator>
          <ChatDrawer.Screen name="Landing" component={BadgerLandingScreen} />
          {
            chatrooms.map(chatroom => (
              <ChatDrawer.Screen key={chatroom} name={chatroom}>
                {(props) => <BadgerChatroomScreen name={chatroom} isGuest={isGuest} />}
              </ChatDrawer.Screen>
            ))
          }
          <ChatDrawer.Screen name="退出登录">
            {(props) => <BadgerLogoutScreen
              setIsLoggedIn={setIsLoggedIn}
              setChatrooms={setChatrooms}
              setIsRegistering={setIsRegistering}
              setIsGuest={setIsGuest}
              isGuest={isGuest}
            />}
          </ChatDrawer.Screen>
        </ChatDrawer.Navigator>
      </NavigationContainer>
    );
  }

  // 注册界面
  if (isRegistering) {
    return <BadgerRegisterScreen handleSignup={handleSignup} setIsRegistering={setIsRegistering} />
  }

  // 登录界面
  return (
    <userContext.Provider value={{
      isLoggedIn,
      isGuest,
      username,
      setIsLoggedIn,
      setIsGuest,
      setUsername
    }}>
      <PaperProvider>
        {
          isLoggedIn ? (
            <NavigationContainer>
              <ChatDrawer.Navigator>
                <ChatDrawer.Screen name="Landing" component={BadgerLandingScreen} />
                {
                  chatrooms.map(chatroom => (
                    <ChatDrawer.Screen key={chatroom} name={chatroom}>
                      {(props) => <BadgerChatroomScreen name={chatroom} />}
                    </ChatDrawer.Screen>
                  ))
                }
                <ChatDrawer.Screen name="Logout" component={BadgerLogoutScreen} />
              </ChatDrawer.Navigator>
            </NavigationContainer>
          ) : isRegistering ? (
            <BadgerRegisterScreen
              setIsRegistering={setIsRegistering}
            />
          ) : (
            <BadgerLoginScreen
              setIsRegistering={setIsRegistering}
              setIsLoggedIn={setIsLoggedIn}
              setIsGuest={setIsGuest}
              setUsername={setUsername}
            />
          )
        }
      </PaperProvider>
    </userContext.Provider>
  );
}