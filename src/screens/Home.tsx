import React, {FC, useCallback, useEffect, useMemo, useState} from 'react';
import {
  Pressable,
  SafeAreaView,
  StatusBar,
  // TextInput,
  ScrollView,
  View,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import 'react-native-get-random-values';
import TabScreenHeader from '../components/TabScreenHeader';
import Heading from '../components/typography/Heading';
import Paragraph from '../components/typography/Paragraph';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useThemeContext} from '../contexts/ThemeContext';
import FloatingActionButton from '../components/FloatingActionButton';
import {useCourseContext} from '../contexts/CourseContext';

const Home: FC<any> = ({route, navigation}) => {
  const {colors, styles} = useThemeContext(viewStyles);
  const {name: courseName = 'Sample'} = route.params;
  const [messages, setMessages] = useState<any>([]);
  const {courseId} = useCourseContext();
  // const [inputMsg, setInputMsg] = useState('');

  // const messages: any = [
  //   {
  //     id: 1,
  //     type: 'resource',
  //     title: 'New lesson resources',
  //     date: '6th Apr 2022',
  //   },
  //   {
  //     id: 2,
  //     type: 'test',
  //     title: 'Test on React Native',
  //     date: '5th Apr 2022',
  //   },
  //   {
  //     id: 3,
  //     type: 'message',
  //     title: 'This is just a simple message',
  //     date: '3rd Apr 2022',
  //   },
  // ];

  useEffect(() => {
    firestore()
      .collection('Messages')
      .where('course', '==', firestore().collection('Courses').doc(courseId))
      .onSnapshot(docSnapshot => {
        setMessages(
          docSnapshot?.docs.map(doc => {
            const {title, message, created_at} = doc.data();
            // console.log('data we got', doc.id, JSON.stringify(fetched));
            const dt = new Date(created_at.seconds * 1000);
            return {
              id: doc.id,
              type: 'message',
              title,
              message,
              date: dt.toUTCString(),
            };
          }),
        );
      });
    // .catch(e => console.log('messages fetching:', e));
  }, [courseId]);

  const iconsTypesToNames: any = useMemo(
    () => ({
      resource: 'book',
      test: 'assignment',
      message: 'person',
    }),
    [],
  );

  // const onMessageSend = useCallback(() => {
  //   if (inputMsg === '') return;
  //   console.log('on message send', inputMsg);
  //   firestore()
  //     .collection('Messages')
  //     .add({
  //       text: inputMsg,
  //       created_at: firestore.Timestamp.now(),
  //     })
  //     .then(() => setInputMsg(''));
  // }, [inputMsg]);

  const onFloatingActionBtnPress = useCallback(() => {
    navigation.navigate('AddNewMessage');
  }, [navigation]);

  console.log('change in styles', styles.courseDetailsView);

  return (
    <SafeAreaView style={styles.mainView}>
      <StatusBar backgroundColor={colors.primary} />
      <TabScreenHeader title="Home" />
      <ScrollView style={styles.bodyView}>
        <View style={styles.courseDetailsView}>
          <Heading.SemiBold size={28} style={styles.courseDetailsViewTitle}>
            {courseName}
          </Heading.SemiBold>
        </View>
        {/* <View style={styles.messageInputMainView}>
          <View style={styles.messageInputView}>
            <TextInput
              placeholder="Write message here..."
              style={styles.messageInput}
              onChangeText={text => setInputMsg(text)}
            />
          </View>
          <Pressable
            onPress={onMessageSend}
            style={styles.messageInputIconView}>
            <Icon name="send" size={32} style={styles.messageInputIcon} />
          </Pressable>
        </View> */}
        <View>
          {/* <FlatList
            data={messages}
            keyExtractor={item => item.id}
            renderItem={({item}) => { */}
          {messages.map((item: any) => {
            const {type, message, title, id} = item;
            return (
              <Pressable
                onPress={() => navigation.navigate('MessageDetailView', {id})}
                style={styles.messageView}>
                <View style={styles.messageSideView}>
                  <View style={styles.messageIconView}>
                    <Icon
                      name={iconsTypesToNames[type]}
                      size={24}
                      style={styles.messageIcon}
                    />
                  </View>
                  {/* <View style={styles.messageSideContentView}>
                    <Paragraph.Medium
                      size={10}
                      style={styles.messageSideContentDate}>
                      {date}
                    </Paragraph.Medium>
                  </View> */}
                </View>
                <View style={styles.messageDescriptionView}>
                  <Heading.SemiBold
                    size={16}
                    style={styles.messageDescriptionViewTitle}>
                    {title}
                  </Heading.SemiBold>
                  <Paragraph.SemiBold
                    style={styles.messageDescriptionViewMessage}
                    size={16}>
                    {message}
                  </Paragraph.SemiBold>
                </View>
              </Pressable>
            );
          })}
          {/* /> */}
        </View>
      </ScrollView>
      <FloatingActionButton onPress={onFloatingActionBtnPress} />
    </SafeAreaView>
  );
};

export default Home;

const viewStyles = {
  mainView: {
    backgroundColor: 'white',
    color: 'secondary',
    minHeight: '100%',
    flex: 1,
    // padding: 12,
    // paddingTop: 0,
    margin: 0,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  bodyView: {
    padding: 12,
  },
  courseDetailsView: {
    backgroundColor: 'primary',
    justifyContent: 'flex-end',
    height: 120,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 20,
  },
  courseDetailsViewTitle: {
    color: 'white',
  },
  messageView: {
    flexDirection: 'row',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#d9d9d9',
    padding: 12,
    marginBottom: 15,
  },
  messageSideView: {
    // backgroundColor: 'yellowgreen',
  },
  messageSideContentView: {
    flex: 1,
    width: 50,
  },
  messageSideContentDate: {
    textAlign: 'center',
  },
  messageIconView: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#d9d9d9',
    borderRadius: 8,
  },
  messageIcon: {},
  messageDescriptionView: {
    paddingHorizontal: 12,
    flex: 1,
  },
  messageDescriptionViewTitle: {},
  messageDescriptionViewMessage: {
    // marginBottom: 15,
  },
  messageDescriptionViewSubTitle: {
    alignSelf: 'flex-end',
  },
  messageInputMainView: {
    borderWidth: 1,
    borderColor: '#d9d9d9',
    padding: 5,
    borderRadius: 100,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  messageInputView: {
    flex: 1,
    // backgroundColor: 'yellow',
    borderRadius: 100,
  },
  messageInput: {
    paddingRight: 10,
    paddingLeft: 20,
  },
  messageInputIconView: {
    paddingHorizontal: 10,
  },
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
