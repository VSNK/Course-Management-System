import {Pressable, PressableProps} from 'react-native';
import React, {FC} from 'react';
import Heading, {HeadingProps} from './typography/Heading';
import {useThemeContext} from '../contexts/ThemeContext';

type FlexButtonProps = PressableProps & {
  text: string;
  textProps?: HeadingProps;
};

const FlexButton: FC<FlexButtonProps> = ({
  text,
  textProps = {},
  ...restProps
}) => {
  const {style: btnStyleProp = {}, ...restBtnProps} = restProps;
  const {style: textStyleProp = {}, ...restTextProps} = textProps;
  const {styles} = useThemeContext({
    ...viewStyles,
    btnStyleProp,
    textStyleProp,
  });

  return (
    <Pressable
      {...restBtnProps}
      style={[styles.fullWidthButton, styles.btnStyleProp]}>
      <Heading.Medium
        {...restTextProps}
        size={16}
        style={[styles.fullWidthButtonText, styles.textStyleProp]}>
        {text}
      </Heading.Medium>
    </Pressable>
  );
};

export default FlexButton;

const viewStyles = {
  fullWidthButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'primary',
    padding: 15,
    marginVertical: 15,
    borderRadius: 2,
  },
  fullWidthButtonText: {
    color: 'white',
  },
};
