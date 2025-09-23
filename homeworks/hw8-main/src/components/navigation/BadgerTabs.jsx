import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BadgerNewsScreen from "../screens/BadgerNewsScreen";
import BadgerPreferencesScreen from '../screens/BadgerPreferencesScreen';
import { Ionicons } from '@expo/vector-icons';
import BadgerNewsStack from "../navigation/BadgerNewsStack"
import BadgerChatScreen from "../screens/BadgerChatScreen";

const Tab = createBottomTabNavigator();

export default function BadgerTabs() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'News') {
                        iconName = focused ? 'newspaper' : 'newspaper-outline';
                    } else if (route.name === 'Preferences') {
                        iconName = focused ? 'settings' : 'settings-outline';
                    } else if (route.name === 'Chat') {
                        iconName = focused ? 'chatbubble' : 'chatbubble-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'red',
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen name="News" component={BadgerNewsStack} />
            <Tab.Screen name="Chat" component={BadgerChatScreen} />
            <Tab.Screen name="Preferences" component={BadgerPreferencesScreen} />
        </Tab.Navigator>
    );
}