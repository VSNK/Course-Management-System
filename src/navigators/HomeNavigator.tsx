import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {DrawerNavigationProvider} from '../contexts/DrawerContext';
import MainHome from '../screens/MainHome';
import BottomTabNavigator from './BottomTabNavigator';

const Home = createNativeStackNavigator();

export default function HomeNavigator() {
  return (
    <DrawerNavigationProvider>
      <Home.Navigator screenOptions={{headerShown: false}}>
        <Home.Screen name="MainHome" component={MainHome} />
        <Home.Screen name="Course" component={BottomTabNavigator} />
      </Home.Navigator>
    </DrawerNavigationProvider>
  );
}
