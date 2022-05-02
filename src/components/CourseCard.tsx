import {useNavigation} from '@react-navigation/native';
import React, {FC, useCallback, useEffect, useState} from 'react';
import {Image, ImageBackground, Pressable, View} from 'react-native';
import {useThemeContext} from '../contexts/ThemeContext';
import Heading from './typography/Heading';
import Icon from 'react-native-vector-icons/MaterialIcons';
import storage from '@react-native-firebase/storage';
import Paragraph from './typography/Paragraph';
import {useCourseContext} from '../contexts/CourseContext';

const Card: FC<any> = ({item}) => {
  const {styles, colors} = useThemeContext({...cardStyles});
  // console.log('colors', colors);
  // console.log('styles', styles.headerView.backgroundColor);
  const navigation = useNavigation();
  const {setCourseId} = useCourseContext();
  const {name, description, imgUrl} = item;
  const [imageUrl, setImageUrl] = useState('');
  // console.log('course card styles', styles);

  useEffect(() => {
    storage()
      .refFromURL(imgUrl)
      .getDownloadURL()
      .then(url => {
        setImageUrl(url);
      })
      .catch(e => console.log('error while getting download url', e));
  }, [imgUrl]);

  const onPress = useCallback(() => {
    setCourseId(item.id);
    navigation.navigate('Course', {
      screen: 'Home',
      params: {
        name: item.name,
      },
    });
  }, [navigation, item.name, item.id, setCourseId]);

  return (
    <Pressable onPress={onPress} style={styles.cardView}>
      <View
        // source={{uri: imageUrl, width: 200}}
        // resizeMode={'contain'}
        // imageStyle={{}}
        style={styles.headerView}>
        <Heading.SemiBold style={styles.courseTitle}>{name}</Heading.SemiBold>
      </View>
      <View style={styles.bodyView}>
        <Paragraph.Medium size={13} style={{width: '65%'}}>
          {description.length > 120
            ? description.slice(0, 120) + '...'
            : description}
        </Paragraph.Medium>
      </View>
      <View style={styles.imageView}>
        {/* <Icon name="person" size={70} style={styles.imageIcon} /> */}
        <Image
          source={{
            uri: imageUrl,
            width: 100,
            height: 100,
          }}
          // resizeMode="contain"
          style={styles.imageIcon}
        />
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
    padding: 10,
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
  imageIcon: {borderRadius: 12},
};

export default Card;
