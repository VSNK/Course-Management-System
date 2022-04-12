import React, {
  createContext,
  useEffect,
  useMemo,
  useReducer,
  FC,
  useContext,
  useState,
} from 'react';
import auth from '@react-native-firebase/auth';
import {StatusBar, View} from 'react-native';
import {Text} from 'react-native-paper';

type StateType = {
  isSignedIn: boolean;
  isLoading: boolean;
  userToken: string | null;
};

type ActionType =
  | {
      type: 'RESTORE_TOKEN';
      token: string;
    }
  | {type: 'SIGN_IN'; token: string}
  | {type: 'SIGN_OUT'};

const initialState: StateType = {
  isSignedIn: false,
  isLoading: true,
  userToken: null,
};

export const AuthContext = createContext({
  isLoading: true,
  isSignedIn: false,
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
      };
    case 'SIGN_OUT':
      return {
        ...prevState,
        isSignedIn: false,
        userToken: null,
      };
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
      user
        ?.getIdToken()
        .then(token => {
          console.log('user logged in successfully', token);
          dispatch({type: 'SIGN_IN', token});
        })
        .catch(e => console.log('login error:', e));
      // if (firebaseInitializing) setFirebaseInitializing(false);
    });
    return subscriber;
  }, []);

  const {isLoading, isSignedIn} = state;

  const value = useMemo(
    () => ({
      isSignedIn,
      isLoading,
      signIn: (email: string, password: string) => {
        auth()
          .signInWithEmailAndPassword(email, password)
          .then(() => {
            dispatch({type: 'SIGN_IN', token: 'dummy-token'});
          });
      },
      signOut: () => {
        auth()
          .signOut()
          .then(() => dispatch({type: 'SIGN_OUT'}));
      },
      signUp: () => {
        dispatch({type: 'SIGN_IN', token: 'dummy-token'});
      },
    }),
    [isLoading, isSignedIn],
  );
  // if (firebaseInitializing) return null;
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const value = useContext(AuthContext);
  return value;
};
