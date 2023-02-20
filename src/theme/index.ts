import { extendTheme } from 'native-base';

export const theme = extendTheme({
  components: {
    Select: {
      baseStyle: {
        _disabled: '#121214'
      }
    },
  },
  colors: {
    green: {
      700: '#00875F',
      500: '#00B37E',
    },
    gray: {
      700: '#121214',
      600: '#202024',
      500: '#29292E',
      400: '#323238',
      300: '#7C7C8A',
      200: '#C4C4CC',
      100: '#E1E1E6'
    },
    white: '#FFFFFF',
    red: {
      500: '#F75A68'
    },
    primary: {
      100: '#ddf1fc',
      200: '#c0e7fc',
      300: '#a0dcfb',
      400: '#87d3fb',
      500: '#50c1fb',
      600: '#44a5d8',
      700: '#348ebd',
      800: '#237099',
      900: '#165474',
    }
  },
  fonts: {
    heading: 'Roboto_700Bold',
    body: 'Roboto_400Regular',
  },
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
  },
  sizes: {
    14: 56,
    33: 148
  },
});
