import React, {FC, useEffect, useState} from 'react';
import {SafeAreaView, StatusBar, View} from 'react-native';
import TabScreenHeader from '../components/TabScreenHeader';
import Paragraph from '../components/typography/Paragraph';
import {useCourseContext} from '../contexts/CourseContext';
import {useThemeContext} from '../contexts/ThemeContext';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {Image} from 'react-native';
import {Dimensions} from 'react-native';
import Heading from '../components/typography/Heading';

const screenWidth = Dimensions.get('screen');

const About: FC<any> = ({}) => {
  const {colors, styles} = useThemeContext(viewStyles);
  const [course, setCourse] = useState<any>(null);
  const [imageUrl, setImageUrl] = useState('');
  const {courseId} = useCourseContext();
  useEffect(() => {
    firestore()
      .collection('Courses')
      .doc(courseId)
      .onSnapshot(docSnapShot => {
        const {name, imgUrl, createdBy, description} =
          docSnapShot?.data() ?? {};
        setCourse({name, description, createdBy, id: docSnapShot.id});

        storage()
          .refFromURL(imgUrl)
          .getDownloadURL()
          .then(url => {
            // console.log('fetched url ', url);
            setImageUrl(url);
          })
          .catch(e => console.log('error while getting download url', e));
      });
  }, [courseId]);

  const {name, description, createdBy} = course ?? {};

  return (
    <SafeAreaView>
      <StatusBar backgroundColor={colors.primary} />
      <TabScreenHeader title="About" />
      <Image
        source={{uri: imageUrl, height: 205}}
        resizeMode="stretch"
        style={{width: '100%', backgroundColor: '#d9d9d9'}}
      />
      <View style={styles.mainView}>
        <Heading.SemiBold size={28}>{name}</Heading.SemiBold>
        <Paragraph.Light size={16}>{description}</Paragraph.Light>
        <Paragraph.Medium
          size={16}
          style={{alignSelf: 'flex-end', marginTop: 50}}>
          {' '}
          - {createdBy}
        </Paragraph.Medium>
      </View>
    </SafeAreaView>
  );
};

export default About;

const viewStyles = {
  mainView: {
    backgroundColor: 'white',
    color: 'secondary',
    minHeight: '100%',
    flex: 1,
    padding: 20,
    // paddingTop: 0,
    margin: 0,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
};
