import React from 'react';
import { View, Text, TouchableOpacity,StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import HomeStack from './src/screens/JobStack';
import BookmarkStack from './src/screens/BookmarkStack';


const Tab = createBottomTabNavigator();

const MyTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: 'white',
          borderTopWidth: 0,
          height: 70,
          shadowColor: 'black',
          shadowOffset: { width: 0, height: -3 },
          shadowOpacity: 0.1,
          shadowRadius: 3,
          elevation: 5,
        },
      }}
    >
      {/* Home Screen */}
      <Tab.Screen
        name="Jobs"
        component={HomeStack}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'home' : 'home-outline'} // Toggle icon based on whether the tab is focused
              size={size}
              color={color}
            />
          ),
          tabBarLabelStyle: {
            fontSize: 14,
            fontWeight: 'bold',
          },
          tabBarButton: (props) => (
            <TouchableOpacity {...props} activeOpacity={1}>
              {props.children}
            </TouchableOpacity>
          ),
          headerShown: false,
        }}
      />

      {/* Bookmark Screen */}
      <Tab.Screen
        name = "Bookmarks"
        component={BookmarkStack}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'bookmark' : 'bookmark-outline'} // Toggle icon based on whether the tab is focused
              size={size}
              color={color}
            />
          ),
          tabBarLabelStyle: {
            fontSize: 14,
            fontWeight: 'bold',
          },
          headerShown: false,
          tabBarButton: (props) => (
            <TouchableOpacity {...props} activeOpacity={1}> 
              {props.children}
            </TouchableOpacity>
          ),
        }}

      />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}




