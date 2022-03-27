import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  ScrollView,
  Text,
  Pressable,
} from 'react-native';
import {useAuthContext} from '../contexts/AuthContext';
import {useThemeContext} from '../contexts/ThemeContext';

export default function Home() {
  const {colors, styles} = useThemeContext(viewStyles);
  const {signOut} = useAuthContext();
  return (
    <SafeAreaView style={styles.mainView}>
      <StatusBar backgroundColor={colors.primary} />
      <ScrollView style={{backgroundColor: colors.secondary}}>
        <Pressable onPress={signOut}>
          <Text style={{fontSize: 100, fontFamily: 'Poppins-Bold'}}>Home</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const viewStyles = {
  mainView: {backgroundColor: 'primary', color: 'secondary', height: '100%'},
};
