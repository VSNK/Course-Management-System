import {Link} from '@react-navigation/native';
import React, {useState} from 'react';
import {SafeAreaView, StatusBar, View} from 'react-native';
import FlexButton from '../../components/FlexButton';
import FormInput from '../../components/FormInput';
import Heading from '../../components/typography/Heading';
import Paragraph from '../../components/typography/Paragraph';
import {useAuthContext} from '../../contexts/AuthContext';
import {useThemeContext} from '../../contexts/ThemeContext';

export default function Login() {
  const {signIn} = useAuthContext();
  const {styles} = useThemeContext(viewStyles);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // if (isLoading)
  //   return (
  //     <View
  //       style={{
  //         height: '100%',
  //         justifyContent: 'center',
  //         alignItems: 'center',
  //       }}>
  //       <StatusBar />
  //       <Heading.Medium size={16}>Loading...</Heading.Medium>
  //     </View>
  //   );

  return (
    <SafeAreaView>
      <StatusBar />
      <View style={styles.mainView}>
        <View style={styles.loginDetailsView}>
          <Heading.Medium style={styles.headingStyle}>Login</Heading.Medium>
          <FormInput
            iconType="person"
            placeholder="Email"
            onChangeText={value => setEmail(value)}
          />
          <FormInput
            iconType="lock"
            secureTextEntry={true}
            placeholder="Password"
            onChangeText={value => setPassword(value)}
          />
        </View>
        <FlexButton
          onPress={() => signIn(email, password)}
          text="Login"
          textProps={{size: 16}}
        />
        <View style={styles.loginLinkView}>
          <Paragraph.Medium size={16}>
            {'Are you a new user? '}
            <Link to={'/SignUp'} style={styles.loginLink}>
              Sign Up
            </Link>
          </Paragraph.Medium>
        </View>
      </View>
    </SafeAreaView>
  );
}

const viewStyles = {
  mainView: {
    padding: 20,
    backgroundColor: 'light',
    color: 'primary',
    height: '100%',
  },
  loginDetailsView: {
    flex: 1,
  },
  backBtnView: {
    marginBottom: 10,
    marginLeft: -5,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
  },
  headingStyle: {fontSize: 30, color: 'black'},
  inputView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  inputIcon: {
    color: '#ccc',
  },
  textInput: {
    padding: 5,
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#d9d9d9',
    marginLeft: 10,
    fontSize: 16,
    fontFamily: 'paragraphMedium',
  },
  fullWidthButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'primary',
    padding: 15,
    marginVertical: 15,
    borderRadius: 12,
  },
  fullWidthButtonText: {
    color: 'white',
    fontSize: 18,
  },
  loginLinkView: {
    alignItems: 'center',
  },
  loginLink: {
    color: 'primary',
    cursor: 'pointer',
  },
};
