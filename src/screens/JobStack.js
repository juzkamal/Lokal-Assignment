import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import FetchDataScreen from '../components/FetchData';
import JobDetailsScreen from '../components/JobDetails';

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={FetchDataScreen} options={{ title: 'Jobs' }} />
      <Stack.Screen name="JobDetails" component={JobDetailsScreen} options={{ title: 'Job Details' }} />
    </Stack.Navigator>
  );
};

export default HomeStack;
