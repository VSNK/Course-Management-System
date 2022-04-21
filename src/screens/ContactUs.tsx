import React, {FC} from 'react';
import {Linking, SafeAreaView, StatusBar, View} from 'react-native';
import {useThemeContext} from '../contexts/ThemeContext';
import Heading from '../components/typography/Heading';
import ScreenHeader from '../components/ScreenHeader';
import Paragraph from '../components/typography/Paragraph';

const ContactUs: FC<any> = ({navigation}) => {
  const {colors, styles} = useThemeContext(viewStyles);

  return (
    <SafeAreaView>
      <StatusBar backgroundColor={colors.primary} />
      <ScreenHeader
        // iconName="menu"
        onIconPress={() => navigation.goBack()}
        title={''}
      />
      <View style={styles.mainView}>
        <Heading.SemiBold size={28} style={{marginBottom: 20}}>
          Contact Us
        </Heading.SemiBold>
        <View style={{marginBottom: 20}}>
          <Heading.SemiBold size={16}>Phone Number</Heading.SemiBold>
          <Paragraph.Light size={18} style={{marginBottom: 20}}>
            +91 7989422584
          </Paragraph.Light>
        </View>
        <View style={{marginBottom: 20}}>
          <Heading.SemiBold size={16}>Email</Heading.SemiBold>
          <Paragraph.Light size={18} style={{marginBottom: 20, color: 'blue'}}>
            cms@rguktsklm.ac.in
          </Paragraph.Light>
        </View>
        <View style={{marginBottom: 20}}>
          <Heading.SemiBold size={16}>LinkedIn</Heading.SemiBold>
          <Paragraph.Light size={18} style={{marginBottom: 20, color: 'blue'}}>
            https://www.linkedin.com/in/cms-rgukt-sklm
          </Paragraph.Light>
        </View>
        <View style={{marginBottom: 20}}>
          <Heading.SemiBold size={16}>Website</Heading.SemiBold>
          <Paragraph.Light size={18} style={{marginBottom: 20, color: 'blue'}}>
            https://cms.rguktsklm.ac.in
          </Paragraph.Light>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ContactUs;

const viewStyles = {
  mainView: {
    backgroundColor: 'white',
    color: 'secondary',
    minHeight: '100%',
    flex: 1,
    padding: 20,
    // paddingTop: 0,
    margin: 0,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
};
