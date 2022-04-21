import React, {FC, useEffect, useState} from 'react';
import {SafeAreaView, StatusBar, ScrollView, View} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Card from '../components/CourseCard';
import {useThemeContext} from '../contexts/ThemeContext';
import TabScreenHeader from '../components/TabScreenHeader';
import Heading from '../components/typography/Heading';
import FloatingActionButton from '../components/FloatingActionButton';
import {useCourseContext} from '../contexts/CourseContext';
import {useAuthContext} from '../contexts/AuthContext';

const Home: FC<any> = ({navigation}) => {
  const [courses, setCourses] = useState<any>([]);
  const {colors, styles} = useThemeContext(viewStyles);
  // const {signOut} = useAuthContext();
  const {role} = useAuthContext();
  const isTeacher = role === 'teacher';
  console.log('isTeacher', role);

  useEffect(() => {
    firestore()
      .collection('Courses')
      .onSnapshot(docSnapshot => {
        setCourses(
          docSnapshot?.docs.map(doc => {
            const {name, description, imgUrl, createdBy} = doc.data();
            // console.log('data we got', doc.id, JSON.stringify(fetched));
            // const dt = new Date(created_at.seconds * 1000);
            return {
              id: doc.id,
              name,
              description,
              imgUrl,
              createdBy,
            };
          }),
        );
      });
    // .catch(e => console.log('messages fetching:', e));
  }, []);

  return (
    <SafeAreaView>
      <StatusBar backgroundColor={colors.primary} />
      <TabScreenHeader title={''} />
      <ScrollView style={[{marginTop: 0, paddingTop: 0}, styles.mainView]}>
        <Heading.SemiBold size={26}>Courses</Heading.SemiBold>
        {courses.map((item: any) => (
          <Card item={item} />
        ))}
        <View style={{marginTop: 50}}></View>
      </ScrollView>
      {/* {isTeacher && ( */}
      <FloatingActionButton
        onPress={() => navigation.navigate('AddNewCourse')}
      />
      {/* )} */}
    </SafeAreaView>
  );
};

export default Home;

const viewStyles = {
  mainView: {
    color: 'secondary',
    height: '90%',
    padding: 20,
    paddingTop: 30,
    margin: 0,
  },
  heading: {
    marginBottom: 20,
  },
};
