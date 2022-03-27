import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  ScrollView,
  Text,
  Pressable,
} from 'react-native';
import {useAuthContext} from '../../contexts/AuthContext';

export default function SignUp() {
  const {signUp} = useAuthContext();

  return (
    <SafeAreaView style={{}}>
      <StatusBar />
      <ScrollView contentInsetAdjustmentBehavior="automatic" style={{}}>
        <Pressable onPress={signUp}>
          <Text>Sign Up</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
