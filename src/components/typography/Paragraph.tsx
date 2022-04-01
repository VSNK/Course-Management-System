import React, {FC} from 'react';
import {StyleProp, Text, TextStyle} from 'react-native';
import {useThemeContext} from '../../contexts/ThemeContext';

type ParagraphProps = {
  size?: number;
  style?: StyleProp<TextStyle>;
};

const Bold: FC<ParagraphProps> = ({size, style, children}) => {
  const {fonts} = useThemeContext();
  const defaultStyle = {fontSize: size ?? 32, fontFamily: fonts.paragraphBold};
  return <Text style={[defaultStyle, style]}>{children}</Text>;
};

const SemiBold: FC<ParagraphProps> = ({size, style, children}) => {
  const {fonts} = useThemeContext();
  const defaultStyle = {
    fontSize: size ?? 32,
    fontFamily: fonts.paragraphSemiBold,
  };
  return <Text style={[defaultStyle, style]}>{children}</Text>;
};

const Medium: FC<ParagraphProps> = ({size, style, children}) => {
  const {fonts} = useThemeContext();
  const defaultStyle = {
    fontSize: size ?? 32,
    fontFamily: fonts.paragraphMedium,
  };
  return <Text style={[defaultStyle, style]}>{children}</Text>;
};

const Light: FC<ParagraphProps> = ({size, style, children}) => {
  const {fonts} = useThemeContext();
  const defaultStyle = {fontSize: size ?? 32, fontFamily: fonts.paragraphLight};
  return <Text style={[defaultStyle, style]}>{children}</Text>;
};

// const Thin: FC<ParagraphProps> = ({size, style, children}) => {
//   const {fonts} = useThemeContext();
//   const defaultStyle = {fontSize: size ?? 32, fontFamily: fonts.paragraphThin};
//   return <Text style={[defaultStyle, style]}>{children}</Text>;
// };

const Paragraph = {
  Bold,
  SemiBold,
  Medium,
  Light,
};

export default Paragraph;
