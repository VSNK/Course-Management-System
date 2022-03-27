import React, {
  createContext,
  useEffect,
  useMemo,
  useReducer,
  FC,
  useContext,
} from 'react';

type StateType = {
  isSignedIn: boolean;
  isLoading: boolean;
  authToken: string | null;
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
  authToken: null,
};

export const AuthContext = createContext({
  isLoading: true,
  isSignedIn: false,
  signUp: () => {},
  signIn: () => {},
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

  useEffect(() => {
    const bootstrap = async () => {
      let authToken = null;
      try {
        authToken = '';
      } catch (e) {
        console.log(e);
      }
      if (authToken) {
        dispatch({type: 'RESTORE_TOKEN', token: authToken});
      }
    };
    bootstrap();
  }, []);

  const {isLoading, isSignedIn} = state;

  const value = useMemo(
    () => ({
      isSignedIn,
      isLoading,
      signIn: () => {
        dispatch({type: 'SIGN_IN', token: 'dummy-token'});
      },
      signOut: () => {
        dispatch({type: 'SIGN_OUT'});
      },
      signUp: () => {
        dispatch({type: 'SIGN_IN', token: 'dummy-token'});
      },
    }),
    [isLoading, isSignedIn],
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const value = useContext(AuthContext);
  return value;
};
