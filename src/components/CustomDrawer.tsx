import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';
import React, {FC, useCallback, useEffect, useState} from 'react';
import {Image, Pressable, View} from 'react-native';
import Paragraph from './typography/Paragraph';
import Icon from 'react-native-vector-icons/MaterialIcons';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {useAuthContext} from '../contexts/AuthContext';
import {useThemeContext} from '../contexts/ThemeContext';
import Heading from './typography/Heading';

const CustomDrawer: FC<any> = props => {
  const {styles, switchThemeTo} = useThemeContext({...viewStyles});
  const {navigation} = props;
  const {signOut, userId} = useAuthContext();
  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const goToCourses = useCallback(() => {
    navigation.navigate('MainDrawer', {screen: 'MainHome'});
  }, [navigation]);
  const goToContactUs = useCallback(() => {
    navigation.navigate('ContactUs');
  }, [navigation]);

  useEffect(() => {
    firestore()
      .collection('Profiles')
      .doc(userId)
      .get()
      .then(docSnapShot => {
        const {firstname, lastname, picture} = docSnapShot.data() ?? {};
        setName(`${firstname} ${lastname}`);
        console.log('profile pic', picture);
        const [, picId] = picture?._documentPath?._parts ?? ['', -1];
        console.log('picid', picId);
        storage()
          .ref(`${picId}`)
          .getDownloadURL()
          .then(url => {
            console.log('fetched url new image ', url);
            setImageUrl(url);
          })
          .catch(e => console.log('error while getting download url', e));
      })
      .catch(e => console.log('error while fetching profile data', e));
  }, [userId]);

  return (
    <DrawerContentScrollView {...props} style={styles.drawerContent}>
      <View style={styles.headerView}>
        {imageUrl === '' ? (
          <Icon name="account-circle" size={125} />
        ) : (
          <Image
            source={{
              uri: imageUrl,
              height: 125,
              width: 125,
            }}
            style={{
              borderRadius: 100,
              marginBottom: 12,
            }}
          />
        )}
        <Heading.Medium style={{textAlign: 'center'}} size={18}>
          {name}
        </Heading.Medium>
      </View>
      <DrawerItem label="Courses" onPress={goToCourses} />
      <DrawerItem label="Contact Us" onPress={goToContactUs} />
      {/* <View style={styles.themeSelectionView}>
        <Paragraph.Medium size={14} style={styles.themeSelectionViewTitle}>
          Choose Theme
        </Paragraph.Medium>
        <View style={styles.themeBtnView}>
          <Pressable
            onPress={() => switchThemeTo('pink')}
            style={[styles.themeBtn, styles.pinkTheme]}
          />
          <Pressable
            onPress={() => switchThemeTo('light')}
            style={[styles.themeBtn, styles.blueTheme]}
          />
          <Pressable
            onPress={() => switchThemeTo('green')}
            style={[styles.themeBtn, styles.greenTheme]}
          />
          <Pressable
            onPress={() => switchThemeTo('yellow')}
            style={[styles.themeBtn, styles.yellowTheme]}
          />
          <Pressable style={[styles.themeBtn, styles.pinkTheme]} />
        </View>
      </View> */}
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
    backgroundColor: 'primary',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    margin: 0,
    height: 225,
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
  themeSelectionView: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  themeSelectionViewTitle: {
    marginBottom: 15,
  },
  themeBtnView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  themeBtn: {
    width: 45,
    height: 45,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#888',
  },
  pinkTheme: {
    backgroundColor: 'pink',
  },
  greenTheme: {
    backgroundColor: 'yellowgreen',
  },
  yellowTheme: {
    backgroundColor: 'yellow',
  },
  blueTheme: {
    backgroundColor: '#0d6efd',
  },
};
