import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import HomeScreen from '../screens/Home';

const Home = createNativeStackNavigator();

export default function HomeNavigator() {
  return (
    <Home.Navigator screenOptions={{headerShown: false}}>
      <Home.Screen name="MainHome" component={HomeScreen} />
    </Home.Navigator>
  );
}
