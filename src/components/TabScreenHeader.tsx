import React, {FC} from 'react';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useDrawerNavigation} from '../contexts/DrawerContext';
import {useThemeContext} from '../contexts/ThemeContext';
import Heading from './typography/Heading';

type TabScreenHeaderProps = {
  title: string;
};

const TabScreenHeader: FC<TabScreenHeaderProps> = ({title = ''}) => {
  const {styles} = useThemeContext(viewStyles);
  const drawerNavigation = useDrawerNavigation();

  return (
    <View style={styles.headerView}>
      <Icon
        name="menu"
        size={28}
        onPress={drawerNavigation.openDrawer}
        style={styles.menuIcon}
      />
      <Heading.Medium size={20} style={styles.title}>
        {title}
      </Heading.Medium>
    </View>
  );
};

export default TabScreenHeader;

const viewStyles = {
  headerView: {
    backgroundColor: '#555',
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    paddingHorizontal: 5,
  },
  menuIcon: {
    marginRight: 10,
    color: '#d9d9d9',
    padding: 10,
    // backgroundColor: 'yellow',
  },
  title: {
    color: '#d9d9d9',
    marginBottom: -5,
  },
};
