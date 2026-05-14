import { Platform, PixelRatio, StyleSheet } from 'react-native';
import { palette } from './colors';

export const normalize = size => {
  return size / PixelRatio.getFontScale();
};

export const textStyles = StyleSheet.create({
  text_24b: {
    fontSize: 24,
    fontFamily: 'Geologica-SemiBold',
    padding: 0,
    lineHeight: 24 * 1.3,
    color: palette.BLACK,
  },

  text_14m: {
    fontSize: 14,
    fontFamily: 'Geologica-Medium',
    padding: 0,
    lineHeight: 14 * 1.2,
    color: palette.BLACK_REGULAR,
  },
  text_14l: {
    fontSize: 14,
    fontFamily: 'Geologica-Light',
    padding: 0,
    lineHeight: 14 * 1.2,
    color: palette.BLACK_REGULAR,
  },
  text_16l: {
    fontSize: 16,
    fontFamily: 'Geologica-Light',
    padding: 0,
    lineHeight: 24,
    color: palette.BLACK_REGULAR,
  },
  text_16r: {
    fontSize: 16,
    fontFamily: 'Geologica-Regular',
    padding: 0,
    lineHeight: 16 * 1.2,
    color: palette.BLACK_REGULAR,
  },
});
