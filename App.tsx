import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {AuthProvider} from './src/contexts/AuthContext';
import {ThemeProvider} from './src/contexts/ThemeContext';
import RootNavigator from './src/navigators/RootNavigator';

const App = () => {
  return (
    <NavigationContainer>
      <ThemeProvider>
        <AuthProvider>
          <RootNavigator />
        </AuthProvider>
      </ThemeProvider>
    </NavigationContainer>
  );
};

export default App;
