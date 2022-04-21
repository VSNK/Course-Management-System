import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import CustomDrawer from '../components/CustomDrawer';
// import ContactUs from '../screens/ContactUs';
import HomeNavigator from './HomeNavigator';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{headerShown: false}}
      drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen name="MainDrawer" component={HomeNavigator} />
      {/* <Drawer.Screen name="ContactUs" component={ContactUs} /> */}
    </Drawer.Navigator>
  );
}
