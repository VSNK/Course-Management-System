import React, {
  createContext,
  FC,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from 'react';
import {StyleSheet} from 'react-native';

type ColorType = {
  primary: string;
  secondary: string;
  success: string;
  info: string;
  warning: string;
  danger: string;
  light: string;
  dark: string;
};

const lightColors: ColorType = {
  primary: '#0d6efd',
  secondary: '#6c757d',
  success: '#198754',
  info: '#0dcaf0',
  warning: '#ffc107',
  danger: '#dc3545',
  light: '#f8f9fa',
  dark: '#212529',
};

const darkColors: ColorType = {
  primary: '#0d6efd',
  secondary: '#6c757d',
  success: '#198754',
  info: '#0dcaf0',
  warning: '#ffc107',
  danger: '#dc3545',
  light: '#f8f9fa',
  dark: '#212529',
};

type FontType = {
  headingThin: string;
  headingLight: string;
  headingMedium: string;
  headingSemiBold: string;
  headingBold: string;
  paragraphThin: string;
  paragraphLight: string;
  paragraphMedium: string;
  paragraphSemiBold: string;
  paragraphBold: string;
};

const lightFonts: FontType = {
  headingThin: 'Poppins-Thin',
  headingLight: 'Poppins-Light',
  headingMedium: 'Poppins-Medium',
  headingSemiBold: 'Poppins-SemiBold',
  headingBold: 'Poppins-Bold',
  paragraphThin: 'Roboto-Thin',
  paragraphLight: 'Roboto-Light',
  paragraphMedium: 'Roboto-Medium',
  paragraphSemiBold: 'Roboto-SemiBold',
  paragraphBold: 'Roboto-Bold',
};

// const darkFonts: FontType = {
//   headingThin: '',
//   headingLight: '',
//   headingMedium: '',
//   headingSemiBold: '',
//   headingBold: '',
//   paragraphThin: '',
//   paragraphLight: '',
//   paragraphMedium: '',
//   paragraphSemiBold: '',
//   paragraphBold: '',
// };

type ThemeType = {
  colors: ColorType;
  fonts: FontType;
};

type ThemesType = {
  light: ThemeType;
  dark: ThemeType;
};

export const themes: ThemesType = {
  light: {
    colors: lightColors,
    fonts: lightFonts,
  },
  dark: {
    colors: darkColors,
    fonts: lightFonts,
  },
};

export const createStyleSheet = (styleSheet: any, theme: any) => {
  return StyleSheet.create(
    Object.keys(styleSheet).reduce((modStyleSheet: any, styleName: string) => {
      const style = styleSheet[styleName];
      const {colors, fonts} = theme;
      const {color, backgroundColor, borderColor, fontFamily} = style;

      if (fontFamily && fonts[fontFamily]) {
        style.fontFamily = fonts[fontFamily];
      }

      if (color && colors[color]) {
        style.color = colors[color];
      }
      if (backgroundColor && colors[backgroundColor]) {
        style.backgroundColor = colors[backgroundColor];
      }
      if (borderColor && colors[borderColor]) {
        style.borderColor = colors[borderColor];
      }
      modStyleSheet[styleName] = style;
      return modStyleSheet;
    }, {}),
  );
};

type ThemeContextType = {
  theme: ThemeType;
  switchThemeTo: Dispatch<SetStateAction<'light' | 'dark'>>;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: themes.light,
  switchThemeTo: () => {},
});

export const ThemeProvider: FC<any> = ({children}) => {
  const [themeName, switchThemeTo] = useState<'light' | 'dark'>('light');
  const theme = themes[themeName];
  const value = {theme, switchThemeTo};
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useThemeContext = (styles: any = {}) => {
  const {theme, switchThemeTo} = useContext(ThemeContext);
  const {colors, fonts} = theme;
  const modStyles = createStyleSheet(styles, theme);

  return {colors, fonts, switchThemeTo, styles: modStyles};
};
