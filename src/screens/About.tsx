import React, {FC} from 'react';
import {SafeAreaView, StatusBar, View} from 'react-native';
import TabScreenHeader from '../components/TabScreenHeader';
import Paragraph from '../components/typography/Paragraph';
import {useThemeContext} from '../contexts/ThemeContext';

const About: FC<any> = ({route}) => {
  const {colors, styles} = useThemeContext(viewStyles);
  const {name: courseName = 'Sample'} = route.params;

  return (
    <SafeAreaView>
      <StatusBar backgroundColor={colors.primary} />
      <TabScreenHeader title="About" />
      <View style={styles.mainView}>
        <Paragraph.Bold>{courseName} About</Paragraph.Bold>
      </View>
    </SafeAreaView>
  );
};

export default About;

const viewStyles = {
  mainView: {
    backgroundColor: 'white',
    color: 'secondary',
    minHeight: '100%',
    flex: 1,
    padding: 20,
    paddingTop: 0,
    margin: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
};
