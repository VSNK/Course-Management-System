import {useNavigation} from '@react-navigation/native';
import React, {FC, useCallback} from 'react';
import {Pressable} from 'react-native';
import {useThemeContext} from '../contexts/ThemeContext';
import Heading from './typography/Heading';

const Card: FC<any> = ({item}) => {
  const {styles} = useThemeContext(cardStyles);
  const navigation = useNavigation();

  const onPress = useCallback(() => {
    navigation.navigate('Course', {
      screen: 'Home',
      params: {
        name: item.name,
      },
    });
  }, [navigation, item.name]);

  return (
    <Pressable onPress={onPress} style={styles.cardView}>
      <Heading.Medium>{item.name}</Heading.Medium>
    </Pressable>
  );
};

const cardStyles = {
  cardView: {
    width: '100%',
    backgroundColor: 'gray',
    height: 170,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
};

export default Card;
