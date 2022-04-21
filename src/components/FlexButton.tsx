import {ActivityIndicator, Pressable, PressableProps} from 'react-native';
import React, {FC} from 'react';
import Heading, {HeadingProps} from './typography/Heading';
import {useThemeContext} from '../contexts/ThemeContext';

type FlexButtonProps = PressableProps & {
  text: string;
  textProps?: HeadingProps;
  isLoading?: boolean;
};

const FlexButton: FC<FlexButtonProps> = ({
  text,
  textProps = {},
  isLoading = false,
  ...restProps
}) => {
  const {style: btnStyleProp = {}, onPress, ...restBtnProps} = restProps;
  const {style: textStyleProp = {}, ...restTextProps} = textProps;
  const {styles} = useThemeContext({
    ...viewStyles,
    btnStyleProp,
    textStyleProp,
  });

  return (
    <Pressable
      {...restBtnProps}
      onPress={isLoading ? () => {} : onPress}
      style={[styles.fullWidthButton, styles.btnStyleProp]}>
      {isLoading ? (
        <ActivityIndicator color="white" />
      ) : (
        <Heading.Medium
          {...restTextProps}
          size={16}
          style={[styles.fullWidthButtonText, styles.textStyleProp]}>
          {text}
        </Heading.Medium>
      )}
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
    height: 50,
  },
  fullWidthButtonText: {
    color: 'white',
  },
};
