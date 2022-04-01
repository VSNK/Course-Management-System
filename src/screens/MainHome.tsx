import React, {FC, useCallback} from 'react';
import {
  SafeAreaView,
  StatusBar,
  Pressable,
  FlatList,
  ScrollView,
  View,
} from 'react-native';
import Card from '../components/CourseCard';
import Paragraph from '../components/typography/Paragraph';
import {useAuthContext} from '../contexts/AuthContext';
import {useThemeContext} from '../contexts/ThemeContext';

const courses = [
  {
    id: 1,
    name: 'HCI',
  },
  {
    id: 2,
    name: 'SADP',
  },
  {
    id: 3,
    name: 'OBM',
  },
];

const Home: FC<any> = () => {
  const {colors, styles} = useThemeContext(viewStyles);
  const {signOut} = useAuthContext();

  const keyExtractor = useCallback(item => item.id, []);
  const renderItem = useCallback(({item}) => <Card item={item} />, []);
  return (
    <SafeAreaView style={styles.mainView}>
      <StatusBar backgroundColor={colors.primary} />
      <View style={{marginTop: 0, paddingTop: 0}}>
        <Pressable onPress={signOut} style={styles.heading}>
          <Paragraph.Bold>Courses</Paragraph.Bold>
        </Pressable>
        <FlatList
          data={courses}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
        />
      </View>
    </SafeAreaView>
  );
};

export default Home;

const viewStyles = {
  mainView: {
    backgroundColor: 'white',
    color: 'secondary',
    minHeight: '100%',
    padding: 20,
    paddingTop: 30,
    margin: 0,
  },
  heading: {
    marginBottom: 20,
  },
};
