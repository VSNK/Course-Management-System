import {Pressable} from 'react-native';
import React, {FC} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useThemeContext} from '../contexts/ThemeContext';

const FloatingActionButton: FC<any> = props => {
  const {styles} = useThemeContext(viewStyles);
  return (
    <Pressable style={styles.floatingActionBtn} {...props}>
      <Icon name="add" size={35} style={styles.floatingActionBtnIcon} />
    </Pressable>
  );
};

export default FloatingActionButton;

const viewStyles = {
  floatingActionBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 60,
    height: 60,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'primary',
    margin: 15,
    elevation: 5,
  },
  floatingActionBtnIcon: {
    color: 'white',
  },
};
