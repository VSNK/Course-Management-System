import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {useAuthContext} from '../contexts/AuthContext';
import AuthNavigator from './AuthNavigator';
import DrawerNavigator from './DrawerNavigator';

const Root = createNativeStackNavigator();

export default function RootNavigator() {
  const {isSignedIn} = useAuthContext();

  return (
    <Root.Navigator screenOptions={{headerShown: false}}>
      {isSignedIn ? (
        <Root.Screen name="Home" component={DrawerNavigator} />
      ) : (
        <Root.Screen name="Auth" component={AuthNavigator} />
      )}
    </Root.Navigator>
  );
}
