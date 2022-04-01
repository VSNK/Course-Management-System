import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useMemo} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import About from '../screens/About';
import Home from '../screens/Home';
import Resources from '../screens/Resources';
import Tests from '../screens/Tests';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  const initialParams = useMemo(() => ({name: 'Sample'}), []);
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen
        name="Home"
        component={Home}
        initialParams={initialParams}
        options={{tabBarIcon: () => <Icon name="home" size={32} />}}
      />
      <Tab.Screen
        name="Resources"
        component={Resources}
        initialParams={initialParams}
        options={{tabBarIcon: () => <Icon name="book" size={28} />}}
      />
      <Tab.Screen
        name="Tests"
        component={Tests}
        initialParams={initialParams}
        options={{tabBarIcon: () => <Icon name="assignment" size={28} />}}
      />
      <Tab.Screen
        name="About"
        component={About}
        initialParams={initialParams}
        options={{tabBarIcon: () => <Icon name="info" size={28} />}}
      />
    </Tab.Navigator>
  );
}
