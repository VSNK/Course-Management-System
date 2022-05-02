import React, {
  createContext,
  useEffect,
  useMemo,
  useReducer,
  FC,
  useContext,
} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {ToastAndroid} from 'react-native';

type StateType = {
  isSignedIn: boolean;
  isLoading: boolean;
  userId: string | null;
  userToken: string | null;
  role: string;
};

type ActionType =
  | {
      type: 'RESTORE_TOKEN';
      token: string;
    }
  | {type: 'SET_LOADING'; payload: boolean}
  | {type: 'SIGN_IN'; token: string; userId: string}
  | {type: 'SIGN_OUT'}
  | {type: 'SET_ROLE'; payload: string};

const initialState: StateType = {
  isSignedIn: false,
  isLoading: false,
  userId: null,
  userToken: null,
  role: 'student',
};

export const AuthContext = createContext({
  isLoading: false,
  isSignedIn: false,
  userId: '',
  role: 'student',
  signIn: (email: string, password: string) => {
    console.log(email, password);
  },
  signUp: () => {},
  signOut: () => {},
});

function reducer(prevState: StateType, action: ActionType) {
  switch (action.type) {
    case 'RESTORE_TOKEN':
      return {
        ...prevState,
        userToken: action.token,
        isLoading: false,
      };
    case 'SIGN_IN':
      return {
        ...prevState,
        isSignedIn: true,
        isLoading: false,
        userToken: action.token,
        userId: action.userId,
      };
    case 'SIGN_OUT':
      return {
        ...prevState,
        isSignedIn: false,
        userToken: null,
      };
    case 'SET_ROLE':
      return {...prevState, role: action.payload};
    case 'SET_LOADING':
      return {...prevState, isLoading: action.payload};
    default:
      return initialState;
  }
}

export const AuthProvider: FC<any> = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  // const [firebaseInitializing, setFirebaseInitializing] = useState(true);

  // useEffect(() => {
  //   const bootstrap = async () => {
  //     let authToken = null;
  //     try {
  //       authToken = '';
  //     } catch (e) {
  //       console.log(e);
  //     }
  //     if (authToken) {
  //       dispatch({type: 'RESTORE_TOKEN', token: authToken});
  //     }
  //   };
  //   bootstrap();
  // }, []);

  console.log('auth state', JSON.stringify(state));

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(user => {
      const userId = user?.uid ?? '';

      user
        ?.getIdToken()
        .then(token => {
          console.log('user logged in successfully', token, userId);
          dispatch({type: 'SIGN_IN', token, userId});
        })
        .catch(e => console.log('login error:', e.message));
      // if (firebaseInitializing) setFirebaseInitializing(false);
      firestore()
        .collection('Profiles')
        .doc(userId)
        .get()
        .then(docSnapShot => {
          const {role} = docSnapShot.data() ?? {};
          // console.log('profile role', role);
          dispatch({type: 'SET_ROLE', payload: role});
        })
        .then(e => console.log('error while fetching profile details', e));
    });
    return subscriber;
  }, []);

  const {isLoading, isSignedIn, userId, role} = state;

  const value = useMemo(
    () => ({
      userId,
      isSignedIn,
      isLoading,
      role,
      signIn: (email: string, password: string) => {
        dispatch({type: 'SET_LOADING', payload: true});
        auth()
          .signInWithEmailAndPassword(email, password)
          .then(() => {
            // dispatch({type: 'SIGN_IN', token: 'dummy-token'});
            // dispatch({type: 'SET_LOADING', payload: false});
          })
          .catch(e => {
            ToastAndroid.show(e.message, ToastAndroid.SHORT);
            dispatch({type: 'SET_LOADING', payload: false});
          });
      },
      signOut: () => {
        auth()
          .signOut()
          .then(() => dispatch({type: 'SIGN_OUT'}));
      },
      signUp: () => {
        // dispatch({type: 'SIGN_IN', token: 'dummy-token'});
      },
    }),
    [isLoading, isSignedIn, role, userId, dispatch],
  );
  // if (firebaseInitializing) return null;
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const value = useContext(AuthContext);
  return value;
};
