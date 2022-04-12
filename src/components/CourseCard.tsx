import {useNavigation} from '@react-navigation/native';
import React, {FC, useCallback} from 'react';
import {Pressable, View} from 'react-native';
import {useThemeContext} from '../contexts/ThemeContext';
import Heading from './typography/Heading';
import Icon from 'react-native-vector-icons/MaterialIcons';

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
      <View style={styles.headerView}>
        <Heading.SemiBold style={styles.courseTitle}>
          {item.name}
        </Heading.SemiBold>
      </View>
      <View style={styles.bodyView}></View>
      <View style={styles.imageView}>
        <Icon name="person" size={70} style={styles.imageIcon} />
      </View>
    </Pressable>
  );
};

const cardStyles = {
  cardView: {
    width: '100%',
    // backgroundColor: 'gray',
    height: 180,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  headerView: {
    width: '100%',
    flex: 1,
    backgroundColor: 'primary',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    padding: 5,
    justifyContent: 'flex-end',
  },
  courseTitle: {
    fontSize: 28,
    marginLeft: 10,
    color: 'white',
  },
  bodyView: {
    width: '100%',
    flex: 1,
    borderColor: '#d9d9d9',
    borderWidth: 2,
    borderTopWidth: 0,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  imageView: {
    position: 'absolute',
    top: 80 - 50,
    right: 20,
    width: 100,
    height: 100,
    backgroundColor: '#d9d9d9',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
  },
  imageIcon: {},
};

export default Card;
