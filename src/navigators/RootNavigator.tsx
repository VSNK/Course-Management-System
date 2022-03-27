import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {useAuthContext} from '../contexts/AuthContext';
import AuthNavigator from './AuthNavigator';
import HomeNavigator from './HomeNavigator';

const Root = createNativeStackNavigator();

export default function RootNavigator() {
  const {isSignedIn} = useAuthContext();

  return (
    <Root.Navigator screenOptions={{headerShown: false}}>
      {isSignedIn ? (
        <Root.Screen name="Home" component={HomeNavigator} />
      ) : (
        <Root.Screen name="Auth" component={AuthNavigator} />
      )}
    </Root.Navigator>
  );
}
