import React, {FC} from 'react';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useThemeContext} from '../contexts/ThemeContext';
import Heading from './typography/Heading';

type ScreenHeaderProps = {
  title: string;
  iconName?: string;
  onIconPress?: () => void;
  headerColor?: string;
  textColor?: string;
};

const ScreenHeader: FC<ScreenHeaderProps> = ({
  title = '',
  iconName = 'west',
  onIconPress = () => {},
  headerColor = 'primary',
  textColor = 'white',
}) => {
  const {styles} = useThemeContext({
    headerView: {...viewStyles.headerView, backgroundColor: headerColor},
    menuIcon: {...viewStyles.menuIcon, color: textColor},
    title: {...viewStyles.title, color: textColor},
  });

  return (
    <View style={styles.headerView}>
      <Icon
        name={iconName}
        size={24}
        onPress={onIconPress}
        style={styles.menuIcon}
      />
      <Heading.Medium size={18} style={styles.title}>
        {title}
      </Heading.Medium>
    </View>
  );
};

export default ScreenHeader;

const viewStyles = {
  headerView: {
    backgroundColor: 'primary',
    flexDirection: 'row',
    alignItems: 'center',
    height: 55,
    paddingHorizontal: 5,
  },
  menuIcon: {
    marginRightHorizontal: 10,
    color: '#d9d9d9',
    paddingHorizontal: 10,
  },
  title: {
    color: '#d9d9d9',
    marginBottom: -2,
  },
};
