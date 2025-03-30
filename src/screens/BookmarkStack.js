import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BookmarksScreen from '../components/BookmarkScreen';
import JobDetailsScreen from '../components/JobDetails';

const Stack = createStackNavigator();

const BookmarkStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Bookmarks" 
        component={BookmarksScreen} 
        options={({ navigation }) => ({
          title: 'Bookmarks',
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Bookmarks')}>
              <Ionicons name="refresh" size={24} color="black" style={{ paddingRight: 20 }} />
            </TouchableOpacity>
          ),
        })} 
      />
      <Stack.Screen 
        name="JobDetails" 
        component={JobDetailsScreen} 
        options={{ title: 'Job Details' }} 
      />
    </Stack.Navigator>
  );
};

export default BookmarkStack;
