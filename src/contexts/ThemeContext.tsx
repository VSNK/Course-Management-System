import React, {
  createContext,
  FC,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from 'react';
import {StyleProp, StyleSheet} from 'react-native';

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
  primary: '#673de6', //'#0d6efd',
  secondary: '#424C58',
  success: '#198754',
  info: '#0dcaf0',
  warning: '#ffc107',
  danger: '#dc3545',
  light: '#f8f9fa',
  dark: '#212529',
};

const greenColors: ColorType = {
  primary: 'yellowgreen',
  secondary: '#6c757d',
  success: '#198754',
  info: '#0dcaf0',
  warning: '#ffc107',
  danger: '#dc3545',
  light: '#f8f9fa',
  dark: '#212529',
};

const yellowColors: ColorType = {
  primary: 'yellow',
  secondary: '#6c757d',
  success: '#198754',
  info: '#0dcaf0',
  warning: '#ffc107',
  danger: '#dc3545',
  light: '#f8f9fa',
  dark: '#212529',
};

const pinkColors: ColorType = {
  primary: 'pink',
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
  pink: ThemeType;
  green: ThemeType;
  yellow: ThemeType;
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
  pink: {
    colors: pinkColors,
    fonts: lightFonts,
  },
  green: {
    colors: greenColors,
    fonts: lightFonts,
  },
  yellow: {
    colors: yellowColors,
    fonts: lightFonts,
  },
};

type ColorValueType = keyof ColorType;
type FontFamilyValueType = keyof FontType;

export type StylePropsObject = {
  [name: string]: {
    color: ColorValueType;
    backgroundColor: ColorValueType;
    fontFamily: FontFamilyValueType;
  } & StyleProp<any>;
};

export const createStyleSheet: any = (styleSheet: any, theme: any) => {
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
  switchThemeTo: Dispatch<
    SetStateAction<'light' | 'dark' | 'pink' | 'green' | 'yellow'>
  >;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: themes.light,
  switchThemeTo: () => {},
});

export const ThemeProvider: FC<any> = ({children}) => {
  const [themeName, switchThemeTo] = useState<
    'light' | 'dark' | 'pink' | 'green' | 'yellow'
  >('light');
  const theme = themes[themeName];
  const value = {theme, switchThemeTo};
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useThemeContext = (styles: any = {}) => {
  const {theme, switchThemeTo} = useContext(ThemeContext);
  const {colors, fonts} = theme;
  // console.log('styles', styles);
  // console.log('theme', theme);
  const modStyles = createStyleSheet({...styles}, theme);
  // console.log('modStyles', modStyles);

  return {colors, fonts, switchThemeTo, styles: modStyles};
};
