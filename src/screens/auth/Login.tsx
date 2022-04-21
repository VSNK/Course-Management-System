import {Link} from '@react-navigation/native';
import React, {useState} from 'react';
import {SafeAreaView, StatusBar, View, Image} from 'react-native';
import FlexButton from '../../components/FlexButton';
import FormInput from '../../components/FormInput';
import Heading from '../../components/typography/Heading';
import Paragraph from '../../components/typography/Paragraph';
import {useAuthContext} from '../../contexts/AuthContext';
import {useThemeContext} from '../../contexts/ThemeContext';

export default function Login({navigation}) {
  const {signIn, isLoading} = useAuthContext();
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
      <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
      <View style={styles.mainView}>
        <View
          style={{
            // alignSelf: 'center',
            // width: 200,
            width: '100%',
            // height: 200,
            // borderRadius: 12,
            // elevation: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 20,
            paddingVertical: 30,
            // margin: -20,
            // marginBottom: 50,
            // elevation: 1,
            backgroundColor: 'white',
            borderBottomWidth: 1,
            borderColor: '#d9d9d9',
          }}>
          <View>
            <Heading.Bold size={24} style={{color: '#555'}}>
              Course
            </Heading.Bold>
            <Heading.Bold size={24} style={{color: '#555'}}>
              Management
            </Heading.Bold>
            <Heading.Bold size={24} style={{color: '#555'}}>
              System
            </Heading.Bold>
          </View>
          <Image
            source={require('../../assets/images/rgukt_logo.png')}
            style={{width: 100, height: 100}}
          />
        </View>
        <View style={styles.loginDetailsView}>
          <View style={{flex: 1}}>
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
            isLoading={isLoading}
          />
          <View style={styles.loginLinkView}>
            <Paragraph.Medium size={16}>
              {'Are you a new user? '}
              <Link to="/ContactUs" style={styles.loginLink}>
                Contact Us
              </Link>
            </Paragraph.Medium>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const viewStyles = {
  mainView: {
    backgroundColor: 'light',
    color: 'primary',
    height: '100%',
    // flex: 1,
  },
  loginDetailsView: {
    padding: 20,
    paddingTop: 40,
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
  headingStyle: {fontSize: 26, color: '#555'},
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
