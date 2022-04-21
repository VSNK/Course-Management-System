import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {DrawerNavigationProvider} from '../contexts/DrawerContext';
import MainHome from '../screens/MainHome';
import BottomTabNavigator from './BottomTabNavigator';
import AddNewMessage from '../screens/AddNewMessage';
import {CourseProvider} from '../contexts/CourseContext';
import MessageDetailView from '../screens/MessageDetailView';
import AddNewCourse from '../screens/AddNewCourse';

const Home = createNativeStackNavigator();

export default function HomeNavigator() {
  return (
    <DrawerNavigationProvider>
      <CourseProvider>
        <Home.Navigator screenOptions={{headerShown: false}}>
          <Home.Screen name="MainHome" component={MainHome} />
          <Home.Screen name="Course" component={BottomTabNavigator} />
          <Home.Screen name="AddNewMessage" component={AddNewMessage} />
          <Home.Screen name="AddNewCourse" component={AddNewCourse} />
          <Home.Screen name="MessageDetailView" component={MessageDetailView} />
        </Home.Navigator>
      </CourseProvider>
    </DrawerNavigationProvider>
  );
}
