import React, {FC, useCallback, useEffect, useReducer} from 'react';
import {SafeAreaView, StatusBar, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';
import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import ScreenHeader from '../components/ScreenHeader';
import Heading from '../components/typography/Heading';
import Paragraph from '../components/typography/Paragraph';
import {useThemeContext} from '../contexts/ThemeContext';
import ResourceListItemView from '../components/ResourceListItemView';
import FlexButton from '../components/FlexButton';

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
  files: [],
};

type ActionType =
  | {type: 'SET_STATE'; payload: StateType}
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
  | {type: 'ADD_FILE'; payload: any}
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
    case 'SET_STATE':
      return action.payload;
    case 'ADD_FILE':
      return {...prevState, files: [...prevState.files, action.payload]};
    default:
      return prevState;
  }
};

const MessageDetailView: FC<any> = ({navigation, route}) => {
  const {params} = route;
  const {id: docId} = params;
  const {styles} = useThemeContext(viewStyles);
  const [state, dispatch] = useReducer(reducer, initialState);
  const {title, message, files} = state;

  useEffect(() => {
    const docReference = firestore().collection('Messages').doc(docId);
    docReference.onSnapshot(docSnapshot => {
      const {
        title: titleText,
        message: messageText,
        resources,
      } = docSnapshot?.data() ?? {};
      // console.log(
      //   'data received',
      //   docSnapshot.data()?.resources[0]._documentPath,
      // );
      dispatch({
        type: 'SET_STATE',
        payload: {
          title: titleText,
          message: messageText,
          docRef: docReference,
          files: [],
        },
      });
      if (resources && resources.length) {
        resources.forEach(({_documentPath}: {_documentPath: any}) => {
          console.log('doc path', _documentPath);
          const [, fileDocId] = _documentPath?._parts ?? ['', -1];
          firestore()
            .collection('Resources')
            .doc(fileDocId)
            .onSnapshot(fileDocSnapshot => {
              const {name, filename, size, type} =
                fileDocSnapshot?.data() ?? {};
              dispatch({
                type: 'ADD_FILE',
                payload: {name, filename, size, type},
              });
            });
          // .catch(e => console.log('error while getting file details', e));
        });
      }
    });
    // .catch(e => console.log('error while fetching message', e));
  }, [docId]);

  const onHeaderBackIconPress = useCallback(() => {
    navigation.navigate('Course');
    // dispatch({type: 'RESET_ALL'});
  }, [navigation]);

  return (
    <SafeAreaView style={styles.mainView}>
      <StatusBar />
      <ScreenHeader title="" onIconPress={onHeaderBackIconPress} />
      <ScrollView style={styles.scrollView}>
        <Heading.Bold size={24}>{title}</Heading.Bold>
        <Paragraph.Light size={18}>{message}</Paragraph.Light>
        <View style={{marginTop: 40}}>
          <Heading.Bold style={{marginBottom: 12}} size={14}>
            Files Attached
          </Heading.Bold>
          {files.length > 0 ? (
            files.map(({name, type = 'other', size, filename}: any) => (
              <ResourceListItemView
                name={name}
                filename={filename}
                type={type}
                size={size}
              />
            ))
          ) : (
            <FlexButton
              text="No files"
              style={{
                padding: 5,
                backgroundColor: '#d9d9d9',
                marginTop: 50,
              }}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MessageDetailView;

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
