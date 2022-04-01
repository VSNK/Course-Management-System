import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';
import React, {FC, useCallback} from 'react';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useAuthContext} from '../contexts/AuthContext';
import {useThemeContext} from '../contexts/ThemeContext';
import Heading from './typography/Heading';

const CustomDrawer: FC<any> = props => {
  const {styles} = useThemeContext(viewStyles);
  const navigation = useNavigation();
  const {signOut} = useAuthContext();
  const goToCourses = useCallback(() => {
    navigation.navigate('MainHome');
  }, [navigation]);

  return (
    <DrawerContentScrollView {...props} style={styles.drawerContent}>
      <View style={styles.headerView}>
        <Heading.SemiBold size={24}>Sidebar</Heading.SemiBold>
      </View>
      <DrawerItem label="Courses" onPress={goToCourses} />
      <DrawerItem
        label="Logout"
        onPress={signOut}
        icon={() => <Icon name="logout" size={24} />}
      />
    </DrawerContentScrollView>
  );
};

export default CustomDrawer;

const viewStyles = {
  headerView: {
    backgroundColor: '#555',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    margin: 0,
    height: 200,
    marginTop: -5,
  },
  drawerContent: {
    paddingTop: 0,
  },
  menuIcon: {
    marginRight: 20,
    color: '#d9d9d9',
  },
  title: {
    color: '#d9d9d9',
  },
};
