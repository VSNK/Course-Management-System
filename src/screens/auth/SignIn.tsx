import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  ScrollView,
  Text,
  Pressable,
} from 'react-native';
import {useAuthContext} from '../../contexts/AuthContext';
import {useThemeContext} from '../../contexts/ThemeContext';

export default function SignIn() {
  const {signIn} = useAuthContext();
  const {styles} = useThemeContext({
    mainView: {backgroundColor: 'primary', color: 'secondary', height: '100%'},
  });

  return (
    <SafeAreaView style={styles.mainView}>
      <StatusBar />
      <ScrollView style={{}}>
        <Pressable onPress={signIn}>
          <Text>Sign In</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
