import React, {FC} from 'react';
import {Text, TextProps, TextStyle} from 'react-native';
import {useThemeContext} from '../../contexts/ThemeContext';

export type HeadingProps = TextProps & {
  size?: number;
  style?: TextStyle;
};

const Bold: FC<HeadingProps> = ({size, style, children}) => {
  const {fonts} = useThemeContext();
  const defaultStyle = {fontSize: size ?? 40, fontFamily: fonts.headingBold};
  return <Text style={[defaultStyle, style]}>{children}</Text>;
};

const SemiBold: FC<HeadingProps> = ({size, style, children}) => {
  const {fonts} = useThemeContext();
  const defaultStyle = {
    fontSize: size ?? 40,
    fontFamily: fonts.headingSemiBold,
  };
  return <Text style={[defaultStyle, style]}>{children}</Text>;
};

const Medium: FC<HeadingProps> = ({size, style, children}) => {
  const {fonts} = useThemeContext();
  const defaultStyle = {fontSize: size ?? 40, fontFamily: fonts.headingMedium};
  return <Text style={[defaultStyle, style]}>{children}</Text>;
};

const Light: FC<HeadingProps> = ({size, style, children}) => {
  const {fonts} = useThemeContext();
  const defaultStyle = {fontSize: size ?? 40, fontFamily: fonts.headingLight};
  return <Text style={[defaultStyle, style]}>{children}</Text>;
};

// const Thin: FC<HeadingProps> = ({size, style, children}) => {
//   const {fonts} = useThemeContext();
//   const defaultStyle = {fontSize: size ?? 40, fontFamily: fonts.headingThin};
//   return <Text style={[defaultStyle, style]}>{children}</Text>;
// };

const Heading = {
  Bold,
  SemiBold,
  Medium,
  Light,
};

export default Heading;
