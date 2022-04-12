import React, {FC, useCallback, useEffect, useReducer, useState} from 'react';
import {
  Pressable,
  SafeAreaView,
  StatusBar,
  TextInput,
  View,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import * as uuid from 'uuid';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FlexButton from '../components/FlexButton';
import ScreenHeader from '../components/ScreenHeader';
import Heading from '../components/typography/Heading';
import Paragraph from '../components/typography/Paragraph';
import {useThemeContext} from '../contexts/ThemeContext';
import {pickFiles, uploadFile} from '../utils/fileUtils';

const iconsTypesToNames: any = {
  'application/pdf': 'assignment',
  'image/jpeg': 'image',
  other: 'description',
};

type StateType = {
  docRef: FirebaseFirestoreTypes.DocumentReference<FirebaseFirestoreTypes.DocumentData> | null;
  title: string;
  message: string;
  files: object[];
};

const initialState: StateType = {
  docRef: null,
  title: '',
  message: '',
  files: [{name: 'hi.pdf', size: 102400, type: 'application/pdf'}],
};

type ActionType =
  | {
      type: 'SET_DOCREF';
      payload: FirebaseFirestoreTypes.DocumentReference<FirebaseFirestoreTypes.DocumentData>;
    }
  | {
      type: 'SET_TITLE';
      payload: string;
    }
  | {
      type: 'SET_MESSAGE';
      payload: string;
    }
  | {
      type: 'SET_FILES';
      payload: object[];
    }
  | {type: 'RESET_ALL'};

const reducer = (prevState: StateType, action: ActionType) => {
  switch (action.type) {
    case 'SET_DOCREF':
      return {...prevState, docRef: action.payload};
    case 'SET_TITLE':
      return {...prevState, title: action.payload};
    case 'SET_MESSAGE':
      return {...prevState, message: action.payload};
    case 'SET_FILES':
      return {...prevState, files: action.payload};
    case 'RESET_ALL':
      return initialState;
    default:
      return prevState;
  }
};

const AddNewMessage: FC<any> = ({navigation}) => {
  const {styles} = useThemeContext(viewStyles);
  const [state, dispatch] = useReducer(reducer, initialState);
  const {docRef, title, message, files} = state;

  useEffect(() => {
    if (docRef === null) {
      const randomUUID = uuid.v4();
      const documentRef = firestore().collection('Messages').doc(randomUUID);
      dispatch({type: 'SET_DOCREF', payload: documentRef});
    }
  }, [docRef]);

  const onTitleChange = useCallback(
    text => dispatch({type: 'SET_TITLE', payload: text}),
    [dispatch],
  );
  const onMessageChange = useCallback(
    text => dispatch({type: 'SET_MESSAGE', payload: text}),
    [dispatch],
  );
  const onAttachFilesPress = useCallback(async () => {
    const tmpFiles = (await pickFiles()) ?? [];
    console.log('picked files details', JSON.stringify(tmpFiles));
    const resourcesRef = firestore().collection('Resources');
    const uploadedFileRefs: FirebaseFirestoreTypes.DocumentReference<FirebaseFirestoreTypes.DocumentData>[] =
      [];
    const uploadedFiles: any[] = [];

    for (const file of tmpFiles) {
      const uploadedFile = await uploadFile(file);
      console.log('uploaded file details', JSON.stringify(uploadedFile));
      const {filename, name, size, type} = uploadedFile ?? {};
      const ref = resourcesRef.doc(uploadedFile?.uuid);
      ref.set({
        name,
        filename,
        size,
        type,
        message: docRef,
      });
      uploadedFileRefs.push(ref);
      uploadedFiles.push(uploadedFile);
    }

    docRef?.set(
      {
        resources: uploadedFileRefs,
      },
      {merge: true},
    );
    console.log('picked files', uploadedFiles);
    dispatch({
      type: 'SET_FILES',
      payload: uploadedFiles,
    });
  }, [docRef]);

  const onCreateBtnPress = useCallback(async () => {
    try {
      await docRef?.set(
        {
          title,
          message,
          created_at: firestore.Timestamp.now(),
        },
        {merge: true},
      );
      navigation.navigate('Course');
      dispatch({type: 'RESET_ALL'});
    } catch (e) {
      console.log('error while creating', e);
    }
  }, [docRef, title, message, navigation]);

  const onHeaderBackIconPress = useCallback(() => {
    navigation.navigate('Course');
    dispatch({type: 'RESET_ALL'});
  }, [navigation]);

  return (
    <SafeAreaView style={styles.mainView}>
      <StatusBar />
      <ScreenHeader
        title="Add New Message"
        onIconPress={onHeaderBackIconPress}
      />
      <ScrollView style={styles.scrollView}>
        <View style={styles.inputView}>
          <Heading.SemiBold size={14} style={styles.inputTitle}>
            Title
          </Heading.SemiBold>
          <TextInput
            value={title}
            onChangeText={onTitleChange}
            style={styles.textInput}
            placeholder="Enter title here"
          />
        </View>

        <View style={styles.inputView}>
          <Heading.SemiBold size={14} style={styles.inputTitle}>
            Message
          </Heading.SemiBold>
          <TextInput
            multiline={true}
            numberOfLines={7}
            value={message}
            onChangeText={onMessageChange}
            style={[styles.textInput, styles.textArea]}
            placeholder="Write message here..."
          />
        </View>
        <Pressable onPress={onAttachFilesPress} style={styles.attachFilesBtn}>
          <Heading.SemiBold size={12}>Attach Files</Heading.SemiBold>
        </Pressable>
        <View style={styles.resourceListView}>
          <Heading.SemiBold size={14} style={styles.inputTitle}>
            Resources
          </Heading.SemiBold>
          {files.length > 0 &&
            files.map(({name, type = 'other', size}: any) => (
              <View style={styles.resourceItemView}>
                <View style={styles.resourceItemDeleteView}>
                  <Icon name="close" style={styles.resourceItemDeleteIcon} />
                </View>
                <View style={styles.resourceItemIconView}>
                  <Icon
                    name={iconsTypesToNames[type]}
                    size={28}
                    style={styles.resourceItemIcon}
                  />
                </View>
                <View style={styles.resourceItemTitleView}>
                  <Heading.Medium size={14} style={styles.resourceItemTitle}>
                    {name.length >= 25
                      ? name.slice(0, 25) + '...' + name.slice(name.length - 6)
                      : name}
                  </Heading.Medium>
                  <Paragraph.SemiBold size={12}>
                    {Math.ceil(size / 1024)} KB
                  </Paragraph.SemiBold>
                </View>
              </View>
            ))}
        </View>
      </ScrollView>
      <View style={styles.floatingBtnView}>
        <FlexButton text="Create" onPress={onCreateBtnPress} />
      </View>
    </SafeAreaView>
  );
};

export default AddNewMessage;

const viewStyles = {
  mainView: {
    minHeight: '100%',
  },
  scrollView: {
    flex: 1,
    padding: 16,
    // marginBottom: 100,
  },
  inputView: {
    marginBottom: 20,
  },
  inputTitle: {
    marginBottom: 5,
  },
  textArea: {
    paddingVertical: 10,
    textAlignVertical: 'top',
  },
  textInput: {
    borderWidth: 2,
    borderColor: '#d9d9d9',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  attachFilesBtn: {
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: '#d9d9d9',
    marginBottom: 20,
  },
  resourceItemView: {
    flexDirection: 'row',
    padding: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#d9d9d9',
    marginBottom: 10,
  },
  resourceListView: {marginBottom: 50},
  resourceItemIconView: {
    // backgroundColor: 'yellow',
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  resourceItemTitleView: {
    paddingLeft: 10,
    paddingRight: 10,
    // backgroundColor: 'blue',
    flex: 1,
  },
  resourceItemTitle: {},
  resourceItemDeleteView: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: 20,
    height: 20,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ccc',
  },
  floatingBtnView: {
    paddingHorizontal: 16,
    // backgroundColor: 'yellow',
  },
};
