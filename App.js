import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

import SwipeScreen from './src/screens/SwipeScreen';
import MatchesScreen from './src/screens/MatchesScreen';
import ChatScreen from './src/screens/ChatScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import { AppProvider } from './src/context/AppContext';

const Tab = createBottomTabNavigator();
const MatchesStack = createStackNavigator();

function MatchesStackScreen() {
  return (
    <MatchesStack.Navigator>
      <MatchesStack.Screen
        name="MatchesList"
        component={MatchesScreen}
        options={{ title: 'マッチ' }}
      />
      <MatchesStack.Screen
        name="Chat"
        component={ChatScreen}
        options={({ route }) => ({ title: route.params.profile.name })}
      />
    </MatchesStack.Navigator>
  );
}

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <StatusBar style="dark" />
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: route.name === 'Discover',
            tabBarActiveTintColor: '#FF4458',
            tabBarIcon: ({ color, size }) => {
              const icons = {
                Discover: 'flame',
                Matches: 'chatbubbles',
                Profile: 'person-circle',
              };
              return <Ionicons name={icons[route.name]} size={size} color={color} />;
            },
          })}
        >
          <Tab.Screen name="Discover" component={SwipeScreen} options={{ title: '' }} />
          <Tab.Screen name="Matches" component={MatchesStackScreen} options={{ headerShown: false }} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}
