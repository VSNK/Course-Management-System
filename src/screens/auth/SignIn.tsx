import React from 'react';
import {SafeAreaView, StatusBar, ScrollView, Pressable} from 'react-native';
import Heading from '../../components/typography/Heading';
import {useAuthContext} from '../../contexts/AuthContext';
import {useThemeContext} from '../../contexts/ThemeContext';

export default function SignIn() {
  const {signIn} = useAuthContext();
  const {styles} = useThemeContext({
    mainView: {backgroundColor: 'light', color: 'success', height: '100%'},
    headingStyle: {color: 'success'},
  });

  return (
    <SafeAreaView style={styles.mainView}>
      <StatusBar />
      <ScrollView style={{}}>
        <Pressable onPress={signIn}>
          <Heading.Medium style={styles.headingStyle}>Sign In</Heading.Medium>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
