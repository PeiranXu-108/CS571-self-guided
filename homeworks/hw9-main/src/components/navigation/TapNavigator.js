// src/components/navigation/TabNavigator.js
import React, { useState } from 'react';
import { BottomNavigation } from 'react-native-paper';

import BadgerLandingScreen from '../screens/BadgerLandingScreen'
import ChatScreen from '../screens/ChatScreen';
import ProfileScreen from '../screens/ProfileScreen';

export default function TabNavigator() {
  const [index, setIndex] = useState(0);

  const routes = [
    { key: 'landing', title: 'Home', icon: 'home' },
    { key: 'chat', title: 'Chat', icon: 'chat' },
    { key: 'profile', title: 'Profile', icon: 'account' }
  ];

  const renderScene = BottomNavigation.SceneMap({
    landing: BadgerLandingScreen,
    chat: ChatScreen,
    profile: ProfileScreen
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
}
