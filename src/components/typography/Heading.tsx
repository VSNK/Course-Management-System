import React, {FC} from 'react';
import {StyleProp, Text, TextStyle} from 'react-native';
import {useThemeContext} from '../../contexts/ThemeContext';

type HeadingProps = {
  size?: number;
  style?: StyleProp<TextStyle>;
};

const Bold: FC<HeadingProps> = ({size, style, children}) => {
  const {fonts} = useThemeContext();
  const defaultStyle = {fontSize: size ?? 32, fontFamily: fonts.headingBold};
  return <Text style={[defaultStyle, style]}>{children}</Text>;
};

const SemiBold: FC<HeadingProps> = ({size, style, children}) => {
  const {fonts} = useThemeContext();
  const defaultStyle = {
    fontSize: size ?? 32,
    fontFamily: fonts.headingSemiBold,
  };
  return <Text style={[defaultStyle, style]}>{children}</Text>;
};

const Medium: FC<HeadingProps> = ({size, style, children}) => {
  const {fonts} = useThemeContext();
  const defaultStyle = {fontSize: size ?? 32, fontFamily: fonts.headingMedium};
  return <Text style={[defaultStyle, style]}>{children}</Text>;
};

const Light: FC<HeadingProps> = ({size, style, children}) => {
  const {fonts} = useThemeContext();
  const defaultStyle = {fontSize: size ?? 32, fontFamily: fonts.headingLight};
  return <Text style={[defaultStyle, style]}>{children}</Text>;
};

const Thin: FC<HeadingProps> = ({size, style, children}) => {
  const {fonts} = useThemeContext();
  const defaultStyle = {fontSize: size ?? 32, fontFamily: fonts.headingThin};
  return <Text style={[defaultStyle, style]}>{children}</Text>;
};

const Heading = {
  Bold,
  SemiBold,
  Medium,
  Light,
  Thin,
};

export default Heading;
